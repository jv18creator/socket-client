'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import '../styles.css';
import { io } from 'socket.io-client';

interface PageParams {
  id: string;
}

interface TChatPage {
  params: PageParams;
}

interface TVideo {
  srcObject: MediaStream | null;
}

export default function ChatPage(props: TChatPage) {
  const roomID = props?.params?.id;
  const userVideo = useRef<TVideo>({ srcObject: null });
  const partnerVideo = useRef<TVideo>({ srcObject: null });
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef<MediaStream | null>();

  const socket = io('http://localhost:8081');

  const handleSubmit = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userStream.current = stream;
        userVideo.current.srcObject = stream;
        console.log(`roomID`, roomID);
        // socketRef.current = socket.connect('/');
        socket.emit('join room', roomID);

        socket.on('other user', (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socket.on('user joined', (userID) => {
          otherUser.current = userID;
        });
      })
      .catch((error) => {
        console.log('error while getting user media: ', error);
      });
  }, []);

  function callUser(userID: string) {
    // peerRef.current = createPeer(userID);
    // userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
  }

  // socket.emit('chat message', 'lol');

  return (
    <>
      <div>
        <video ref={userVideo} autoPlay></video>
        <video ref={partnerVideo} autoPlay></video>
      </div>
      <ul id='messages'></ul>
      <form onSubmit={handleSubmit} id='form'>
        <input
          autoFocus
          className='p-2 border-blue-400 border-2 border-l-2 w-full outline-none bg-transparent'
          id='input'
        />
        <button>Send</button>
      </form>
    </>
  );
}
