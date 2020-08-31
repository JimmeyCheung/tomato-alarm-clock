const { http }  = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData

Page({
  data: {

  },
  //点击按钮 => 调用小程序原生的 wx.login => 参数 => http.post => 返回 user
  // => 保存user => 返回首页
  login(event){
    console.log(wx.login);
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
    let code
    wx.login({
      success(res){
        code = res.code
        http.post('/sign_in/mini_program_user',{
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret,
        })
        .then(response=>{
          wx.setStorageSync('me', response.data.resource)
          wx.reLaunch({
            url: '/pages/home/home',
          })
        })
      },
    })
  }
})