import axios, { type InternalAxiosRequestConfig } from "axios";

/**
 * 取消请求的机制（用于取消重复请求接口）
 * */
const pendingQueue = new Map();
const CancelToken = axios.CancelToken;
// 判断请求是否在队列中，如果在就对队列中的该请求执行取消操作
const judgePendingFunc = function (config: InternalAxiosRequestConfig<any>) {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.get(`${config.method}->${config.url}`)(); //注意这里的括号不要漏掉
  }
};
// 删除队列中对应已执行的请求
const removeResolvedFunc = function (config: InternalAxiosRequestConfig<any>) {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.delete(`${config.method}->${config.url}`);
  }
};

/**
 * 不需要显示加载动画的api
 */
const notLoadUrl: (string | undefined)[] = [];

interface ResponseData {
  code: number;
  data: any;
  message: string;
}

// 创建axios实例
const service = axios.create({
  baseURL: "xxxxxx:8080", // api的base_url
  timeout: 6000, // 请求超时时间
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    judgePendingFunc(config); // 请求发起之前先调用removeResolvedFunc方法
    // 将pending队列中的请求设置为当前
    config.cancelToken = new CancelToken((cb) => {
      pendingQueue.set(`${config.method}->${config.url}`, cb); // cb就是取消该请求的方法，调用它就能cancel掉当前请求
    });
    // if (!notLoadUrl.includes(config.url)) xxxxxx; // 加载动画开始

    // token
    // const token = `Bearer ${sessionStorage.getItem('token')}`
    // if (token) config.headers['Authorization'] = token
    return config;
  },
  (error: any) => {
    // 加载动画结束及错误信息提示
    // xxxxxx
    console.log("请求错误信息", error);
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    removeResolvedFunc(response.config); // 调用removeResolvedFunc在队列中删除执行过的请求
    if (!notLoadUrl.includes(response.config.url))
      // xxxxxx  // 加载动画结束
      //   const res = response.data as ResponseData;
      return response.data;
    //   const res = response.data as ResponseData;
    // if (res.code === 0) return res.data || {};
    // else return Promise.reject(res.message || "请求失败"); // 统一处理错误
  },
  (error: any) => {
    // 加载动画结束及错误信息提示
    // xxxxxx
    console.log("响应错误信息", error);
    // 统一处理错误
    return Promise.reject(error);
  }
);
// 封装get请求
export const get = (url: string, params?: any) => {
  return service.get(url, { params });
};
// 封装post请求
export const post = (url: string, data?: any) => {
  return service.post(url, data);
};
