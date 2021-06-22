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

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'locationCount' => Count($this->retailLocations),
            "managers" => $this->managers
        ];
    }
}
