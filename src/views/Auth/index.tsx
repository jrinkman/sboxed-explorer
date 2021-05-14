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

  useEffect(() => {
    async function signIn() {
      try {
        // Ensure we're not already signed in
        if (!auth.currentUser && params.get('token')) {
          console.log('Signing in...');
          await signInWithCustomToken(auth, params.get('token') || '');
        }

        // Navigate away
        history.push('/');
      } catch (error) {
        // Log the error to the console and navigate away
        console.error(error);
        history.push('/');
      }
    }

    // Start the sign in process
    signIn();
  }, []);
  return <Loader message="Authenticating" />;
}

export default Auth;
