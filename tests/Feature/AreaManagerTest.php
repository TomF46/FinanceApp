<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use Tests\Helpers\TestHelper;

class AreaManagerTest extends TestCase
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

    public function testCanRegisterAreaManager()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/area/register',
            [
                'firstName' => 'User',
                'lastName' => 'AreaManager',
                'email' => 'areamanager@email.com',
                'password' => '1Jr4039dpa',
                'password_confirmation' => '1Jr4039dpa',
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetAreaManagers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/areaManagers');

        $response->assertOk();
    }

    public function testCanGetAreaManager()
    {
        $manager = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/areaManagers/' . $manager->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $manager->id
        ]);
    }
}
