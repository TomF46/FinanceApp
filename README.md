#  Mentior Corp Finance Tool

## Overview
Mentior Corp Finance Tool is an end of year funding application app for a fictitious company. This application was created using a React front end wrapped within a Laravel application acting as an API. More information about the technical details and application structure can be found below.

## Getting Started
This application was created using Laravel Sail which uses docker to create the environment required to build and run a Laravel application. For ease of use I would recommend using the docker file held within my project to create the environment but if you have a Laravel environment set up already the application will work fine with that.

Pre requisite 
- Set up docker for your operating system, information can be found in the [Laravel installation documentation](https://laravel.com/docs/8.x/installation)

Steps:
1. Using the terminal type specified in the documentation above (e.g. A Linux terminal using WSL2 for Windows) pull the project from Github. [Ensure this folder destination is in WSL](https://stackoverflow.com/questions/65227492/laravel-8-laravel-sail-for-dev-on-windows-10-is-slow-how-to-speed-up) or you may experience performance issues.
2. Change directory into the project folder and enter `/vendor/bin/sail up` or `/vendor/bin/sail up -d` (for a detached process. This uses the docker file to create the environment required to run the application and run tests.
3. Copy the `.env.example` file in the root of the project and rename it to `.env`, the DB connection string  works with the database created in the previous step.
4. Run migrations using `sail artisan migrate` to create the database tables.
5. **Option 1:** Run `sail artisan db:seed` to add a admin user to the project, this default admin users username and password can be set in the `.env` file by editing the values for `ADMIN_EMAIL` & `ADMIN_PASSWORD`.
**Option 2:** Alternatively you can run `sail artisan db:seed --class=AdvancedSeeder` to seed the database with the same Admin as the above open as well as a user from each role, an area, a retail location, and products, all the data needed to get straight in to completing applications. Usernames can be found in `database/seeders/AdvancedSeeder.php` and all non admin passwords are set to the environment variable `TESTING_PASSWORD` by default.
6. Run `sail artisan passport:install` without this you wont be able to login
7. By default the Application will be running on localhost.