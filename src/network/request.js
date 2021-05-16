import axios from 'axios'

//假设后面axios框架出了问题，只需要导入新的例如Android框架，然后在export function request（config）{里换成Android代码 就可以 }
//最终方案2.0
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  //2.axios的拦截器 interceptors拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  //3.发送真正的网络请求
  //instance(config)本身是一个promise，所以在后面再加then,没什么意义，因为在main.js里也会加then
  return instance(config)

}

