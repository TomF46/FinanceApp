<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'productCode',
        'price'
    ];


    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'productCode' => $this->productCode,
            'price' => $this->price
        ];
    }
}
