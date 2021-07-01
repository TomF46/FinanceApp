<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RetailLocation;
use App\Models\User;
use App\Models\Application;
use App\Enums\ApplicationStatus;

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

    protected function getAreaManagerRequiredActionCount()
    {
        $locationIds = $this->retailLocations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $locationIds)->get();
        $count = Count($applications->where('status', ApplicationStatus::Submitted));
        return $count;
    }

    protected function getRetailManagerRequiredActionCount()
    {
        $locationIds = $this->retailLocations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $locationIds)
            ->where('status', ApplicationStatus::NotSubmitted)
            ->orWhere('status', ApplicationStatus::Returned)->get();
        $count = Count($applications);
        return $count;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'locationCount' => Count($this->retailLocations),
            'areaManagerActionsRequired' => $this->getAreaManagerRequiredActionCount(),
            'retailManagerActionsRequired' => $this->getRetailManagerRequiredActionCount()

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
            'applications' => $this->mapApplications(),
            'areaManagerActionsRequired' => $this->getAreaManagerRequiredActionCount(),
            'retailManagerActionsRequired' => $this->getRetailManagerRequiredActionCount()
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
