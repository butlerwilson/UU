// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'getcellphone': {
      return getCellphone(event);
    }
    default: {
      return
    }
  }
}

async function getCellphone(event) {
  const res = await cloud.getOpenData({
    list: [event.id], 
  })
  return {
    res,
    event
  };
}
