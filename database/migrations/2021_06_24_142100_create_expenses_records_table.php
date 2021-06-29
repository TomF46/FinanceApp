<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_revision_id')->constrained()->onDelete('cascade');
            $table->decimal('rent', $precision = 8, $scale = 2);
            $table->decimal('payroll', $precision = 8, $scale = 2);
            $table->decimal('utilities', $precision = 8, $scale = 2);
            $table->decimal('equipment', $precision = 8, $scale = 2);
            $table->decimal('travel', $precision = 8, $scale = 2);
            $table->decimal('training', $precision = 8, $scale = 2);
            $table->decimal('maintenance', $precision = 8, $scale = 2);
            $table->decimal('employeeBonus', $precision = 8, $scale = 2);
            $table->decimal('employeeExpenses', $precision = 8, $scale = 2);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses_records');
    }
}
