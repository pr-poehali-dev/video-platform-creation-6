import { useEffect, useState } from 'react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    const numberTimer = setTimeout(() => {
      setShowNumber(true);
    }, 800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(numberTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
      <div className="relative">
        <div className="flex items-center gap-4">
          <h1 className="font-heading font-bold text-6xl md:text-8xl text-white animate-fade-in">
            VITAnet
          </h1>
          <span
            className={`font-heading font-bold text-6xl md:text-8xl text-white transition-all duration-700 ${
              showNumber
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-50 -translate-x-8'
            }`}
          >
            2
          </span>
        </div>
        <div className="absolute -inset-20 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}
