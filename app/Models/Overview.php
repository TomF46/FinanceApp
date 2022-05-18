<?php

namespace App\Models;

use App\Models\Application;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Enums\ApplicationStatus;
use App\Helpers\NumberHelper;
use App\Helpers\ApplicationDataHelper;

class Overview
{
    protected function getAcceptedApplications()
    {
        return Application::where('status', ApplicationStatus::Accepted)->get();
    }

    public function map()
    {
        $applications = $this->getAcceptedApplications();
        return [
            'hasAcceptedApplications' => Count($applications) > 0, 
            'retailDataSummary' => ApplicationDataHelper::mapRetailDataSummary($applications),
            'investmentSummary' => ApplicationDataHelper::mapInvestmentSummary($applications)
        ];
    }

    protected function getTotalProfitDataPoints(){
        $years = Year::get();
        return $years->map(function ($year) {
            return [
                'title' => $year->year,
                'Total Profit' => NumberHelper::asMoney(ApplicationDataHelper::getTotalProfitLoss($year->getAcceptedApplications()))
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
