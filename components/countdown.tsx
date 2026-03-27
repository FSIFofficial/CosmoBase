"use client";

import { useState, useEffect } from "react";
import { Clock, Rocket, Sparkles } from "lucide-react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  // 🔥 追加：オープンしたかどうかを判定するスイッチ
  const [isOpened, setIsOpened] = useState(false); 

  useEffect(() => {
    setIsMounted(true);
    // ターゲット日時「2026年4月1日 00:00:00」
    const targetDate = new Date("2026-04-01T00:00:00+09:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // 🔥 オープン時間を過ぎたら、タイマーを止めて「オープン状態」にする！
      if (distance < 0) {
        clearInterval(timer);
        setIsOpened(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return <div className="h-32 w-full"></div>;

  // ==========================================
  // 🌟 分岐A：オープン後の「お祝い画面」
  // ==========================================
  if (isOpened) {
    return (
      <section className="relative z-20 -mt-12 mb-20 flex justify-center px-4 md:px-6 w-full max-w-4xl mx-auto animate-in fade-in duration-700">
        {/* Cosmo Base風の背景グラデーションと枠線 */}
        <div className="bg-gradient-to-br from-[#83CBEB]/10 via-[#000033] to-[#EEEEBB]/10 rounded-2xl p-8 md:p-12 flex flex-col items-center shadow-[0_0_40px_rgba(131,203,235,0.15)] border border-[#83CBEB]/30 w-full text-center">
          
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="w-8 h-8 text-[#EEEEBB] animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] tracking-wider drop-shadow-md">
              Cosmo Base <span className="text-[#83CBEB]">OPEN!</span>
            </h2>
            <Sparkles className="w-8 h-8 text-[#EEEEBB] animate-pulse" />
          </div>
          
          <p className="text-[#EEEEFF]/80 font-sans md:text-lg mb-10 leading-relaxed">
            宇宙を、楽しむ。あなたのご参加をお待ちしています！
          </p>

          <a href="https://discord.gg/spv3TBRpFU" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-block">
            <button className="group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 w-full bg-[#83CBEB] hover:bg-[#83CBEB]/90 text-[#000033] font-sans font-bold text-lg shadow-[0_0_20px_rgba(131,203,235,0.3)] transform transition-all hover:scale-105">
              <Rocket className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              コミュニティーに参加する
            </button>
          </a>
        </div>
      </section>
    );
  }

  // ==========================================
  // ⏳ 分岐B：オープン前の「カウントダウン画面」
  // ==========================================
  return (
    <section className="relative z-20 -mt-12 mb-20 flex justify-center px-4 md:px-6 w-full max-w-4xl mx-auto">
      <div className="bg-[#000033]/80 backdrop-blur-md rounded-2xl p-6 md:p-10 flex flex-col items-center shadow-[0_0_30px_rgba(131,203,235,0.1)] border border-[#83CBEB]/30 w-full">
        
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-6 h-6 text-[#EEEEBB] animate-pulse" />
          <h2 className="text-base md:text-xl font-serif text-[#EEEEFF] tracking-widest">
            Cosmo Base 正式オープンまで
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full font-sans">
          {/* 日 */}
          <div className="flex flex-col items-center w-16 sm:w-20 md:w-24">
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEEEFF] drop-shadow-[0_0_15px_rgba(131,203,235,0.4)] tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-[#83CBEB] mt-2 font-bold tracking-widest">DAYS</span>
          </div>
          <span className="text-3xl sm:text-5xl md:text-6xl font-light text-[#83CBEB]/40 animate-pulse pb-6 md:pb-8">:</span>

          {/* 時間 */}
          <div className="flex flex-col items-center w-16 sm:w-20 md:w-24">
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEEEFF] drop-shadow-[0_0_15px_rgba(131,203,235,0.4)] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-[#83CBEB] mt-2 font-bold tracking-widest">HOURS</span>
          </div>
          <span className="text-3xl sm:text-5xl md:text-6xl font-light text-[#83CBEB]/40 animate-pulse pb-6 md:pb-8">:</span>

          {/* 分 */}
          <div className="flex flex-col items-center w-16 sm:w-20 md:w-24">
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEEEFF] drop-shadow-[0_0_15px_rgba(131,203,235,0.4)] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-[#83CBEB] mt-2 font-bold tracking-widest">MINS</span>
          </div>
          <span className="text-3xl sm:text-5xl md:text-6xl font-light text-[#83CBEB]/40 animate-pulse pb-6 md:pb-8">:</span>

          {/* 秒 */}
          <div className="flex flex-col items-center w-16 sm:w-20 md:w-24">
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEEEFF] drop-shadow-[0_0_15px_rgba(131,203,235,0.4)] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm text-[#83CBEB] mt-2 font-bold tracking-widest">SECS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
