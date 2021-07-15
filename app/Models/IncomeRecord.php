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
        return $this->dividends + $this->assetSales + $this->maintenanceGrant + $this->sponsorship + $this->rewards;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'dividends' => $this->asMoney($this->dividends),
            'assetSales' => $this->asMoney($this->assetSales),
            'maintenanceGrant' => $this->asMoney($this->maintenanceGrant),
            'sponsorship' => $this->asMoney($this->sponsorship),
            'rewards' => $this->asMoney($this->rewards),
            'totalIncome' => $this->asMoney($this->getTotalIncome())
        ];
    }

    public function asMoney($value)
    {
        return number_format($value, 2, '.', '');
    }
}