import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import Loader from 'components/Loader';
import Message from 'components/Message';

function Auth() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const history = useHistory();
  const auth = getAuth();

  // Auth state hook
  const [authError, setAuthError] = useState<string | null>(params.get('failed') ? 'We couldn\'t log you in' : null);

  useEffect(() => {
    async function signIn() {
      try {
        // Ensure we're not already signed in
        if (!auth.currentUser && params.get('token') && !authError) {
          console.log('Signing in...');
          await signInWithCustomToken(auth, params.get('token') || '');

          // Go back to home
          history.push('/');
        } else {
          setAuthError(auth.currentUser ? 'Already logged in' : 'No token provided');
        }
      } catch (error) {
        // Log the error to the console and update the error state
        console.error(error);
        setAuthError(error.message);
      }
    }

    // Start the sign in process
    signIn();
  }, []);

  if (authError) return <Message title="Authentication Error" subtitle={authError} paddingBottom />;
  return <Loader message="Authenticating" paddingBottom />;
}

export default Auth;
