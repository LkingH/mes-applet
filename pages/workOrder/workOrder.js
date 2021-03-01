// pages/workOrder/workOrder.js

const { removeFile,submitWorkOrderInfo,check } = require('../../http/api')
const { baseUrl } = require('../../http/env.js').prod

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    urlList: [],
    feedbackStatus: '1',
    show: false, //控制弹出层
    lesseeCode:'',
    adminAccount:'',
    adminPassword:''
  },

  // 监听租户代码输入
  lesseeCodeInput(e) {
    this.setData({
      lesseeCode: e.detail
    })
  },
  // 监听管理员账号输入
  adminAccountInput(e) {
    this.setData({
      adminAccount: e.detail
    })
  },
  // 监听管理员密码输入
  adminPasswordInput(e) {
    this.setData({
      adminPassword: e.detail
    })
  },

  // 监听点击验证事件
  check() {
    // 用于验证的数据
    let obj = {lesseeCode: this.data.lesseeCode,
      adminAccount: this.data.adminAccount,
      adminPassword: this.data.adminPassword
    };
      // 调用验证接口
      check(obj).then(res => {
        console.log(res);
        if(res.code == 200){
          wx.showToast({
            title: '验证成功',
            icon: 'success',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '验证失败',
            icon: 'error',
            duration: 1500
          })
        }
      })
  },

  // 查看历史工单(弹窗)
  showPopup() {
    this.setData({ show: true });
  },

  // 提交验证信息
  submitCheckInfo(event) {
    const formData = event.detail.value;
    // 用于验证的数据
    let obj = {lesseeCode: formData.lesseeCode,
      adminAccount: formData.adminAccount,
      adminPassword: formData.adminPassword
    };
    // 调用验证接口
    check(obj).then(res => {
      console.log(res);
      if(res.code == 200){
        wx.showToast({
          title: '验证成功',
          icon: 'success',
          duration: 1500
        })
        // 跳转到历史工单页面
        wx.navigateTo({
          url: "/pages/workOrderHistory/workOrderHistory",
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { checkInfo: obj })
          }
        })
      }else{
        wx.showToast({
          title: '验证失败',
          icon: 'error',
          duration: 1500
        })
      }
    })
  },

  onClose() {
    this.setData({ show: false });
  },

  // 监听单选框
  onChange(event) {
    this.setData({
      feedbackStatus: event.detail,
    });
  },

  // 提交工单信息
  submitWorkOrderInfo(event) {
    console.log(event.detail.value)
    submitWorkOrderInfo(event.detail.value).then(res => {
      console.log(res);
      wx.showToast({
        title: '提交成功！',
      })
      // 提交成功后重新加载当前页面
      setTimeout(() => wx.reLaunch({
        url: '/pages/apply/apply',
      }),1500)
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '提交失败！',
        icon: 'error'
      })
    })
  },

  // 上传图片/视频
  afterRead(event) {
    const { file } = event.detail;
    console.log(file)
    // 将图片上传到服务器
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url:baseUrl +'/minio/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success: res => {
        console.log(res)
        const response = JSON.parse(res.data);
        // 上传完成需要更新 fileList
        const fileList  = this.data.fileList;
        const urlList = this.data.urlList;
        this.setData({
           fileList: fileList.concat(file),
           urlList: urlList.concat(response.data.url)
        });
        console.log('文件列表是：',this.data.fileList)
        console.log('文件url列表是：',this.data.urlList)
      },
      fail: err => {
        console.log(err);
      }
    });

  },

  delete(event) {
    console.log(event)
    const { index,file } = event.detail;
    console.log(file)
    const { fileList,urlList } = this.data;

    // 调用删除文件接口
    removeFile(this.data.urlList[index]).then( res => {
      console.log(res);
    })

    fileList.splice(index, 1);
    urlList.splice(index,1);


    this.setData({ 
      fileList: fileList,
      urlList: urlList
    });
    console.log('剩余：',this.data.urlList)
  },

  clickPreview() {},

  // afterRead(event) {
  //   const { file } = event.detail;
  //   // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  //   wx.uploadFile({
  //     url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
  //     filePath: file.url,
  //     name: 'file',
  //     formData: { user: 'test' },
  //     success(res) {
  //       // 上传完成需要更新 fileList
  //       const { fileList = [] } = this.data;
  //       fileList.push({ ...file, url: res.data });
  //       this.setData({ fileList });
  //     },
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})