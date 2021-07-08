<?php

namespace Database\Factories;

use App\Models\RetailLocation;
use App\Models\Area;
use Illuminate\Database\Eloquent\Factories\Factory;

class RetailLocationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RetailLocation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->company(),
            'location' => $this->faker->unique()->city(),
            'area_id' => Area::factory()
        ];
    }
}
