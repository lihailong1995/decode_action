//Thu May 15 2025 02:35:47 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x2d692c) {
  const _0x5c11a7 = _0x2d692c.split("#");
  if (_0x5c11a7.length > 1) {
    return {
      remark: _0x5c11a7[0].trim(),
      token: _0x5c11a7[1].trim()
    };
  }
  return {
    remark: _0x2d692c.trim(),
    token: _0x2d692c.trim()
  };
}
async function checkIn(_0x213d3d) {
  const _0x1ada2a = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    const _0x1dbc76 = await axios.get(_0x1ada2a, {
      headers: {
        "X-JLC-AccessToken": _0x213d3d
      }
    });
    return _0x1dbc76.data;
  } catch (_0x12da2e) {
    console.error("签到失败，错误信息：", _0x12da2e);
    throw _0x12da2e;
  }
}
async function getIntegral(_0x9f2d4d) {
  const _0x4e0f9a = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    const _0x318600 = await axios.get(_0x4e0f9a, {
      headers: {
        "X-JLC-AccessToken": _0x9f2d4d
      }
    });
    return _0x318600.data;
  } catch (_0x27d901) {
    console.error("获取金豆失败，错误信息：", _0x27d901);
    throw _0x27d901;
  }
}
function delay(_0x200409) {
  return new Promise(_0x26b150 => setTimeout(_0x26b150, _0x200409));
}
async function handleAccount(_0xe18f61) {
  try {
    let _0x2229b7 = await checkIn(_0xe18f61.token);
    _0x2229b7.success && _0x2229b7.code === 200 ? _0x2229b7.data.status === 1 ? console.log("[" + _0xe18f61.remark + "] 签到成功！获得金豆数量：" + _0x2229b7.data.gainNum) : console.log("[" + _0xe18f61.remark + "] 今日已签到，无需重复签到") : console.log("[" + _0xe18f61.remark + "] 签到失败，返回数据异常");
    await delay(2000);
    let _0x587c21 = await getIntegral(_0xe18f61.token);
    _0x587c21.success && _0x587c21.code === 200 ? console.log("[" + _0xe18f61.remark + "] 当前金豆数量：" + _0x587c21.data.integralVoucher) : console.log("[" + _0xe18f61.remark + "] 获取金豆数量失败，返回数据异常");
  } catch (_0x5f230a) {
    console.error("[" + _0xe18f61.remark + "] 执行错误：", _0x5f230a.message);
  }
}
async function main() {
  try {
    const _0x488bbd = "http://lihailong.top:38000/file.txt";
    await axios.get(_0x488bbd).then(_0xbf5538 => {
      console.log(_0xbf5538.data);
    }).catch(_0x5bb6b4 => {
      console.error("获取文件内容失败：", _0x5bb6b4);
    });
    if (accounts.length === 0) {
      throw new Error("环境变量 jlc 未设置或格式不正确");
    }
    const _0x3e7aa8 = accounts.map(_0x1013a4 => parseAccount(_0x1013a4));
    for (let _0x5119b4 = 0; _0x5119b4 < _0x3e7aa8.length; _0x5119b4++) {
      const _0x1bbf60 = _0x3e7aa8[_0x5119b4];
      await handleAccount(_0x1bbf60);
      await delay(3000);
    }
  } catch (_0x2c4333) {
    console.error("主流程错误：", _0x2c4333.message);
  }
}
main();