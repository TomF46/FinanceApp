<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;

class ProductsTest extends TestCase
{
    use RefreshDatabase;
    public $user;
    public $token;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = User::factory()->create();
        $this->user->role = Roles::Administrator;
        $this->user->save();
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
                'price' => 499.99
            ]
        );

        $response->assertStatus(201);
    }
}