<?php

namespace Tests\Unit;

use App\Models\Product;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ProducTest extends TestCase
{
    use RefreshDatabase;

    public function testCanDeactivateProduct(){
        $product = Product::factory()->create();
        $this->assertTrue($product->active);
        $product->deactivate();
        $this->assertFalse($product->active);
    }

    public function testCanCalculateTotalProfitPerSale(){
        $cost = 100;
        $price = 300;
        // Total Profit = (300 - 100) = 200

        $product = Product::factory()->create([
            'cost' => $cost,
            'price' => $price
        ]);

        $this->assertEquals(200, $product->getTotalProfit());
    }
}
