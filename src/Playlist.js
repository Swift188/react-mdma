import React from 'react';
import { useParams } from 'react-router';

const Playlist = () => {
  let { playlistId } = useParams();
  return <div>ID: {playlistId}</div>;
};

export default Playlist;
