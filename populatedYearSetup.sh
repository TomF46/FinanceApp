#!/bin/bash  
# Runs fresh migrations (removes any existing and then runs the migrations so it works either to reset the database or start from a clean database)
./vendor/bin/sail artisan migrate:fresh
# Run populated year seeder
./vendor/bin/sail artisan db:seed --class=PrePopulatedYearSeeder
# Run passport install as required after migrations
./vendor/bin/sail artisan passport:install