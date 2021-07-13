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
            $table->foreignId('application_revision_id')->constrained()->onDelete('cascade');
            $table->decimal('dividends', $precision = 19, $scale = 4);
            $table->decimal('assetSales', $precision = 19, $scale = 4);
            $table->decimal('maintenanceGrant', $precision = 19, $scale = 4);
            $table->decimal('sponsorship', $precision = 19, $scale = 4);
            $table->decimal('rewards', $precision = 19, $scale = 4);
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
