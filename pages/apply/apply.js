// pages/apply/apply.js

const { submitApplyInfo } = require('../../http/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: {
      post: false,
      industry: false
    },
    postList: ['经理','董事长'],
    industryList: ['互联网','金融','教育'],
    post: '',
    industry: ''
  },

  // 用于切换popup的显示/隐藏
  toggle(type, show) {
    this.setData({
      [`show.${type}`]: show
    });
  },

  showPostChioce() {
    this.toggle('post',true);
  },
  hidePostChoice() {
    this.toggle('post',false);
  },

  showIndustryChioce() {
    this.toggle('industry',true);
  },
  hideIndustryChoice() {
    this.toggle('industry',false);
  },


  onPostConfirm(e){    //选择器右上角的确定，点击确定获取值
    this.setData({
      post:e.detail.value,
    })
    this.toggle('post',false);
  },
  onIndustryConfirm(e) {
    this.setData({
      industry:e.detail.value,
    })
    this.toggle('industry',false);
  },
  
  // 提交表单信息
  submitApplyInfo(e) {
    console.log(e);
    let formData = e.detail.value;
    // 调用提交表单接口
    submitApplyInfo(formData).then(res => {
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