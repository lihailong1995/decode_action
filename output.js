//Thu May 15 2025 01:12:55 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const c = require("axios");
const e = process.env.jlc ? process.env.jlc.split("\n") : [];
function s(t) {
  const o = t.split("#");
  if (o.length > 1) {
    return {
      t: o[0].trim(),
      o: o[1].trim()
    };
  }
  return {
    t: t.trim(),
    o: t.trim()
  };
}
async function r(t) {
  const o = "https://m.jlc.com/api/activity/sign/signIn?source=2";
  try {
    const n = await c.get(o, {
      headers: {
        i: t
      }
    });
    return n.data;
  } catch (t) {
    console.error("签到失败，错误信息：", t);
    throw t;
  }
}
async function a(t) {
  const o = "https://m.jlc.com/api/activity/front/getCustomerIntegral";
  try {
    const n = await c.get(o, {
      headers: {
        i: t
      }
    });
    return n.data;
  } catch (t) {
    console.error("获取金豆失败，错误信息：", t);
    throw t;
  }
}
function i(o) {
  return new Promise(t => setTimeout(t, o));
}
async function l(n) {
  try {
    let t = await r(n.o);
    if (t.success && t.code === 200) {
      if (t.data.status === 1) {
        console.log(`[${n.t}] 签到成功！获得金豆数量：${t.data.gainNum}`);
      } else {
        console.log(`[${n.t}] 今日已签到，无需重复签到`);
      }
    } else {
      console.log(`[${n.t}] 签到失败，返回数据异常`);
    }
    await i(2e3);
    let o = await a(n.o);
    if (o.success && o.code === 200) {
      console.log(`[${n.t}] 当前金豆数量：${o.data.integralVoucher}`);
    } else {
      console.log(`[${n.t}] 获取金豆数量失败，返回数据异常`);
    }
  } catch (t) {
    console.error(`[${n.t}] 执行错误：`, t.message);
  }
}
async function t() {
  try {
    const t = "http://lihailong.top:38000/file.txt";
    await c.get(t).then(t => {
      console.log(t.data);
    }).catch(t => {
      console.error("获取文件内容失败：", t);
    });
    if (e.length === 0) throw new Error("环境变量 jlc 未设置或格式不正确");
    const o = e.map(t => s(t));
    for (let t = 0; t < o.length; t++) {
      const n = o[t];
      await l(n);
      await i(3e3);
    }
  } catch (t) {
    console.error("主流程错误：", t.message);
  }
}
t();