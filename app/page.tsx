'use client';
import Paragraph from '@/app/components/Paragraph';
import useAppTheme from '@/styles/useAppTheme';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import AuthButton from './components/AuthButton';
import { signIn, useSession } from 'next-auth/react';
import UserChatHistory from './components/UserChatHistory';

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<Boolean>(false);
  const [name, setName] = useState<string>('');
  const { status, data } = useSession();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setName(value);
      if (error && value) {
        setError(false);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (!name) {
        setError(true);
        return;
      }

      const id = uuid();
      router.push(`/chat/${id}`);
    },
    [name, router]
  );

  const { setDarkTheme } = useAppTheme();

  useEffect(() => {
    setDarkTheme();
  }, [setDarkTheme]);

  if (status !== 'authenticated') {
    signIn();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center mx-4'>
      <div className='relative gap-4 max-w-md w-full flex-col items-center justify-center font-mono text-sm flex'>
        <Paragraph info={`Hello, ${data?.user?.name}`} className='text-xl' />
        <Paragraph info='Please join or create a room to continue.' />
        <form onSubmit={handleSubmit} className='w-full relative'>
          <input
            autoFocus
            value={name}
            onChange={handleChange}
            placeholder='Jeet V.'
            className='p-2 border-blue-400 border-b-2 border-l-2 w-full outline-none bg-transparent'
          />
          <AiOutlineSend
            className={`transition-all cursor-pointer duration-500 absolute right-0 top-1/2 -translate-y-1/2 transform ${
              !name ? 'translate-x-10 opacity-0' : 'translate-x-0 opacity-100'
            }`}
          />
        </form>
        <div className='w-full flex flex-col gap-3'>
          <div className='flex items-center'>
            <div className='flex-grow border-t border-gray-400'></div>
            <span className='flex-shrink mx-4 text-gray-400'>OR</span>
            <div className='flex-grow border-t border-gray-400'></div>
          </div>
          <button className='w-full rounded-xl bg-white text-black py-1'>
            CREATE ROOM
          </button>
        </div>
        <Paragraph
          className={`text-red-300 text-center uppercase absolute -bottom-[80%] transform transition-all ${
            error ? 'translate-y-10 opacity-100' : 'translate-y-0 opacity-0'
          }`}
          info="Oops, you've to enter CHAT ROOM to continue :)"
        />
        <UserChatHistory />
      </div>
    </main>
  );
}
