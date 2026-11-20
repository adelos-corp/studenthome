'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function GoogleSignInButton() {
  const [error, setError] = useState('');

  const signIn = async () => {
    setError('');
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (authError) setError(authError.message);
  };

  return (
    <div className="google-auth-wrap">
      <button className="google-auth-button" type="button" onClick={signIn}>
        <span className="google-g" aria-hidden="true">G</span>
        Continue with Google
      </button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}
