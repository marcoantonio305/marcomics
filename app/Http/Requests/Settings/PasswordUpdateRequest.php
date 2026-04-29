<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest
{
    use PasswordValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => $this->currentPasswordRules(),
            'password' => $this->passwordRules(),
        ];
    }

    public function messages(): array
    {
        return [
            'password.regex' => 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
            'password.confirmed' => 'No coincide con la contraseña.',
            'current_password.current_password' => 'La contraseña actual es incorrecta.',
        ];
    }
}
