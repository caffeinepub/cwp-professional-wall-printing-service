import { Button } from "@/components/ui/button";
import { Film, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export default function VideoPlaceholder() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center animate-fade-in"
      style={{ animationDelay: "200ms" }}
    >
      {/* Animated rotating border container */}
      <div className="cloud-border-container">
        {/* Cloud-shaped mask wrapper */}
        <section
          className="cloud-mask-wrapper group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Видео демонстрация на печат на стени"
        >
          <div className="cloud-content overflow-hidden">
            {/* Fallback placeholder shown when video errors or is missing */}
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0B0B0F] via-[#0B0B0F]/95 to-[#0B0B0F] text-center px-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#FF007F]/10 border border-[#FF007F]/30 flex items-center justify-center">
                    <Film className="h-8 w-8 text-[#FF007F] opacity-80" />
                  </div>
                  <div>
                    <p className="text-[#E6E7EC] font-semibold text-base mb-1">
                      Видеото не е намерено
                    </p>
                    <p className="text-[#E6E7EC]/60 text-sm leading-relaxed">
                      Моля, качете{" "}
                      <code className="text-[#00BCD4] bg-[#00BCD4]/10 px-1.5 py-0.5 rounded text-xs font-mono">
                        video.mp4
                      </code>{" "}
                      в папка{" "}
                      <code className="text-[#FFD700] bg-[#FFD700]/10 px-1.5 py-0.5 rounded text-xs font-mono">
                        public/
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Local video */}
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setHasError(true)}
                  onLoadedData={() => setIsLoaded(true)}
                  aria-label="Демонстрация на вертикален стенен печат"
                />

                {/* Loading state */}
                {!isLoaded && !hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FF007F]/10 to-[#00BCD4]/10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1.2,
                        ease: "linear",
                      }}
                      className="w-10 h-10 border-2 border-[#00BCD4] border-t-transparent rounded-full"
                    />
                  </div>
                )}

                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/70 via-[#0B0B0F]/20 to-transparent pointer-events-none" />
              </>
            )}

            {/* Sound toggle button — only when video is loaded */}
            {!hasError && isLoaded && (
              <div className="absolute bottom-4 right-4 z-10">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleSound}
                  className="bg-[#0B0B0F]/70 border-[#00BCD4]/50 text-[#00BCD4] hover:bg-[#00BCD4]/10 backdrop-blur-sm text-xs gap-1.5 px-3"
                  aria-label={muted ? "Пусни звука" : "Спри звука"}
                >
                  {muted ? (
                    <>
                      <VolumeX className="h-3.5 w-3.5" /> Пусни звук
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5" /> Без звук
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
