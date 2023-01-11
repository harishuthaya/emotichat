import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputBar } from './InputBar';
import { AllMessages } from './AllMessages';
import io from 'socket.io-client';

let socket;
let userId;

export const ChatInterface = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [title, setTitle] = useState('Chat Room');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const ENDPOINT = process.env.ENDPOINT || 'http://localhost:4000';

  useEffect(() => {
    const { name, room } = router.query;
    if (!name || !room) {
      return;
    }
    setName(name);
    setRoom(room);
    setTitle(`Room ${room}`);
    socket = io(ENDPOINT);
    socket.emit('join', { name, room }, (id, dbRoom) => {
      userId = id;
      if (dbRoom) {
        setMessages((msgs) => [...dbRoom.messages, ...msgs]);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, router.query]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        setMessages([...messages, newMessage]);
      });
    }
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <AllMessages messages={messages} userId={userId} />
      <InputBar
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};
