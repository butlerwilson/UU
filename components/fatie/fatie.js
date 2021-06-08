// components/FriendPub/index.js
var format = require("../../utils/util")
const app = getApp();
Component({
  data: {
    images: [],
    content: '',
    joinuser:[],
    userinfo:null,
    openid:'',
    address:'',
    pnum:'',
    snum:'',
    type:'',
    price:'0',
    title:''
  },
 
  lifetimes:{
    attached(){
      let postdata = wx.getStorageSync('postdata') || null
      if(postdata!=null){
        this.setData(postdata)
      }
    }
  },
  
  methods: {
    //去左右空格;
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    addDate(){
     
     
     if (app.globalData.userInfo==null) {
      wx.showModal({
        title: '提示',
        content: '请先进行登录哦~',
        showCancel: false
      })
      return;
    }
     if (this.trim(this.data.title) == "" || this.trim(this.data.title) < 2) {
      wx.showModal({
        title: '提示',
        content: '拼单标题有点少噢~(至少两个字)',
        showCancel: false
      })
      return;
    }
    if (this.trim(this.data.content) == "" || this.trim(this.data.content) < 5) {
      wx.showModal({
        title: '提示',
        content: '内容有点少噢~(至少五个字)',
        showCancel: false
      })
      return;
    }
    if (this.trim(this.data.type) == "" || this.trim(this.data.pnum) == "") {
      wx.showModal({
        title: '提示',
        content: '请选择拼单分类或拼单人数哦~',
        showCancel: false
      })
      return;
    }
    this.setData({
      joinuser: this.data.joinuser.concat(app.globalData.openid)
     })
      wx.cloud.database().collection('pinlist').add({
      data: {
        content:this.data.content,
        joinuser:this.data.joinuser,
        pictur:this.data.images,
        pnum:this.data.pnum,
        startime:format.formatTime(new Date(),"Y-M-D"),
        status:0,
        snum:'1',
        price:this.data.price,
        title:this.data.title,
        type:this.data.type,
        updatetime:format.formatTime(new Date(),"Y-M-D"),
        userinfo:app.globalData.userInfo,
      }
    }).then((res) => {
     console.log(res)//返回的res里面有_id的值，这个_id是系统自动生成的。
     wx.clearStorageSync('postdata')
   }).catch(err=>{
     console.log(err)
   })
   wx.navigateBack({
    delta: 1
  })
  },
    chooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.data.images.length != 0) {
            this.setData({
              images: this.data.images.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              images: res.tempFilePaths
            })
          }
        }
      });
    },
    
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.images,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {

      this.data.images.splice(e.currentTarget.dataset.index, 1);
      this.setData({
        images: this.data.images
      })
    },
    
    saveEditOrNot() {
      var that = this;
      wx.showModal({
        title: '将此次编辑保留',
        content: '',
        cancelText: '不保留',
        confirmText: '保留',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setStorageSync('postdata', that.data)
            wx.navigateBack({
              delta: 1
            })
          } else if (res.cancel) {
            wx.clearStorageSync('postdata')
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    },

    chooseLocation() {
      let self = this
      wx.chooseLocation({
        success(res) {
          self.setData({
            address: res.address
          })

        }
      })
    },
    getInputValue(e) {
      this.setData({
        content: e.detail.value
      })
    },
    getPrice(e) {
      this.setData({
        price: e.detail.value
      })
    },
    getBiaoti(e) {
      this.setData({
        title: e.detail.value
      })
    },
    getfenlei(e){
      let type = e.detail.value;
      this.setData({
        type:type,
      })
      console.log("当前分类为：" + type)
    },
    getnum(e){
      let pnum = e.detail.value;
      this.setData({
        pnum:pnum,
      })
      console.log("当前总拼单人数为：" + pnum)
    },
    
  }
})