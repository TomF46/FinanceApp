<?php

namespace Database\Factories;

use App\Models\RejectionMessage;
use App\Models\ApplicationRevision;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RejectionMessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RejectionMessage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'application_revision_id' => ApplicationRevision::factory(),
            'user_id' => User::factory(),
            'message' => $this->faker->sentence(10)
        ];
    }
}
