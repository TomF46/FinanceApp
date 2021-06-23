<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Year;
use App\Models\RetailLocation;


class Application extends Model
{
    use HasFactory;
    protected $fillable = [
        'year_id',
        'retail_location_id'
    ];

    public function year()
    {
        return $this->belongsTo(Year::class);
    }

    public function retailLocation()
    {
        return $this->belongsTo(Year::class);
    }
}
