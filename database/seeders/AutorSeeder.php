<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $autors = [
            ['id' => 1, 'nombre' => 'Stan Lee', 'created_at' => '2026-03-08 20:25:42', 'updated_at' => '2026-03-08 20:25:42'],
            ['id' => 5, 'nombre' => 'Jack Kirby', 'created_at' => '2026-03-09 21:11:03', 'updated_at' => '2026-03-09 21:11:03'],
            ['id' => 7, 'nombre' => 'Alan Moore', 'created_at' => '2026-03-16 21:23:09', 'updated_at' => '2026-03-16 21:23:09'],
            ['id' => 8, 'nombre' => 'Brian Bolland', 'created_at' => '2026-03-16 21:23:28', 'updated_at' => '2026-03-16 21:23:28'],
            ['id' => 9, 'nombre' => 'Dave Gibbons', 'created_at' => '2026-03-16 21:37:14', 'updated_at' => '2026-03-16 21:37:14'],
            ['id' => 10, 'nombre' => 'Tom King', 'created_at' => '2026-03-16 21:43:09', 'updated_at' => '2026-03-16 21:43:09'],
            ['id' => 11, 'nombre' => 'Gabriel Hernandez Walta', 'created_at' => '2026-03-16 21:43:25', 'updated_at' => '2026-03-16 21:43:25'],
            ['id' => 12, 'nombre' => 'Michael Walsh', 'created_at' => '2026-03-16 21:43:35', 'updated_at' => '2026-03-16 21:43:35'],
            ['id' => 13, 'nombre' => 'Masashi Kishimoto', 'created_at' => '2026-03-16 21:46:38', 'updated_at' => '2026-03-16 21:46:38'],
            ['id' => 14, 'nombre' => 'Eiichiro Oda', 'created_at' => '2026-03-16 21:49:50', 'updated_at' => '2026-03-16 21:49:50'],
            ['id' => 15, 'nombre' => 'Akira Toriyama', 'created_at' => '2026-03-24 21:18:10', 'updated_at' => '2026-03-24 21:18:10'],
            ['id' => 16, 'nombre' => 'Toyotaro', 'created_at' => '2026-03-24 21:18:18', 'updated_at' => '2026-03-24 21:18:18'],
            ['id' => 17, 'nombre' => 'Todd McFarlane', 'created_at' => '2026-03-24 21:25:10', 'updated_at' => '2026-03-24 21:25:10'],
            ['id' => 18, 'nombre' => 'Rory McConville', 'created_at' => '2026-03-24 21:25:25', 'updated_at' => '2026-03-24 21:25:25'],
            ['id' => 19, 'nombre' => 'Greg Capullo', 'created_at' => '2026-03-24 21:25:33', 'updated_at' => '2026-03-24 21:25:33'],
            ['id' => 21, 'nombre' => 'Scott Snyder', 'created_at' => '2026-05-16 16:11:03', 'updated_at' => '2026-05-16 16:11:03'],
            ['id' => 22, 'nombre' => 'Javi Fernández', 'created_at' => '2026-05-16 16:11:16', 'updated_at' => '2026-05-16 16:11:16'],
            ['id' => 23, 'nombre' => 'Alejandro Sánchez', 'created_at' => '2026-05-16 16:11:31', 'updated_at' => '2026-05-16 16:11:31'],
            ['id' => 24, 'nombre' => 'Nick Dragotta', 'created_at' => '2026-05-16 16:36:29', 'updated_at' => '2026-05-16 16:36:29'],
            ['id' => 25, 'nombre' => 'Frank Martin', 'created_at' => '2026-05-16 16:36:45', 'updated_at' => '2026-05-16 16:36:45'],
            ['id' => 26, 'nombre' => 'Mark Millar', 'created_at' => '2026-05-17 16:45:34', 'updated_at' => '2026-05-17 16:45:34'],
            ['id' => 27, 'nombre' => 'Steve McNiven', 'created_at' => '2026-05-17 16:46:57', 'updated_at' => '2026-05-17 16:46:57'],
            ['id' => 28, 'nombre' => 'Dexter Vines', 'created_at' => '2026-05-17 16:47:24', 'updated_at' => '2026-05-17 16:47:24'],
            ['id' => 29, 'nombre' => 'Morry Hollowell', 'created_at' => '2026-05-17 16:47:52', 'updated_at' => '2026-05-17 16:47:52'],
            ['id' => 30, 'nombre' => 'Bob Kane', 'created_at' => '2026-05-20 14:23:24', 'updated_at' => '2026-05-20 14:23:24'],
        ];

        foreach ($autors as $autor) {
            DB::table('autors')->updateOrInsert(['id' => $autor['id']], $autor);
        }
    }
}