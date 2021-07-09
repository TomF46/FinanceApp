<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Product;

class ProductsTest extends TestCase
{
    use RefreshDatabase;
    public $user;
    public $token;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = User::factory()->create([
            'role' => Roles::Administrator
        ]);
        $pat = $this->user->createToken('Personal Access Token');
        $this->token = $pat->accessToken;
    }

    public function testCanAddProduct()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/products',
            [
                'name' => 'Phone',
                'productCode' => 'XLM203',
                'cost' => 299.99,
                'price' => 499.99
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetProducts()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/products');

        $response->assertOk();
    }

    public function testCanFilterProducts()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/products/search',
            [
                'name' => 'Phone',
                'productCode' => 'XLM',
            ]
        );

        $response->assertOk();
    }

    public function testCanUpdateProduct()
    {
        $product = Product::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->putJson(
            '/api/products/' . $product->id,
            [
                'name' => 'Console',
                'productCode' => 'PSL202',
                'cost' => 200,
                'price' => 400
            ]
        );
        $response->assertOk();
        $response->assertJson([
            'name' => 'Console',
            'productCode' => 'PSL202',
            'cost' => 200,
            'price' => 400
        ]);
    }

    public function testCanGetProduct()
    {
        $product = Product::factory()->create([
            'name' => "Watch"
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/products/' . $product->id);

        $response->assertOk();
        $response->assertJson([
            'name' => 'Watch',
        ]);
    }

    public function testCanDeactivateProduct()
    {
        $product = Product::factory()->create([
            'name' => "Watch"
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->post('/api/products/' . $product->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidProduct()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/products',
            [
                'name' => null,
                'productCode' => 'XLM203',
                'cost' => 299.99,
                'price' => 499.99
            ]
        );

        $response->assertStatus(422);
    }
}
