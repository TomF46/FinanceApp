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
            $table->decimal('rent', $precision = 19, $scale = 4);
            $table->decimal('payroll', $precision = 19, $scale = 4);
            $table->decimal('utilities', $precision = 19, $scale = 4);
            $table->decimal('equipment', $precision = 19, $scale = 4);
            $table->decimal('travel', $precision = 19, $scale = 4);
            $table->decimal('training', $precision = 19, $scale = 4);
            $table->decimal('maintenance', $precision = 19, $scale = 4);
            $table->decimal('employeeBonus', $precision = 19, $scale = 4);
            $table->decimal('employeeExpenses', $precision = 19, $scale = 4);

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
