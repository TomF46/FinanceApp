<?php

namespace Tests\Unit;

use App\Models\Product;
use App\Models\Sale;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ProductTest extends TestCase
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

    public function testCanGetSalesDataForProduct(){
        $product = Product::factory()->create();

        Sale::factory()->create(['product_id' => $product->id]);
        Sale::factory()->create(['product_id' => $product->id]);

        $this->assertEquals(2, Count($product->sales));
        
    }
}
