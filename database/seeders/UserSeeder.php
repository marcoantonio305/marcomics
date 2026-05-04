<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admin@admin.com'], ['name' => 'admin', 'nombre' => 'Admin', 'apellido1' => 'Admin', 'apellido2' => 'Admin', 'dni' => '12345678A', 'email' => 'admin@admin.com', 'direccion' => 'Calle Principal, 1',  'password' => bcrypt('adminadmin'), 'rol_id' => 1]);
        User::updateOrCreate(['email' => 'vendedor@example.com'], ['name' => 'vendedor', 'nombre' => 'Vendedor', 'apellido1' => 'Vendedor', 'apellido2' => 'Vendedor', 'dni' => '87654321B', 'direccion' => 'Calle Secundaria, 2', 'email' => 'vendedor@example.com', 'password' => bcrypt('12345678'), 'rol_id' => 2]);
        User::updateOrCreate(['email' => 'usuario@example.com'], ['name' => 'usuario', 'nombre' => 'Usuario', 'apellido1' => 'Usuario', 'apellido2' => 'Usuario', 'dni' => '11111111C', 'direccion' => 'Calle Principal, 1', 'email' => 'usuario@example.com', 'password' => bcrypt('12345678'), 'rol_id' => 3]);
    }
}