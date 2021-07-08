<?php

namespace Database\Factories;

use App\Models\ApplicationRevision;
use App\Models\Application;
use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationRevisionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ApplicationRevision::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'application_id' => Application::factory()
        ];
    }
}
