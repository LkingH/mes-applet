//设置公共访问url，即环境地址 
//commonJS写法--node采用就是该规范 引入require
module.exports={
  //开发环境
  dev:{
    baseUrl:"http://localhost:8089"
  },
  //测试环境
  test:{
    baseUrl:"http://www.text.com"
  },
  //线上url
  prod:{
    baseUrl:"http://49.234.138.76:8080/"
  }
} 
