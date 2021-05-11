import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'components/Loader';

function Auth() {
  const location = useLocation();
  console.log(Array.from((new URLSearchParams(location.search)).entries()).join('\n'));

  return <Loader message="Authenticating" paddingBottom />;
}

export default Auth;
