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
        Schema::create('comics', function (Blueprint $table) {
            $table->id();
            $table->string("titulo");
            $table->decimal("precio", 8, 2);
            $table->date("lanzamiento")->nullable();
            $table->text("descripcion")->nullable();
            //$table->foreignId("categoria_id")->nullable()->constrained("categoria");
            $table->foreignId("editora_id")->nullable()->constrained("editoras");
            //$table->foreignId("autor_id")->nullable()->constrained("autor");
            $table->string("imagen")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comics');
    }
};
