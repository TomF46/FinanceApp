<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ApplicationRevision;

class IncomeRecord extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'application_revision_id',
        'dividends',
        'assetSales',
        'maintenanceGrant',
        'sponsorship',
        'rewards'
    ];

    public function applicationRevision()
    {
        return $this->belongsTo(ApplicationRevision::class);
    }

    public function getTotalIncome()
    {
        return $this->dividens + $this->assetSales + $this->maintenanceGrant + $this->sponsorship + $this->rewards;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'dividends' => $this->dividends,
            'assetSales' => $this->assetSales,
            'maintenanceGrant' => $this->maintenanceGrant,
            'sponsorship' => $this->sponsorship,
            'rewards' => $this->rewards,
            'totalIncome' => $this->getTotalIncome()
        ];
    }
}