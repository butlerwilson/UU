const app = getApp()
const db = wx.cloud.database()//必须有
const _ = db.command//这个有时需要用到，比如数据的自增、自减时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    hasUserInfo: true,
    userInfo:'',
    avatarUrl:'',
    nickName:'',
    gender:'',
    province:'',
    city:''
  },
  bindViewTap: function (event) {
    wx.navigateTo({
      url: 'InputPage/InputPage'
    });
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
    var userInfo=this.data.userInfo
    var avatarUrl = userInfo.avatarUrl;
    var nickName = userInfo.nickName;
    var gender = userInfo.gender; //性别 0：未知、1：男、2：女 
    var province = userInfo.province;
    var city =userInfo.city;
    if(gender==2){
      gender="女";
    }
    if (gender == 1) {
      gender = "男";
    }
    this.setData({
       serInfo: userInfo,
       "img": avatarUrl,
       "name": nickName,
       "province": province,
       "city": city,
       "sex":gender,
       hasUserInfo: false
     });
    this.setData({
      "phone":"183********",
      "wx":"suyeq233"
    });
      }
      
    })
    
  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var  userInfo=app.globalData.userInfo;
    console.log(userInfo);
    if (userInfo==null) {
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
     
    }else{
    var avatarUrl = userInfo.avatarUrl;
    var nickName = userInfo.nickName;
    var gender = userInfo.gender; //性别 0：未知、1：男、2：女 
    var province = userInfo.province;
    var city =userInfo.city;
    if(gender==2){
      gender="女";
    }
    if (gender == 1) {
      gender = "男";
    }
    this.setData({
       serInfo: userInfo,
       "img": avatarUrl,
       "name": nickName,
       "province": province,
       "city": city,
       "sex":gender,
       hasUserInfo: false
     });
    this.setData({
      "phone":"183********",
      "wx":"suyeq233"
    });
    }
    
     
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