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
use App\Models\Application;
use App\Models\ApplicationRevision;
use App\Models\RejectionMessage;
use Tests\Helpers\TestHelper;


class ApplicationsRejectTest extends TestCase
{
    use RefreshDatabase;


    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
    }

    public function testCanRejectApplication()
    {
        $manager = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $area = Area::factory()->create();
        $area->managers()->save($manager);

        $location = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);
    
        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $applicationRevision = ApplicationRevision::factory()->create([
            'application_id' => $application->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager)
        ])->postJson('/api/applications/' . $application->id . '/reject', [
            'message' => "A test rejection message"
        ]);

        $response->assertOk();
    }

    public function testCantRejectApplicationWithInvalidUserRole()
    {
        $manager = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $area = Area::factory()->create();
        $area->managers()->save($manager);

        $manager2 = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $location = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);
        $location->managers()->save($manager2);

        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $applicationRevision = ApplicationRevision::factory()->create([
            'application_id' => $application->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager2)
        ])->postJson('/api/applications/' . $application->id . '/reject', [
            'message' => "A test rejection message"
        ]);

        $response->assertForbidden();
    }

    public function testCantRejectApplicationWithCorrectRoleByDifferentArea()
    {
        $manager = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $manager2 = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $area = Area::factory()->create();
        $area->managers()->save($manager);

        $location = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);

        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $applicationRevision = ApplicationRevision::factory()->create([
            'application_id' => $application->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager2)
        ])->postJson('/api/applications/' . $application->id . '/reject', [
            'message' => "A test rejection message"
        ]);

        $response->assertForbidden();
    }

    public function testCanGetRejectionMessage()
    {
        $testMessage = "A test rejection message";

        $manager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $manager2 = User::factory()->create([
            'role' => Roles::AreaManager
        ]);

        $area = Area::factory()->create();
        $area->managers()->save($manager2);
    
        $location = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);
        $location->managers()->save($manager);

        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $applicationRevision = ApplicationRevision::factory()->create([
            'application_id' => $application->id
        ]);

        $rejectionMessage = RejectionMessage::factory()->create([
            'application_revision_id' => $applicationRevision->id,
            'user_id' => $manager2->id,
            'message' => $testMessage
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager)
        ])->get('/api/applications/' . $application->id . '/showRejectMessage');

        $response->assertOk();
        $response->assertJson([
            'message' => $testMessage,
        ]);
    }
}
