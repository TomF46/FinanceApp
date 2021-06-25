<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\Product;

class Sale extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'application_id',
        'product_id',
        'quantity'
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected function getTotalIncome()
    {
        return $this->product->price*$this->quantity;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'productName' => $this->product->name,
            'productPrice' => $this->product->price,
            'quantity' => $this->quantity,
            'totalIncome' => $this->getTotalIncome()
        ];
    }
}