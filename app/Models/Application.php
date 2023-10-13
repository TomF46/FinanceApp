<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Models\ApplicationRevision;
use App\Models\Investment;
use App\Enums\ApplicationStatus;
use App\Enums\ApplicationPriority;

class Application extends Model
{
    use HasFactory;
    protected $fillable = [
        'year_id',
        'retail_location_id'
    ];

    public function year()
    {
        return $this->belongsTo(Year::class);
    }

    public function retailLocation()
    {
        return $this->belongsTo(RetailLocation::class);
    }

    public function applicationRevisions()
    {
        return $this->hasMany(ApplicationRevision::class);
    }

    public function investment()
    {
        return $this->hasOne(Investment::class);
    }

    public function latestRevision()
    {
        return $this->applicationRevisions->last();
    }

    public function getTotalNonOperatingIncome()
    {
        return $this->latestRevision()->getTotalNonOperatingIncome();
    }

    public function getTotalExpenses()
    {
        return $this->latestRevision()->getTotalExpenses();
    }

    public function getTotalSalesIncome()
    {
        return $this->latestRevision()->getTotalSalesIncome();
    }

    public function getTotalNetProfit()
    {
        return ($this->getTotalNonOperatingIncome() + $this->getTotalSalesIncome()) - $this->getTotalExpenses();
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'areaName' => $this->retailLocation->area->name,
            'areaId' => $this->retailLocation->area->id,
            'retailLocationName' => $this->retailLocation->name,
            'retailLocationId' => $this->retailLocation->id,
            'status' => $this->status,
            'statusText' => $this->getStatusText(),
            'priority' => $this->priority,
            'priorityText' => $this->getPriorityText()

        ];
    }

    public function mapDetail()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'retailLocationName' => $this->retailLocation->name,
            'retailLocationId' => $this->retailLocation->id,
            'status' => $this->status,
            'statusText' => $this->getStatusText(),
            'priority' => $this->priority,
            'priorityText' => $this->getPriorityText(),
            'sales' => $this->latestRevision() ? $this->latestRevision()->mapSales() : [],
            'incomeRecord' => $this->latestRevision() ? $this->latestRevision()->mapIncomeRecord(): null,
            'expensesRecord' => $this->latestRevision() ? $this->latestRevision()->mapExpensesRecord() : null,
        ];
    }

    public function getStatusText()
    {
        switch ($this->status) {
            case ApplicationStatus::NotSubmitted:
                return "Not submitted";
                break;
            case ApplicationStatus::Submitted:
                return "Submitted";
                break;
            case ApplicationStatus::Returned:
                return "Returned";
                break;
            case ApplicationStatus::Accepted:
                return "Accepted";
                break;
        }
    }

    public function getPriorityText()
    {
        switch ($this->priority) {
            case ApplicationPriority::Low:
                return "Low";
                break;
            case ApplicationPriority::Medium:
                return "Medium";
                break;
            case ApplicationPriority::High:
                return "High";
                break;
            case ApplicationPriority::Severe:
                return "Severe";
                break;
                
        }
    }

    public function isManagedBy(User $user)
    {
        return $this->retailLocation->managers->contains($user);
    }

    public function isAreaManagedBy(User $user)
    {
        return $this->retailLocation->area->managers->contains($user);
    }

    public function submit($attributes)
    {
        $this->createRevision($attributes);
        $this->status = ApplicationStatus::Submitted;
        $this->save();
    }

    public function createRevision($attributes)
    {
        $revision = ApplicationRevision::create([
            'application_id' => $this->id
        ]);

        $revision->addRecords($attributes);
    }

    public function accept()
    {
        $this->status = ApplicationStatus::Accepted;
        $this->createInvestment();
        $this->save();
    }

    public function reject($user, $message)
    {
        $this->status = ApplicationStatus::Returned;
        $this->latestRevision()->rejectRevision($user, $message);
        $this->save();
    }

    public function getRejectionMessage()
    {
        return $this->latestRevision()->getRejectionMessage();
    }

    public function deactivate(){
        $this->status = ApplicationStatus::Inactive;
        $this->save();
    }

    protected function createInvestment()
    {
        $investment = Investment::make([
            'application_id' => $this->id
        ]);
        $investment->calculateInvestment();
    }

    public function setPriorityLevel($level)
    {
        $this->priority = $level;
        $this->save();
    }
}
