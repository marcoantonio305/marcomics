<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            [
                'id' => 2,
                'nombre' => 'Acción',
                'created_at' => '2026-03-08 21:13:08',
                'updated_at' => '2026-03-21 23:46:06',
                'imagen' => 'images/H3wH4j5cPvxqJfnWeVvz5uB73bucKKDNV4TYAaX7.png'
            ],
            [
                'id' => 3,
                'nombre' => 'Aventuras',
                'created_at' => '2026-03-08 21:13:13',
                'updated_at' => '2026-03-21 23:46:19',
                'imagen' => 'images/JhuaQVZF97PutHTYCnuVnIX6gw9gOeDcZFmMkWE7.png'
            ],
            [
                'id' => 14,
                'nombre' => 'Shonen',
                'created_at' => '2026-03-24 21:17:11',
                'updated_at' => '2026-03-24 21:17:11',
                'imagen' => 'images/Aa5CDm3exuHNUTx3cmnh2LBEs6Bl6vgKH5qVxWBO.webp'
            ],
            [
                'id' => 15,
                'nombre' => 'Peleas',
                'created_at' => '2026-03-24 21:17:23',
                'updated_at' => '2026-03-24 21:17:23',
                'imagen' => 'images/9WAJU5Mq0yxlPpfKPOuZrsWDo6vjvh7LKgc1jxbC.png'
            ],
            [
                'id' => 16,
                'nombre' => 'Violenta',
                'created_at' => '2026-03-24 21:26:30',
                'updated_at' => '2026-03-24 21:26:30',
                'imagen' => 'images/iHqRfVKQhJ5yrhpyyfYSlg6MsSjK8i6gE6syCezL.png'
            ],
            [
                'id' => 5,
                'nombre' => 'Marvel',
                'created_at' => '2026-03-15 17:59:30',
                'updated_at' => '2026-04-08 14:46:03',
                'imagen' => 'images/xOtjmAbijzxYkDULJ9ljfQDe4VfS23MlAiQ8bS7z.png'
            ],
            [
                'id' => 6,
                'nombre' => 'DC',
                'created_at' => '2026-03-15 17:59:35',
                'updated_at' => '2026-04-08 14:47:24',
                'imagen' => 'images/Q8LKJdrnqdc9HfD82UIr3B9hql8qC9fZYI0DBL3r.png'
            ],
            [
                'id' => 11,
                'nombre' => 'Manga',
                'created_at' => '2026-03-15 18:00:13',
                'updated_at' => '2026-04-08 14:56:05',
                'imagen' => 'images/YNiRoXzslIQJLIun1J4PmlSUEuc6SUZEo5HWnZFr.png'
            ],
            [
                'id' => 1,
                'nombre' => 'Superhéroes',
                'created_at' => '2026-03-08 21:13:03',
                'updated_at' => '2026-04-08 14:58:55',
                'imagen' => 'images/LZIJeBNka0O3JT8lsx0QS3UMgGiNSb72eQuZORDT.png'
            ],
            [
                'id' => 8,
                'nombre' => 'Indie',
                'created_at' => '2026-03-15 17:59:44',
                'updated_at' => '2026-04-12 21:46:16',
                'imagen' => 'images/E98K9K2Nk24ulZ4lAwY4LKiJl0LemdYFurSZn4mx.webp'
            ],
            [
                'id' => 10,
                'nombre' => 'Europeo',
                'created_at' => '2026-03-15 18:00:08',
                'updated_at' => '2026-04-12 21:47:29',
                'imagen' => 'images/0nJ4wf9G7xBOz7NYckWYAbshhh6NTZVGmM5VAziJ.png'
            ],
            [
                'id' => 7,
                'nombre' => 'Infantil',
                'created_at' => '2026-03-15 17:59:40',
                'updated_at' => '2026-04-12 21:48:24',
                'imagen' => 'images/ZU1zBOSNzgZKhxD7TZQeJJTkhvhHh7QzrQEPMSb4.png'
            ],
            [
                'id' => 17,
                'nombre' => 'Torneo',
                'created_at' => '2026-05-16 16:12:19',
                'updated_at' => '2026-05-16 16:12:19',
                'imagen' => 'images/OfXSbVqSsAKjUJcLJGhABvbwlRmxmD8Cf5NLra1m.png'
            ],
            [
                'id' => 9,
                'nombre' => 'Image Comics',
                'created_at' => '2026-03-15 17:59:59',
                'updated_at' => '2026-05-20 14:20:32',
                'imagen' => null
            ],
            [
                'id' => 18,
                'nombre' => 'Terror',
                'created_at' => '2026-05-20 14:21:42',
                'updated_at' => '2026-05-20 14:21:42',
                'imagen' => null
            ],
        ];

        foreach ($categorias as $categoria) {
            DB::table('categorias')->updateOrInsert(['id' => $categoria['id']], $categoria);
        }
    }
}