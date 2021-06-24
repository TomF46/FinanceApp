<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Year;
use App\Models\RetailLocation;
use App\Models\Sale;
use App\Models\IncomeRecord;
use App\Enums\ApplicationStatus;

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
        return $this->belongsTo(RetailLocation::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function incomeRecord()
    {
        return $this->hasOne(IncomeRecord::class);
    }


    protected function mapSales()
    {
        return $this->sales->map(function ($sale) {
            return $sale->map();
        });
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'retailLocationName' => $this->retailLocation->name,
            'retailLocationId' => $this->retailLocation->id,
            'status' => $this->getStatusText()
        ];
    }

    public function mapDetail()
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'retailLocationName' => $this->retailLocation->name,
            'retailLocationId' => $this->retailLocation->id,
            'status' => $this->getStatusText(),
            'sales' => $this->mapSales(),
            'incomeRecord' => $this->incomeRecord ? $this->incomeRecord->map() : null
        ];
    }

    public function getStatusText()
    {
        switch ($this->status) {
            case ApplicationStatus::NotSubmitted:
                return "Not submitted";
                break;
            case ApplicationStatus::Submitted:
                return "Submitted";
                break;
            case ApplicationStatus::Returned:
                return "Returned";
                break;
            case ApplicationStatus::Accepted:
                return "Accepted";
                break;
        }
    }
}
