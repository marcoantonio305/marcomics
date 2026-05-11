<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'nombre'    => ['required', 'string', 'max:255'],
            'apellido1' => ['required', 'string', 'max:255'],
            'apellido2' => ['nullable', 'string', 'max:255'],
            'direccion' => ['required', 'string', 'max:255'],
            'dni' => ['required', 'string', 'unique:users,dni', 'regex:/^[0-9]{8}[A-Z,a-z]{1}$/'],
            'password' => $this->passwordRules(),
        ], [
            'password.regex' => 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'name.required' => 'El nombre es obligatorio.',
            'name.unique' => 'Este nombre de usuario ya está en uso.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.unique' => 'Este correo ya está registrado.',
            'dni.required' => 'El DNI es obligatorio.',
            'dni.unique' => 'Este DNI ya está registrado en nuestra base de datos.',
            'dni.regex'          => 'El formato del DNI no es válido.',
            'nombre.required'    => 'El nombre es obligatorio.',
            'apellido1.required' => 'El primer apellido es obligatorio.',
            'direccion.required' => 'La dirección es obligatoria.',
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'rol_id' => 3,
            'nombre' => $input['nombre'],
            'apellido1' => $input['apellido1'],
            'apellido2' => $input['apellido2'] ?? null,
            'dni' => strtoupper($input['dni']),
            'direccion' => $input['direccion'],
        ]);
    }
}
