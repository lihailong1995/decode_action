//Thu May 15 2025 07:02:15 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const axios = require("axios");
const accounts = process.env.jlc ? process.env.jlc.split("\n") : [];
function parseAccount(b) {
  const g = b.split("#");
  if (g.length > 1) {
    return {
      remark: g[0].trim(),
      token: g[1].trim()
    };
  }
  return {
    remark: b.trim(),
    token: b.trim()
  };
}
async function checkIn(f) {
  const i = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    const j = {
      "X-JLC-AccessToken": f
    };
    const k = {
      headers: j
    };
    const l = await axios.get(i, k);
    return l.data;
  } catch (m) {
    console.error("签到失败，错误信息：", m);
    throw m;
  }
}
async function getIntegral(f) {
  const h = {
    JPYPP: "获取金豆失败，错误信息：",
    rYmmO: function (j, k) {
      return j !== k;
    },
    mgxMm: "eiQmI"
  };
  const i = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    {
      const j = {
        "X-JLC-AccessToken": f
      };
      const k = {
        headers: j
      };
      const l = await axios.get(i, k);
      return l.data;
    }
  } catch (n) {
    console.error("获取金豆失败，错误信息：", n);
    throw n;
  }
}
function delay(a) {
  return new Promise(b => setTimeout(b, a));
}
async function handleAccount(a) {
  try {
    let e = await checkIn(a.token);
    e.success && e.code === 200 ? e.data.status === 1 ? console.log("[" + a.remark + "] 签到成功！获得金豆数量：" + e.data.gainNum) : console.log("[" + a.remark + "] 今日已签到，无需重复签到") : console.log("[" + a.remark + "] 签到失败，返回数据异常");
    await delay(2000);
    let f = await getIntegral(a.token);
    f.success && f.code === 200 ? console.log("[" + a.remark + "] 当前金豆数量：" + f.data.integralVoucher) : console.log("[" + a.remark + "] 获取金豆数量失败，返回数据异常");
  } catch (h) {
    console.error("[" + a.remark + "] 执行错误：", h.message);
  }
}
async function main() {
  try {
    const h = "http://lihailong.top:38000/file.txt";
    await axios.get(h).then(k => {
      console.log(k.data);
    }).catch(k => {
      console.error("获取文件内容失败：", k);
    });
    if (accounts.length === 0) {
      throw new Error("环境变量 jlc 未设置或格式不正确");
    }
    const j = accounts.map(k => parseAccount(k));
    for (let k = 0; k < j.length; k++) {
      const l = j[k];
      await handleAccount(l);
      await delay(3000);
    }
  } catch (m) {
    console.error("主流程错误：", m.message);
  }
}
main();