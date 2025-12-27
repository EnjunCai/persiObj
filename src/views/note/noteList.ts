// 只保留接口定义
export interface noteItem {
  id: number; // 数据库通常是 number 或 string(uuid)
  title: string;
  text: string;
  tags: string[]; // 数据库对应 tags
  router?: string;
  detail: any; // 或者你可以定义更详细的 Markdown Token 类型
  created_at?: string;
}
