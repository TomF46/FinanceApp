<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\Product;
use App\Models\ApplicationRevision;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sale::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $product = Product::factory()->create();
        $quantity = $this->faker->numberBetween(0,10000);

        return [
            'application_revision_id' => ApplicationRevision::factory(),
            'product_id' => $product->id,
            'quantity' => $quantity,
            'income' => $quantity * $product->getTotalProfit()
        ];
    }
}
