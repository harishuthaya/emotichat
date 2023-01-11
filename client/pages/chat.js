import Head from 'next/head';
import Link from 'next/link';
import { ChatInterface } from '../components/ChatInterface';
import { GetRoom } from '../components/GetRoom';

const chat = () => {
  const room = GetRoom();
  let title = 'Room';
  if (room) title = `Room: ${room}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Chatting made easier to understand using emotion prediction!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-800 min-h-screen">
        <nav className="px-6 py-4 mb-10 flex justify-between text-white text-lg bg-teal-700 rounded">
          <h1>EmotiChat</h1>
          <h1 className="">Room: {room}</h1>
          <Link href="/">Exit</Link>
        </nav>
        <ChatInterface />
      </main>
    </>
  );
};

export default chat;
