'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className='p-2 px-4 border-2 border-orange-300'
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
};

export default AuthButton;
