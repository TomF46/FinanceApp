<?php

namespace Database\Factories;

use App\Models\Investment;
use App\Models\Application;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvestmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Investment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'application_id' => Application::factory(),
            'fromNOI' => $this->faker->randomFloat(2, 0, 100000),
            'fromSales' => $this->faker->randomFloat(2, 0, 100000),
            'fromNetProfit' => $this->faker->randomFloat(2, 0, 100000)
        ];
    }
}
