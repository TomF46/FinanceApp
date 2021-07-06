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
            'rent' => $this->rent,
            'payroll' => $this->payroll,
            'utilities' => $this->utilities,
            'equipment' => $this->equipment,
            'travel' => $this->travel,
            'training' => $this->training,
            'maintenance' => $this->maintenance,
            'employeeBonus' => $this->employeeBonus,
            'employeeExpenses' => $this->employeeExpenses,
            'totalExpenses' => number_format($this->getTotalExpenses(), 2, '.', '')
        ];
    }
}