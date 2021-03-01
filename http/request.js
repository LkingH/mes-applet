const { baseUrl } = require('./env.js').prod

module.exports={
  /*
  二次封装wx.request 
  {String }url:请求的接口地址 
  {String} method:请求方式 GET,POST.... 
  {Object} data:要传递的参数 
  { String }head:请求头
  */
  request:(url,method,data,contentType)=>{
    return new Promise((resolve,reject)=>{
      console.log('这是我封装的ajax请求',baseUrl);
      // http://localhost:8089/banner/pictures/CAROUSEL
      // 拼接
      let _url=`${baseUrl}${url}`;
      // console.log(_url)
      wx.request({
        url:_url,
        data:data,
        method:method,
        header: {
          'content-type':contentType ? contentType : ''
        },
        success:res=>{
          resolve(res.data)
        },
        fail:err => {
          wx.showToast({
            title: '接口调用失败！',
            icon: 'error'
          })
          console.log(err);
          reject(err);
        }
      })
    })
  }
}
