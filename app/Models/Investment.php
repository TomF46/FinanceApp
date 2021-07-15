<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Helpers\NumberHelper;

class Investment extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'application_id',
        'fromNOI',
        'fromSales',
        'fromNetProfit'
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function getTotalInvestment()
    {
        return $this->fromNOI + $this->fromSales + $this->fromNetProfit;
    }

    public function map()
    {
        return [
            'fromNOI' => $this->fromNOI,
            'fromSales' => $this->fromSales,
            'fromNetProfit' => $this->fromNetProfit,
            'total' => NumberHelper::asMoney($this->getTotalInvestment())
        ];
    }

    public function calculateInvestment()
    {
        $this->fromNOI = $this->calculateInvestmentFromNOI();
        $this->fromSales = $this->calculateInvestmentFromSales();
        $this->fromNetProfit = $this->calculateInvestmentFromNetProfit();
        $this->save();
    }

    protected function calculateInvestmentFromNOI()
    {
        $totalIncomeFromNOI = $this->application->getTotalNonOperatingIncome();
        return $totalIncomeFromNOI * 0.2;
    }

    protected function calculateInvestmentFromSales()
    {
        $totalIncomeFromSales = $this->application->getTotalSalesIncome();
        return $totalIncomeFromSales * 0.1;
    }

    protected function calculateInvestmentFromNetProfit()
    {
        $totalNetProfit = $this->application->getTotalNetProfit();
        return $totalNetProfit * 1.35;
    }
}
