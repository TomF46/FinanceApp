<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;


class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');

        $this->postJson(
            '/api/auth/register',
            [
                'firstName' => 'Test',
                'lastName' => 'User',
                'email' => 'test@email.com',
                'password' => 'Password1',
                'password_confirmation' => 'Password1',
            ]
        );
    }

    public function testCanRegister()
    {
        $response = $this->postJson(
            '/api/auth/register',
            [
                'firstName' => 'Test',
                'lastName' => 'User2',
                'email' => 'test2@email.com',
                'password' => 'Password2',
                'password_confirmation' => 'Password2',
            ]
        );

        $response->assertStatus(201);
    }

    public function testCantRegisterWithInvalidDetails()
    {
        $response = $this->postJson(
            '/api/auth/register',
            [
                'firstName' => 'Test',
                'lastName' => 'User2',
                'email' => 'test2@email.com',
                'password' => 'Password2',
                'password_confirmation' => 'Password4',
            ]
        );

        $response->assertStatus(422);
    }

    public function testCanLogin()
    {
        $response = $this->postJson(
            '/api/auth/login',
            [
                'email' => 'test@email.com',
                'password' => 'Password1',
                'remember_me' => true
            ]
        );

        $response->assertStatus(200);
    }

    public function testCantLoginWithNonExistantUse()
    {
        $response = $this->postJson(
            '/api/auth/login',
            [
                'email' => 'fakeUser@email.com',
                'password' => 'Password1',
                'remember_me' => true
            ]
        );

        $response->assertStatus(401);
    }

    public function testCantLoginWithWrongPassword()
    {
        $response = $this->postJson(
            '/api/auth/login',
            [
                'email' => 'test@email.com',
                'password' => 'wrongPass',
                'remember_me' => true
            ]
        );

        $response->assertStatus(401);
    }

    public function testCanChangePassword()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getBearerTokenForUser($user)
        ])->postJson('/api/auth/changePassword',[
            'currentPassword' => env('TESTING_PASSWORD'),
            'password' => 'xjyM237',
            'password_confirmation' => 'xjyM237',
        ]);

        $response->assertOk();

        $response2 = $this->postJson(
            '/api/auth/login',
            [
                'email' => $user->email,
                'password' => 'xjyM237',
                'remember_me' => true
            ]
        );
        
        $response2->assertOk();
    }

    protected function getBearerTokenForUser($user)
    {
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }
}
