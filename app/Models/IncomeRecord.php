<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ApplicationRevision;
use App\Helpers\NumberHelper;


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
        return $this->dividends + $this->assetSales + $this->maintenanceGrant + $this->sponsorship + $this->rewards;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'dividends' => NumberHelper::asMoney($this->dividends),
            'assetSales' => NumberHelper::asMoney($this->assetSales),
            'maintenanceGrant' => NumberHelper::asMoney($this->maintenanceGrant),
            'sponsorship' => NumberHelper::asMoney($this->sponsorship),
            'rewards' => NumberHelper::asMoney($this->rewards),
            'totalIncome' => NumberHelper::asMoney($this->getTotalIncome())
        ];
    }
}