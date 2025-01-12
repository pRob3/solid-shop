import { createSignal } from 'solid-js';
import { validateForm } from '../../utils/validators';
import {
  type LoginRequestDto,
  loginUser,
  loginValidationSchema,
} from '../../services/authService';
import type { ValidationErrors } from '../../types/api';
import FormInput from '../../components/FormInput';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { A, useNavigate } from '@solidjs/router';
import { createFieldHandler } from '../../utils/formHelpers';
import { useUserContext } from '../../context/UserContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, refreshSession } = useUserContext();
  const [values, setValues] = createSignal<LoginRequestDto>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = createSignal<
    Partial<Record<keyof LoginRequestDto, string>>
  >({});
  const [apiErrors, setApiErrors] = createSignal<ValidationErrors | null>(null);
  const [generalError, setGeneralError] = createSignal<string | null>(null);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const handleChange = createFieldHandler(setValues, setErrors);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setApiErrors(null);
    setGeneralError(null);

    const validationErrors = validateForm(values(), loginValidationSchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await loginUser(values());
        handleApiErrors(response, setGeneralError, setApiErrors);

        if (response.success && response.data) {
          console.log('Login successful:', response);

          login(
            {
              id: response.data.id,
              userName: response.data.userName,
              email: response.data.email,
            },
            response.data.token,
            response.data.refreshToken
          );

          // Refresh session explicitly after login
          await refreshSession();

          navigate('/');
        } else {
          console.log('Login failed:', response);
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        console.error('Login error:', error);
        setGeneralError(error.message || 'An unexpected error occurred.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      class='max-w-md mt-16 mx-auto p-6 bg-white rounded shadow'
    >
      {generalError() && (
        <p class='text-red-500 text-sm mb-4' aria-live='polite'>
          {generalError()}
        </p>
      )}
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
      <button type='submit' class='btn w-full' disabled={isSubmitting()}>
        {isSubmitting() ? 'Logging in...' : 'Login'}
      </button>
      <p class='text-center mt-4'>
        Don't have an account?{' '}
        <A href='/register' class='text-blue-500'>
          Register
        </A>
      </p>
    </form>
  );
};

export default LoginForm;
