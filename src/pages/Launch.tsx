import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const REDIRECT_URL = 'https://t.ly/golgiris';
const LOGO = 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/golbet-rb-beyaz-_3_.png';

export default function Launch() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#071d2a] flex flex-col items-center justify-center px-4">
      <div className={`transition-opacity duration-500 ${showButton ? 'opacity-100' : 'opacity-100'}`}>
        <img src={LOGO} alt="Golbet" className="h-20 sm:h-24 mb-8 mx-auto" />
      </div>

      {!showButton ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#5ba3e6] animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 rounded-full bg-[#5ba3e6] animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 rounded-full bg-[#5ba3e6] animate-bounce [animation-delay:300ms]" />
        </div>
      ) : (
        <a
          href={REDIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,97,176,0.4)] animate-fade-in"
        >
          <span>Golbet'e Git</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}
