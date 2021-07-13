<?php

namespace Tests\Unit;

use App\Models\Investment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class InvestmentTest extends TestCase
{
    use RefreshDatabase;

    public function testCanCalculateTotalInvestment(){
        $investment = Investment::factory()->create([
           'fromNOI' => 40000,
           'fromSales' => 100000,
           'fromNetProfit' => 24000
        ]);

        $expectedInvestment = 40000 + 100000 + 24000;

        $this->assertEquals($expectedInvestment, $investment->getTotalInvestment());
    }

}
