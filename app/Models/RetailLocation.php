<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Area;

class RetailLocation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'retail_locations';
    protected $fillable = [
        'name',
        'location',
        'area_id'
    ];

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'area' => $this->area->name
        ];
    }
}
