<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Product;
use App\Models\RetailLocation;
use App\Models\Area;
use App\Models\Application;
use Tests\Helpers\TestHelper;

class ApplicationsSubmitTest extends TestCase
{
    use RefreshDatabase;
    public $product1;
    public $product2;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->product1 = Product::factory()->create();
        $this->product2 = Product::factory()->create();
    }

    public function testCanSubmitApplication()
    {
        $manager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $location = RetailLocation::factory()->create();
        $location->managers()->save($manager);

        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager)
        ])->postJson('/api/applications/' . $application->id, $this->getValidApplicationBody());

        $response->assertOk();
    }

    public function testCantSubmitInvalidApplication()
    {
        $manager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $location = RetailLocation::factory()->create();
        $location->managers()->save($manager);

        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager)
        ])->postJson('/api/applications/' . $application->id, 
            [
                'income' => [
                    'dividends' => 2000,
                    'assetSales' => 1000,
                    'maintenanceGrant' => "eleven",
                    'sponsorship' => 1500,
                    'rewards' => 4000
                ],
                'expenses' => [
                    'rent' => 32000,
                    'payroll' => 120000,
                    'utilities' => 5000,
                    'equipment' => 2000,
                    'travel' => 1500,
                    'training' => 4000,
                    'maintenance' => 5000,
                    'employeeBonus' => 10000,
                    'employeeExpenses' => 3000
                ],
                'sales' => [
                    ['id' => $this->product1->id, 'quantity' => 4500],
                    ['id' => $this->product2->id, 'quantity' => 7000],
                ]
            ]
        );

        $response->assertStatus(422);
    }

    public function testCantSubmitApplicationWithRetailManagerWhoDoesntManageLocation()
    {
        $manager = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $manager2 = User::factory()->create([
            'role' => Roles::RetailManager
        ]);

        $location = RetailLocation::factory()->create();
        $location->managers()->save($manager);

        $application = Application::factory()->create([
            'retail_location_id' => $location->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager2)
        ])->postJson('/api/applications/' . $application->id, $this->getValidApplicationBody());

        $response->assertForbidden();
    }

    public function testCantSubmitApplicationWithAreaManagerEvenInOwnArea()
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

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($manager2)
        ])->postJson('/api/applications/' . $application->id, $this->getValidApplicationBody());

        $response->assertForbidden();
    }

    protected function getValidApplicationBody()
    {
        return [
            'income' => [
                'dividends' => 2000,
                'assetSales' => 1000,
                'maintenanceGrant' => 5000,
                'sponsorship' => 1500,
                'rewards' => 4000
            ],
            'expenses' => [
                'rent' => 32000,
                'payroll' => 120000,
                'utilities' => 5000,
                'equipment' => 2000,
                'travel' => 1500,
                'training' => 4000,
                'maintenance' => 5000,
                'employeeBonus' => 10000,
                'employeeExpenses' => 3000
            ],
            'sales' => [
                ['id' => $this->product1->id, 'quantity' => 4500],
                ['id' => $this->product2->id, 'quantity' => 7000],
            ]
        ];
    }
}
