<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Area;
use App\Models\RetailLocation;
use App\Models\Product;
use App\Models\Year;


class AdvancedSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstName' => 'Admin',
            'lastName' => 'User',
            'email' => 'admin@email.com',
            'password' => bcrypt(env('ADMIN_PASSWORD')),
            'role' => Roles::Administrator
        ]);

        $headOffice = User::factory()->create([
            'email' => 'headOffice@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::HeadOffice
        ]);

        $areaManager = User::factory()->create([
            'email' => 'areaManager@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::AreaManager
        ]);

        $areaManager2 = User::factory()->create([
            'email' => 'areaManager2@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::AreaManager
        ]);

        $area = Area::factory()->create();
        $area->managers()->save($areaManager);

        $area2 = Area::factory()->create();
        $area2->managers()->save($areaManager2);

        $retailManager = User::factory()->create([
            'email' => 'retailManager@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::RetailManager
        ]);

        $location = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);
        $location->managers()->save($retailManager);

        $retailManager2 = User::factory()->create([
            'email' => 'retailManager2@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::RetailManager
        ]);

        $location2 = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);
        $location2->managers()->save($retailManager2);

        $retailManager3 = User::factory()->create([
            'email' => 'retailManager3@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::RetailManager
        ]);

        $location3 = RetailLocation::factory()->create([
            'area_id' => $area2->id
        ]);
        $location3->managers()->save($retailManager3);

        $retailManager4 = User::factory()->create([
            'email' => 'retailManager4@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::RetailManager
        ]);

        $location4 = RetailLocation::factory()->create([
            'area_id' => $area2->id
        ]);
        $location4->managers()->save($retailManager4);

        $product1 = Product::factory()->create([
            'name' => 'Boss Katana 50',
            'description' => 'A Boss 50 watt guitar amp'
        ]);

        $product2 = Product::factory()->create([
            'name' => 'Fender Rumble Studio 40',
            'description' => 'A Fender 40 watt bass amp with sound modeling'
        ]);

        $year = Year::factory()->create([
            'year' => 2021
        ]);
        $year->generateApplications();
    }
}
