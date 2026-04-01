<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    public function run(): void
    {
        Rol::updateOrCreate(['rol' => 'admin'], ['rol' => 'admin']);
        Rol::updateOrCreate(['rol' => 'vendedor'], ['rol' => 'vendedor']);
        Rol::updateOrCreate(['rol' => 'usuario'], ['rol' => 'usuario']);
    }
}