<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Area;

class AreasTest extends TestCase
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

    public function testCanAddArea()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
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
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/areas');

        $response->assertOk();
    }

    public function testCanGetArea()
    {
        $area = Area::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
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
            'Authorization' => 'Bearer ' . $this->token
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
            'Authorization' => 'Bearer ' . $this->token
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
            'Authorization' => 'Bearer ' . $this->token
        ])->post('/api/areas/' . $area->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidArea()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/areas',
            [
                'name' => null
            ]
        );
        $response->assertStatus(422);
    }
}
