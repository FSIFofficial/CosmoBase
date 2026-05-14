"use client";

import { useState, useEffect } from "react";

interface AutoLinkProps {
  children: React.ReactNode;
  // 何も指定しなかった場合のデフォルトの飛び先
  comingSoonUrl?: string; 
  openUrl?: string;       
}

export function AutoLink({
  children,
  comingSoonUrl = "https://fsifofficial.github.io/CosmoBase/coming-soon",
  openUrl = "https://discord.gg/spv3TBRpFU", // 🔥 あなたのDiscord本番URL
}: AutoLinkProps) {
  // 初期状態はとりあえず「Coming Soon」にしておく
  const [href, setHref] = useState(comingSoonUrl);

  useEffect(() => {
    // ターゲット日時「2026年4月1日 00:00:00」
    const targetDate = new Date("2026-04-01T00:00:00+09:00").getTime();

    const checkTime = () => {
      if (new Date().getTime() >= targetDate) {
        setHref(openUrl); // 4/1を過ぎていたら本番リンクへ切り替え！
      } else {
        setHref(comingSoonUrl);
      }
    };

    checkTime(); // 画面が表示された瞬間に判定

    // 画面を開きっぱなしで4/1を迎えたユーザーのために、裏で1秒ごとに見張る
    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, [comingSoonUrl, openUrl]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
