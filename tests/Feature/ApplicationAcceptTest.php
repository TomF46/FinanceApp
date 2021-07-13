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
use App\Models\AcceptionMessage;
use App\Models\IncomeRecord;
use App\Models\ExpensesRecord;
use App\Models\Sale;

use App\Enums\ApplicationStatus;


class ApplicationsAcceptTest extends TestCase
{
    use RefreshDatabase;


    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
    }

    public function testCanAcceptApplication()
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

        $incomeRecord = IncomeRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $expensesRecord = ExpensesRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $sale = Sale::factory()->create(['application_revision_id' => $applicationRevision->id]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getBearerTokenForUser($manager)
        ])->post('/api/applications/' . $application->id . '/accept');

        $response->assertOk();
    }

    public function testCantAcceptApplicationWithInvalidUserRole()
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

        $incomeRecord = IncomeRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $expensesRecord = ExpensesRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $sale = Sale::factory()->create(['application_revision_id' => $applicationRevision->id]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getBearerTokenForUser($manager2)
        ])->post('/api/applications/' . $application->id . '/accept');

        $response->assertForbidden();
    }

    public function testCantAcceptApplicationWithCorrectRoleByDifferentArea()
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

        $incomeRecord = IncomeRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $expensesRecord = ExpensesRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $sale = Sale::factory()->create(['application_revision_id' => $applicationRevision->id]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getBearerTokenForUser($manager2)
        ])->post('/api/applications/' . $application->id . '/accept');

        $response->assertForbidden();
    }

    public function testCanGetAcceptedApplicationsInvestmentInformation()
    {
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

        $incomeRecord = IncomeRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $expensesRecord = ExpensesRecord::factory()->create(['application_revision_id' => $applicationRevision->id]);
        $sale = Sale::factory()->create(['application_revision_id' => $applicationRevision->id]);

        $application->accept();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getBearerTokenForUser($manager)
        ])->get('/api/applications/' . $application->id . '/investment');

        $response->assertOk();
    }

    protected function getBearerTokenForUser($user)
    {
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }
}
