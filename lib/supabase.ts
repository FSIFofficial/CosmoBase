import { createClient } from "@supabase/supabase-js"

// ブラウザから直接Storageにアップロードするためのクライアント(匿名キーのみ使用)。
// NEXT_PUBLIC_* は静的書き出し(output: 'export')時にビルドバンドルへ埋め込まれる値。
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null
