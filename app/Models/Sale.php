<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ApplicationRevision;
use App\Models\Product;

class Sale extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'application_revision_id',
        'product_id',
        'quantity',
        'income'
    ];

    public function applicationRevision()
    {
        return $this->belongsTo(ApplicationRevision::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'productId' => $this->product->id,
            'productName' => $this->product->name,
            'productPrice' => $this->product->price,
            'quantity' => $this->quantity,
            'income' => $this->income
        ];
    }
}
