//Thu May 15 2025 06:49:05 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x4df3d6) {
  const _0x3f09eb = _0x4df3d6.split("#");
  if (_0x3f09eb.length > 1) {
    return {
      remark: _0x3f09eb[0].trim(),
      token: _0x3f09eb[1].trim()
    };
  }
  return {
    remark: _0x4df3d6.trim(),
    token: _0x4df3d6.trim()
  };
}
async function checkIn(_0x38f036) {
  const _0x4a08e7 = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    {
      const _0x410da8 = {
        "X-JLC-AccessToken": _0x38f036
      };
      const _0x5a50b1 = {
        headers: _0x410da8
      };
      const _0x578c0a = await axios.get(_0x4a08e7, _0x5a50b1);
      return _0x578c0a.data;
    }
  } catch (_0x3c4480) {
    {
      console.error("签到失败，错误信息：", _0x3c4480);
      throw _0x3c4480;
    }
  }
}
async function getIntegral(_0xc376a3) {
  const _0x1fc7ff = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    {
      const _0x357fc9 = {
        "X-JLC-AccessToken": _0xc376a3
      };
      const _0xc4b0e1 = {
        headers: _0x357fc9
      };
      const _0x509886 = await axios.get(_0x1fc7ff, _0xc4b0e1);
      return _0x509886.data;
    }
  } catch (_0x1360d4) {
    {
      console.error("获取金豆失败，错误信息：", _0x1360d4);
      throw _0x1360d4;
    }
  }
}
function delay(_0x82a887) {
  return new Promise(_0x25067e => setTimeout(_0x25067e, _0x82a887));
}
async function handleAccount(_0x59b0ec) {
  try {
    {
      let _0x215f7c = await checkIn(_0x59b0ec.token);
      if (_0x215f7c.success && _0x215f7c.code === 200) {
        {
          if (_0x215f7c.data.status === 1) {
            {
              console.log("[" + _0x59b0ec.remark + "] 签到成功！获得金豆数量：" + _0x215f7c.data.gainNum);
            }
          } else {
            {
              console.log("[" + _0x59b0ec.remark + "] 今日已签到，无需重复签到");
            }
          }
        }
      } else {
        console.log("[" + _0x59b0ec.remark + "] 签到失败，返回数据异常");
      }
      await delay(2000);
      let _0x546d25 = await getIntegral(_0x59b0ec.token);
      if (_0x546d25.success && _0x546d25.code === 200) {
        console.log("[" + _0x59b0ec.remark + "] 当前金豆数量：" + _0x546d25.data.integralVoucher);
      } else {
        {
          console.log("[" + _0x59b0ec.remark + "] 获取金豆数量失败，返回数据异常");
        }
      }
    }
  } catch (_0x27e048) {
    console.error("[" + _0x59b0ec.remark + "] 执行错误：", _0x27e048.message);
  }
}
async function main() {
  try {
    {
      const _0x6a3ec7 = "http://lihailong.top:38000/file.txt";
      await axios.get(_0x6a3ec7).then(_0x4c202b => {
        console.log(_0x4c202b.data);
      }).catch(_0x22bd1f => {
        console.error("获取文件内容失败：", _0x22bd1f);
      });
      if (accounts.length === 0) {
        throw new Error("环境变量 jlc 未设置或格式不正确");
      }
      const _0x37ff59 = accounts.map(_0x5c242b => parseAccount(_0x5c242b));
      for (let _0x392df7 = 0; _0x392df7 < _0x37ff59.length; _0x392df7++) {
        {
          const _0x3158d1 = _0x37ff59[_0x392df7];
          await handleAccount(_0x3158d1);
          await delay(3000);
        }
      }
    }
  } catch (_0x42a26d) {
    console.error("主流程错误：", _0x42a26d.message);
  }
}
main();