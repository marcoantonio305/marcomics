<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EditoraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $editoras = [
            ['id' => 1, 'nombre' => 'Panini', 'created_at' => '2026-03-08 21:21:20', 'updated_at' => '2026-03-08 21:21:20'],
            ['id' => 2, 'nombre' => 'Norma editorial', 'created_at' => '2026-03-08 21:21:58', 'updated_at' => '2026-03-08 21:21:58'],
            ['id' => 3, 'nombre' => 'Ivrea', 'created_at' => '2026-03-08 21:22:24', 'updated_at' => '2026-03-08 21:22:24'],
            ['id' => 4, 'nombre' => 'Planeta Cómic', 'created_at' => '2026-03-08 21:22:39', 'updated_at' => '2026-03-08 21:22:39'],
        ];

        // Usamos updateOrInsert para evitar duplicados si ya existen los IDs
        foreach ($editoras as $editora) {
            DB::table('editoras')->updateOrInsert(['id' => $editora['id']], $editora);
        }
    }
}