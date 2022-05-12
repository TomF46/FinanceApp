<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sale;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'productCode',
        'cost',
        'price',
        'description'
    ];

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function getTotalProfit()
    {
        return $this->price - $this->cost;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'productCode' => $this->productCode,
            'cost' => $this->cost,
            'price' => $this->price
        ];
    }

    public function deactivate()
    {
        $this->active = false;
        $this->save();
    }
}
