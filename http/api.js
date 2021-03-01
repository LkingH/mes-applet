const {request}=require('./request.js');

// 基于业务封装的数据请求
module.exports={
  // 封装根据类型获取图片
   getPicByType:(type)=>{
     // console.log("根据类型获取图片方法")
     return request("/banner/pictures/" + type);
   },

  //  提交申请使用信息
   submitApplyInfo: (formData) => {
    return request(
      '/apply',
      'post',
      formData
    )
   },

   //  提交售后工单信息
   submitWorkOrderInfo: (formData) => {
    let { url } = formData;

    console.log('要提交的url是：',url);
    return request(
      '/work-order',
      'post',
      formData,
    )
   },

  // 移除图片
  removeFile: objectName => {
    console.log(objectName)
    return request(
      '/minio/delete',
      'post',
      'objectName='+objectName,
      'application/x-www-form-urlencoded'
    )
  },

  // 验证租户信息
  check : formData => {
    console.log(formData)

    let data = JSON.stringify(formData);
    console.log(data)

    return request(
      '/work-order/check',
      'post',
       data,
      'application/json'
    )
  },

  // 获取历史工单列表
  getHistoryOrder: requestParams => {
    return request(
      '/work-order',
      'get',
      requestParams,
      'application/x-www-form-urlencoded'      
    )
  },

  // 根据ID获取工单处理结果信息
  getResultById: id => {
  console.log(id)

  return request(
    '/work-order/result-info/' + id,
    'get',
    "application/x-www-form-urlencoded"
  )
 }
 
}