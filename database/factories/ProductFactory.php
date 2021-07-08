<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'productCode' => $this->faker->unique()->isbn10(),
            'cost' => $this->faker->numberBetween(1,100),
            'price' => $this->faker->numberBetween(101,1000)
        ];
    }
}
