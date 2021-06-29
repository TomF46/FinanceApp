<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\Sale;
use App\Models\Product;
use App\Models\IncomeRecord;
use App\Models\ExpensesRecord;

class ApplicationRevision extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table = 'application_revisions';
    protected $fillable = [
        'application_id'
    ];

    public function applicationRevision()
    {
        return $this->belongsTo(ApplicationRevision::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function incomeRecord()
    {
        return $this->hasOne(IncomeRecord::class);
    }

    public function expensesRecord()
    {
        return $this->hasOne(ExpensesRecord::class);
    }

    public function mapSales()
    {
        return $this->sales->map(function ($sale) {
            return $sale->map();
        });
    }

    public function mapIncomeRecord()
    {
        return $this->incomeRecord ? $this->incomeRecord->map() : null;
    }

    public function mapExpensesRecord()
    {
        return $this->expensesRecord ? $this->expensesRecord->map() : null;
    }

    public function map()
    {
        return [
            'sales' => $this->mapSales(),
            'incomeRecord' => $this->mapIncomeRecord(),
            'expensesRecord' => $this->mapExpensesRecord()
        ];
    }

    public function addRecords($attributes)
    {
        $this->saveIncomeRecord($attributes['income']);
        $this->saveExpensesRecord($attributes['expenses']);
        $this->saveSales($attributes['sales']);
        $this->save();
    }

    public function saveIncomeRecord($income)
    {
        IncomeRecord::create([
            'application_revision_id' => $this->id,
            'dividends' => $income['dividends'],
            'assetSales' => $income['assetSales'],
            'maintenanceGrant' => $income['maintenanceGrant'],
            'sponsorship' => $income['sponsorship'],
            'rewards' => $income['rewards']
        ]);
    }

    public function saveExpensesRecord($expenses)
    {
        ExpensesRecord::create([
            'application_revision_id' => $this->id,
            'rent' => $expenses['rent'],
            'payroll' => $expenses['payroll'],
            'utilities' => $expenses['utilities'],
            'equipment' => $expenses['equipment'],
            'travel' => $expenses['travel'],
            'training' => $expenses['training'],
            'maintenance' => $expenses['maintenance'],
            'employeeBonus' => $expenses['employeeBonus'],
            'employeeExpenses' => $expenses['employeeExpenses']
        ]);
    }

    public function saveSales($sales)
    {
        foreach ($sales as $sale) {
            $product = Product::where('id', $sale['id'])->first();
            Sale::create([
                'application_revision_id' => $this->id,
                'product_id' => $sale['id'],
                'quantity' =>  $sale['quantity'],
                'income' =>  $sale['quantity'] * $product->price
            ]);
        }

    }

}
