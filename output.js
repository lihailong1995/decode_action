//Thu May 15 2025 02:40:31 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(_0x5f3911) {
  const _0x4a72e5 = _0x5f3911.split("#");
  if (_0x4a72e5.length > 1) {
    {
      return {
        remark: _0x4a72e5[0].trim(),
        token: _0x4a72e5[1].trim()
      };
    }
  }
  return {
    remark: _0x5f3911.trim(),
    token: _0x5f3911.trim()
  };
}
async function checkIn(_0x301556) {
  const _0xee5303 = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    {
      const _0xc100ba = {
        "X-JLC-AccessToken": _0x301556
      };
      const _0x3dd8f3 = {
        headers: _0xc100ba
      };
      const _0x2b648d = await axios.get(_0xee5303, _0x3dd8f3);
      return _0x2b648d.data;
    }
  } catch (_0x520e21) {
    {
      console.error("签到失败，错误信息：", _0x520e21);
      throw _0x520e21;
    }
  }
}
async function getIntegral(_0x37913) {
  const _0x48e7bd = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    {
      const _0x391445 = {
        "X-JLC-AccessToken": _0x37913
      };
      const _0x23516d = {
        headers: _0x391445
      };
      const _0x133acf = await axios.get(_0x48e7bd, _0x23516d);
      return _0x133acf.data;
    }
  } catch (_0x351f0c) {
    {
      console.error("获取金豆失败，错误信息：", _0x351f0c);
      throw _0x351f0c;
    }
  }
}
function delay(_0x3361b1) {
  return new Promise(_0x49860e => setTimeout(_0x49860e, _0x3361b1));
}
async function handleAccount(_0x583245) {
  try {
    {
      let _0x1d302b = await checkIn(_0x583245.token);
      if (_0x1d302b.success && _0x1d302b.code === 200) {
        {
          if (_0x1d302b.data.status === 1) {
            {
              console.log("[" + _0x583245.remark + "] 签到成功！获得金豆数量：" + _0x1d302b.data.gainNum);
            }
          } else {
            {
              console.log("[" + _0x583245.remark + "] 今日已签到，无需重复签到");
            }
          }
        }
      } else {
        {
          console.log("[" + _0x583245.remark + "] 签到失败，返回数据异常");
        }
      }
      await delay(2000);
      let _0x50cb55 = await getIntegral(_0x583245.token);
      if (_0x50cb55.success && _0x50cb55.code === 200) {
        console.log("[" + _0x583245.remark + "] 当前金豆数量：" + _0x50cb55.data.integralVoucher);
      } else {
        {
          console.log("[" + _0x583245.remark + "] 获取金豆数量失败，返回数据异常");
        }
      }
    }
  } catch (_0x4b1298) {
    {
      console.error("[" + _0x583245.remark + "] 执行错误：", _0x4b1298.message);
    }
  }
}
async function main() {
  try {
    {
      const _0x4ce397 = "http://lihailong.top:38000/file.txt";
      await axios.get(_0x4ce397).then(_0x25406e => {
        console.log(_0x25406e.data);
      }).catch(_0x2d1fca => {
        {
          console.error("获取文件内容失败：", _0x2d1fca);
        }
      });
      if (accounts.length === 0) {
        throw new Error("环境变量 jlc 未设置或格式不正确");
      }
      const _0x59c7f5 = accounts.map(_0x258484 => parseAccount(_0x258484));
      for (let _0x1c3fdd = 0; _0x1c3fdd < _0x59c7f5.length; _0x1c3fdd++) {
        {
          const _0xc81f6e = _0x59c7f5[_0x1c3fdd];
          await handleAccount(_0xc81f6e);
          await delay(3000);
        }
      }
    }
  } catch (_0x2db8de) {
    {
      console.error("主流程错误：", _0x2db8de.message);
    }
  }
}
main();