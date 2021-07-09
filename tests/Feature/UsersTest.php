<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;

class UsersTest extends TestCase
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

    public function testCanGetUsers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/users');

        $response->assertOk();
    }

    public function testCanGetUser()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/users/' . $user->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $user->id,
        ]);
    }

    public function testCanUpdateUser()
    {
        $user = User::factory()->create([
            'firstName' => 'Dave',
            'lastName' => 'Smith'
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->putJson(
            '/api/users/' . $user->id,
            [
                'firstName' => 'Alan',
                'lastName' => 'Davies'
            ]
        );
        $response->assertOk();
        $response->assertJson([
            'firstName' => 'Alan',
            'lastName' => 'Davies'
        ]);
    }

    public function testCanDeactivateArea()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->post('/api/users/' . $user->id . '/deactivate');

        $response->assertNoContent();
    }
}
