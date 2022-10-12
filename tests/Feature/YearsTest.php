<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Year;
use Tests\Helpers\TestHelper;

class YearsTest extends TestCase
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

    public function testCanAddYear()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/years',
            [
                'year' => 2021,
                'publish' => true
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetYears()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/years');

        $response->assertOk();
    }



    public function testCanGetYear()
    {
        $year = Year::factory()->create([
            'year' => 2021
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/years/' . $year->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $year->id,
        ]);
    }



    public function testCantAddInvalidYear()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/years',
            [
                'year' => null,
                'publish' => true
            ]
        );

        $response->assertStatus(422);
    }
}
