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
        $table->boolean('es_destacado')->default(false);
        $table->integer('posicion_destacado')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coleccions', function (Blueprint $table) {
            $table->dropColumn(['es_destacado', 'posicion_destacado']);
        });
    }
};
