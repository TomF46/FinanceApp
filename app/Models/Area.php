<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RetailLocation;
use App\Models\User;

class Area extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name'
    ];

    public function retailLocations()
    {
        return $this->hasMany(RetailLocation::class);
    }

    public function managers()
    {
        return $this->belongsToMany(User::class, 'manager_area');
    }

    protected function mapLocations()
    {
        return $this->retailLocations->where('active', true)->map(function ($location) {
            return $location->map();
        });
    }

    protected function mapManagers()
    {
        return $this->managers->where('active', true)->map(function ($manager) {
            return $manager->map();
        });
    }

    protected function mapApplications()
    {
        $locationIds = $this->retailLocations->pluck('id');
        return Application::whereIn('retail_location_id', $locationIds)->get()->map(function ($application) {
            return $application->map();
        });
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'locationCount' => Count($this->retailLocations),
        ];
    }

    public function mapDetail()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'locationCount' => Count($this->retailLocations),
            'locations' => $this->mapLocations(),
            'managers' => $this->mapManagers(),
            'applications' => $this->mapApplications()
        ];
    }

    public function deactivate(){
        $this->active = false;
        $this->save();
        $this->deactivateLocations();
    }

    protected function deactivateLocations()
    {

        foreach ($this->retailLocations as $location) {
            $location->deactivate();
        }
    }
}
