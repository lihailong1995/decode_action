//Wed Aug 27 2025 02:15:56 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios"),
  accounts = process.env.kww ? process.env.kww.split("\n") : [];
function parseAccount(_0x42017f) {
  const _0x3332ba = _0x42017f.split("#");
  if (_0x3332ba.length < 2) throw new Error("账号格式不正确，应为：备注#cookie");
  return {
    "remark": _0x3332ba[0].trim(),
    "cookie": _0x3332ba[1].trim()
  };
}
function delay(_0x572547) {
  return new Promise(_0x14a5e4 => setTimeout(_0x14a5e4, _0x572547));
}
async function signIn(_0xc35a4e, _0x31da5a) {
  const _0x421979 = "https://89420-1-activity.m.dexfu.cn/projectx/p16480c32/main/sign.do?user_type=1&is_from_share=1",
    _0x183e9f = {
      "Cookie": _0x31da5a,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
    };
  try {
    {
      const _0x27a837 = await axios.get(_0x421979, {
        "headers": _0x183e9f
      });
      return _0x27a837.data;
    }
  } catch (_0x30581c) {
    console.error("[" + _0xc35a4e.remark + "] 签到请求失败: ", _0x30581c.message);
    return {
      "success": false,
      "message": "请求失败"
    };
  }
}
async function queryChallenge(_0xaf4383, _0x1365c4) {
  const _0x1667d9 = "https://89420-1-activity.m.dexfu.cn/projectx/p16480c32/challenge/index.do?user_type=1&is_from_share=1",
    _0x2842bf = {
      "Cookie": _0x1365c4,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
    };
  try {
    const _0x12e28e = await axios.get(_0x1667d9, {
      "headers": _0x2842bf
    });
    return _0x12e28e.data;
  } catch (_0x30e8f9) {
    console.error("[" + _0xaf4383.remark + "] 查询请求失败: ", _0x30e8f9.message);
    return {
      "success": false,
      "message": "请求失败"
    };
  }
}
async function handleAccount(_0x87c041) {
  try {
    const _0x2929e5 = await signIn(_0x87c041, _0x87c041.cookie);
    await delay(1000);
    if (_0x2929e5.success === true) {
      console.log("[" + _0x87c041.remark + "] 今日签到打卡成功");
    } else {
      const _0x504444 = _0x2929e5.message || "签到失败";
      console.log("[" + _0x87c041.remark + "] " + _0x504444);
    }
    const _0x2b9601 = await queryChallenge(_0x87c041, _0x87c041.cookie);
    await delay(1000);
    if (_0x2b9601.success === true) {
      {
        const _0xe3e88 = _0x2b9601.data.hasChallengeDay || 0;
        console.log("[" + _0x87c041.remark + "] 打卡进度" + _0xe3e88 + "/30");
      }
    } else {
      {
        const _0x175079 = _0x2b9601.message || "查询失败";
        console.log("[" + _0x87c041.remark + "] " + _0x175079);
      }
    }
    return true;
  } catch (_0x1def32) {
    console.error("[" + _0x87c041.remark + "] 处理过程中出错: ", _0x1def32.message);
    return false;
  }
}
async function main() {
  try {
    const _0x59ff22 = "https://gitee.com/MaoJiu2025/Script/raw/master/file/Maojiu.txt";
    await axios.get(_0x59ff22).then(_0x12dc1a => {
      console.log(_0x12dc1a.data);
    }).catch(_0x9b2ca8 => {});
    if (accounts.length === 0) throw new Error("环境变量 kww 未设置或格式不正确");
    const _0x365900 = accounts.map(_0x339ea6 => parseAccount(_0x339ea6));
    for (let _0x2dc9f6 of _0x365900) {
      await handleAccount(_0x2dc9f6);
      await delay(3000);
    }
  } catch (_0x5559bf) {
    console.error("主流程错误：", _0x5559bf.message);
  }
}
main();