'use client';

import { useSession } from 'next-auth/react';
import Paragraph from './Paragraph';

export default function UserChatHistory() {
  const { status, data } = useSession();
  return (
    <div className='flex flex-col self-start'>
      <Paragraph info={`History`} className='text-lg text-left' />
    </div>
  );
}
