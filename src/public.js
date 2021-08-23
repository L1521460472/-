//设置cookie,按时间
function setCookie(key, value, iDay) {
  var oDate = new Date();
  oDate.setTime(oDate.getTime() + iDay * 24 * 60 * 60 * 1000); //设置过期时间,getTime()设置时间
  document.cookie = key + "=" + value + ";expires=" + oDate.toGMTString();
}

//获取指定的key的cookie值
function getCookie(key) {
  var arr = document.cookie.split(";"); //获取当前域名的所有cookie，以;分割成数组。
  for (var i = 0; i < arr.length; i++) {
    var brr = arr[i].split("=");
    if (brr[0].trim() == key) {
      return brr[1];
    }
  }
  return ""; //没有找到返回值
}

// 账号正则校验（账号构成英文小写字母+数字构成）
function regexpAccount(value) {
  let reg = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,20}$/
  return reg.test(value)
}


// 密码正则校验（有数字和字母组成）
function regexpPassword(value) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  return reg.test(value)
}

// 账号名字正则校验（中文或字母组成）
function regexpName(value) {
  let reg = /^[\u4e00-\u9fa5a-zA-Z]{1,12}$/
  return reg.test(value)
}

// 验证手机号码
function regexpPhone(value) {
  let reg = /^1[3456789]\d{9}$/
  return reg.test(value)
}

// 菜单名称，关键词
function regexpMenu(value) {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

// 获取字符长度
function getBLen(str) {
	if (str == null) return 0;
	if (typeof str != "string"){
		str += "";
	}
	return str.replace(/[^\x00-\xff]/g,"01").length;
}

// 菜单链接地址
function regexpUrl(value) {
  let reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
  return reg.test(value)
}

//移除cookie
function removeCookie(key) {
  setCookie(key, 1, -1);
}

//获取页面拥有的按钮列表
function getButtonList(menuList, path) {
  let arr = []
  menuList.map(item => {
    if (item.url == path) {
      arr=item.children
      return
    }
    item.children.map(item2 => {
      if (item2.url == path) {
        arr=item2.children
        return
      }
    })
  })
  return arr
}

// 下载附件
function download(url,fileName) {
  var x = new XMLHttpRequest();
  x.open("GET",`${url}`, true);
  x.responseType = 'blob';
  x.onload=function(e) {
      var url = window.URL.createObjectURL(x.response)
      var a = document.createElement('a');
      a.href = url
      a.download = fileName;
      a.click()
  }
  x.send(null);
}



module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  regexpAccount,
  regexpPassword,
  regexpName,
  regexpPhone,
  regexpMenu,
  regexpUrl,
  getBLen,
  getButtonList,
  download
}
