#  Mentior Corp Finance Tool

## Overview
Mentior Corp Finance Tool is an end of year funding application app for a fictitious company. This application was created using a React front end wrapped within a Laravel application acting as an API. More information about the technical details and application structure can be found below.

## Getting Started
This application was created using Laravel Sail which uses docker to create the environment required to build and run a Laravel application. For ease of use I would recommend using the docker file held within my project to create the environment but if you have a Laravel environment set up already the application will work fine with that.

Pre requisite 
- Set up docker for your operating system, information can be found in the [Laravel installation documentation](https://laravel.com/docs/8.x/installation)


Note: If using own environment and not sail replace all instances of `sail`  with `php`
Steps:
 1. Using the terminal type specified in the documentation above (e.g. A Linux terminal using WSL2 for Windows) clone the project from GitHub and Cd into that folder. [Ensure this folder destination is in WSL](https://stackoverflow.com/questions/65227492/laravel-8-laravel-sail-for-dev-on-windows-10-is-slow-how-to-speed-up) or you may experience performance issues.
 2. Before you can run sail you need to install dependencies, this can be done by following the instructions in the following Laravel documentation [Installing Composer Dependencies For Existing Applications](https://laravel.com/docs/8.x/sail#installing-composer-dependencies-for-existing-projects)
 3. Copy the `.env.example` file in the root of the project and rename it to `.env`.
 4.  Now you can run sail by entering `/vendor/bin/sail up` or `/vendor/bin/sail up -d` (for a detached process. This uses the docker file to create the environment required to run the application and run tests.
 5. Run migrations using `sail artisan migrate` to create the database tables.
 6. **Option 1:** Run `sail artisan db:seed` to add a admin user to the project, this default admin users username and password can be set in the `.env` file by editing the values for `ADMIN_EMAIL` & `ADMIN_PASSWORD`.
**Option 2:** Alternatively you can run `sail artisan db:seed --class=AdvancedSeeder` to seed the database with the same Admin as the above open as well as a user from each role, an area, a retail location, and products, all the data needed to get straight in to completing applications. Usernames can be found in `database/seeders/AdvancedSeeder.php` and all non admin passwords are set to the environment variable `TESTING_PASSWORD` by default.

    **NOTE** Step 5: Performing both options will cause an error, if you want to try the other option after previously performing one run `sail artisan migrate:fresh` to reset the database first.

 7. Run `sail artisan key:generate`
 8. Run `sail artisan passport:install` without this you wont be able to login
 9. By default the Application will be running on localhost.

## Application overview

Mentior Corp consists of staff which have one of the following roles
- Administrator
- Head Office
- Area Manager
- Retail Manager

Mentior Corp has a number of retail locations managed by retail managers, which are contained within a number of areas managed by area mangers. The purpose of the application is for retail managers to submit an end of year application for investment/funding from head office, these are then signed off by their area managers.

In Summary each application period consists of the following steps
1. Head Office user creates an application year/period using their dashboard.
2. All active Retail managers receive an application request for the retail location they manage in their dashboard.
3. Retail manager completes and submits application.
4. Area manager reviews application and accepts or rejects

If Rejected
- Retail manager can see reason left by area manager, update application and resubmit, repeating step 4.

If Accepted
- Retail manager can see how much funding they will receive
- Figures from application and investment added to Head offices total overview of the application period.

### Role of each user role

#### Administrator
-  Add, edit, and remove Head office users/ Area manager users / Retail manager users
- Add, edit, and remove Areas and Retail locations
- Assign Retail locations to Areas
- Assign Area managers to Area
- Assign Retail managers to Retail location
- Create, edit, and remove Products

#### Head Office
- Create reporting year/period
- View high level overview of each year/period

#### Area manager
- View overview of areas managed and retail locations within them
- View status of  all applications in areas managed
- View applications for retail locations within areas managed
- Manage (Accept/Reject) applications submitted by retail managers in area

#### Retail manager
- View overview of retail locations managed
- View applications for retail locations managed
- Complete and submit applications for retail locations managed
- View funding/investment data from accepted applications

## Application overview
- Laravel API
- React Front end wrapped within Laravel application
- Webpack
- Sass
- Tailwindcss
- Testing using PHPUnit
- Docker with Laravel sail
- PHP packages see `composer.json`
- JS packages see `package.json`