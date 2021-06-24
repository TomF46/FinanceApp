<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Enums\Roles;
use App\Models\RetailLocation;
use App\Models\Area;
use App\Models\Application;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin()
    {
        return $this->role == Roles::Administrator;
    }

    public function retailLocations()
    {
        return $this->belongsToMany(RetailLocation::class, 'manager_location');
    }

    public function areas()
    {
        return $this->belongsToMany(Area::class, 'manager_area');
    }

    protected function mapLocations()
    {
        return $this->retailLocations->map(function ($location) {
            return $location->map();
        });
    }

    protected function mapAreas()
    {
        return $this->areas->map(function ($area) {
            return $area->map();
        });
    }

    protected function mapApplications()
    {
        $ids = $this->retailLocations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $ids)->get()->map(function ($application) {
            return $application->map();
        });

        return $applications;
    }

    protected function mapAreaApplications()
    {
        $ids = $this->areas->pluck('id');
        $locations = RetailLocation::whereIn('area_id', $ids)->get();

        $locationIds = $locations->pluck('id');
        $applications = Application::whereIn('retail_location_id', $locationIds)->get()->map(function ($application) {
            return $application->map();
        });

        return $applications;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'fullName' => "{$this->firstName} {$this->lastName}",
            'email' => $this->email,
            'role' => $this->role,
            "roleTitle" => $this->getRoleTitle()
        ];
    }

    public function mapAsRetailManager()
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'fullName' => "{$this->firstName} {$this->lastName}",
            'email' => $this->email,
            'role' => $this->role,
            "roleTitle" => $this->getRoleTitle(),
            "retailLocationsManaged" => $this->mapLocations(),
            "applications" => $this->mapApplications()
        ];
    }

    public function mapAsAreaManager()
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'fullName' => "{$this->firstName} {$this->lastName}",
            'email' => $this->email,
            'role' => $this->role,
            "roleTitle" => $this->getRoleTitle(),
            "areasManaged" => $this->mapAreas(),
            "applications" => $this->mapAreaApplications()
        ];
    }

    public function getRoleTitle()
    {
        switch ($this->role) {
            case Roles::Administrator:
                return "Administrator";
                break;
            case Roles::HeadOffice:
                return "Head Office";
                break;
            case Roles::AreaManager:
                return "Area Manager";
                break;
            case Roles::RetailManager:
                return "Retail Manager";
                break;
            default:
                return "Unassigned";
        }
    }
}
