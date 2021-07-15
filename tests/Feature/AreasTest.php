<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Area;
use Tests\Helpers\TestHelper;

class AreasTest extends TestCase
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

    public function testCanAddArea()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/areas',
            [
                'name' => 'countyshire'
            ]
        );
        $response->assertCreated();
    }

    public function testCanGetAreas()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/areas');

        $response->assertOk();
    }

    public function testCanGetArea()
    {
        $area = Area::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/areas/' . $area->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $area->id
        ]);
    }

    public function testCanFilterAreas()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/areas/search',
            [
                'name' => 'Countyshire',
            ]
        );

        $response->assertOk();
    }

    public function testCanUpdateArea()
    {
        $area = Area::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/areas/' . $area->id,
            [
                'name' => 'Countryshire',
            ]
        );
        $response->assertOk();
        $response->assertJson([
            'name' => 'Countryshire',
        ]);
    }

    public function testCanDeactivateArea()
    {
        $area = Area::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/areas/' . $area->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidArea()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/areas',
            [
                'name' => null
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

    public function testCanRemoveManagerForArea()
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

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/areas/' . $area->id . '/managers/' . $areaManager->id . '/remove');

        $response->assertOk();
        $area = $area->fresh();
        $this->assertEquals(0, Count($area->managers));
    }
}
