import { createClient } from "@supabase/supabase-js";

// 请确保在项目根目录的 .env 文件中填入这两个变量
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase 环境变量未设置，请检查 .env 文件");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
