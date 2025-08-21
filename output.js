//Thu Aug 21 2025 06:06:29 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios"),
  accounts = process.env.dfjs ? process.env.dfjs.split("\n") : [];
function parseAccount(_0xcd6efc) {
  const _0x166a24 = _0xcd6efc.split("#");
  if (_0x166a24.length < 2) {
    throw new Error("账号格式不正确，应为：备注#token");
  }
  return {
    "remark": _0x166a24[0].trim(),
    "token": _0x166a24[1].trim()
  };
}
function delay(_0x5130fa) {
  return new Promise(_0x6bba7c => setTimeout(_0x6bba7c, _0x5130fa));
}
async function signIn(_0x494cc7) {
  const _0x4acf4c = "https://ys.shajixueyuan.com/api/user_sign/sign";
  try {
    {
      const _0x2ee614 = await axios.post(_0x4acf4c, {}, {
        "headers": {
          "token": _0x494cc7.token
        }
      });
      return _0x2ee614.data;
    }
  } catch (_0x244a81) {
    {
      console.error("[" + _0x494cc7.remark + "] 签到请求失败: ", _0x244a81.message);
      throw _0x244a81;
    }
  }
}
async function queryFruits(_0x2339cf) {
  const _0x4cc598 = "https://ys.shajixueyuan.com/api/user/info";
  try {
    const _0x11b0ba = await axios.get(_0x4cc598, {
      "headers": {
        "token": _0x2339cf.token
      }
    });
    return _0x11b0ba.data;
  } catch (_0x259d3e) {
    console.error("[" + _0x2339cf.remark + "] 查询请求失败: ", _0x259d3e.message);
    throw _0x259d3e;
  }
}
async function withdrawFruits(_0x3ef148, _0x183179) {
  const _0x4ac920 = "https://ys.shajixueyuan.com/api/user.user_withdraw/apply";
  try {
    {
      const _0x4eb656 = parseFloat(_0x183179).toFixed(2),
        _0x27ab68 = await axios.post(_0x4ac920, {
          "fruit_withdraw_amount": _0x4eb656,
          "pay_gateway": "wechat"
        }, {
          "headers": {
            "token": _0x3ef148.token,
            "Content-Type": "application/json"
          }
        });
      return _0x27ab68.data;
    }
  } catch (_0x487bd1) {
    console.error("[" + _0x3ef148.remark + "] 提现请求失败: ", _0x487bd1.message);
    throw _0x487bd1;
  }
}
async function handleAccount(_0x28a115) {
  try {
    {
      const _0x4575f2 = await signIn(_0x28a115);
      await delay(1000);
      let _0x52cf28 = "【" + _0x28a115.remark + "】" + _0x4575f2.msg;
      _0x4575f2.data && _0x4575f2.data.msg && (_0x52cf28 += "，" + _0x4575f2.data.msg);
      console.log(_0x52cf28);
      const _0x8b8f89 = await queryFruits(_0x28a115);
      await delay(1000);
      if (_0x8b8f89.code !== 1 || !_0x8b8f89.data) {
        {
          console.log("【" + _0x28a115.remark + "】查询失败：" + (_0x8b8f89.msg || "未知错误"));
          return;
        }
      }
      const _0x1074d7 = parseFloat(_0x8b8f89.data.remaining_fruits);
      console.log("【" + _0x28a115.remark + "】果子金币余额：" + _0x1074d7);
      if (_0x1074d7 >= 0.3) {
        const _0x1cbbbf = await withdrawFruits(_0x28a115, _0x1074d7);
        await delay(1000);
        if (_0x1cbbbf.code === 1) {
          console.log("【" + _0x28a115.remark + "】" + _0x1cbbbf.msg + "(金额" + _0x1074d7 + "元)");
        } else console.log("【" + _0x28a115.remark + "】提现失败：" + (_0x1cbbbf.msg || "未知错误"));
      } else console.log("【" + _0x28a115.remark + "】余额不足0.3，跳过提现");
      return true;
    }
  } catch (_0x2cce80) {
    console.error("[" + _0x28a115.remark + "] 处理过程中出错: ", _0x2cce80.message);
    return false;
  }
}
async function main() {
  try {
    const _0x15d245 = "http://yu.lihailong.top:38000/file.txt";
    await axios.get(_0x15d245).then(_0x408508 => {
      console.log(_0x408508.data);
    }).catch(_0x2054df => {});
    if (accounts.length === 0) {
      throw new Error("环境变量 dfjs 未设置或格式不正确");
    }
    const _0x4e85da = accounts.map(_0x26a61f => parseAccount(_0x26a61f));
    for (let _0x4ed237 of _0x4e85da) {
      await handleAccount(_0x4ed237);
      await delay(3000);
    }
  } catch (_0x52a8fb) {
    console.error("主流程错误：", _0x52a8fb.message);
  }
}
main();