<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\RetailLocation;
use App\Enums\ApplicationStatus;
use App\Helpers\NumberHelper;

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

    protected function getAcceptedApplications()
    {
        return $this->applications()->where('status', ApplicationStatus::Accepted)->get();
    }

    protected function getTotalNonOperatingIncome()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalNonOperatingIncome();
        };
        return $total;
    }

    protected function getTotalExpenses()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalExpenses();
        };
        return $total;
    }

    protected function getTotalSalesIncome()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalSalesIncome();
        };
        return $total;   
    }

    protected function getTotalIncome()
    {
        return $this->getTotalNonOperatingIncome() + $this->getTotalSalesIncome();
    }

    protected function getTotalProfitLoss()
    {
        return $this->getTotalIncome() - $this->getTotalExpenses();
    }

    protected function getTotalInvestmentFromNOI()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->fromNOI;
        };
        return $total;
    }

    protected function getTotalInvestmentFromSales()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->fromSales;
        };
        return $total;
    }

    protected function getTotalInvestmentFromNetProfit()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->fromNetProfit;
        };
        return $total;
    }

    protected function getTotalInvestment()
    {
        $applications = $this->getAcceptedApplications();
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->getTotalInvestment();
        };
        return $total;
    }

    protected function getTotalProfitDataPoints(){
        $applications = $this->getAcceptedApplications();
        return $applications->map(function ($application) {
            return [
                'title' => $application->retailLocation->name,
                'Total Profit' => $application->getTotalNetProfit()
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
            'retailDataSummary' => [
                'totalNOIncome' => NumberHelper::asMoney($this->getTotalNonOperatingIncome()),
                'totalSalesIncome' => NumberHelper::asMoney($this->getTotalSalesIncome()),
                'totalIncome' => NumberHelper::asMoney($this->getTotalIncome()),
                'totalExpenses' => NumberHelper::asMoney($this->getTotalExpenses()),
                'totalProfitLoss' =>  NumberHelper::asMoney($this->getTotalProfitLoss()),
            ],
            'investmentSummary' => [
                'totalFromNOI' => NumberHelper::asMoney($this->getTotalInvestmentFromNOI()),
                'totalFromSales' => NumberHelper::asMoney($this->getTotalInvestmentFromSales()),
                'totalFromNetProfit' => NumberHelper::asMoney($this->getTotalInvestmentFromNetProfit()),
                'total' => NumberHelper::asMoney($this->getTotalInvestment())
            ]
        ];
    }

    public function mapRetailBarChart()
    {
        return [
            'dataPoints' => $this->getTotalProfitDataPoints(),
            'keys' => [
                ['key' => "Total Profit", 'color' => "#0096b4"]
            ]
            ];
    }

    public function mapProfitPieChart()
    {
        return [
            'total' => NumberHelper::asMoney($this->getTotalProfitLoss()),
            'data' => $this->getTotalProfitDataPoints(),
            'dataKey' => 'Total Profit',
            'nameKey' => 'title'
        ];
    }


}
