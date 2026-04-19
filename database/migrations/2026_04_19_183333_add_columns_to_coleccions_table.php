<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('coleccions', function (Blueprint $table) {
            $table->boolean('mostrar_inicio')->default(false);
            $table->integer('orden')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coleccions', function (Blueprint $table) {
            $table->dropColumn('mostrar_inicio');
            $table->dropColumn('orden');
        });
    }
};
