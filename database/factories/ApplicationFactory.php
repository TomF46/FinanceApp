<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Enums\ApplicationStatus;
use App\Enums\ApplicationPriority;
use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Application::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'year_id' => Year::factory(),
            'retail_location_id' => RetailLocation::factory(),
            'status' => ApplicationStatus::NotSubmitted,
            'priority' => ApplicationPriority::Low
        ];
    }
}
