// components/SessionProviderWrapper.tsx

import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderWrapperProps {
  children: ReactNode;
}

const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({ children }) => {
    const { data: session } = useSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;