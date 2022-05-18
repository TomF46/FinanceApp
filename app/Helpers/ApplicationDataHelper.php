<?php

namespace App\Helpers;

use App\Helpers\NumberHelper;

class ApplicationDataHelper
{
    // All take a collection of applications and return a number;

    public static function getTotalNonOperatingIncome($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalNonOperatingIncome();
        };
        return $total;
    }

    public static function getTotalExpenses($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalExpenses();
        };
        return $total;
    }

    public static function getTotalSalesIncome($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->getTotalSalesIncome();
        };
        return $total;   
    }

    public static function getTotalInvestmentFromNOI($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->fromNOI;
        };
        return $total;
    }

    public static function getTotalInvestmentFromSales($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->fromSales;
        };
        return $total;
    }

    public static function getTotalInvestmentFromNetProfit($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->fromNetProfit;
        };
        return $total;
    }

    public static function getTotalInvestment($applications)
    {
        $total = 0;
        foreach ($applications as $application) {
            $total = $total + $application->investment->getTotalInvestment();
        };
        return $total;
    }

    public static function getTotalIncome($applications)
    {
        return self::getTotalNonOperatingIncome($applications) + self::getTotalSalesIncome($applications);
    }

    public static function getTotalProfitLoss($applications)
    {
        return self::getTotalIncome($applications) - self::getTotalExpenses($applications);
    }

    public static function mapRetailDataSummary($applications)
    {
        return [
            'totalNOIncome' => NumberHelper::asMoney(self::getTotalNonOperatingIncome($applications)),
            'totalSalesIncome' => NumberHelper::asMoney(self::getTotalSalesIncome($applications)),
            'totalIncome' => NumberHelper::asMoney(self::getTotalIncome($applications)),
            'totalExpenses' => NumberHelper::asMoney(self::getTotalExpenses($applications)),
            'totalProfitLoss' =>  NumberHelper::asMoney(self::getTotalProfitLoss($applications)),
        ];
    }

    public static function mapInvestmentSummary($applications)
    {
        return [
            'totalFromNOI' => NumberHelper::asMoney(self::getTotalInvestmentFromNOI($applications)),
            'totalFromSales' => NumberHelper::asMoney(self::getTotalInvestmentFromSales($applications)),
            'totalFromNetProfit' => NumberHelper::asMoney(self::getTotalInvestmentFromNetProfit($applications)),
            'total' => NumberHelper::asMoney(self::getTotalInvestment($applications))
        ];
    }

}