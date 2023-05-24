import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    width: '100%',
    playerVars: {},
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubePlayer;
