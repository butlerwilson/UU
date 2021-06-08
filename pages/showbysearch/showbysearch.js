const DB = wx.cloud.database().collection("pinlist")
let pinlist = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinlist:null,
  },

  //获取详情页
  xiangqing(e) {
    DB.where({
      _id:e.currentTarget.dataset.item._id
    }).orderBy('startime','desc').get({
      success(res) {
        console.log("查询成功", res)
        wx.navigateTo({
          url: '/pages/details/details?pin='+JSON.stringify(res.data)
        })
      },
      fail(res) {
        console.log("查询失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pinlist = JSON.parse(options.pinlist)
    let type = options.type
    //console.log(pinlist[0].type)
    this.setData({
      pinlist:pinlist
    })
    console.log('onLoad')
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