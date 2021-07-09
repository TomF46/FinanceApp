<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Year;

class YearsTest extends TestCase
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

    public function testCanAddYear()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/years',
            [
                'year' => 2021,
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetYears()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->token
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
            'Authorization' => 'Bearer ' . $this->token
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
            'Authorization' => 'Bearer ' . $this->token
        ])->postJson(
            '/api/years',
            [
                'year' => null
            ]
        );

        $response->assertStatus(422);
    }
}
