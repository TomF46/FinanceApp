<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ApplicationRevision;

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
            'rent' => $this->asMoney($this->rent),
            'payroll' => $this->asMoney($this->payroll),
            'utilities' => $this->asMoney($this->utilities),
            'equipment' => $this->asMoney($this->equipment),
            'travel' => $this->asMoney($this->travel),
            'training' => $this->asMoney($this->training),
            'maintenance' => $this->asMoney($this->maintenance),
            'employeeBonus' => $this->asMoney($this->employeeBonus),
            'employeeExpenses' => $this->asMoney($this->employeeExpenses),
            'totalExpenses' => $this->asMoney($this->getTotalExpenses())
        ];
    }

    public function asMoney($value)
    {
        return number_format($value, 2, '.', '');
    }
}