<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncomeRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('income_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->onDelete('cascade');
            $table->decimal('dividends', $precision = 8, $scale = 2);
            $table->decimal('assetSales', $precision = 8, $scale = 2);
            $table->decimal('maintenanceGrant', $precision = 8, $scale = 2);
            $table->decimal('sponsorship', $precision = 8, $scale = 2);
            $table->decimal('rewards', $precision = 8, $scale = 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('income_records');
    }
}
