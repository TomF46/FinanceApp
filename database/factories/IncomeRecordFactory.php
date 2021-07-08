<?php

namespace Database\Factories;

use App\Models\IncomeRecord;
use App\Models\ApplicationRevision;
use Illuminate\Database\Eloquent\Factories\Factory;

class IncomeRecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = IncomeRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'application_revision_id' => ApplicationRevision::factory(),
            'dividends' => $this->faker->randomFloat(2, 0, 100000),
            'assetSales' => $this->faker->randomFloat(2, 0, 100000),
            'maintenanceGrant' => $this->faker->randomFloat(2, 0, 100000),
            'sponsorship' => $this->faker->randomFloat(2, 0, 100000),
            'rewards' => $this->faker->randomFloat(2, 0, 100000)
        ];
    }
}
