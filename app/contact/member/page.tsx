'use client';

import { useState, FormEvent } from 'react';

export default function FSIFApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // メールアドレスの確認
    if (email !== emailConfirm) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      // GoogleフォームへのPOST送信 (no-corsモードでCORSエラーを回避)
      await fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd0hkCirAnCatz9GA0pPwOF53zzgTlaJaWrjmCxOuD-gCmK_w/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        }
      );
      
      // no-corsの場合、成功ステータスは不透明（opaque）になりますが、エラーがthrowされなければ送信完了とみなします
      setIsSubmitted(true);
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。通信環境をご確認ください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="bg-[#115525] text-green-700 p-6 rounded-lg font-bold">
            送信が完了しました。ご応募ありがとうございます。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-[#115525] mb-2">メンバー参加申請フォーム</h1>
        <p className="text-sm text-gray-600 mb-8">
          未来宇宙産業フォーラム(FSIF)の活動に興味をお持ちいただきありがとうございます。<br />
          未来宇宙産業フォーラムのメンバーになるため1度面接をさせていただきます。
        </p>

        <form onSubmit={handleSubmit}>
          {/* 氏名 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">氏名</label>
            <p className="text-xs text-gray-500 mb-2">姓と名の間に半角のスペースを入れてください。</p>
            <input
              type="text"
              name="entry.1652587137"
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            />
          </div>

          {/* ふりがな */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              ふりがな <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">姓と名の間に半角のスペースを入れてください。</p>
            <input
              type="text"
              name="entry.212276738"
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            />
          </div>

          {/* 大学名 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              大学名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="entry.955853841"
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            />
          </div>

          {/* 学部学科名 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              学部学科名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="entry.648858915"
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            />
          </div>

          {/* メールアドレス */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">メールアドレス</label>
            <input
              type="email"
              name="entry.1109815842"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            />
          </div>

          {/* メールアドレス(確認用) */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">メールアドレス(確認用)</label>
            <p className="text-xs text-gray-500 mb-2">コピーせず、改めてメールアドレスを記入してください。</p>
            <input
              type="email"
              name="entry.1896096456"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">メールアドレスが一致しません。</p>
            )}
          </div>

          {/* 学年 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">学年</label>
            <p className="text-xs text-gray-500 mb-2">
              未来宇宙産業フォーラムは大学、大学院の学生のみメンバーとして活動が可能です。<br />
              高校生以下は参加できないため是非大学に入るまでCosmo Baseで宇宙に対する興味を深めてください(^▽^)/<br />
              高専生は大学の相当のボタンを選択してください。
            </p>
            <select
              name="entry.2080060403"
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none bg-white"
            >
              <option className="text-gray-500">学年を選んでください。</option>
              <option value="大学1年">大学1年</option>
              <option value="大学2年">大学2年</option>
              <option value="大学3年">大学3年</option>
              <option value="大学4年">大学4年</option>
              <option value="博士前期課程1年">博士前期課程1年</option>
              <option value="博士前期課程2年">博士前期課程2年</option>
              <option value="博士後期課程1年">博士後期課程1年</option>
              <option value="博士後期課程2年">博士後期課程2年</option>
              <option value="博士後期課程3年">博士後期課程3年</option>
              <option value="__other_option__">その他</option>
            </select>
          </div>

          {/* 参加を希望する理由 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">参加を希望する理由を教えてください</label>
            <textarea
              name="entry.1522023095"
              rows={3}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
            ></textarea>
          </div>

          {/* 活動可能な曜日と時間帯 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">活動可能な曜日と時間帯</label>
            
            <div className="mb-3 border p-4 rounded-md">
              <span className="block font-medium mb-2">平日</span>
              <label className="inline-flex items-center mr-4 cursor-pointer">
                <input type="checkbox" name="entry.1239146955" value="午前" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">午前</span>
              </label>
              <label className="inline-flex items-center mr-4 cursor-pointer">
                <input type="checkbox" name="entry.1239146955" value="午後" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">午後</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" name="entry.1239146955" value="夜間" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">夜間</span>
              </label>
            </div>
            
            <div className="border p-4 rounded-md">
              <span className="block font-medium mb-2">土日祝</span>
              <label className="inline-flex items-center mr-4 cursor-pointer">
                <input type="checkbox" name="entry.913061501" value="午前" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">午前</span>
              </label>
              <label className="inline-flex items-center mr-4 cursor-pointer">
                <input type="checkbox" name="entry.913061501" value="午後" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">午後</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" name="entry.913061501" value="夜間" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">夜間</span>
              </label>
            </div>
          </div>

          {/* 当団体を何で知りましたか */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">当団体を何で知りましたか</label>
            <div className="space-y-2">
              <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="entry.1927226052" value="SNS" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">SNS</span>
              </label><br />
              <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="entry.1927226052" value="知人の紹介" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">知人の紹介</span>
              </label><br />
              <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="entry.1927226052" value="ウェブサイト" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">ウェブサイト</span>
              </label><br />
              <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="entry.1927226052" value="その他" className="text-[#5746e3] h-4 w-4" />
                <span className="ml-2">その他</span>
              </label>
            </div>
          </div>

          {/* 面接の希望日時 */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              面接の希望日時を記入してください <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">
              例：<br />
              6月29日10:00~22:00<br />
              6月30日22:00~24:00<br />
              7月2日9:00~12:00<br /><br />
              ※時間は24時まで可能です。また、土日も可能となります。<br />
              可能な限り多くの時間を指定いただけますと幸いです。<br />
              また、希望時間に対応できない場合は別途調整のご連絡をさせていただく場合がございます。
            </p>
            <textarea
              name="entry.1628765126"
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            ></textarea>
          </div>

          {/* メンバーの参加動機 */}
          <div className="mb-8">
            <label className="block font-semibold mb-2">
              メンバーの参加動機 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="entry.1362519177"
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-[#5746e3] focus:ring-1 focus:ring-[#5746e3] outline-none"
              required
            ></textarea>
          </div>

          {/* 送信ボタン */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#115525] hover:bg-[#115525]/50 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
