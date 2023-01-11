import { useEffect, useRef } from 'react';
import { Message } from './Message';

export const AllMessages = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[82vh] flex-auto overflow-auto">
      {messages.map((message, index) => (
        <div key={index}>
          <Message message={message} userId={userId} />
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
