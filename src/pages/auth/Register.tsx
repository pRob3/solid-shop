import { createSignal } from 'solid-js';
import { validateForm } from '../../utils/validators';
import {
  type RegisterRequestDto,
  registerUser,
  registerValidationSchema,
} from '../../services/authService';
import type { ValidationErrors } from '../../types/api';
import FormInput from '../../components/FormInput';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { A, useNavigate } from '@solidjs/router';
import { createFieldHandler } from '../../utils/formHelpers';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = createSignal<RegisterRequestDto>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = createSignal<
    Partial<Record<keyof RegisterRequestDto, string>>
  >({});
  const [apiErrors, setApiErrors] = createSignal<ValidationErrors | null>(null);
  const [generalError, setGeneralError] = createSignal<string | null>(null);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const handleChange = createFieldHandler(setValues, setErrors);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setApiErrors(null);
    setGeneralError(null);

    const validationErrors = validateForm(values(), registerValidationSchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await registerUser(values());
        handleApiErrors(response, setGeneralError, setApiErrors);

        if (response.success && response.data) {
          console.log('Registration successful:', response);
          navigate('/login'); // Redirect to the login page
        } else {
          console.log('Registration failed:', response);
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        console.error('Registration error:', error);
        setGeneralError(error.message || 'An unexpected error occurred.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      class='max-w-md mx-auto p-6 bg-white rounded shadow'
    >
      {generalError() && (
        <p class='text-red-500 text-sm mb-4' aria-live='polite'>
          {generalError()}
        </p>
      )}
      <FormInput
        id='username'
        type='text'
        value={values().username}
        onInput={handleChange('username')}
        error={() => errors().username || apiErrors()?.Username?.[0]}
        label='Username'
      />
      <FormInput
        id='email'
        type='email'
        value={values().email}
        onInput={handleChange('email')}
        error={() => errors().email || apiErrors()?.Email?.[0]}
        label='Email'
      />
      <FormInput
        id='password'
        type='password'
        value={values().password}
        onInput={handleChange('password')}
        error={() => errors().password || apiErrors()?.Password?.[0]}
        label='Password'
      />
      <FormInput
        id='confirmPassword'
        type='password'
        value={values().confirmPassword}
        onInput={handleChange('confirmPassword')}
        error={() =>
          errors().confirmPassword || apiErrors()?.ConfirmPassword?.[0]
        }
        label='Confirm Password'
      />
      <button type='submit' class='btn w-full' disabled={isSubmitting()}>
        {isSubmitting() ? 'Registering...' : 'Register'}
      </button>
      <p class='text-center mt-4'>
        Already have an account?{' '}
        <A href='/login' class='text-blue-500'>
          Login
        </A>
      </p>
    </form>
  );
};

export default RegisterForm;
