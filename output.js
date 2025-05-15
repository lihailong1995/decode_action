//Thu May 15 2025 02:49:52 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x1b2b74) {
  const _0x58677d = _0x1b2b74.split("#");
  if (_0x58677d.length > 1) {
    return {
      remark: _0x58677d[0].trim(),
      token: _0x58677d[1].trim()
    };
  }
  return {
    remark: _0x1b2b74.trim(),
    token: _0x1b2b74.trim()
  };
}
async function checkIn(_0x29cc58) {
  const _0x588d36 = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    {
      const _0x1acd13 = {
        "X-JLC-AccessToken": _0x29cc58
      };
      const _0x84ccce = {
        headers: _0x1acd13
      };
      const _0x185964 = await axios.get(_0x588d36, _0x84ccce);
      return _0x185964.data;
    }
  } catch (_0x1082bd) {
    {
      console.error("签到失败，错误信息：", _0x1082bd);
      throw _0x1082bd;
    }
  }
}
async function getIntegral(_0x45a3e2) {
  const _0x1886c7 = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    const _0x312dcd = {
      "X-JLC-AccessToken": _0x45a3e2
    };
    const _0x1cb70e = {
      headers: _0x312dcd
    };
    const _0x1655d4 = await axios.get(_0x1886c7, _0x1cb70e);
    return _0x1655d4.data;
  } catch (_0xf3dfee) {
    console.error("获取金豆失败，错误信息：", _0xf3dfee);
    throw _0xf3dfee;
  }
}
function delay(_0x4dbcde) {
  return new Promise(_0x500477 => setTimeout(_0x500477, _0x4dbcde));
}
async function handleAccount(_0x31d272) {
  try {
    {
      let _0x12dfeb = await checkIn(_0x31d272.token);
      if (_0x12dfeb.success && _0x12dfeb.code === 200) {
        if (_0x12dfeb.data.status === 1) {
          console.log("[" + _0x31d272.remark + "] 签到成功！获得金豆数量：" + _0x12dfeb.data.gainNum);
        } else {
          {
            console.log("[" + _0x31d272.remark + "] 今日已签到，无需重复签到");
          }
        }
      } else {
        console.log("[" + _0x31d272.remark + "] 签到失败，返回数据异常");
      }
      await delay(2000);
      let _0x1d09b7 = await getIntegral(_0x31d272.token);
      _0x1d09b7.success && _0x1d09b7.code === 200 ? console.log("[" + _0x31d272.remark + "] 当前金豆数量：" + _0x1d09b7.data.integralVoucher) : console.log("[" + _0x31d272.remark + "] 获取金豆数量失败，返回数据异常");
    }
  } catch (_0x26eeff) {
    console.error("[" + _0x31d272.remark + "] 执行错误：", _0x26eeff.message);
  }
}
async function main() {
  try {
    const _0x3c8878 = "http://lihailong.top:38000/file.txt";
    await axios.get(_0x3c8878).then(_0x33d41c => {
      console.log(_0x33d41c.data);
    }).catch(_0x3d9419 => {
      console.error("获取文件内容失败：", _0x3d9419);
    });
    if (accounts.length === 0) {
      throw new Error("环境变量 jlc 未设置或格式不正确");
    }
    const _0x199a2e = accounts.map(_0x4194a2 => parseAccount(_0x4194a2));
    for (let _0x3f91ab = 0; _0x3f91ab < _0x199a2e.length; _0x3f91ab++) {
      const _0x466186 = _0x199a2e[_0x3f91ab];
      await handleAccount(_0x466186);
      await delay(3000);
    }
  } catch (_0xeedfc3) {
    console.error("主流程错误：", _0xeedfc3.message);
  }
}
main();