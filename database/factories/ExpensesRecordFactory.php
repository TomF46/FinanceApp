<?php

namespace Database\Factories;

use App\Models\ExpensesRecord;
use App\Models\ApplicationRevision;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpensesRecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ExpensesRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'application_revision_id' => ApplicationRevision::factory(),
            'rent' => $this->faker->randomFloat(2, 0, 100000),
            'payroll' => $this->faker->randomFloat(2, 0, 100000),
            'utilities' => $this->faker->randomFloat(2, 0, 100000),
            'equipment' => $this->faker->randomFloat(2, 0, 100000),
            'travel' => $this->faker->randomFloat(2, 0, 100000),
            'training' => $this->faker->randomFloat(2, 0, 100000),
            'maintenance' => $this->faker->randomFloat(2, 0, 100000),
            'employeeBonus' => $this->faker->randomFloat(2, 0, 100000),
            'employeeExpenses' => $this->faker->randomFloat(2, 0, 100000),

        ];
    }
}
