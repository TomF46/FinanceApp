<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\RetailLocation;
use App\Models\Area;
use App\Enums\ApplicationStatus;
use App\Helpers\NumberHelper;
use App\Helpers\ApplicationDataHelper;


class Year extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'year'
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function generateApplications(){
        $retailers = RetailLocation::all();

        foreach ($retailers as $retailer) {
            $application = Application::create([
                'year_id' => $this->id,
                'retail_location_id' => $retailer->id
            ]);
        }
    }

    protected function getTotalActiveApplications()
    {
        return $this->applications()->where('status', "!=" , ApplicationStatus::Inactive)->count();
    }

    protected function getTotalNotStartedApplications()
    {
        return $this->applications()->where('status', ApplicationStatus::NotSubmitted)->count();
    }

    protected function getTotalAwaitingSignOffApplications()
    {
        return $this->applications()->where('status', ApplicationStatus::Submitted)->count();
    }

    protected function getTotalReturnedApplications()
    {
        return $this->applications()->where('status', ApplicationStatus::Returned)->count();
    }

    protected function getTotalAcceptedApplications()
    {
        return $this->applications()->where('status', ApplicationStatus::Accepted)->count();
    }

    public function getAcceptedApplications()
    {
        return $this->applications()->where('status', ApplicationStatus::Accepted)->get();
    }

    protected function getRetailTotalProfitDataPoints($applications){
        return $applications->map(function ($application) {
            return [
                'title' => $application->retailLocation->name,
                'Total Profit' => $application->getTotalNetProfit()
            ];
        });
    }

    protected function getAreasTotalProfitDataPoints(){
        $areas = Area::get();
        return $areas->map(function ($area) {
            return [
                'title' => $area->name,
                'Total Profit' => $area->getTotalProfitForYear($this)
            ];
        });
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'totalApplications' => $this->getTotalActiveApplications(),
            'totalNotStarted' => $this->getTotalNotStartedApplications(),
            'totalAwaitingSignOff' => $this->getTotalAwaitingSignOffApplications(),
            'totalReturned' => $this->getTotalReturnedApplications(),
            'totalAccepted' => $this->getTotalAcceptedApplications()
        ];
    }

    public function mapDetail()
    {
        $applications = $this->getAcceptedApplications();
        return [
            'id' => $this->id,
            'year' => $this->year,
            'totalApplications' => $this->getTotalActiveApplications(),
            'applicationStatusSummary' => [
                'totalNotStarted' => $this->getTotalNotStartedApplications(),
                'totalAwaitingSignOff' => $this->getTotalAwaitingSignOffApplications(),
                'totalReturned' => $this->getTotalReturnedApplications(),
                'totalAccepted' => $this->getTotalAcceptedApplications(),
            ],
            'retailDataSummary' => ApplicationDataHelper::mapRetailDataSummary($applications),
            'investmentSummary' => ApplicationDataHelper::mapInvestmentSummary($applications)
        ];
    }

    public function mapRetailBarChart()
    {
        $applications = $this->getAcceptedApplications();
        return [
            'dataPoints' => $this->getRetailTotalProfitDataPoints($applications),
            'keys' => [
                ['key' => "Total Profit", 'color' => "#0096b4"]
            ]
            ];
    }

    public function mapAreasBarChart()
    {
        return [
            'dataPoints' => $this->getAreasTotalProfitDataPoints(),
            'keys' => [
                ['key' => "Total Profit", 'color' => "#0096b4"]
            ]
        ];
    }

    public function mapProfitPieChart()
    {
        $applications = $this->getAcceptedApplications();
        return [
            'total' => NumberHelper::asMoney(ApplicationDataHelper::getTotalProfitLoss($applications)),
            'data' => $this->getRetailTotalProfitDataPoints($applications),
            'dataKey' => 'Total Profit',
            'nameKey' => 'title'
        ];
    }


}
