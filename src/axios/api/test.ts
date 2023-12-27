import { get } from "../index";
export const wyTop = (params?: any) =>
  get("https://api.wer.plus/api/wytop", params);
