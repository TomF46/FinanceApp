<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ApplicationRevision;
use App\Helpers\NumberHelper;

class ExpensesRecord extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'application_revision_id',
        'rent',
        'payroll',
        'utilities',
        'equipment',
        'travel',
        'training',
        'maintenance',
        'employeeBonus',
        'employeeExpenses'
    ];

    public function applicationRevision()
    {
        return $this->belongsTo(ApplicationRevision::class);
    }

    public function getTotalExpenses()
    {
        return $this->rent + $this->payroll + $this->utilities + $this->equipment + $this->travel + $this->training + $this->maintenance + $this->employeeBonus + $this->employeeExpenses;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'rent' => NumberHelper::asMoney($this->rent),
            'payroll' => NumberHelper::asMoney($this->payroll),
            'utilities' => NumberHelper::asMoney($this->utilities),
            'equipment' => NumberHelper::asMoney($this->equipment),
            'travel' => NumberHelper::asMoney($this->travel),
            'training' => NumberHelper::asMoney($this->training),
            'maintenance' => NumberHelper::asMoney($this->maintenance),
            'employeeBonus' => NumberHelper::asMoney($this->employeeBonus),
            'employeeExpenses' => NumberHelper::asMoney($this->employeeExpenses),
            'totalExpenses' => NumberHelper::asMoney($this->getTotalExpenses())
        ];
    }
}