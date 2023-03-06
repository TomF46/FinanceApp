<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Enums\Roles;
use App\Models\User;

class PrePopulatedYearSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $file = database_path('dumps/PrePopulatedYearDump.dump');
        $sql = \File::get($file);
        \DB::connection()->getPdo()->exec($sql);

        // Change all prepopulated users to have the TESTING_PASSWORD set in the .env file.
        $this->changeDumpUserPasswordsToConfigPasswords();

        // Create an admin user with the password set as ADMIN_PASSWORD in the .env file.
        User::create([
            'firstName' => 'Admin',
            'lastName' => 'User',
            'email' => 'admin@email.com',
            'password' => bcrypt(env('ADMIN_PASSWORD')),
            'role' => Roles::Administrator
        ]);
    }

    protected function changeDumpUserPasswordsToConfigPasswords()
    {
        foreach(User::all() as $user){
            $user->password = bcrypt(env('TESTING_PASSWORD'));
            $user->save();
        }
    }
}
