import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-login-token', token);
    }
  }, [result.data]); // eslint-disable-line

  const handleOnSubmit = (event) => {
    event.preventDefault();
    login({ variables: { loginUsername: username, loginPassword: password } });
    setUsername('');
    setPassword('');
  };

  if (!show) return null;

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>
          <span>Username</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Password</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </label>
      </div>
      <div>
        <button>Login in</button>
      </div>
    </form>
  );
};

export default LoginForm;
