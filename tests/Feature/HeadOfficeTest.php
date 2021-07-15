<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use Tests\Helpers\TestHelper;

class HeadOfficeTest extends TestCase
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

    public function testCanRegisterHeadOffice()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/headoffice/register',
            [
                'firstName' => 'User',
                'lastName' => 'HeadOfficer',
                'email' => 'headoffice@email.com',
                'password' => 'fqwhfwjflf102',
                'password_confirmation' => 'fqwhfwjflf102',
            ]
        );

        $response->assertStatus(201);
    }
}
