import styles from './app.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useEffect } from 'react';

const fieldsSchema = yup.object().shape({
  email: yup
    .string()
    .required('Поле email является обязательным!')
    .matches(
      /^[\w_@.]*$/,
      'Неверный Email. Допустимые символы "_", "@", "."  - буквы, цифры!',
    )
    .max(30, 'Неверный Email. Допустимая длинна не более 30 символов!')
    .min(3, 'Неверный email, длинна должна быть более 3 символов!'),
  password: yup
    .string()
    .required('Поле password является обязательным!')
    .matches(
      /^[\w_@.]*$/,
      'Неверный пароль. Допустимые символы "_", "@", "."  - буквы, цифры!',
    )
    .max(20, 'Неверный пароль. Допустимая длинна не более 20 символов!')
    .min(6, 'Неверный пароль, длинна должна быть более 6 символов!'),
  confirmPassword: yup
    .string()
    .required('Поле password является обязательным!')
    .oneOf([yup.ref('password')], 'Пароли не совпадают!'),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(fieldsSchema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const confirmPasswordError = errors.confirmPassword?.message;

  const onSubmit = (formData) => {
    console.log('formData: ', formData);
  };

  const confirmPasswordRef = useRef(null);

  useEffect(() => {
       if (!confirmPasswordError && confirmPasswordRef.current) {
      confirmPasswordRef.current.focus();
    }
  }, [confirmPasswordError]);

  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <div className={styles.formWrapper}>
          <p>SING UP</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {emailError && (
              <div className={styles.errorLabel}>{emailError}</div>
            )}
            {passwordError && (
              <div className={styles.errorLabel}>{passwordError}</div>
            )}
            {confirmPasswordError && (
              <div className={styles.errorLabel}>
                {confirmPasswordError}
              </div>
            )}

            <input
              className={styles.inputStyle}
              name="email"
              type="email"
              placeholder=" Email"
              {...register('email')}
            />
            <br />
            <input
              className={styles.inputStyle}
              name="password"
              type="password"
              placeholder=" Password"
              {...register('password')}
            />
            <br />
            <input
              className={styles.inputStyle}
              name="confirmPassword"
              type="password"
              placeholder=" Confirm password"
              {...register('confirmPassword')}

            />
            <br />
            <button
              className={styles.btn}
              type="submit"
			  ref={confirmPasswordRef}
              disabled={!!emailError || !!passwordError || !!confirmPasswordError}
            >
              Register
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
