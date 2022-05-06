<?php

namespace App\Models;

use App\Models\Application;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Enums\ApplicationStatus;
use App\Helpers\NumberHelper;

class Overview
{
    protected function getAcceptedApplications()
    {
        return Application::where('status', ApplicationStatus::Accepted)->get();
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

    public function map()
    {
        return [
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

    protected function getTotalProfitDataPoints(){
        $years = Year::get();
        return $years->map(function ($year) {
            return [
                'title' => $year->year,
                'Total Profit' => NumberHelper::asMoney($year->getTotalProfitLoss())
            ];
        });
    }

    public function mapYearByYearProfitBarChart()
    {
        return [
            'dataPoints' => $this->getTotalProfitDataPoints(),
            'keys' => [
                ['key' => "Total Profit", 'color' => "#0096b4"]
            ]
        ];
    }


}
