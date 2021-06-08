// app.js
App({
    onLaunch() {
      wx.cloud.init({
      env: 'nanfang-3gdbc2m7a527997d'
      })
      var that = this
      wx.login({  
          success: function(res){ 
              if(res.code) {
                  var d=that.globalData;//这里存储了appid、secret、token串  
                  var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';  
                  wx.request({  
                      url: l,  
                      data: {},  
                      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                      // header: {}, // 设置请求的 header  
                      success: function(res){ 
                          var obj={};
                          obj.openid=res.data.openid;  
                          obj.expires_in=Date.now()+res.data.expires_in;  
                          that.globalData.openid=res.data.openid
                          
                      }  
                  });
              }else {
                  console.log('获取用户登录态失败！' + res.errMsg)
              }          
          }  
        });
      
        
    
    },
    globalData: {
      userInfo: null,
      UserLogin:false,
      openid:'',
      appid:'wx9ded687bff00abd6',//wx9ded687bff00abd6 
      secret:'fe240380e9830389cae8cc4dd828f259',//fe240380e9830389cae8cc4dd828f259
        
    },
    pinData: {
        userInfo: null,
        UserLogin:false,
        openid:'',
        appid:'wx5fe78151ffdd0cd8',//appid需自己提供，此处的appid我随机编写
        secret:'556d9a93b7221c3fba99a2037bc53bc6',//secret需自己提供，此处的secret我随机编写
      },
  
    //检测是否登录函数
      // 为登录则提示登录
      IsLogon() {
        // 获取缓存的登录信息
        var userInfo = wx.getStorageSync('userInfo')
        if (userInfo.name && userInfo.phone) {
            this.globalData.UserLogin = true
            this.globalData.userInfo = userInfo
        }else{
            this.globalData.UserLogin = false
        }
      }
  })