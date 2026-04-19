<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('comics', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('compras', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('historial_compras', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('comics', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('compras', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('historial_compras', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};