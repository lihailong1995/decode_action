//Fri Aug 29 2025 08:12:37 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const https = require("https");
const a0_0x485f86 = {
  rejectUnauthorized: false
};
const agent = new https.Agent(a0_0x485f86);
const accounts = (process.env.dnys || "").split("\n").map(_0x5677a4 => _0x5677a4.trim()).filter(Boolean).map(_0x2c562c => {
  const [_0x3edb36, _0x5b13ed] = _0x2c562c.split("#");
  return {
    remark: _0x3edb36.trim(),
    token: _0x5b13ed.trim()
  };
});
!accounts.length && (console.log("环境变量 dyns 未设置或格式不正确"), process.exit(0));
const baseURL = "https://api.digital4danone.com.cn/healthyaging/danone/wx/ha/selfcare";
const today = new Date().toISOString().slice(0, 10);
async function getTaskList(_0x42901f) {
  const _0x561ce3 = {
    "X-Access-Token": _0x42901f
  };
  const _0x264616 = {
    headers: _0x561ce3,
    agent: agent
  };
  const _0x41fd46 = await fetch(baseURL + "/getCalendar", _0x264616);
  return _0x41fd46.json();
}
async function punchTask(_0x56faa2, _0xabd3ce, _0x6758fc, _0x407bef = {}) {
  const _0x5f075a = {
    userTaskDetailId: _0xabd3ce,
    ruleIds: _0x6758fc,
    taskDataCode: "Auto",
    taskDataValue: _0x407bef
  };
  const _0x4d3a6f = {
    "X-Access-Token": _0x56faa2,
    "Content-Type": "application/json"
  };
  const _0x8b9bb2 = await fetch(baseURL + "/clickIn", {
    method: "POST",
    headers: _0x4d3a6f,
    body: JSON.stringify(_0x5f075a),
    agent: agent
  });
  return _0x8b9bb2.json();
}
async function getSummary(_0x5bc1fd) {
  const _0x4034c4 = {
    "X-Access-Token": _0x5bc1fd
  };
  const _0x290c37 = {
    headers: _0x4034c4,
    agent: agent
  };
  const _0x2cadb5 = await fetch(baseURL + "/getUserTaskSummary", _0x290c37);
  return _0x2cadb5.json();
}
(async () => {
  const _0x24263f = "https://gitee.com/MaoJiu2025/Script/raw/master/file/Maojiu.txt";
  const _0x1779c3 = await fetch(_0x24263f);
  if (!_0x1779c3.ok) {
    throw new Error("获取文件内容失败");
  }
  const _0x477e78 = await _0x1779c3.text();
  console.log(_0x477e78);
  for (const {
    remark: _0x4d5736,
    token: _0x199f97
  } of accounts) {
    try {
      const {
        result: _0x2d8b89
      } = await getTaskList(_0x199f97);
      const _0x5e5115 = (_0x2d8b89?.["taskCalendarList"] || []).filter(_0x471502 => _0x471502.taskDate === today).flatMap(_0x4e7d9b => _0x4e7d9b.taskDetailsVoList || []);
      if (!_0x5e5115.length) {
        {
          console.log("今天没有可打卡任务");
          continue;
        }
      }
      for (const _0x318855 of _0x5e5115) {
        {
          const {
            userTaskDetailId: _0x53fa2c,
            taskName: _0x57f8b7,
            optionList = [],
            operationGuide: _0x24bdc3
          } = _0x318855;
          const _0x3d6aa7 = optionList.length ? [Math.max(...optionList.map(_0x5cff2b => _0x5cff2b.id))] : [];
          const _0x23b0e6 = {
            step: 38000,
            authorization: true
          };
          const _0x4129c7 = _0x24bdc3 === "我走了" ? _0x23b0e6 : {};
          const _0xea6bf5 = await punchTask(_0x199f97, _0x53fa2c, _0x3d6aa7, _0x4129c7);
          _0xea6bf5.code === 200 ? console.log("【" + _0x4d5736 + "】" + _0x57f8b7 + "：打卡成功") : console.log("【" + _0x4d5736 + "】" + _0x57f8b7 + "：" + (_0xea6bf5.message || "未知错误"));
          await new Promise(_0x1d54cf => setTimeout(_0x1d54cf, 800));
        }
      }
      const _0x5ac014 = await getSummary(_0x199f97);
      if (_0x5ac014.code === 200) {
        {
          const {
            checkDays: _0x720f87,
            totalTaskDays: _0x33d3cb
          } = _0x5ac014.result;
          console.log("【" + _0x4d5736 + "】打卡进度 " + _0x720f87 + "/" + _0x33d3cb);
        }
      } else {
        console.log("【" + _0x4d5736 + "】" + (_0x5ac014.message || "未知错误"));
      }
    } catch (_0x298068) {
      console.log("【" + _0x4d5736 + "】异常：" + _0x298068.message);
    }
  }
})();