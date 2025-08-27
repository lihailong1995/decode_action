//Wed Aug 27 2025 02:14:53 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.kww ? process.env.kww.split("\n") : [];
function parseAccount(_0x19361f) {
  const _0x51cc87 = _0x19361f.split("#");
  if (_0x51cc87.length < 2) {
    {
      throw new Error("账号格式不正确，应为：备注#cookie");
    }
  }
  return {
    remark: _0x51cc87[0].trim(),
    cookie: _0x51cc87[1].trim()
  };
}
function delay(_0x5c4470) {
  return new Promise(_0x48974d => setTimeout(_0x48974d, _0x5c4470));
}
async function signIn(_0x2f60f6, _0x254b30) {
  const _0x56fa7c = "https://89420-1-activity.m.dexfu.cn/projectx/p16480c32/main/sign.do?user_type=1&is_from_share=1";
  const _0x49deb2 = {
    Cookie: _0x254b30,
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
  };
  try {
    {
      const _0x424de3 = {
        headers: _0x49deb2
      };
      const _0x12c70b = await axios.get(_0x56fa7c, _0x424de3);
      return _0x12c70b.data;
    }
  } catch (_0x47c110) {
    {
      console.error("[" + _0x2f60f6.remark + "] 签到请求失败: ", _0x47c110.message);
      const _0x3da312 = {
        success: false,
        message: "请求失败"
      };
      return _0x3da312;
    }
  }
}
async function queryChallenge(_0x36c494, _0x13224c) {
  const _0xe984c6 = "https://89420-1-activity.m.dexfu.cn/projectx/p16480c32/challenge/index.do?user_type=1&is_from_share=1";
  const _0xa4f219 = {
    Cookie: _0x13224c,
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
  };
  try {
    {
      const _0x137282 = {
        headers: _0xa4f219
      };
      const _0x17c3bd = await axios.get(_0xe984c6, _0x137282);
      return _0x17c3bd.data;
    }
  } catch (_0xf81024) {
    {
      console.error("[" + _0x36c494.remark + "] 查询请求失败: ", _0xf81024.message);
      const _0x15ac54 = {
        success: false,
        message: "请求失败"
      };
      return _0x15ac54;
    }
  }
}
async function handleAccount(_0x5e713b) {
  try {
    {
      const _0x431d9a = await signIn(_0x5e713b, _0x5e713b.cookie);
      await delay(1000);
      if (_0x431d9a.success === true) {
        console.log("[" + _0x5e713b.remark + "] 今日签到打卡成功");
      } else {
        {
          const _0x565093 = _0x431d9a.message || "签到失败";
          console.log("[" + _0x5e713b.remark + "] " + _0x565093);
        }
      }
      const _0x2003db = await queryChallenge(_0x5e713b, _0x5e713b.cookie);
      await delay(1000);
      if (_0x2003db.success === true) {
        {
          const _0x581ece = _0x2003db.data.hasChallengeDay || 0;
          console.log("[" + _0x5e713b.remark + "] 打卡进度" + _0x581ece + "/30");
        }
      } else {
        {
          const _0x283599 = _0x2003db.message || "查询失败";
          console.log("[" + _0x5e713b.remark + "] " + _0x283599);
        }
      }
      return true;
    }
  } catch (_0x2f8abf) {
    {
      console.error("[" + _0x5e713b.remark + "] 处理过程中出错: ", _0x2f8abf.message);
      return false;
    }
  }
}
async function main() {
  try {
    {
      const _0x333ab1 = "https://gitee.com/MaoJiu2025/Script/raw/master/file/Maojiu.txt";
      await axios.get(_0x333ab1).then(_0x4b48c4 => {
        console.log(_0x4b48c4.data);
      }).catch(_0x409d45 => {});
      if (accounts.length === 0) {
        {
          throw new Error("环境变量 kww 未设置或格式不正确");
        }
      }
      const _0xe2dce5 = accounts.map(_0x2b9136 => parseAccount(_0x2b9136));
      for (let _0x1a8710 of _0xe2dce5) {
        {
          await handleAccount(_0x1a8710);
          await delay(3000);
        }
      }
    }
  } catch (_0x4fdd51) {
    console.error("主流程错误：", _0x4fdd51.message);
  }
}
main();