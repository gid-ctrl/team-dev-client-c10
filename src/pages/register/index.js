import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './register.css';

const Register = () => {
  const { onRegister, onLogin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (value === '') {
        setEmailError('Email address is required');
      } else if (!validateEmail(value)) {
        setEmailError('Invalid email address');
      } else {
        setEmailError('');
      }
    } else if (name === 'password') {
      if (value === '') {
        setPasswordError('Password is required');
      } else if (!validatePassword(value)) {
        setPasswordError(
          'Password must contain at least eight characters, including at least one capital letter, one number and one special character'
        );
      } else {
        setPasswordError('');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegister(formData.email, formData.password);
      await onLogin(formData.email, formData.password, "/verification");
    } catch (error) {
      setRegistrationError('Email address already in use, please log in.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-blue register credentialpage">
        <CredentialsCard
          title="Register"
          socialLinksTitle="Or sign up with"
          altButtonTitle="Already a user?"
          altButtonLink="/login"
          altButtonText="Log in"
        >
          <div className="register-form">
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="email"
              name="email"
              label="Email *"
              error={emailError}
            />
            <span className="error-message">{emailError}</span>
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label="Password *"
              type="password"
              error={passwordError}
            />
            <span className="error-message">{passwordError}</span>
          </div>
          <Button
            text="Sign up"
            type="submit"
            classes="green width-full"
            disabled={emailError !== '' || passwordError !== ''}
          />
          <span className="error-message">{registrationError}</span>
        </CredentialsCard>
      </div>
    </form>
  );
};

export default Register;
