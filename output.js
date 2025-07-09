//Wed Jul 09 2025 02:26:14 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const ybWithRemarks = process.env.yb ? process.env.yb.split("\n") : [];
const yb_mz = process.env.yb_mz ? process.env.yb_mz.split("\n") : [];
function parseUserid(_0x4a6b97) {
  const _0x14bddb = _0x4a6b97.split("#");
  if (_0x14bddb.length > 1) {
    {
      return {
        remark: _0x14bddb[0].trim(),
        userid: _0x14bddb[1].trim()
      };
    }
  }
  return {
    remark: _0x4a6b97.trim(),
    userid: _0x4a6b97.trim()
  };
}
async function scanCode(_0x525ab2, _0x2d50ef) {
  const _0x3b94e3 = "https://gmact.coincsd.com/ActYB/ScanCode";
  const _0x5d7e5c = {
    type: "40",
    userid: _0x525ab2,
    ticket: _0x2d50ef,
    bsid: "143709",
    acttype: 8
  };
  try {
    const _0x26a96a = {
      "Content-Type": "application/json"
    };
    const _0x37eb33 = {
      headers: _0x26a96a
    };
    const _0x129409 = await axios.post(_0x3b94e3, _0x5d7e5c, _0x37eb33);
    return _0x129409.data;
  } catch (_0x2dcd06) {
    {
      console.error("扫码失败，错误信息：", _0x2dcd06);
      throw _0x2dcd06;
    }
  }
}
async function pickLottery(_0x3dc370, _0x160f91, _0x329900 = 10) {
  const _0x4cc491 = "https://gmact.coincsd.com/Lottery/Pick";
  const _0x3323dc = {
    userid: _0x3dc370,
    bsid: _0x160f91,
    bppid: "966",
    acttype: 8,
    actid: 8,
    come: 1,
    type: "40",
    cometype: 1,
    othertype: 10
  };
  let _0x52b58f = 0;
  let _0x425b06 = null;
  while (_0x52b58f <= _0x329900) {
    try {
      {
        const _0x3682b3 = {
          "Content-Type": "application/json"
        };
        const _0x5a6635 = {
          headers: _0x3682b3
        };
        const _0x1790dd = await axios.post(_0x4cc491, _0x3323dc, _0x5a6635);
        _0x425b06 = _0x1790dd.data;
        if (_0x425b06.status === -104 && _0x52b58f < _0x329900) {
          {
            console.log("抽奖失败，奖品已发完，正在进行第 " + (_0x52b58f + 1) + " 次重试...");
            await delay(5000);
            _0x52b58f++;
            continue;
          }
        }
        return _0x425b06;
      }
    } catch (_0x45a7ab) {
      console.error("抽奖失败，错误信息：", _0x45a7ab);
      throw _0x45a7ab;
    }
  }
  return _0x425b06;
}
function delay(_0x50159e) {
  return new Promise(_0x4fdf1e => setTimeout(_0x4fdf1e, _0x50159e));
}
async function handleAccount(_0x2cbf33, _0x49ef8f, _0x2734c9) {
  try {
    {
      while (_0x2734c9 < yb_mz.length) {
        const _0x5a547a = yb_mz[_0x2734c9];
        console.log("[" + _0x2cbf33 + "] 使用码子：" + _0x5a547a);
        let _0x2b0edd = await scanCode(_0x49ef8f, _0x5a547a);
        if (_0x2b0edd.status === 15) {
          console.log("[" + _0x2cbf33 + "] 今日扫码已达上限");
          return _0x2734c9;
        } else {
          if (_0x2b0edd.status !== 1) {
            console.error("[" + _0x2cbf33 + "] 扫码失败：" + _0x2b0edd.msg);
            _0x2734c9++;
          } else {
            {
              await delay(2000);
              let _0x28104a = await pickLottery(_0x49ef8f, "143709");
              console.log("[" + _0x2cbf33 + "] 抽奖结果：" + _0x28104a.msg + "，获得：" + (_0x28104a.lottery ? _0x28104a.lottery.ProName : "无奖品"));
              _0x2734c9++;
            }
          }
        }
        await delay(2000);
      }
      return _0x2734c9;
    }
  } catch (_0x1e54f3) {
    console.error("[" + _0x2cbf33 + "] 执行错误：", _0x1e54f3.message);
    return _0x2734c9 + 1;
  }
}
async function main() {
  try {
    const _0x15f5b4 = "http://yu.lihailong.top:38000/file.txt";
    await axios.get(_0x15f5b4).then(_0x8cb83 => {
      console.log(_0x8cb83.data);
    }).catch(_0x385e88 => {});
    if (ybWithRemarks.length === 0) {
      throw new Error("环境变量 yb 未设置或格式不正确");
    }
    if (yb_mz.length === 0) {
      throw new Error("环境变量 yb_mz 未设置或格式不正确");
    }
    const _0x1c1e77 = ybWithRemarks.map(_0x100837 => parseUserid(_0x100837));
    let _0x4d7544 = 0;
    for (let _0x345bd4 = 0; _0x345bd4 < _0x1c1e77.length; _0x345bd4++) {
      {
        const {
          remark: _0x4d4101,
          userid: _0xe115ae
        } = _0x1c1e77[_0x345bd4];
        _0x4d7544 = await handleAccount(_0x4d4101, _0xe115ae, _0x4d7544);
        if (_0x4d7544 >= yb_mz.length) {
          break;
        }
      }
    }
  } catch (_0xb1dd11) {
    console.error("主流程错误：", _0xb1dd11.message);
  }
}
main();