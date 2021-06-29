<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Models\ApplicationRevision;
use App\Enums\ApplicationStatus;

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

    public function map()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'retailLocationName' => $this->retailLocation->name,
            'retailLocationId' => $this->retailLocation->id,
            'status' => $this->status,
            'statusText' => $this->getStatusText()
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
            'sales' => $this->applicationRevisions->last() ? $this->applicationRevisions->last()->mapSales() : [],
            'incomeRecord' => $this->applicationRevisions->last() ? $this->applicationRevisions->last()->mapIncomeRecord(): null,
            'expensesRecord' => $this->applicationRevisions->last() ? $this->applicationRevisions->last()->mapExpensesRecord() : null,
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

    public function isManagedBy(User $user)
    {
        return $this->retailLocation->managers->contains($user);
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

    public function deactivate(){
        $this->status = ApplicationStatus::Inactive;
        $this->save();
    }
}
