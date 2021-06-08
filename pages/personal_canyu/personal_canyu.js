const app = getApp()
const db = wx.cloud.database()//必须有
const DB1 = wx.cloud.database().collection("pinlist")
const _ = db.command//这个有时需要用到，比如数据的自增、自减时
Page({

  data: {
    ulist:[],
    myList:[],
    pd:false,
    joinlist:[]
  },

//获取详情页
detail(e) {
   
  DB1.where({
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo==null) {
      wx.showModal({
        title: '提示',
        content: '请先进行登录哦~',
        showCancel: false,
        success: function(e) {
          if(e.confirm) {
            wx.switchTab({
              url: '/pages/personal/personal',
            })
          }
        }
      })
      // wx.navigateBack({
      //   delta: 1
      // })
      return;
    }
    

    var that = this
    db.collection('pinlist').get()
    .then(res=>{
      //  console.log(res.data)//打印返回结果
        
        this.setData({
          pinlist:res.data
        })
    //console.log("当前用户openid:"  + app.globalData.openid)
    var openid=app.globalData.openid
    for(var index in that.data.pinlist ){
      that.data.ulist=that.data.pinlist[index] // 拼单集合
      //console.log(that.data.ulist)  //输出拼单集合
      that.data.joinlist=that.data.ulist.joinuser
      //console.log(that.data.joinlist)  //输出参与者集合
      for(var i in that.data.joinlist){ //循坏拼单
       
        if(that.data.joinlist[i]==app.globalData.openid){
          //console.log("此拼单为我的拼单")
          that.setData({
            myList: that.data.myList.concat(that.data.ulist)
          })
        }else{
         // console.log("不是我的拼单")
        }
      }
      
    }
    console.log(that.data.myList)
    }).catch(err=>{
    console.log(err)//打印错误信息
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