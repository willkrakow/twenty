import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/auth/hooks/useAuth';
import { useIsLogged } from '@/auth/hooks/useIsLogged';

import { AppPath } from '../../modules/types/AppPath';

export function Verify() {
  const [searchParams] = useSearchParams();
  const loginToken = searchParams.get('loginToken');

  const isLogged = useIsLogged();
  const navigate = useNavigate();

  const { verify } = useAuth();

  useEffect(() => {
    async function getTokens() {
      if (!loginToken) {
        navigate(AppPath.SignIn);
      } else {
        await verify(loginToken);
      }
    }

    if (!isLogged) {
      getTokens();
    }
    // Verify only needs to run once at mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
