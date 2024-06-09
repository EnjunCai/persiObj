import { get } from "../index";
export const sjMusic = (params?: any) =>
  get("https://api.ovooa.cc/api/NetEase_random_songs/", params);

export const wytop = (params?: any) =>
  get(" https://api.wer.plus/api/wytop", params);

export const textC = () => get("/api/get");
