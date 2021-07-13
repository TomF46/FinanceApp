<?php

namespace Tests\Unit;

use App\Models\IncomeRecord;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class IncomeRecordTest extends TestCase
{
    use RefreshDatabase;

    public function testCanCalculateTotalIncome(){
        $dividends = 1000;
        $assetSales = 3000.50;
        $maintenanceGrant = 4000;
        $sponsorship = 5000;
        $rewards = 500;

        $income = IncomeRecord::factory()->create([
            'dividends' => $dividends,
            'assetSales' => $assetSales,
            'maintenanceGrant' => $maintenanceGrant,
            'sponsorship' => $sponsorship,
            'rewards' => $rewards
        ]);

        $expectedIncome = $dividends + $assetSales + $maintenanceGrant + $sponsorship + $rewards;

        $this->assertEquals($expectedIncome, $income->getTotalIncome());
    }

}
