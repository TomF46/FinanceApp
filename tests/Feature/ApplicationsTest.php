<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Enums\ApplicationStatus;
use App\Enums\ApplicationPriority;
use App\Models\User;
use App\Models\Application;
use App\Models\Year;
use App\Models\Area;
use App\Models\RetailLocation;
use Tests\Helpers\TestHelper;

class ApplicationsTest extends TestCase
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

    public function testCanGetApplication()
    {
        $application = Application::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/applications/' . $application->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $application->id
        ]);
    }

    public function testCanSearchApplicationsNoFilters()
    {
        $headOffice = User::factory()->create([
            'role' => Roles::HeadOffice
        ]);
        $applications = Application::factory()->count(20)->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($headOffice)
        ])->postJson(
            '/api/applications',
            [
                'year' => null,
                'area' => null,
                'status' => null,
                'priority' => null
            ]
        );

        $response->assertOk();
        $response->assertJson([
            'total' => Count($applications),
        ]);
    }

    public function testCanSearchApplicationsWithYearFilter()
    {
        $headOffice = User::factory()->create([
            'role' => Roles::HeadOffice
        ]);
        $year1 = Year::factory()->create();
        $year2 = Year::factory()->create();


        $applications1 = Application::factory()->count(20)->create([
            'year_id' => $year1->id
        ]);

        $applications2 = Application::factory()->count(10)->create([
            'year_id' => $year2->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($headOffice)
        ])->postJson(
            '/api/applications',
            [
                'year' => $year2->id,
                'area' => null,
                'status' => null,
                'priority' => null
            ]
        );

        $response->assertOk();
        $response->assertJson([
            'total' => Count($applications2),
        ]);
    }

    public function testCanSearchApplicationsWithStatus()
    {
        $headOffice = User::factory()->create([
            'role' => Roles::HeadOffice
        ]);

        $applications1 = Application::factory()->count(10)->create(['status' => ApplicationStatus::NotSubmitted]);
        $applications2 = Application::factory()->count(7)->create(['status' => ApplicationStatus::Accepted]);

        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($headOffice)
        ])->postJson(
            '/api/applications',
            [
                'year' => null,
                'area' => null,
                'status' => ApplicationStatus::Accepted,
                'priority' => null
            ]
        );

        $response->assertOk();
        $response->assertJson([
            'total' => Count($applications2),
        ]);
    }

    public function testCanSearchApplicationsWithPriority()
    {
        $headOffice = User::factory()->create([
            'role' => Roles::HeadOffice
        ]);

        $applications1 = Application::factory()->count(8)->create(['priority' => ApplicationPriority::Severe]);
        $applications2 = Application::factory()->count(4)->create(['priority' => ApplicationPriority::Low]);

        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($headOffice)
        ])->postJson(
            '/api/applications',
            [
                'year' => null,
                'area' => null,
                'status' => null,
                'priority' => ApplicationPriority::Low
            ]
        );

        $response->assertOk();
        $response->assertJson([
            'total' => Count($applications2),
        ]);
    }

    public function testCanSearchApplicationsWithMultipleFilters()
    {
        $headOffice = User::factory()->create([
            'role' => Roles::HeadOffice
        ]);

        $applications1 = Application::factory()->count(20)->create();

        $year = Year::factory()->create();

        $applications2 = Application::factory()->count(2)->create([
            'year_id' => $year->id,
            'status' => ApplicationStatus::Accepted,
            'priority' => ApplicationPriority::Low
        ]);

        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($headOffice)
        ])->postJson(
            '/api/applications',
            [
                'year_id' => $year->id,
                'area' => null,
                'status' => ApplicationStatus::Accepted,
                'priority' => ApplicationPriority::Low
            ]
        );

        $response->assertOk();
        $response->assertJson([
            'total' => Count($applications2),
        ]);
    }

    public function testCanSearchApplicationsWithArea()
    {
        $headOffice = User::factory()->create([
            'role' => Roles::HeadOffice
        ]);

        $area = Area::factory()->create();
        $area2 = Area::factory()->create();
        $retailLocation = RetailLocation::factory()->create(['area_id' => $area->id]);
        $retailLocation2 = RetailLocation::factory()->create(['area_id' => $area2->id]);

        $applications1 = Application::factory()->count(7)->create(['retail_location_id' => $retailLocation->id]);
        $applications2 = Application::factory()->count(3)->create(['retail_location_id' => $retailLocation2->id]);

        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($headOffice)
        ])->postJson(
            '/api/applications',
            [
                'year' => null,
                'area' => $area2->id,
                'status' => null,
                'priority' => null
            ]
        );

        $response->assertOk();
        $response->assertJson([
            'total' => Count($applications2),
        ]);
    }
}
