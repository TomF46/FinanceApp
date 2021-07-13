<?php

namespace Tests\Unit;

use App\Models\ExpensesRecord;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ExpensesRecordTest extends TestCase
{
    use RefreshDatabase;

    public function testCanCalculateTotalExpenses(){
        $rent = 10000;
        $payroll = 500000;
        $utilities = 6000;
        $equipment= 10500;
        $travel = 5000;
        $training = 15000;
        $maintenance = 4000;
        $employeeBonus = 10000;
        $employeeExpenses = 5000;


        $expenses = ExpensesRecord::factory()->create([
            'rent' => $rent,
            'payroll' => $payroll,
            'utilities' => $utilities,
            'equipment' => $equipment,
            'travel' => $travel,
            'training' => $training,
            'maintenance' => $maintenance,
            'employeeBonus' => $employeeBonus,
            'employeeExpenses' => $employeeExpenses,
        ]);

        $expectedExpenses = $rent + $payroll + $utilities + $equipment + $travel + $training + $maintenance + $employeeBonus + $employeeExpenses;

        $this->assertEquals($expectedExpenses, $expenses->getTotalExpenses());
    }

}
