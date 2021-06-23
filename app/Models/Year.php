<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\RetailLocation;

class Year extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'year'
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function generateApplications(){
        $retailers = RetailLocation::all();

        foreach ($retailers as $retailer) {
            $application = Application::create([
                'year_id' => $this->id,
                'retail_location_id' => $retailer->id
            ]);
        }
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'totalApplications' => Count($this->applications)
        ];
    }
}
