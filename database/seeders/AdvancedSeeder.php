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

        $area = Area::factory()->create();
        $area->managers()->save($areaManager);

        $retailManager = User::factory()->create([
            'email' => 'retailManager@email.com',
            'password' => bcrypt(env('TESTING_PASSWORD')),
            'role' => Roles::RetailManager
        ]);

        $location = RetailLocation::factory()->create([
            'area_id' => $area->id
        ]);
        $location->managers()->save($retailManager);

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
