import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
const NAME_REGEX = "^[a-zA-Z0-9_]{3,16}$";
const EMAIL_REGEX = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
const DNI_REGEX = "^[0-9]{8}[A-Z,a-z]{1}$";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <AuthLayout
            title="Crea una cuenta"
            description="Introduzca tus detalles a continuación para crear una cuenta"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nombre de usuario</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    pattern={NAME_REGEX}
                            title="El nombre debe tener entre 3 y 16 caracteres y ser alfanumérico."
                                    placeholder="Usuario777"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@ejemplo.com"
                                    pattern={EMAIL_REGEX}
                                    title="Introduce una dirección de correo electrónico válida."
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="given-name"
                                    name="nombre"
                                    placeholder="Marcos"
                                />
                                <InputError message={errors.nombre} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="apellido1">Primer apellido</Label>
                                <Input
                                    id="apellido1"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="family-name"
                                    name="apellido1"
                                    placeholder="Pérez"
                                />
                                <InputError message={errors.apellido1} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="apellido2">Segundo apellido</Label>
                                <Input
                                    id="apellido2"
                                    type="text"
                                    tabIndex={4}
                                    autoComplete="family-name"
                                    name="apellido2"
                                    placeholder="García (opcional)"
                                />
                                <InputError message={errors.apellido2} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="dni">DNI</Label>
                                <Input
                                    id="dni"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="off"
                                    name="dni"
                                    placeholder="12345678A"
                                    pattern={DNI_REGEX}
                                    title="Introduce un DNI válido."
                                />
                                <InputError message={errors.dni} />
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor="direccion">Dirección</Label>
                                <Input
                                    id="direccion"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="street-address"
                                    name="direccion"
                                    placeholder="Calle de la Coliflor 123"
                                />
                                <InputError message={errors.direccion} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    pattern={PASSWORD_REGEX}
                                    title="Mínimo 8 caracteres, una mayúscula, una minúscula y un número."
                                    placeholder="Contraseña123"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                                <Input
                                    id="password_confirmation"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirmar contraseña"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="show-password" 
                                    onCheckedChange={(checked) => setShowPassword(!!checked)}
                                />
                                <Label htmlFor="show-password" className="text-sm font-normal cursor-pointer">
                                    Mostrar contraseña
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-red-500 text-white hover:bg-red-600"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Crear una cuenta
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            ¿Ya tienes una cuenta?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Inicia sesión
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
