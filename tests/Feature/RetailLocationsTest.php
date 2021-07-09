<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\RetailLocation;
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
        $this->user = User::factory()->create([
            'role' => Roles::Administrator
        ]);
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

    public function testCanGetRetailLocations()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/retailLocations');
        $response->assertOk();
    }

    public function testCanGetRetailLocation()
    {
        $retailLocation = RetailLocation::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/retailLocations/' . $retailLocation->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $retailLocation->id
        ]);
    }

    public function testCanFilterRetailLocations()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/retailLocations/search',
            [
                'name' => 'Testing shop',
                'location' => 'Counticester'
            ]
        );

        $response->assertOk();
    }

    public function testCanUpdateRetailLocation()
    {
        $retailLocation = RetailLocation::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->putJson(
            '/api/retailLocations/' . $retailLocation->id,
            [
                'name' => 'Test shop',
                'location' => "Test town",
                'area_id' => $retailLocation->area->id
            ]
        );
        $response->assertOk();
        $response->assertJson([
            'name' => 'Test shop',
            'location' => "Test town",
            'area_id' => $retailLocation->area->id
        ]);
    }

    public function testCanDeactivateRetailLocation()
    {
        $retailLocation = RetailLocation::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->post('/api/retailLocations/' . $retailLocation->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidRetailLocation()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/retailLocations',
            [
                'name' => null,
                'location' => null,
                'area_id' => null
            ]
        );
        $response->assertStatus(422);
    }
}
