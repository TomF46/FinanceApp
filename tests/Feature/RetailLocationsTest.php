<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Area;

class RetailLocationsTest extends TestCase
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

    public function testCanAddRetailLocation()
    {
        $area = Area::factory()->create();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/retailLocations',
            [
                'name' => 'branch',
                'location' => 'towncester',
                'area_id' => $area->id
            ]
        );

        $response->assertStatus(201);
    }
}
