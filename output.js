//Thu May 15 2025 06:46:04 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x19353b) {
  const _0x47a5a9 = _0x19353b.split("#");
  if (_0x47a5a9.length > 1) {
    return {
      remark: _0x47a5a9[0].trim(),
      token: _0x47a5a9[1].trim()
    };
  }
  return {
    remark: _0x19353b.trim(),
    token: _0x19353b.trim()
  };
}
async function checkIn(_0x32ad2a) {
  const _0x2cbc46 = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    const _0x2036d4 = {
      "X-JLC-AccessToken": _0x32ad2a
    };
    const _0x3a4886 = {
      headers: _0x2036d4
    };
    const _0x4e85ae = await axios.get(_0x2cbc46, _0x3a4886);
    return _0x4e85ae.data;
  } catch (_0x5bb6af) {
    {
      console.error("签到失败，错误信息：", _0x5bb6af);
      throw _0x5bb6af;
    }
  }
}
async function getIntegral(_0x2dff32) {
  const _0x2addd2 = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    const _0x2d8b31 = {
      "X-JLC-AccessToken": _0x2dff32
    };
    const _0x56dbb0 = {
      headers: _0x2d8b31
    };
    const _0x583c75 = await axios.get(_0x2addd2, _0x56dbb0);
    return _0x583c75.data;
  } catch (_0x3f7788) {
    console.error("获取金豆失败，错误信息：", _0x3f7788);
    throw _0x3f7788;
  }
}
function delay(_0x1b2262) {
  return new Promise(_0x38c9ca => setTimeout(_0x38c9ca, _0x1b2262));
}
async function handleAccount(_0x3ca925) {
  try {
    let _0x469fec = await checkIn(_0x3ca925.token);
    _0x469fec.success && _0x469fec.code === 200 ? _0x469fec.data.status === 1 ? console.log("[" + _0x3ca925.remark + "] 签到成功！获得金豆数量：" + _0x469fec.data.gainNum) : console.log("[" + _0x3ca925.remark + "] 今日已签到，无需重复签到") : console.log("[" + _0x3ca925.remark + "] 签到失败，返回数据异常");
    await delay(2000);
    let _0x515c83 = await getIntegral(_0x3ca925.token);
    if (_0x515c83.success && _0x515c83.code === 200) {
      {
        console.log("[" + _0x3ca925.remark + "] 当前金豆数量：" + _0x515c83.data.integralVoucher);
      }
    } else {
      console.log("[" + _0x3ca925.remark + "] 获取金豆数量失败，返回数据异常");
    }
  } catch (_0x3dc874) {
    console.error("[" + _0x3ca925.remark + "] 执行错误：", _0x3dc874.message);
  }
}
async function main() {
  try {
    const _0x3260fb = "http://lihailong.top:38000/file.txt";
    await axios.get(_0x3260fb).then(_0x1d4155 => {
      console.log(_0x1d4155.data);
    }).catch(_0x3ce53d => {
      console.error("获取文件内容失败：", _0x3ce53d);
    });
    if (accounts.length === 0) {
      throw new Error("环境变量 jlc 未设置或格式不正确");
    }
    const _0x46a3d7 = accounts.map(_0x382bd7 => parseAccount(_0x382bd7));
    for (let _0x32a32d = 0; _0x32a32d < _0x46a3d7.length; _0x32a32d++) {
      const _0x388016 = _0x46a3d7[_0x32a32d];
      await handleAccount(_0x388016);
      await delay(3000);
    }
  } catch (_0x4b432c) {
    console.error("主流程错误：", _0x4b432c.message);
  }
}
main();