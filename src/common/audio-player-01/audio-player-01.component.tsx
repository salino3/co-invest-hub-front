import React, { useRef, useState, useEffect } from "react";

export const BossaAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // comienza en reproducción automática

  useEffect(() => {
    // Reproduce automáticamente al cargar
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay falló:", err);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Play falló:", err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      id="musicBosaNova"
      className="bg-white rounded-xl p-6 shadow-md text-center max-w-md mx-auto"
    >
      <h5 className="text-xl font-bold mb-4">🎵 Brisa del Mar</h5>

      <button
        onClick={togglePlay}
        className="px-4 py-2 mb-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
      >
        {isPlaying ? "⏸️ Pausar" : "▶️ Reproducir"}
      </button>

      <audio ref={audioRef} loop src="/assets/audios/style_Bossa_Nova.mp3" />
    </div>
  );
};
