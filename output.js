//Thu May 15 2025 06:44:20 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x5b56ff) {
  const _0x2efd11 = _0x5b56ff.split("#");
  if (_0x2efd11.length > 1) {
    return {
      remark: _0x2efd11[0].trim(),
      token: _0x2efd11[1].trim()
    };
  }
  return {
    remark: _0x5b56ff.trim(),
    token: _0x5b56ff.trim()
  };
}
async function checkIn(_0x2b9502) {
  const _0x2c1843 = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    {
      const _0x1926e9 = {
        "X-JLC-AccessToken": _0x2b9502
      };
      const _0x1604f2 = {
        headers: _0x1926e9
      };
      const _0x98fa40 = await axios.get(_0x2c1843, _0x1604f2);
      return _0x98fa40.data;
    }
  } catch (_0x5845e9) {
    console.error("签到失败，错误信息：", _0x5845e9);
    throw _0x5845e9;
  }
}
async function getIntegral(_0x5bbad8) {
  const _0x402bc5 = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    const _0x12fc43 = {
      "X-JLC-AccessToken": _0x5bbad8
    };
    const _0x49de20 = {
      headers: _0x12fc43
    };
    const _0x385a96 = await axios.get(_0x402bc5, _0x49de20);
    return _0x385a96.data;
  } catch (_0x3cbd77) {
    console.error("获取金豆失败，错误信息：", _0x3cbd77);
    throw _0x3cbd77;
  }
}
function delay(_0xaf87ac) {
  return new Promise(_0x5102d5 => setTimeout(_0x5102d5, _0xaf87ac));
}
async function handleAccount(_0x1fc79b) {
  try {
    let _0x4d90e5 = await checkIn(_0x1fc79b.token);
    _0x4d90e5.success && _0x4d90e5.code === 200 ? _0x4d90e5.data.status === 1 ? console.log("[" + _0x1fc79b.remark + "] 签到成功！获得金豆数量：" + _0x4d90e5.data.gainNum) : console.log("[" + _0x1fc79b.remark + "] 今日已签到，无需重复签到") : console.log("[" + _0x1fc79b.remark + "] 签到失败，返回数据异常");
    await delay(2000);
    let _0x3f57a4 = await getIntegral(_0x1fc79b.token);
    if (_0x3f57a4.success && _0x3f57a4.code === 200) {
      {
        console.log("[" + _0x1fc79b.remark + "] 当前金豆数量：" + _0x3f57a4.data.integralVoucher);
      }
    } else {
      console.log("[" + _0x1fc79b.remark + "] 获取金豆数量失败，返回数据异常");
    }
  } catch (_0x459322) {
    console.error("[" + _0x1fc79b.remark + "] 执行错误：", _0x459322.message);
  }
}
async function main() {
  try {
    {
      const _0x4cf3f0 = "http://lihailong.top:38000/file.txt";
      await axios.get(_0x4cf3f0).then(_0x2caab2 => {
        console.log(_0x2caab2.data);
      }).catch(_0x759f23 => {
        console.error("获取文件内容失败：", _0x759f23);
      });
      if (accounts.length === 0) {
        throw new Error("环境变量 jlc 未设置或格式不正确");
      }
      const _0x3af6d5 = accounts.map(_0x5ad338 => parseAccount(_0x5ad338));
      for (let _0x11c796 = 0; _0x11c796 < _0x3af6d5.length; _0x11c796++) {
        {
          const _0x5c8bea = _0x3af6d5[_0x11c796];
          await handleAccount(_0x5c8bea);
          await delay(3000);
        }
      }
    }
  } catch (_0x1b1ad5) {
    console.error("主流程错误：", _0x1b1ad5.message);
  }
}
main();