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
    Schema::table('comics', function (Blueprint $table) {
        $table->string('preview1')->nullable()->after('imagen');
        $table->string('preview2')->nullable()->after('preview1');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comics', function (Blueprint $table) {
            $table->dropColumn(['preview1', 'preview2']);
        });
    }
};
