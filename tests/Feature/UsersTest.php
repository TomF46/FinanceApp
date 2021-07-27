<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use Tests\Helpers\TestHelper;

class UsersTest extends TestCase
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

    public function testCanGetUsers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/users');

        $response->assertOk();
    }

    public function testCanGetUser()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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

    public function testCanDeactivateUser()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/users/' . $user->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testAdminCanChangeAnotherUsersPassword()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJSON('/api/users/' . $user->id . '/changePassword', [
            'password' => 'xjyM237',
            'password_confirmation' => 'xjyM237'
        ]);

        $response->assertOk();
    }

    public function testNonAdminCantChangeAnotherUsersPassword()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($user2)
        ])->postJSON('/api/users/' . $user->id . '/changePassword', [
            'password' => 'xjyM237',
            'password_confirmation' => 'xjyM237'
        ]);

        $response->assertForbidden();
    }
}
