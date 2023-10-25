import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { IUser } from '@/interfaces';
import { loginUser } from '@/api';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof IUser) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const handleLogin = async () => {
    if (user.username === '' && user.password === '') {
      setError('Fields are empty');
      return;
    }
    try {
      const response = await loginUser(user);
      if (response.status === 200) {
        router.push('/table');
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Username error:', error);
      setError('Incorrect username or password');
    }
  };

  return (
    <div className='text-center mt-10'>
      <h1>Log In</h1>
      <div>
        <input
          type='text'
          placeholder='Логін'
          value={user.username}
          onChange={e => handleInputChange(e, 'username')}
          className='border-2 outline-none p-2'
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Пароль'
          value={user.password}
          onChange={e => handleInputChange(e, 'password')}
          className='border-2 outline-none p-2 mt-2'
        />
      </div>
      <button onClick={handleLogin} className='bg-indigo-500 text-white p-4 w-48 mt-2'>
        Log In
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
