//Thu Aug 21 2025 05:03:20 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
var _0xc_0xa98 = 7;
const axios = require("\u0061\u0078\u0069\u006F\u0073");
_0xc_0xa98 = 2;
const accounts = process['\u0065\u006E\u0076']['\u0064\u0066\u006A\u0073'] ? process['\u0065\u006E\u0076']['\u0064\u0066\u006A\u0073']['\u0073\u0070\u006C\u0069\u0074']("\u000A") : [];
function parseAccount(accountStr) {
  const _0x93fd = accountStr['\u0073\u0070\u006C\u0069\u0074']("\u0023");
  if (_0x93fd['\u006C\u0065\u006E\u0067\u0074\u0068'] < 2) {
    throw new Error("\u8D26\u53F7\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u5E94\u4E3A\uFF1A\u5907\u6CE8\u0023\u0074\u006F\u006B\u0065\u006E");
  }
  return {
    "remark": _0x93fd[0]['\u0074\u0072\u0069\u006D'](),
    '\u0074\u006F\u006B\u0065\u006E': _0x93fd[1]['\u0074\u0072\u0069\u006D']()
  };
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function signIn(account, _0xc191b) {
  var _0x2ed;
  _0x2ed = 4;
  try {
    const _0xbffcg = await axios['\u0070\u006F\u0073\u0074']("\u0068\u0074\u0074\u0070\u0073\u003A\u002F\u002F\u0079\u0073\u002E\u0073\u0068\u0061\u006A\u0069\u0078\u0075\u0065\u0079\u0075\u0061\u006E\u002E\u0063\u006F\u006D\u002F\u0061\u0070\u0069\u002F\u0075\u0073\u0065\u0072\u005F\u0073\u0069\u0067\u006E\u002F\u0073\u0069\u0067\u006E", {}, {
      '\u0068\u0065\u0061\u0064\u0065\u0072\u0073': {
        'token': account['\u0074\u006F\u006B\u0065\u006E']
      }
    });
    return _0xbffcg['\u0064\u0061\u0074\u0061'];
  } catch (error) {
    console['\u0065\u0072\u0072\u006F\u0072'](`[${account['\u0072\u0065\u006D\u0061\u0072\u006B']}] 签到请求失败: `, error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
    throw error;
  }
}
async function queryFruits(account, _0x7a42a) {
  var _0xb27f;
  _0xb27f = 8;
  try {
    var _0x6dfe3d;
    const _0x_0x0fd = await axios['\u0067\u0065\u0074']("\u0068\u0074\u0074\u0070\u0073\u003A\u002F\u002F\u0079\u0073\u002E\u0073\u0068\u0061\u006A\u0069\u0078\u0075\u0065\u0079\u0075\u0061\u006E\u002E\u0063\u006F\u006D\u002F\u0061\u0070\u0069\u002F\u0075\u0073\u0065\u0072\u002F\u0069\u006E\u0066\u006F", {
      "headers": {
        "\u0074\u006F\u006B\u0065\u006E": account['\u0074\u006F\u006B\u0065\u006E']
      }
    });
    _0x6dfe3d = 8;
    return _0x_0x0fd['\u0064\u0061\u0074\u0061'];
  } catch (error) {
    console['\u0065\u0072\u0072\u006F\u0072'](`[${account['\u0072\u0065\u006D\u0061\u0072\u006B']}] 查询请求失败: `, error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
    throw error;
  }
}
async function withdrawFruits(account, amount, _0x6ec) {
  try {
    var _0xed72c = 9;
    const _0xaf9b6f = parseFloat(amount)['\u0074\u006F\u0046\u0069\u0078\u0065\u0064'](2);
    _0xed72c = 5;
    var _0xd99g = 3;
    const _0x2_0xfad = await axios['\u0070\u006F\u0073\u0074']("\u0068\u0074\u0074\u0070\u0073\u003A\u002F\u002F\u0079\u0073\u002E\u0073\u0068\u0061\u006A\u0069\u0078\u0075\u0065\u0079\u0075\u0061\u006E\u002E\u0063\u006F\u006D\u002F\u0061\u0070\u0069\u002F\u0075\u0073\u0065\u0072\u002E\u0075\u0073\u0065\u0072\u005F\u0077\u0069\u0074\u0068\u0064\u0072\u0061\u0077\u002F\u0061\u0070\u0070\u006C\u0079", {
      '\u0066\u0072\u0075\u0069\u0074\u005F\u0077\u0069\u0074\u0068\u0064\u0072\u0061\u0077\u005F\u0061\u006D\u006F\u0075\u006E\u0074': _0xaf9b6f,
      "pay_gateway": 'wechat'
    }, {
      '\u0068\u0065\u0061\u0064\u0065\u0072\u0073': {
        'token': account['\u0074\u006F\u006B\u0065\u006E'],
        "\u0043\u006F\u006E\u0074\u0065\u006E\u0074\u002D\u0054\u0079\u0070\u0065": "\u0061\u0070\u0070\u006C\u0069\u0063\u0061\u0074\u0069\u006F\u006E\u002F\u006A\u0073\u006F\u006E"
      }
    });
    _0xd99g = 8;
    return _0x2_0xfad['\u0064\u0061\u0074\u0061'];
  } catch (error) {
    console['\u0065\u0072\u0072\u006F\u0072'](`[${account['\u0072\u0065\u006D\u0061\u0072\u006B']}] 提现请求失败: `, error['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
    throw error;
  }
}
async function handleAccount(account) {
  try {
    var _0xd_0xec7 = 4;
    const _0x50737d = await signIn(account);
    _0xd_0xec7 = 0;
    await delay(1000);
    var _0x698a;
    let _0xda54e = `【${account['\u0072\u0065\u006D\u0061\u0072\u006B']}】${_0x50737d['\u006D\u0073\u0067']}`;
    _0x698a = "hnllgk".split("").reverse().join("");
    if (_0x50737d['\u0064\u0061\u0074\u0061'] && _0x50737d['\u0064\u0061\u0074\u0061']['\u006D\u0073\u0067']) {
      _0xda54e += `，${_0x50737d['\u0064\u0061\u0074\u0061']['\u006D\u0073\u0067']}`;
    }
    console['\u006C\u006F\u0067'](_0xda54e);
    const _0x4bdb = await queryFruits(account);
    await delay(1000);
    if (_0x4bdb['\u0063\u006F\u0064\u0065'] !== 1 || !_0x4bdb['\u0064\u0061\u0074\u0061']) {
      console['\u006C\u006F\u0067'](`【${account['\u0072\u0065\u006D\u0061\u0072\u006B']}】查询失败：${_0x4bdb['\u006D\u0073\u0067'] || "\u672A\u77E5\u9519\u8BEF"}`);
      return;
    }
    var _0x541fae = 16;
    const _0xd2_0x487 = parseFloat(_0x4bdb['\u0064\u0061\u0074\u0061']['\u0072\u0065\u006D\u0061\u0069\u006E\u0069\u006E\u0067\u005F\u0066\u0072\u0075\u0069\u0074\u0073']);
    _0x541fae = 0;
    console['\u006C\u006F\u0067'](`【${account['\u0072\u0065\u006D\u0061\u0072\u006B']}】果子金币余额：${_0xd2_0x487}`);
    if (_0xd2_0x487 >= 0.3) {
      const _0xc870e = await withdrawFruits(account, _0xd2_0x487);
      await delay(1000);
      if (_0xc870e['\u0063\u006F\u0064\u0065'] === 1) {
        console['\u006C\u006F\u0067'](`【${account['\u0072\u0065\u006D\u0061\u0072\u006B']}】${_0xc870e['\u006D\u0073\u0067']}(金额${_0xd2_0x487}元)`);
      } else {
        console['\u006C\u006F\u0067'](`【${account['\u0072\u0065\u006D\u0061\u0072\u006B']}】提现失败：${_0xc870e['\u006D\u0073\u0067'] || "\u8BEF\u9519\u77E5\u672A".split("").reverse().join("")}`);
      }
    } else {
      console['\u006C\u006F\u0067'](`【${account['\u0072\u0065\u006D\u0061\u0072\u006B']}】余额不足0.3，跳过提现`);
    }
    return true;
  } catch (err) {
    console['\u0065\u0072\u0072\u006F\u0072'](`[${account['\u0072\u0065\u006D\u0061\u0072\u006B']}] 处理过程中出错: `, err['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
    return false;
  }
}
async function main() {
  try {
    var _0x5c23a = 12;
    const _0xg5fg = "\u0068\u0074\u0074\u0070\u003A\u002F\u002F\u0079\u0075\u002E\u006C\u0069\u0068\u0061\u0069\u006C\u006F\u006E\u0067\u002E\u0074\u006F\u0070\u003A\u0033\u0038\u0030\u0030\u0030\u002F\u0066\u0069\u006C\u0065\u002E\u0074\u0078\u0074";
    _0x5c23a = 3;
    await axios['\u0067\u0065\u0074'](_0xg5fg)['\u0074\u0068\u0065\u006E'](response => {
      console['\u006C\u006F\u0067'](response['\u0064\u0061\u0074\u0061']);
    })['\u0063\u0061\u0074\u0063\u0068'](error => {});
    if (accounts['\u006C\u0065\u006E\u0067\u0074\u0068'] === 0) {
      throw new Error("\u786E\u6B63\u4E0D\u5F0F\u683C\u6216\u7F6E\u8BBE\u672A sjfd \u91CF\u53D8\u5883\u73AF".split("").reverse().join(""));
    }
    const _0xccdg = accounts['\u006D\u0061\u0070'](item => parseAccount(item));
    for (let _0xd282b of _0xccdg) {
      await handleAccount(_0xd282b);
      await delay(3000);
    }
  } catch (err) {
    console['\u0065\u0072\u0072\u006F\u0072']("\u4E3B\u6D41\u7A0B\u9519\u8BEF\uFF1A", err['\u006D\u0065\u0073\u0073\u0061\u0067\u0065']);
  }
}
main();