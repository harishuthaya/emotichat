import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const GetRoom = () => {
  const [room, setRoom] = useState();
  const router = useRouter();
  const ENDPOINT = process.env.ENDPOINT;

  useEffect(() => {
    const { room } = router.query;
    if (room) setRoom(room);
  }, [ENDPOINT, router.query]);

  return room;
};
