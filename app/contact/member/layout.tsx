import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メンバー参加申請フォーム | 未来宇宙産業フォーラム(FSIF)',
  description: '未来宇宙産業フォーラム(FSIF)は、本気で宇宙産業と向き合い行動する学生を募集しています。面接エントリーはこちらから。',
  icons: {
    icon: '/CosmoBase/FSIF.png',
  },
  openGraph: {
    title: 'FSIF メンバー参加申請フォーム',
    description: '未来宇宙産業フォーラム(FSIF)は、本気で宇宙産業と向き合い行動する学生を募集しています。面接エントリーはこちらから。',
  　images: ['/CosmoBase/FSIF.png'], 
  },
};

export default function FSIFRecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
