import { useState, useEffect } from "react";

const BASE_URL = `https://degen-lullaby.s3.us-east-2.amazonaws.com`;

const urls = [
  `${BASE_URL}/0.wav`,
  `${BASE_URL}/1.wav`,
  `${BASE_URL}/2.wav`,
  `${BASE_URL}/3.wav`,
  `${BASE_URL}/4.wav`,
  `${BASE_URL}/5.wav`,
  `${BASE_URL}/6.wav`,
  `${BASE_URL}/7.wav`,
  `${BASE_URL}/8.mp3`,
  `${BASE_URL}/9.wav`,
  `${BASE_URL}/10.wav`,
  `${BASE_URL}/11.wav`,
  `${BASE_URL}/12.m4a`,
  `${BASE_URL}/13.wav`,
  `${BASE_URL}/1up.mp3`, // 14
  `${BASE_URL}/bonus-1.mp3`, // 15
  `${BASE_URL}/bonus-2.mp3`, // 16
  `${BASE_URL}/bonus-3.mp3` // 17
];

const audioSources =
  urls.map(url => {
    const audio = new Audio(url);
    audio.volume = 0.69;
    audio.oncanplaythrough = false;
    return {
      url,
      audio,
    }
  });

export const useMultiAudio = () => {
  const [sources] = useState(audioSources);
  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url,
        playing: false,
      }
    }),
  )

  const toggle = (targetIndex) => {
    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
  }

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause()
    })
  }, [sources, players])

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
    // eslint-disable-next-line
  }, [])

  return [toggle]
}
