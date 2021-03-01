// components/Banner/Banner.js

const { getPicByType } = require('../../http/api.js');
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerList:[],
    prefix:'',
    isShowCard:false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 根据不同类型请求轮播图
    getPictureByType(type) {
      // 调用接口请求数据
      getPicByType(type).then(res => {
        this.setData({
          prefix: res.data.prefix,
          bannerList: res.data.list
        })
        console.log(res);
        console.log(this.data.bannerList);
      });
      
    },

    
  bannerSkip(event) {
    console.log(event);
    // 跳转到外部链接
    wx.navigateTo({
      url: '/pages/bannerSkip/bannerSkip',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { bannerUrl: event.currentTarget.id })
      }
    })
  }

  },
  
  /**
   * [在组件实例进入页面节点树时执行]
   * 这里写生命周期函数
   * 当调用该组件的页面加载完显示时
   * 组件就会自动触发该函数
   * 来达到组件内初始化数据作用
   */
  attached() {
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length-1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    let array = url.split("/");
    let routeName = array[2];
    console.log(routeName);
    // 根据不同路由渲染不同的轮播图
    switch(routeName){
      // 首页
      case "index":
      // 调用接口请求数据
      this.getPictureByType('CAROUSEL');
      break;
      // 申请试用
      case "apply":
      this.getPictureByType('CAROUSEL_APPLY');
      break;
      // 售后工单
      case "workOrder":
      this.getPictureByType('CAROUSEL_WORK_ORDER');
      break;
    }

    //请求数据(业务逻辑)
    // getPicByType('CAROUSEL').then(res => {
    //   console.log(res);
    //   this.setData({
    //     prefix: res.data.prefix,
    //     bannerList: res.data.list
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })
  },

  // 在组件在视图层布局完成后执行
  ready() {
    this.setData({
      isShowCard:app.globalData.isShowCard
    })
  }
})
