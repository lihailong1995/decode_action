//Thu May 15 2025 01:41:42 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x339ccc) {
  const _0x4cf186 = _0x339ccc.split("#");
  if (_0x4cf186.length > 1) {
    return {
      remark: _0x4cf186[0].trim(),
      token: _0x4cf186[1].trim()
    };
  }
  return {
    remark: _0x339ccc.trim(),
    token: _0x339ccc.trim()
  };
}
async function checkIn(_0xde8e54) {
  const _0x3ebb17 = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    const _0x1afe0d = await axios.get(_0x3ebb17, {
      headers: {
        "X-JLC-AccessToken": _0xde8e54
      }
    });
    return _0x1afe0d.data;
  } catch (_0x5f2cb7) {
    console.error("签到失败，错误信息：", _0x5f2cb7);
    throw _0x5f2cb7;
  }
}
async function getIntegral(_0x3a225a) {
  const _0x1850a1 = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    const _0x3bef11 = await axios.get(_0x1850a1, {
      headers: {
        "X-JLC-AccessToken": _0x3a225a
      }
    });
    return _0x3bef11.data;
  } catch (_0x44e9b1) {
    console.error("获取金豆失败，错误信息：", _0x44e9b1);
    throw _0x44e9b1;
  }
}
function delay(_0x4fbda0) {
  return new Promise(_0x3488b8 => setTimeout(_0x3488b8, _0x4fbda0));
}
async function handleAccount(_0xf45942) {
  try {
    let _0x43a71e = await checkIn(_0xf45942.token);
    _0x43a71e.success && _0x43a71e.code === 200 ? _0x43a71e.data.status === 1 ? console.log("[" + _0xf45942.remark + "] 签到成功！获得金豆数量：" + _0x43a71e.data.gainNum) : console.log("[" + _0xf45942.remark + "] 今日已签到，无需重复签到") : console.log("[" + _0xf45942.remark + "] 签到失败，返回数据异常");
    await delay(2000);
    let _0x23439d = await getIntegral(_0xf45942.token);
    _0x23439d.success && _0x23439d.code === 200 ? console.log("[" + _0xf45942.remark + "] 当前金豆数量：" + _0x23439d.data.integralVoucher) : console.log("[" + _0xf45942.remark + "] 获取金豆数量失败，返回数据异常");
  } catch (_0x8bd807) {
    console.error("[" + _0xf45942.remark + "] 执行错误：", _0x8bd807.message);
  }
}
async function main() {
  try {
    const _0x267f2b = "http://lihailong.top:38000/file.txt";
    await axios.get(_0x267f2b).then(_0x1b5e54 => {
      console.log(_0x1b5e54.data);
    }).catch(_0x4c76c2 => {
      console.error("获取文件内容失败：", _0x4c76c2);
    });
    if (accounts.length === 0) {
      throw new Error("环境变量 jlc 未设置或格式不正确");
    }
    const _0x1483f7 = accounts.map(_0x2ab3ba => parseAccount(_0x2ab3ba));
    for (let _0x3bbad8 = 0; _0x3bbad8 < _0x1483f7.length; _0x3bbad8++) {
      const _0x14fbc4 = _0x1483f7[_0x3bbad8];
      await handleAccount(_0x14fbc4);
      await delay(3000);
    }
  } catch (_0x37a6e1) {
    console.error("主流程错误：", _0x37a6e1.message);
  }
}
main();