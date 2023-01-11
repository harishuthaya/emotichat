import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <>
      <Head>
        <title>Join - EmotiChat</title>
        <meta
          name="description"
          content="Chatting made easier to understand using emotion prediction!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-800">
        <div className="flex items-center justify-center h-screen">
          <form className="bg-teal-700 w-full max-w-xs rounded px-8 py-4">
            <p className="text-white text-center text-lg font-bold pb-2">
              Welcome to EmotiChat
            </p>
            <label className="block text-white text-sm font-bold mb-2">
              Username
            </label>
            <input
              onChange={(event) => setName(event.target.value)}
              className="shadow appearance-none border rounded w-full py-1 px-3 mb-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="John Doe"
            ></input>
            <label className="block text-white text-sm font-bold mb-2">
              Room Code
            </label>
            <input
              onChange={(event) => setRoom(event.target.value)}
              className="shadow appearance-none border rounded w-full py-1 px-3 mb-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="abc123"
            ></input>
            <Link
              onClick={(event) =>
                !name || !room ? event.preventDefault() : null
              }
              href={`/chat?name=${name}&room=${room}`}
              className="flex justify-center"
            >
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
              >
                Join
              </button>
            </Link>
          </form>
        </div>
      </main>
    </>
  );
}
