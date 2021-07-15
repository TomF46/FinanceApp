<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use Tests\Helpers\TestHelper;

class MeTest extends TestCase
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

    public function testCanGetCurrentUserIsAdminWhenTrue()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager)
        ])->get('/api/me/isAdmin');

        $response->assertOk();
        $response->assertJson([
            'isAdmin' => false
        ]);
    }

    
}
