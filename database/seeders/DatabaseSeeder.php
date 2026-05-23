<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolSeeder::class,
            UserSeeder::class,
            EditoraSeeder::class,
    AutorSeeder::class,
    CategoriaSeeder::class, 
    ComicSeeder::class,
        ]);
        // User::factory(10)->create();

        //User::factory()->create([
        //    'name' => 'Test User',
        //    'email' => 'test@example.com',
        //]);

        // Añade el chat que va a aparecer en la página de inicio
        Chat::updateOrCreate(
            ['nombre_clave' => 'general'], 
            ['nombre_clave' => 'general']  
        );
    }
}
