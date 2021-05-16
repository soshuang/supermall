//配置别名
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        //默认已经配置了'@':'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}