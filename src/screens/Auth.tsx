import React, { useState } from 'react';
import { supabase } from '../supabase';
import useAuthStore from '../store/authStore';

const Auth: React.FC = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (type: 'login' | 'signup') => {
    try {

      const { data, error } = type === 'login' ? 
        await supabase.auth.signInWithPassword({ email, password }) : 
        await supabase.auth.signUp({ email, password });

        login({user_info: data?.user, authenticated: true});
        if (error) throw error;
        setError(null);

    } catch (error: any) {
        setError(error.message);
        console.error('Error:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>{'Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        style={{ width: 300 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin('login')}>Login</button>
      {/* <button onClick={() => handleLogin('signup')}>Sign Up</button> */}
    </div>
  );
};

export default Auth;