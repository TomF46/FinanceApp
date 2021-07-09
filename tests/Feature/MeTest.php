<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;

class MeTest extends TestCase
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

    public function testCanGetCurrentUserIsAdminWhenTrue()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/me/isAdmin');

        $response->assertOk();
        $response->assertJson([
            'isAdmin' => true
        ]);
    }

    public function testCanGetCurrentUserIsAdminWhenFalse()
    {
        $manager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);
        $managerPAT = $manager->createToken('Personal Access Token');
        $managerToken = $managerPAT->accessToken;

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $managerToken
        ])->get('/api/me/isAdmin');

        $response->assertOk();
        $response->assertJson([
            'isAdmin' => false
        ]);
    }

    
}
