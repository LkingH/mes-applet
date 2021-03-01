const { getHistoryOrder,getResultById } = require('../../http/api')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false, //控制弹出层
    lesseeCode:'',
    adminAccount:'',
    historyOrderList: [],
    dialogContent:'',
    dialogTitle:''
  },

  onReady: function(){
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({
        lesseeCode: data.checkInfo.lesseeCode,
        adminAccount: data.checkInfo.adminAccount
      })
    })
    // 用于请求数据的参数
    let requestParams = { 
      currentPage: 1,
      pageSize: 9999,
      search1: this.data.lesseeCode,
      search2: this.data.adminAccount,
      statusStr:''
    }
    // 调用接口获取历史工单信息
    getHistoryOrder(requestParams).then(res => {
      this.setData({
        historyOrderList: res.data.list
      })
      console.log("onLoad!!!!",this.data.historyOrderList)
    })

  },

  // 查看详情
  showPopup(event) {
    this.setData({
       show: true,
    });
    const resultId = event.target.id;
    // 调用接口获取当前工单详情
    getResultById(resultId).then(res => {
      console.log(res);
      this.setData({
        dialogContent:res.data.body,
        dialogTitle:res.data.title
      })
    })
  },

  onClose() {
    this.setData({ show: false });
  },

})