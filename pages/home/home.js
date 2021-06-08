// pages/home/home.js
const DB = wx.cloud.database().collection("pinlist")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinlist:null
  },

  pintype(e) {
    let type = e.target.dataset.type
    DB.where({
      type:e.target.dataset.type
    }).orderBy('startime','desc').get({
      success(res) {
        wx.navigateTo({
          url: '/pages/showbytype/showbytype?type=' + type + '&pinlist='+JSON.stringify(res.data)
        })
      },
      fail(res) {
      }
    })
  },

  //获取详情页
  detail(e) {
   
    DB.where({
      _id:e.currentTarget.dataset.item._id
    }).orderBy('startime','desc').get({
      success(res) {
        wx.navigateTo({
          url: '/pages/details/details?pin='+JSON.stringify(res.data)
        })
      },
      fail(res) {
      }
    })
  },

  //随机获取一个pin单
  randomdetail(e) {
    DB.aggregate().sample({
      size: 1
    })
    .end().then(  res => {
        wx.navigateTo({
          url: '/pages/details/details?pin='+JSON.stringify(res.list)
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this
    DB.orderBy('startime','desc').where({}).get({
      success(res) {
        that.setData({
          pinlist:res.data
        })
      },
      fail(res) {
      }
    })
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
    this.onLoad()
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