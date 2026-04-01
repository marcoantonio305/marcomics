<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admin@admin.com'], ['name' => 'admin', 'email' => 'admin@admin.com', 'password' => bcrypt('adminadmin'), 'rol_id' => 1]);
        User::updateOrCreate(['email' => 'vendedor@example.com'], ['name' => 'vendedor', 'email' => 'vendedor@example.com', 'password' => bcrypt('12345678'), 'rol_id' => 2]);
        User::updateOrCreate(['email' => 'usuario@example.com'], ['name' => 'usuario', 'email' => 'usuario@example.com', 'password' => bcrypt('12345678'), 'rol_id' => 3]);
    }
}