//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()//必须有
const _ = db.command//这个有时需要用到，比如数据的自增、自减时

Page({
  data: {
    hasUserInfo: true,
    userInfo: null
  },


 getUserProfile(e) {
   
  wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      app.globalData.userInfo=res.userInfo
      app.globalData.UserLogin=true
      //console.log("开始判断")
          db.collection('userList').where({
            _openid:app.globalData.openid// 查询条件：chapter=1
          }).get().then(res=>{
              console.log(res.data.length)//打印返回结果
              if(res.data.length==0){
                console.log("添加用户进入userList")
                wx.cloud.database().collection('userList').add({
                  data: {
                    //openid:app.globalData.openid,
                    userinfo:app.globalData.userInfo,
                  }
                }).then((res) => {
                console.log(res)//返回的res里面有_id的值，这个_id是系统自动生成的。
              }).catch(err=>{
                console.log(err)
              })
              }else{
                console.log("当前用户已存在")
              }  
        }).catch(err=>{
          console.log(err)//打印错误信息
        })

      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: false
      }, () => {
        wx.setStorageSync('userInfo', res.userInfo)
      })
      
    }
  })
  

},
  // 事件处理函数
  bindViewTapbasic: function (event) {
    wx.navigateTo({
      url: '/pages/personal_info/personal_info'
    });
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

 
  call() {
    wx.showModal({
      title: '提示',
      content: '微信联系/手机联系',
      confirmText: "手机联系",
      confirmColor: "#3cc",
      cancelColor: "#3cc",
      cancelText: "微信联系",
      success: function(e) {
        if (e.confirm) {
          wx.showModal({
            title: '提示',
            content: '是否联系(183********)',
            success: function(e) {
              if (e.confirm) {
                wx.makePhoneCall({
                  phoneNumber: '183********',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '微信号：183********',
            confirmText: "复制",
            success: function(e) {
              if (e.confirm) {
                wx.setClipboardData({
                  data: '183********',
                })
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    
    if(app.globalData.UserLogin){
      
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:false
      })
      wx.setStorageSync('userInfo', app.globalData.userinfo)
    }
  }
})
