<?php

namespace App\Helpers;

use App\Helpers\NumberHelper;

class CSVHelper
{
    public static function getCSVForApplications($applications)
    {
        $columns = array('Location','Area', 'Year','Dividends', 'Asset sales', 'Maintenance grant', 'Sponsorship', 'Rewards',
        'Rent cost', 'Payroll cost', 'Utilities cost', 'Equipment cost', 'Travel cost', 'Training cost', 'Maintenance cost', 'Employee bonus cost', 'Employee expenses cost',
        'Non operating income', 'Sales income', 'Expenses', 'Total profit', 'Total investment'
    );

        $data = function() use($applications, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($applications as $application) {
                $row['Location'] = $application->retailLocation->name;
                $row['Area'] = $application->retailLocation->area->name;
                $row['Year'] = $application->year->year;
                $row['Dividends']  = NumberHelper::AsMoneyText($application->latestRevision()->incomeRecord->dividends);
                $row['Asset sales']    = NumberHelper::AsMoneyText($application->latestRevision()->incomeRecord->assetSales);
                $row['Maintenance grant']    = NumberHelper::AsMoneyText($application->latestRevision()->incomeRecord->maintenanceGrant);
                $row['Sponsorship']  = NumberHelper::AsMoneyText($application->latestRevision()->incomeRecord->sponsorship);
                $row['Rewards']  = NumberHelper::AsMoneyText($application->latestRevision()->incomeRecord->rewards);
                $row['Rent cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->rent);
                $row['Payroll cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->payroll);
                $row['Utilities cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->utilities);
                $row['Equipment cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->equipment);
                $row['Travel cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->travel);
                $row['Training cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->training);
                $row['Maintenance cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->maintenance);
                $row['Employee bonus cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->employeeBonus);
                $row['Employee expenses cost']  = NumberHelper::AsMoneyText($application->latestRevision()->expensesRecord->employeeExpenses);
                $row['Non operating income']  = NumberHelper::AsMoneyText($application->getTotalNonOperatingIncome());
                $row['Sales income']    = NumberHelper::AsMoneyText($application->getTotalSalesIncome());
                $row['Expenses']    = NumberHelper::AsMoneyText($application->getTotalExpenses());
                $row['Total profit']  = NumberHelper::AsMoneyText($application->getTotalNetProfit());
                $row['Total investment']  = NumberHelper::AsMoneyText($application->investment->getTotalInvestment());


                fputcsv($file, array($row['Location'], $row['Area'] ,$row['Year'] ,$row['Dividends'], $row['Asset sales'], $row['Maintenance grant'], $row['Sponsorship'], $row['Rewards'],
                $row['Rent cost'], $row['Payroll cost'], $row['Utilities cost'], $row['Equipment cost'], $row['Travel cost'], $row['Training cost'], $row['Maintenance cost'], $row['Employee bonus cost'], $row['Employee expenses cost'],
                $row['Non operating income'], $row['Sales income'], $row['Expenses'], $row['Total profit'], $row['Total investment']
            ));
            }

            fclose($file);
        };

        return $data;
    }

}