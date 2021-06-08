// pages/index/index.js
let pin = null
const app = getApp()
const DB = wx.cloud.database().collection("pinlist")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pin:null,
    picture:[],
    joinuser:[],
    id:''
  },
  wyp(e){
    if (app.globalData.userInfo==null) {
      wx.showModal({
        title: '提示',
        content: '请先进行登录哦~',
        showCancel: false
      })
      return;
    }
    if(this.data.joinuser.indexOf(getApp().globalData.openid)>=0){
      wx.showModal({
        title: '提示',
        content: '当前拼单你已经在参与了哦~',
        showCancel: false
      })
    }else{
      this.setData({
        joinuser: this.data.joinuser.concat(getApp().globalData.openid)
      })
      DB.doc(this.data.id).update({
        data:{
          joinuser:this.data.joinuser
        },
        success:res=>{
            
            wx.showModal({
              title: '提示',
              content: '参与拼单成功~',
              showCancel: false
            })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    
    
    console.log(app.globalData)
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    pin = JSON.parse(options.pin)
    
    console.log(pin[0])
    console.log(pin[0].pictur)
    this.setData({
      pin:pin[0],
      picture:pin[0].pictur,
      joinuser:pin[0].joinuser,
      id:pin[0]._id
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
    /**
     * 请求朋友圈信息
     */
   
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

  /**
   * 页面上拉触底事件的处理函数
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})