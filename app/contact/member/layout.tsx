import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メンバー参加申請 | 未来宇宙産業フォーラム(FSIF)',
  description: '未来宇宙産業フォーラム(FSIF)は、本気で宇宙産業と向き合い行動する学生を募集しています。面接エントリーはこちらから。',
  openGraph: {
    title: 'FSIF メンバー参加申請',
    description: '未来の宇宙産業を、共に創る。学生主体の宇宙産業フォーラムの面接エントリーを受付中です。',
    // FSIF専用のOGP画像があればここへ
    // images: ['/images/fsif-recruit-ogp.png'], 
  },
};

export default function FSIFRecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
