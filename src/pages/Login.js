import React, { useState } from 'react';
import '../css/register.css';
import PropTypes from 'prop-types';

const Login = ({ setUser, setLoggedIn }) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  function Login(e) {
    e.preventDefault();
    setLoggedIn(true);
    let userdata = {
      username: username,
      password: password,
    };
    setUser(userdata);
    localStorage.setItem('user', JSON.stringify(userdata));
  }

  return (
    <div>
      <form onSubmit={Login} className='login-container'>
        <a className='logo text-center'>MDMA</a>
        <h1 className='text-center text-light'>Login</h1>

        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            name='username'
            placeholder='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <span>
          Don&apos;t have an account yet?{' '}
          <a href="<?= route('register'); ?>">Register now.</a>
        </span>

        <div className='btn-right'>
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.function.isRequired,
  setLoggedIn: PropTypes.function.isRequired,
};

export default Login;
