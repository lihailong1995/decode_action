//Tue Sep 24 2024 03:20:57 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var _0x2a0e2e = function () {
    var _0x37a625 = true;
    return function (_0xb4d899, _0x26e566) {
      var _0xe85da6 = _0x37a625 ? function () {
        if (_0x26e566) {
          var _0x2207d3 = _0x26e566.apply(_0xb4d899, arguments);
          _0x26e566 = null;
          return _0x2207d3;
        }
      } : function () {};
      _0x37a625 = false;
      return _0xe85da6;
    };
  }(),
  _0x1578b2 = _0x2a0e2e(this, function () {
    var _0x1123c8 = function () {
      var _0x4842f2 = _0x1123c8.constructor("return /\" + this + \"/")().constructor("^([^ ]+( +[^ ]+)+)+[^ ]}");
      return !_0x4842f2.test(_0x1578b2);
    };
    return _0x1123c8();
  });
_0x1578b2();
const $ = new Env("点点兼职"),
  axios = require("axios");
let request = require("request");
var _0x306d64 = {
  jar: true
};
request = request.defaults(_0x306d64);
const {
    log
  } = console,
  Notify = 1,
  debug = 0;
let ddjzhd = ($.isNode() ? process.env.ddjzhd : $.getdata("ddjzhd")) || "",
  ddjzhdArr = [],
  data = "",
  randomId = "",
  msg = "";
!(async () => {
  if (typeof $request !== "undefined") {
    await GetRewrite();
  } else {
    if (!(await Envs())) {
      return;
    } else {
      log("\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：" + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString() + " \n=============================================\n");
      log("\n=================== 共找到 " + ddjzhdArr.length + " 个账号 ===================");
      await checkin66();
      for (let _0x14ce14 = 0; _0x14ce14 < ddjzhdArr.length; _0x14ce14++) {
        let _0xef82b8 = _0x14ce14 + 1;
        log("\n==== 开始【第 " + _0xef82b8 + " 个账号】====\n");
        ddjzhd = ddjzhdArr[_0x14ce14].split("#");
        await login1();
      }
      await SendMsg(msg);
    }
  }
})().catch(_0x598cfe => log(_0x598cfe)).finally(() => $.done());
async function checkin66() {
  return new Promise(_0x14f4aa => {
    var _0x573729 = {
      method: "GET",
      url: "http://api.wegoohr.com/api/ddjz/get_activityId",
      headers: {}
    };
    _0x573729.headers.Host = "api.wegoohr.com";
    _0x573729.headers.Accept = "*/*";
    _0x573729.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x573729.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x573729.headers.Connection = "keep-alive";
    var _0x96bf9 = _0x573729;
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x96bf9)));
    axios.request(_0x96bf9).then(async function (_0x5d61de) {
      try {
        data = _0x5d61de.data;
        idd = data.data;
        idArray = idd.split(",");
        randomId = idArray[Math.floor(Math.random() * idArray.length)];
      } catch (_0x1fda97) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x346a83) {
      console.error(_0x346a83);
    }).then(_0x2682b3 => {
      _0x14f4aa();
    });
  });
}
async function login() {
  return new Promise(_0xd35b4a => {
    var _0x557435 = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "id=" + randomId + "&pattern=signin&patternid=1&wcs=1&wdfb="
    };
    _0x557435.headers.Host = "mili.shensemiao.com";
    _0x557435.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x557435.headers.Accept = "*/*";
    _0x557435.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x557435.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x557435.headers.Connection = "keep-alive";
    _0x557435.params.v = "1";
    _0x557435.params.appid = "4";
    _0x557435.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x557435.params.api_auth_code = "" + ddjzhd[0];
    _0x557435.params.api_auth_uid = "" + ddjzhd[1];
    _0x557435.params.s = "Yhxcx";
    _0x557435.params.c = "home";
    _0x557435.params.m = "fb_detail";
    axios.request(_0x557435).then(async function (_0x24c600) {
      try {
        data = _0x24c600.data;
        debug && (log("\n【debug】===============这是返回data=============="), log(JSON.stringify(data)));
        log(randomId);
        data.code == 1 ? (log(data.msg), await checkin1(), await checkin2(), await checkin5(), await checkin6()) : (log(data.msg), await checkin66(), await login1());
      } catch (_0x445ba8) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x468cc8) {
      console.error("请求异常：" + _0x468cc8);
    }).then(() => {
      _0xd35b4a();
    });
  });
}
async function checkin1() {
  return new Promise(_0x1f2e71 => {
    var _0x26f581 = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "id=" + randomId + "&pattern=signin&patternid=1&wcs=1&wdfb="
    };
    _0x26f581.headers.Host = "mili.shensemiao.com";
    _0x26f581.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x26f581.headers.Accept = "*/*";
    _0x26f581.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x26f581.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x26f581.headers.Connection = "keep-alive";
    _0x26f581.params.v = "1";
    _0x26f581.params.appid = "4";
    _0x26f581.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x26f581.params.api_auth_code = "" + ddjzhd[0];
    _0x26f581.params.api_auth_uid = "" + ddjzhd[1];
    _0x26f581.params.s = "member";
    _0x26f581.params.app = "Yhxcx";
    _0x26f581.params.c = "qd";
    _0x26f581.params.m = "sign_in";
    var _0x4bfd21 = _0x26f581;
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x4bfd21)));
    axios.request(_0x4bfd21).then(async function (_0x58447e) {
      try {
        data = _0x58447e.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x58447e.data)));
        log(data.msg);
      } catch (_0x58367b) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x4861a8) {
      console.error(_0x4861a8);
    }).then(_0xad5228 => {
      _0x1f2e71();
    });
  });
}
async function checkin2() {
  return new Promise(_0xf72a77 => {
    var _0x6a251c = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "id=" + randomId + "&fblx=1&wcs=0&theway=signin&search=1"
    };
    _0x6a251c.headers.Host = "mili.shensemiao.com";
    _0x6a251c.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x6a251c.headers.Accept = "*/*";
    _0x6a251c.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x6a251c.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x6a251c.headers.Connection = "keep-alive";
    _0x6a251c.params.v = "1";
    _0x6a251c.params.appid = "4";
    _0x6a251c.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x6a251c.params.api_auth_code = "" + ddjzhd[0];
    _0x6a251c.params.api_auth_uid = "" + ddjzhd[1];
    _0x6a251c.params.s = "member";
    _0x6a251c.params.app = "Yhxcx";
    _0x6a251c.params.c = "qd";
    _0x6a251c.params.m = "sign_in";
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x6a251c)));
    axios.request(_0x6a251c).then(async function (_0x3a6a0f) {
      try {
        data = _0x3a6a0f.data;
        if (data.code == 1) {
          const _0x57b511 = data.data.llurl,
            _0x560c80 = _0x57b511.match(/id=(\d{4})/);
          _0x560c80 && (iddd = _0x560c80[1], log(iddd), await checkin3(), await checkin4());
        } else {
          log(data.msg);
        }
      } catch (_0x1a4d16) {
        log("异常：" + _0x1a4d16);
      }
    }).catch(function (_0x12de53) {
      console.error("请求异常：" + _0x12de53);
    }).then(() => {
      _0xf72a77();
    });
  });
}
async function checkin3() {
  return new Promise(_0x23716d => {
    var _0x22691b = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "id=" + iddd + "&pattern=signin&patternid=1&wcs=1&wdfb="
    };
    _0x22691b.headers.Host = "mili.shensemiao.com";
    _0x22691b.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x22691b.headers.Accept = "*/*";
    _0x22691b.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x22691b.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x22691b.headers.Connection = "keep-alive";
    _0x22691b.params.v = "1";
    _0x22691b.params.appid = "4";
    _0x22691b.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x22691b.params.api_auth_code = "" + ddjzhd[0];
    _0x22691b.params.api_auth_uid = "" + ddjzhd[1];
    _0x22691b.params.s = "Yhxcx";
    _0x22691b.params.c = "home";
    _0x22691b.params.m = "fb_detail";
    debug && (log("\n【debug】=============== 这是请求url ==============="), log(JSON.stringify(_0x22691b)));
    axios.request(_0x22691b).then(async function (_0x13a835) {
      try {
        data = _0x13a835.data;
        debug && (log("\n【debug】===============这是返回data=============="), log(JSON.stringify(data)));
        log(data.msg);
      } catch (_0x5cb7af) {
        log("异常：" + _0x5cb7af);
      }
    }).catch(function (_0x5f0815) {
      console.error("请求异常：" + _0x5f0815);
    }).then(() => {
      _0x23716d();
    });
  });
}
async function checkin4() {
  return new Promise(_0x5c200d => {
    var _0x3bcf73 = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "id=" + iddd + "&fblx=1&wcs=1&theway=signin&search=1"
    };
    _0x3bcf73.headers.Host = "mili.shensemiao.com";
    _0x3bcf73.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x3bcf73.headers.Accept = "*/*";
    _0x3bcf73.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x3bcf73.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x3bcf73.headers.Connection = "keep-alive";
    _0x3bcf73.params.v = "1";
    _0x3bcf73.params.appid = "4";
    _0x3bcf73.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x3bcf73.params.api_auth_code = "" + ddjzhd[0];
    _0x3bcf73.params.api_auth_uid = "" + ddjzhd[1];
    _0x3bcf73.params.s = "member";
    _0x3bcf73.params.app = "Yhxcx";
    _0x3bcf73.params.c = "qd";
    _0x3bcf73.params.m = "sign_in";
    debug && (log("\n【debug】=============== 这是请求url ==============="), log(JSON.stringify(_0x3bcf73)));
    axios.request(_0x3bcf73).then(async function (_0x497a29) {
      try {
        data = _0x497a29.data;
        log(data.msg);
      } catch (_0x17a410) {
        log("异常：" + _0x17a410);
      }
    }).catch(function (_0xded04d) {
      console.error("请求异常：" + _0xded04d);
    }).then(() => {
      _0x5c200d();
    });
  });
}
async function checkin5() {
  return new Promise(_0x1ceac6 => {
    var _0x3b5046 = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: {}
    };
    _0x3b5046.headers.Host = "mili.shensemiao.com";
    _0x3b5046.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x3b5046.headers.Accept = "*/*";
    _0x3b5046.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x3b5046.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x3b5046.headers.Connection = "keep-alive";
    _0x3b5046.params.v = "1";
    _0x3b5046.params.appid = "4";
    _0x3b5046.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x3b5046.params.api_auth_code = "" + ddjzhd[0];
    _0x3b5046.params.api_auth_uid = "" + ddjzhd[1];
    _0x3b5046.params.s = "member";
    _0x3b5046.params.app = "yhxcx";
    _0x3b5046.params.c = "tg";
    _0x3b5046.params.m = "invite";
    axios.request(_0x3b5046).then(async function (_0xe53bce) {
      try {
        data = _0xe53bce.data;
        log("累计邀请人数:" + data.data.yqr);
        log("累计收益:" + data.data.ljsy);
        log("已提现金额:" + data.data.ytx);
        log("可提现金额:" + data.data.dtx);
      } catch (_0x3f172b) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x30a6e9) {
      console.error(_0x30a6e9);
    }).then(_0x176db => {
      _0x1ceac6();
    });
  });
}
async function checkin6() {
  return new Promise(_0x143fc6 => {
    var _0x249a27 = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "step=0"
    };
    _0x249a27.headers.Host = "mili.shensemiao.com";
    _0x249a27.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x249a27.headers.Accept = "*/*";
    _0x249a27.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x249a27.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x249a27.headers.Connection = "keep-alive";
    _0x249a27.params.v = "1";
    _0x249a27.params.appid = "4";
    _0x249a27.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x249a27.params.api_auth_code = "" + ddjzhd[0];
    _0x249a27.params.api_auth_uid = "" + ddjzhd[1];
    _0x249a27.params.s = "member";
    _0x249a27.params.app = "yhxcx";
    _0x249a27.params.c = "home";
    _0x249a27.params.m = "account";
    debug && (log("\n【debug】=============== 这是请求url ==============="), log(JSON.stringify(_0x249a27)));
    axios.request(_0x249a27).then(async function (_0x204720) {
      try {
        data = _0x204720.data;
        debug && (log("\n【debug】===============这是返回data=============="), log(JSON.stringify(data)));
        log("当前手机号:" + data.data.fillin.phone);
      } catch (_0x102843) {
        log("异常：" + _0x102843);
      }
    }).catch(function (_0x3c381b) {
      console.error("请求异常：" + _0x3c381b);
    }).then(() => {
      _0x143fc6();
    });
  });
}
async function login1() {
  return new Promise(_0x314c5f => {
    var _0x257a1c = {
      method: "POST",
      url: "https://mili.shensemiao.com/index.php",
      params: {},
      headers: {},
      data: "sourceid=137303&theway=submit&search=1"
    };
    _0x257a1c.headers.Host = "mili.shensemiao.com";
    _0x257a1c.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x257a1c.headers.Accept = "*/*";
    _0x257a1c.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x257a1c.headers["User-Agent"] = "PostmanRuntime-ApipostRuntime/1.1.0";
    _0x257a1c.headers.Connection = "keep-alive";
    _0x257a1c.params.v = "1";
    _0x257a1c.params.appid = "4";
    _0x257a1c.params.appsecret = "PHPCMF19F5DF41B263B";
    _0x257a1c.params.api_auth_code = "" + ddjzhd[0];
    _0x257a1c.params.api_auth_uid = "" + ddjzhd[1];
    _0x257a1c.params.s = "member";
    _0x257a1c.params.app = "yhxcx";
    _0x257a1c.params.c = "tg";
    _0x257a1c.params.m = "invite";
    debug && (log("\n【debug】=============== 这是请求url ==============="), log(JSON.stringify(_0x257a1c)));
    axios.request(_0x257a1c).then(async function (_0x2a318d) {
      try {
        data = _0x2a318d.data;
        debug && (log("\n【debug】===============这是返回data=============="), log(JSON.stringify(data)));
        await login();
      } catch (_0x4fc941) {
        log("异常：" + _0x4fc941);
      }
    }).catch(function (_0x185919) {
      console.error("请求异常：" + _0x185919);
    }).then(() => {
      _0x314c5f();
    });
  });
}
async function Envs() {
  if (ddjzhd) {
    if (ddjzhd.indexOf("&") != -1) {
      ddjzhd.split("&").forEach(_0x2c515b => {
        ddjzhdArr.push(_0x2c515b);
      });
    } else {
      if (ddjzhd.indexOf("\n") != -1) {
        ddjzhd.split("\n").forEach(_0x261f6b => {
          ddjzhdArr.push(_0x261f6b);
        });
      } else {
        ddjzhdArr.push(ddjzhd);
      }
    }
  } else {
    log("\n 【" + $.name + "】：未填写变量 ddjzhd");
    return;
  }
  return true;
}
function addNotifyStr(_0x4f5fef, _0x1c7913 = true) {
  if (_0x1c7913) {
    log(_0x4f5fef + "\n");
  }
  msg += _0x4f5fef + "\n";
}
async function SendMsg(_0x249a02) {
  if (!_0x249a02) {
    return;
  }
  if ($.isNode()) {
    var _0x2a311f = require("./sendNotify");
    await _0x2a311f.sendNotify($.name, _0x249a02);
  } else {
    $.msg(_0x249a02);
  }
}
function randomString(_0x1b3b52) {
  for (var _0x39813e = _0x1b3b52 > 0 && void 0 !== _0x1b3b52 ? _0x1b3b52 : 21, _0x35f931 = ""; _0x35f931.length < _0x39813e;) {
    _0x35f931 += Math.random().toString(36).slice(2);
  }
  return _0x35f931.slice(0, _0x39813e);
}
function randomnum(_0x171377) {
  _0x171377 = _0x171377 || 32;
  var _0x50145b = "1234567890",
    _0x2f6987 = _0x50145b.length,
    _0xa5906e = "";
  for (i = 0; i < _0x171377; i++) {
    _0xa5906e += _0x50145b.charAt(Math.floor(Math.random() * _0x2f6987));
  }
  return _0xa5906e;
}
function Env(_0x230f03, _0x18bb90) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x21c481 {
    constructor(_0x4ab95b) {
      this.env = _0x4ab95b;
    }
    send(_0x18f51c, _0x1d6ade = "GET") {
      _0x18f51c = "string" == typeof _0x18f51c ? {
        url: _0x18f51c
      } : _0x18f51c;
      let _0x41eab8 = this.get;
      "POST" === _0x1d6ade && (_0x41eab8 = this.post);
      return new Promise((_0x1b91dd, _0x1ab283) => {
        _0x41eab8.call(this, _0x18f51c, (_0x36c33f, _0x4758ca, _0xc5640c) => {
          _0x36c33f ? _0x1ab283(_0x36c33f) : _0x1b91dd(_0x4758ca);
        });
      });
    }
    get(_0x5be831) {
      return this.send.call(this.env, _0x5be831);
    }
    post(_0x2751a4) {
      return this.send.call(this.env, _0x2751a4, "POST");
    }
  }
  return new class {
    constructor(_0xb9f510, _0xf6c42f) {
      this.name = _0xb9f510;
      this.http = new _0x21c481(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0xf6c42f);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(_0xe3f5d1, _0x48e15b = null) {
      try {
        return JSON.parse(_0xe3f5d1);
      } catch {
        return _0x48e15b;
      }
    }
    toStr(_0x32d0d7, _0x16a482 = null) {
      try {
        return JSON.stringify(_0x32d0d7);
      } catch {
        return _0x16a482;
      }
    }
    getjson(_0x281d34, _0x36846e) {
      let _0x92f9b6 = _0x36846e;
      const _0x4c3d4d = this.getdata(_0x281d34);
      if (_0x4c3d4d) {
        try {
          _0x92f9b6 = JSON.parse(this.getdata(_0x281d34));
        } catch {}
      }
      return _0x92f9b6;
    }
    setjson(_0x5e5087, _0x27934d) {
      try {
        return this.setdata(JSON.stringify(_0x5e5087), _0x27934d);
      } catch {
        return !1;
      }
    }
    getScript(_0x15eb94) {
      return new Promise(_0x5b4abd => {
        var _0x22f7d3 = {
          url: _0x15eb94
        };
        this.get(_0x22f7d3, (_0x1601a6, _0x556962, _0x193ecc) => _0x5b4abd(_0x193ecc));
      });
    }
    runScript(_0x21a9a0, _0x5edd93) {
      return new Promise(_0x556e41 => {
        let _0x3fe25c = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x3fe25c = _0x3fe25c ? _0x3fe25c.replace(/\n/g, "").trim() : _0x3fe25c;
        let _0x1fa87a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x1fa87a = _0x1fa87a ? 1 * _0x1fa87a : 20;
        _0x1fa87a = _0x5edd93 && _0x5edd93.timeout ? _0x5edd93.timeout : _0x1fa87a;
        var _0x201f20 = {
          script_text: _0x21a9a0,
          mock_type: "cron",
          timeout: _0x1fa87a
        };
        const [_0x40cd60, _0x5afa56] = _0x3fe25c.split("@"),
          _0x357537 = {
            url: "http://" + _0x5afa56 + "/v1/scripting/evaluate",
            body: _0x201f20,
            headers: {
              "X-Key": _0x40cd60,
              Accept: "*/*"
            }
          };
        this.post(_0x357537, (_0x3f031c, _0x2e14ac, _0x4db4f6) => _0x556e41(_0x4db4f6));
      }).catch(_0x289384 => this.logErr(_0x289384));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x50727b = this.path.resolve(this.dataFile),
          _0x1f0218 = this.path.resolve(process.cwd(), this.dataFile),
          _0x2f6ea7 = this.fs.existsSync(_0x50727b),
          _0x5b8a1f = !_0x2f6ea7 && this.fs.existsSync(_0x1f0218);
        if (!_0x2f6ea7 && !_0x5b8a1f) {
          return {};
        }
        {
          const _0x2fb782 = _0x2f6ea7 ? _0x50727b : _0x1f0218;
          try {
            return JSON.parse(this.fs.readFileSync(_0x2fb782));
          } catch (_0xcf7ad4) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x14f57a = this.path.resolve(this.dataFile),
          _0x815946 = this.path.resolve(process.cwd(), this.dataFile),
          _0x2c155d = this.fs.existsSync(_0x14f57a),
          _0x240449 = !_0x2c155d && this.fs.existsSync(_0x815946),
          _0x5d6517 = JSON.stringify(this.data);
        _0x2c155d ? this.fs.writeFileSync(_0x14f57a, _0x5d6517) : _0x240449 ? this.fs.writeFileSync(_0x815946, _0x5d6517) : this.fs.writeFileSync(_0x14f57a, _0x5d6517);
      }
    }
    lodash_get(_0x5eaea6, _0x25a4d5, _0xcb432f) {
      const _0x49821b = _0x25a4d5.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x5ffba5 = _0x5eaea6;
      for (const _0x12fe9e of _0x49821b) if (_0x5ffba5 = Object(_0x5ffba5)[_0x12fe9e], void 0 === _0x5ffba5) {
        return _0xcb432f;
      }
      return _0x5ffba5;
    }
    lodash_set(_0x5a149d, _0x42bc5b, _0x2b80d4) {
      return Object(_0x5a149d) !== _0x5a149d ? _0x5a149d : (Array.isArray(_0x42bc5b) || (_0x42bc5b = _0x42bc5b.toString().match(/[^.[\]]+/g) || []), _0x42bc5b.slice(0, -1).reduce((_0x46e12b, _0x45112b, _0x5c7f73) => Object(_0x46e12b[_0x45112b]) === _0x46e12b[_0x45112b] ? _0x46e12b[_0x45112b] : _0x46e12b[_0x45112b] = Math.abs(_0x42bc5b[_0x5c7f73 + 1]) >> 0 == +_0x42bc5b[_0x5c7f73 + 1] ? [] : {}, _0x5a149d)[_0x42bc5b[_0x42bc5b.length - 1]] = _0x2b80d4, _0x5a149d);
    }
    getdata(_0xe4a71c) {
      let _0x24f817 = this.getval(_0xe4a71c);
      if (/^@/.test(_0xe4a71c)) {
        const [, _0x4d709a, _0x2b0c07] = /^@(.*?)\.(.*?)$/.exec(_0xe4a71c),
          _0x4f58c5 = _0x4d709a ? this.getval(_0x4d709a) : "";
        if (_0x4f58c5) {
          try {
            const _0x2a2481 = JSON.parse(_0x4f58c5);
            _0x24f817 = _0x2a2481 ? this.lodash_get(_0x2a2481, _0x2b0c07, "") : _0x24f817;
          } catch (_0x2e581e) {
            _0x24f817 = "";
          }
        }
      }
      return _0x24f817;
    }
    setdata(_0x3c8c07, _0x5cc084) {
      let _0x2eaf85 = !1;
      if (/^@/.test(_0x5cc084)) {
        const [, _0x5e1cde, _0x203509] = /^@(.*?)\.(.*?)$/.exec(_0x5cc084),
          _0x198b34 = this.getval(_0x5e1cde),
          _0x1fad8c = _0x5e1cde ? "null" === _0x198b34 ? null : _0x198b34 || "{}" : "{}";
        try {
          const _0x2493d9 = JSON.parse(_0x1fad8c);
          this.lodash_set(_0x2493d9, _0x203509, _0x3c8c07);
          _0x2eaf85 = this.setval(JSON.stringify(_0x2493d9), _0x5e1cde);
        } catch (_0x4507f6) {
          const _0xe514f1 = {};
          this.lodash_set(_0xe514f1, _0x203509, _0x3c8c07);
          _0x2eaf85 = this.setval(JSON.stringify(_0xe514f1), _0x5e1cde);
        }
      } else {
        _0x2eaf85 = this.setval(_0x3c8c07, _0x5cc084);
      }
      return _0x2eaf85;
    }
    getval(_0x527030) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x527030) : this.isQuanX() ? $prefs.valueForKey(_0x527030) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x527030]) : this.data && this.data[_0x527030] || null;
    }
    setval(_0x33e1ea, _0x25e187) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x33e1ea, _0x25e187) : this.isQuanX() ? $prefs.setValueForKey(_0x33e1ea, _0x25e187) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x25e187] = _0x33e1ea, this.writedata(), !0) : this.data && this.data[_0x25e187] || null;
    }
    initGotEnv(_0x2180a3) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x2180a3 && (_0x2180a3.headers = _0x2180a3.headers ? _0x2180a3.headers : {}, void 0 === _0x2180a3.headers.Cookie && void 0 === _0x2180a3.cookieJar && (_0x2180a3.cookieJar = this.ckjar));
    }
    get(_0x2f188a, _0x3a972d = () => {}) {
      var _0x3b4d4f = {
        "X-Surge-Skip-Scripting": !1
      };
      var _0x5be766 = {
        hints: !1
      };
      _0x2f188a.headers && (delete _0x2f188a.headers["Content-Type"], delete _0x2f188a.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x2f188a.headers = _0x2f188a.headers || {}, Object.assign(_0x2f188a.headers, _0x3b4d4f)), $httpClient.get(_0x2f188a, (_0x6e7276, _0x206afb, _0x131ca1) => {
        !_0x6e7276 && _0x206afb && (_0x206afb.body = _0x131ca1, _0x206afb.statusCode = _0x206afb.status);
        _0x3a972d(_0x6e7276, _0x206afb, _0x131ca1);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x2f188a.opts = _0x2f188a.opts || {}, Object.assign(_0x2f188a.opts, _0x5be766)), $task.fetch(_0x2f188a).then(_0x173055 => {
        const {
          statusCode: _0xb34d8c,
          statusCode: _0x43417f,
          headers: _0x48dd66,
          body: _0x3b8a7d
        } = _0x173055;
        var _0x164e33 = {
          status: _0xb34d8c,
          statusCode: _0x43417f,
          headers: _0x48dd66,
          body: _0x3b8a7d
        };
        _0x3a972d(null, _0x164e33, _0x3b8a7d);
      }, _0x26eb26 => _0x3a972d(_0x26eb26))) : this.isNode() && (this.initGotEnv(_0x2f188a), this.got(_0x2f188a).on("redirect", (_0x5217a4, _0x3897c5) => {
        try {
          if (_0x5217a4.headers["set-cookie"]) {
            const _0x259ecd = _0x5217a4.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x259ecd && this.ckjar.setCookieSync(_0x259ecd, null);
            _0x3897c5.cookieJar = this.ckjar;
          }
        } catch (_0x3d7b3e) {
          this.logErr(_0x3d7b3e);
        }
      }).then(_0x4dc052 => {
        const {
          statusCode: _0x19eec3,
          statusCode: _0x46cf9d,
          headers: _0x409433,
          body: _0x1cfea5
        } = _0x4dc052;
        var _0x248846 = {
          status: _0x19eec3,
          statusCode: _0x46cf9d,
          headers: _0x409433,
          body: _0x1cfea5
        };
        _0x3a972d(null, _0x248846, _0x1cfea5);
      }, _0x923bb1 => {
        const {
          message: _0x4cd5c1,
          response: _0x4d4123
        } = _0x923bb1;
        _0x3a972d(_0x4cd5c1, _0x4d4123, _0x4d4123 && _0x4d4123.body);
      }));
    }
    post(_0xee60ed, _0x599474 = () => {}) {
      var _0x422160 = {
        "X-Surge-Skip-Scripting": !1
      };
      var _0x496410 = {
        hints: !1
      };
      if (_0xee60ed.body && _0xee60ed.headers && !_0xee60ed.headers["Content-Type"] && (_0xee60ed.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0xee60ed.headers && delete _0xee60ed.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0xee60ed.headers = _0xee60ed.headers || {}, Object.assign(_0xee60ed.headers, _0x422160));
        $httpClient.post(_0xee60ed, (_0x247bea, _0x317def, _0x161a2a) => {
          !_0x247bea && _0x317def && (_0x317def.body = _0x161a2a, _0x317def.statusCode = _0x317def.status);
          _0x599474(_0x247bea, _0x317def, _0x161a2a);
        });
      } else {
        if (this.isQuanX()) {
          _0xee60ed.method = "POST";
          this.isNeedRewrite && (_0xee60ed.opts = _0xee60ed.opts || {}, Object.assign(_0xee60ed.opts, _0x496410));
          $task.fetch(_0xee60ed).then(_0x19f2a0 => {
            const {
              statusCode: _0x54bd99,
              statusCode: _0x54dd86,
              headers: _0x37f3eb,
              body: _0x251067
            } = _0x19f2a0;
            var _0x117f9c = {
              status: _0x54bd99,
              statusCode: _0x54dd86,
              headers: _0x37f3eb,
              body: _0x251067
            };
            _0x599474(null, _0x117f9c, _0x251067);
          }, _0xa959d1 => _0x599474(_0xa959d1));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0xee60ed);
            const {
              url: _0x2b84f4,
              ..._0x7854cd
            } = _0xee60ed;
            this.got.post(_0x2b84f4, _0x7854cd).then(_0x5e2ba0 => {
              const {
                statusCode: _0x496ec2,
                statusCode: _0x4f6569,
                headers: _0x1e88f8,
                body: _0x160bee
              } = _0x5e2ba0;
              var _0x40e8c7 = {
                status: _0x496ec2,
                statusCode: _0x4f6569,
                headers: _0x1e88f8,
                body: _0x160bee
              };
              _0x599474(null, _0x40e8c7, _0x160bee);
            }, _0x5e9d47 => {
              const {
                message: _0x541714,
                response: _0x231157
              } = _0x5e9d47;
              _0x599474(_0x541714, _0x231157, _0x231157 && _0x231157.body);
            });
          }
        }
      }
    }
    time(_0x504b96, _0x41167f = null) {
      const _0x48159c = _0x41167f ? new Date(_0x41167f) : new Date();
      var _0x430a1c = {
        "M+": _0x48159c.getMonth() + 1,
        "d+": _0x48159c.getDate(),
        "H+": _0x48159c.getHours(),
        "m+": _0x48159c.getMinutes(),
        "s+": _0x48159c.getSeconds(),
        "q+": Math.floor((_0x48159c.getMonth() + 3) / 3),
        S: _0x48159c.getMilliseconds()
      };
      /(y+)/.test(_0x504b96) && (_0x504b96 = _0x504b96.replace(RegExp.$1, (_0x48159c.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x32468d in _0x430a1c) new RegExp("(" + _0x32468d + ")").test(_0x504b96) && (_0x504b96 = _0x504b96.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x430a1c[_0x32468d] : ("00" + _0x430a1c[_0x32468d]).substr(("" + _0x430a1c[_0x32468d]).length)));
      return _0x504b96;
    }
    msg(_0x2b2b2b = _0x230f03, _0x47dc67 = "", _0xfe05d9 = "", _0x369b76) {
      const _0x31f7ad = _0xff079b => {
        if (!_0xff079b) {
          return _0xff079b;
        }
        if ("string" == typeof _0xff079b) {
          return this.isLoon() ? _0xff079b : this.isQuanX() ? {
            "open-url": _0xff079b
          } : this.isSurge() ? {
            url: _0xff079b
          } : void 0;
        }
        if ("object" == typeof _0xff079b) {
          if (this.isLoon()) {
            let _0x35a7eb = _0xff079b.openUrl || _0xff079b.url || _0xff079b["open-url"],
              _0x3bd949 = _0xff079b.mediaUrl || _0xff079b["media-url"];
            var _0x318489 = {
              openUrl: _0x35a7eb,
              mediaUrl: _0x3bd949
            };
            return _0x318489;
          }
          if (this.isQuanX()) {
            let _0x2cbda7 = _0xff079b["open-url"] || _0xff079b.url || _0xff079b.openUrl,
              _0x95cb45 = _0xff079b["media-url"] || _0xff079b.mediaUrl;
            var _0x5c4fda = {
              "open-url": _0x2cbda7,
              "media-url": _0x95cb45
            };
            return _0x5c4fda;
          }
          if (this.isSurge()) {
            let _0x43ee8a = _0xff079b.url || _0xff079b.openUrl || _0xff079b["open-url"];
            var _0x797ebd = {
              url: _0x43ee8a
            };
            return _0x797ebd;
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x2b2b2b, _0x47dc67, _0xfe05d9, _0x31f7ad(_0x369b76)) : this.isQuanX() && $notify(_0x2b2b2b, _0x47dc67, _0xfe05d9, _0x31f7ad(_0x369b76))), !this.isMuteLog) {
        let _0x3707b6 = ["", "==============📣系统通知📣=============="];
        _0x3707b6.push(_0x2b2b2b);
        _0x47dc67 && _0x3707b6.push(_0x47dc67);
        _0xfe05d9 && _0x3707b6.push(_0xfe05d9);
        console.log(_0x3707b6.join("\n"));
        this.logs = this.logs.concat(_0x3707b6);
      }
    }
    log(..._0xafdd71) {
      _0xafdd71.length > 0 && (this.logs = [...this.logs, ..._0xafdd71]);
      console.log(_0xafdd71.join(this.logSeparator));
    }
    logErr(_0x2dfaea, _0x2dbdfa) {
      const _0x5b6ce6 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x5b6ce6 ? this.log("", "❗️" + this.name + ", 错误!", _0x2dfaea.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x2dfaea);
    }
    wait(_0xff0f6a) {
      return new Promise(_0x3eb563 => setTimeout(_0x3eb563, _0xff0f6a));
    }
    done(_0x3c21d3 = {}) {
      const _0x2fe098 = new Date().getTime(),
        _0x57e755 = (_0x2fe098 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x57e755 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x3c21d3);
    }
  }(_0x230f03, _0x18bb90);
}
