<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use Tests\Helpers\TestHelper;

class RetailManagerTest extends TestCase
{
    use RefreshDatabase;
    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = User::factory()->create([
            'role' => Roles::Administrator
        ]);
    }

    public function testCanRegisterRetailManager()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/retailer/register',
            [
                'firstName' => 'User',
                'lastName' => 'RetailManager',
                'email' => 'retailmanager@email.com',
                'password' => '133ksdpa',
                'password_confirmation' => '133ksdpa',
            ]
        );

        $response->assertStatus(201);
    }

    public function testCanGetRetailManagers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/retailManagers');

        $response->assertOk();
    }

    public function testCanGetRetailManager()
    {
        $manager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/retailManagers/' . $manager->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $manager->id
        ]);
    }
}
