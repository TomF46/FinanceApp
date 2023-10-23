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
use Tests\Helpers\TestHelper;

class RetailLocationsTest extends TestCase
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

    public function testCanAddRetailLocation()
    {
        $area = Area::factory()->create();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/retailLocations');
        $response->assertOk();
    }

    public function testCanGetRetailLocation()
    {
        $retailLocation = RetailLocation::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/retailLocations/' . $retailLocation->id,
            [
                'name' => 'Test shop',
                'location' => "Test town",
                'areaId' => $retailLocation->area->id
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
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/retailLocations/' . $retailLocation->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidRetailLocation()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
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

    public function testCanAddManagerForArea()
    {
        $area = Area::factory()->create();
        $areaManager = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson('/api/areas/' . $area->id . '/managers', 
        [
            'user_id' => $areaManager->id
        ]);

        $response->assertOk();
        $area = $area->fresh();
        $this->assertEquals(1, Count($area->managers));
    }

    public function testCanRemoveManagerForRetailLocation()
    {
        $retailLocation = RetailLocation::factory()->create();
        $retailManager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson('/api/retailLocations/' . $retailLocation->id . '/managers', 
        [
            'user_id' => $retailManager->id
        ]);

        $response->assertOk();
        $retailLocation = $retailLocation->fresh();
        $this->assertEquals(1, Count($retailLocation->managers));

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/retailLocations/' . $retailLocation->id . '/managers/' . $retailManager->id . '/remove');

        $response->assertOk();
        $retailLocation = $retailLocation->fresh();
        $this->assertEquals(0, Count($retailLocation->managers));
    }
}
