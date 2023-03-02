<?php

namespace App\Models;

use App\Models\Application;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Enums\ApplicationStatus;
use App\Helpers\NumberHelper;
use App\Helpers\ApplicationDataHelper;
use App\Helpers\CSVHelper;

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

    public function mapYearByYearOverviewCSV()
    {
        $years = Year::get();
        $columns = array('Year','Non operating income', 'Sales income', 'Expenses', 'Total profit', 'Total investment');

        $data = function() use($years, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($years as $year) {
                $row['Year'] = $year->year;
                $row['Non operating income']  = NumberHelper::asMoney(ApplicationDataHelper::getTotalNonOperatingIncome($year->getAcceptedApplications()));
                $row['Sales income']    = NumberHelper::asMoney(ApplicationDataHelper::getTotalSalesIncome($year->getAcceptedApplications()));
                $row['Expenses']    = NumberHelper::asMoney(ApplicationDataHelper::getTotalExpenses($year->getAcceptedApplications()));
                $row['Total profit']  = NumberHelper::asMoney(ApplicationDataHelper::getTotalProfitLoss($year->getAcceptedApplications()));
                $row['Total investment']  = NumberHelper::asMoney(ApplicationDataHelper::getTotalInvestment($year->getAcceptedApplications()));

                fputcsv($file, array($row['Year'] ,$row['Non operating income'], $row['Sales income'], $row['Expenses'], $row['Total profit'], $row['Total investment']));
            }

            fclose($file);
        };

        return $data;
    }

    public function mapApplicationsAsCSV()
    {
        $applications = Application::get();
        return CSVHelper::getCSVForApplications($applications);
    }
}
