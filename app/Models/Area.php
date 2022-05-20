<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RetailLocation;
use App\Models\User;
use App\Models\Application;
use App\Models\Year;
use App\Enums\ApplicationStatus;
use App\Helpers\ApplicationDataHelper;


class Area extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name'
    ];

    public function retailLocations()
    {
        return $this->hasMany(RetailLocation::class);
    }

    public function managers()
    {
        return $this->belongsToMany(User::class, 'manager_area');
    }

    protected function mapLocations()
    {
        return $this->retailLocations->where('active', true)->map(function ($location) {
            return $location->map();
        });
    }

    protected function mapManagers()
    {
        return $this->managers->where('active', true)->map(function ($manager) {
            return $manager->map();
        });
    }

    protected function mapApplications()
    {
        $locationIds = $this->retailLocations->pluck('id');
        return Application::whereIn('retail_location_id', $locationIds)->get()->map(function ($application) {
            return $application->map();
        });
    }

    protected function getAcceptedApplications()
    {
        $locationIds = $this->retailLocations->pluck('id');
        return Application::whereIn('retail_location_id', $locationIds)->where('status', ApplicationStatus::Accepted)->get();
    }

    protected function getAreaManagerRequiredActionCount()
    {
        $locationIds = $this->retailLocations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $locationIds)->get();
        $count = Count($applications->where('status', ApplicationStatus::Submitted));
        return $count;
    }

    protected function getRetailManagerRequiredActionCount()
    {
        $locationIds = $this->retailLocations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $locationIds)
            ->where('status', ApplicationStatus::NotSubmitted)
            ->orWhere('status', ApplicationStatus::Returned)->get();
        $count = Count($applications);
        return $count;
    }

    public function getTotalProfitForYear(Year $year)
    {
        $locationIds = $this->retailLocations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $locationIds)
            ->where('year_id', $year->id)
            ->where('status', ApplicationStatus::Accepted)
            ->get();

        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalNetProfit();
        };
        return $total;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'locationCount' => Count($this->retailLocations),
            'areaManagerActionsRequired' => $this->getAreaManagerRequiredActionCount(),
            'retailManagerActionsRequired' => $this->getRetailManagerRequiredActionCount()
        ];
    }

    public function mapDetail()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'locationCount' => Count($this->retailLocations),
            'locations' => $this->mapLocations(),
            'managers' => $this->mapManagers(),
            'applications' => $this->mapApplications(),
            'areaManagerActionsRequired' => $this->getAreaManagerRequiredActionCount(),
            'retailManagerActionsRequired' => $this->getRetailManagerRequiredActionCount()
        ];
    }

    public function mapData()
    {
        $applications = $this->getAcceptedApplications();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'hasAcceptedApplications' => Count($applications) > 0, 
            'retailDataSummary' => ApplicationDataHelper::mapRetailDataSummary($applications),
            'investmentSummary' => ApplicationDataHelper::mapInvestmentSummary($applications)
        ];
    }

    public function deactivate(){
        $this->active = false;
        $this->save();
        $this->deactivateLocations();
    }

    protected function deactivateLocations()
    {
        foreach ($this->retailLocations as $location) {
            $location->deactivate();
        }
    }

    public function mapYearByYearProfitBarChart()
    {
        $years = Year::get();
        $data = $years->map(function ($year) {
            return [
                'title' => $year->year,
                'Total Profit' => $this->getTotalProfitForYear($year)
            ];
        });

        return [
            'dataPoints' => $data,
            'keys' => [
                ['key' => "Total Profit", 'color' => "#0096b4"]
            ]
        ];
    }

    public function mapRetailerProfitContributionBarChart()
    {
        $data = $this->retailLocations->map(function ($location) {
            return [
                'title' => $location->name,
                'Total Profit' => ApplicationDataHelper::getTotalProfitLoss($location->getAcceptedApplications())
            ];
        });

        return [
            'dataPoints' => $data,
            'keys' => [
                ['key' => "Total Profit", 'color' => "#0096b4"]
            ]
        ];
    }
}
