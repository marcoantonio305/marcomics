<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comics = [
            [
                'id' => 18,
                'titulo' => 'Dragon Ball vol.1',
                'precio' => 8.99,
                'lanzamiento' => '2026-03-02',
                'descripcion' => 'El comienzo de uno de los mangas más populares e influyentes del mundo. Adéntrate en el mundo de Son Goku, mientras que él y su amiga Bulma se ponen a buscar las bolas de dragón.',
                'editora_id' => 4,
                'imagen' => 'images/IRZrkkOIjlLGoIMG6FBRCBg0IeulcnMMXwQMrsP0.jpg',
                'codigo_comic' => 'NXG8-QZ',
                'stock' => 19,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-03-24 21:20:03',
                'updated_at' => '2026-05-13 15:38:39',
                'deleted_at' => null
            ],
            [
                'id' => 13,
                'titulo' => 'Batman: The Killing Joke',
                'precio' => 9.99,
                'lanzamiento' => '2026-03-17',
                'descripcion' => 'El origen del villano más temible de Batman: el Joker.',
                'editora_id' => 1,
                'imagen' => 'images/iq6Tg63ESlBgM3wiAivU5ukuChxEXC3OEqCqhzoW.webp',
                'codigo_comic' => 'VNZ2-UP',
                'stock' => 9,
                'preview1' => 'images/aPKKaDS3U3YqZrUxpAsWwJh3vtmmjw54cHmeEGxI.jpg',
                'preview2' => 'images/TJ7xsdUrgBELixTh67vhX5PrHbxshmMTi4yf9FwJ.webp',
                'created_at' => '2026-03-16 21:24:41',
                'updated_at' => '2026-05-15 21:52:59',
                'deleted_at' => null
            ],
            [
                'id' => 22,
                'titulo' => 'DC K.O 1',
                'precio' => 3.99,
                'lanzamiento' => '2026-03-12',
                'descripcion' => 'Los personajes de DC van a participar en un torneo multiversal en el que se decidirá quién es el ser más poderoso de entre todos.',
                'editora_id' => 1,
                'imagen' => 'images/0um5R0lz2R6F4cF31Nn8EaCXVyAy7WvNYNwm0WUD.jpg',
                'codigo_comic' => 'BAUA-NV',
                'stock' => 0,
                'preview1' => 'images/njiSDQzdcoJt5YozMPtnZ430uIYXY7osrhGvL0Ea.webp',
                'preview2' => 'images/PYQTrbbNPmuLkhKwLWLJVGdjjCvrzDrsgG1oy0WY.webp',
                'created_at' => '2026-05-16 16:19:53',
                'updated_at' => '2026-05-16 16:19:53',
                'deleted_at' => null
            ],
            [
                'id' => 23,
                'titulo' => 'Absolute Batman 1',
                'precio' => 2.99,
                'lanzamiento' => '2026-05-27',
                'descripcion' => 'Una nueva visión del superhéroe más querido y famoso del mundo. Este Batman se encuentra en un universo oscuro y peligroso, pero además no cuenta con su mansión ni con su fortuna. ¿Cómo va a poder el caballero oscuro impartir justicia estando tan desventajado? Pues descúbrelo en esta nueva serie.',
                'editora_id' => 1,
                'imagen' => 'images/39BqH2OQTHzaR8U6j3uTKI4xVGLhGTPr24OI8gjT.webp',
                'codigo_comic' => '6Y7S-YT',
                'stock' => 0,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-05-16 16:53:27',
                'updated_at' => '2026-05-16 16:53:27',
                'deleted_at' => null
            ],
            [
                'id' => 20,
                'titulo' => 'Spawn Cataclismo',
                'precio' => 19.99,
                'lanzamiento' => '2026-04-03',
                'descripcion' => 'Otra aventura emocionante de Spawn, por parte del mítico Todd McFarlane.',
                'editora_id' => 4,
                'imagen' => 'images/DuVWuoewvgm8QpzEJmVDTbdmeOSFpMkncWhfBOWf.webp',
                'codigo_comic' => 'BI7E-FD',
                'stock' => 0,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-03-24 21:27:55',
                'updated_at' => '2026-05-08 20:45:58',
                'deleted_at' => null
            ],
            [
                'id' => 24,
                'titulo' => 'Civil War',
                'precio' => 29.99,
                'lanzamiento' => '2026-06-18',
                'descripcion' => '¡El evento más importante del universo Marvel! Tras un trágico accidente, el gobierno fuerza a los superhéroes a mostrar su identidad. Debido a esto, se forman dos bandos: uno a favor y otro en contra de esta medida. ¡Escoge tu bando y explora la historia de uno de los momentos más clave del universo de Marvel!',
                'editora_id' => 1,
                'imagen' => 'images/ubJ82xo5pjb6I6VAjebcdamehiOQOHguIPjTIsIG.jpg',
                'codigo_comic' => 'LKS1-VH',
                'stock' => 0,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-05-17 16:51:13',
                'updated_at' => '2026-05-17 16:51:13',
                'deleted_at' => null
            ],
            [
                'id' => 19,
                'titulo' => 'Dragon Ball Super vol.15',
                'precio' => 7.99,
                'lanzamiento' => '2026-03-08',
                'descripcion' => 'Goku y Vegeta tienen que hacerse más fuertes para derrotar a su enemigo más poderoso hasta la fecha: Moro.',
                'editora_id' => 4,
                'imagen' => 'images/HJq1qMinSV512WxBorIvRuEnGiKbhfUjYdJnoTH3.jpg',
                'codigo_comic' => 'PQUI-AB',
                'stock' => 0,
                'preview1' => 'images/x2JwPaAUYdl2ecHF7Nc1oZQPQb7sIEq8wQIcWdHD.jpg',
                'preview2' => 'images/v4KHO5xmcIxqTwVHlhA5WPdGDYwee4M3I406ATNv.webp',
                'created_at' => '2026-03-24 21:21:22',
                'updated_at' => '2026-05-17 18:18:25',
                'deleted_at' => null
            ],
            [
                'id' => 21,
                'titulo' => 'Spawn Rey nº 7',
                'precio' => 19.99,
                'lanzamiento' => '2026-03-29',
                'descripcion' => 'Las aventuras de Spawn y su reinado en el infierno continúan. ¿Qué enemigos aparecerán para pararle los pies al antihéroe más querido de los cómics?',
                'editora_id' => 4,
                'imagen' => 'images/cR1IDsH70ViUZc2IJSVb1Cf2tkrIhIHQimEGB3Ce.webp',
                'codigo_comic' => 'KKH4-AN',
                'stock' => 20,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-03-24 21:29:39',
                'updated_at' => '2026-05-09 18:06:33',
                'deleted_at' => null
            ],
            [
                'id' => 16,
                'titulo' => 'Naruto vol.1',
                'precio' => 7.99,
                'lanzamiento' => '2026-03-19',
                'descripcion' => 'El comienzo de uno de los mangas más míticos del mundo. Explora la vida de Naruto Uzumaki, esforzándose para poder cumplir su mayor sueño: ser Hokage.',
                'editora_id' => 4,
                'imagen' => 'images/oTSiwbUubohPt9F6IRzHEDDYk5LaBcpmLx2OvMBb.jpg',
                'codigo_comic' => 'N7KR-T2',
                'stock' => 9,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-03-16 21:49:02',
                'updated_at' => '2026-05-09 18:07:05',
                'deleted_at' => null
            ],
            [
                'id' => 14,
                'titulo' => 'Watchmen',
                'precio' => 39.99,
                'lanzamiento' => '2026-03-17',
                'descripcion' => 'El cómic más influyente e importante de la historia, escrito por la mente maestra de Alan Moore.',
                'editora_id' => 1,
                'imagen' => 'images/mcJFdCEKvJz7xGl6g8ZQVXDDYfFDn968U4njgyea.jpg',
                'codigo_comic' => '7SIX-5M',
                'stock' => 9,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-03-16 21:38:49',
                'updated_at' => '2026-05-10 22:01:17',
                'deleted_at' => null
            ],
            [
                'id' => 17,
                'titulo' => 'One Piece vol.1',
                'precio' => 7.99,
                'lanzamiento' => '2026-03-19',
                'descripcion' => 'Luffy y los demás integrantes de los Sombreros de Paja van a hacer todo lo posible por salvar a su amiga, Nico Robin. Pero el malvado Lucci, junto con los demás miembros de CP9, van a impedir que cumplan su cometido. ¿Podrán los Sombrero de Paja derrotar a sus más temibles adversarios hasta ahora?',
                'editora_id' => 2,
                'imagen' => 'images/GpIy3Pwmmctkcdbb2fhZymbABMZbdBf9G7D2z2UW.avif',
                'codigo_comic' => 'AVK1-36',
                'stock' => 8,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-03-16 21:52:45',
                'updated_at' => '2026-05-10 22:11:01',
                'deleted_at' => null
            ],
            [
                'id' => 25,
                'titulo' => 'yh543t',
                'precio' => 69.99,
                'lanzamiento' => '2026-05-23',
                'descripcion' => 'jhwy46rtjyrw',
                'editora_id' => 2,
                'imagen' => 'images/YOSjMsuKHgF1S2yLtiOdjNiORmEwuPgBsLmg4rKc.png',
                'codigo_comic' => 'MHSO-8M',
                'stock' => 0,
                'preview1' => null,
                'preview2' => null,
                'created_at' => '2026-05-21 13:43:14',
                'updated_at' => '2026-05-21 13:43:28',
                'deleted_at' => '2026-05-21 13:43:28'
            ]
        ];

        foreach ($comics as $comic) {
            DB::table('comics')->updateOrInsert(['id' => $comic['id']], $comic);
        }
    }
}