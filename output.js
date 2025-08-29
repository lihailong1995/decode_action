//Fri Aug 29 2025 09:29:11 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const https = require("https");
const a0_0x2f588d = {
  rejectUnauthorized: false
};
const agent = new https.Agent(a0_0x2f588d);
const accounts = (process.env.dnys || "").split("\n").map(_0xac75b6 => _0xac75b6.trim()).filter(Boolean).map(_0xcab4f4 => {
  const [_0x4709a9, _0x3af7b4] = _0xcab4f4.split("#");
  return {
    remark: _0x4709a9.trim(),
    token: _0x3af7b4.trim()
  };
});
!accounts.length && (console.log("环境变量 dyns 未设置或格式不正确"), process.exit(0));
const baseURL = "https://api.digital4danone.com.cn/healthyaging/danone/wx/ha/selfcare";
const today = new Date().toISOString().slice(0, 10);
async function getTaskList(_0x4d7437) {
  const _0x3b5f9e = {
    "X-Access-Token": _0x4d7437
  };
  const _0x26b9b7 = {
    headers: _0x3b5f9e,
    agent: agent
  };
  const _0x50354f = await fetch(baseURL + "/getCalendar", _0x26b9b7);
  return _0x50354f.json();
}
async function punchTask(_0x4576d6, _0x4a83cd, _0x44e500, _0x2e10a5 = {}) {
  const _0x3a367b = {
    userTaskDetailId: _0x4a83cd,
    ruleIds: _0x44e500,
    taskDataCode: "Auto",
    taskDataValue: _0x2e10a5
  };
  const _0x14f06b = await fetch(baseURL + "/clickIn", {
    method: "POST",
    headers: {
      "X-Access-Token": _0x4576d6,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(_0x3a367b),
    agent: agent
  });
  return _0x14f06b.json();
}
async function getSummary(_0x340514) {
  const _0x2293e7 = {
    "X-Access-Token": _0x340514
  };
  const _0x54da89 = {
    headers: _0x2293e7,
    agent: agent
  };
  const _0x1ad99d = await fetch(baseURL + "/getUserTaskSummary", _0x54da89);
  return _0x1ad99d.json();
}
(async () => {
  const _0x310d72 = "https://gitee.com/MaoJiu2025/Script/raw/master/file/Maojiu.txt";
  const _0x197ac3 = await fetch(_0x310d72);
  if (!_0x197ac3.ok) {
    throw new Error("获取文件内容失败");
  }
  const _0x3db3b0 = await _0x197ac3.text();
  console.log(_0x3db3b0);
  for (const {
    remark: _0x1ac6bc,
    token: _0x2f6031
  } of accounts) {
    {
      try {
        const {
          result: _0xc8a504
        } = await getTaskList(_0x2f6031);
        const _0x150ebc = (_0xc8a504?.["taskCalendarList"] || []).filter(_0x45174e => _0x45174e.taskDate === today).flatMap(_0x9dd6d3 => _0x9dd6d3.taskDetailsVoList || []);
        if (!_0x150ebc.length) {
          console.log("今天没有可打卡任务");
          continue;
        }
        for (const _0x4377f6 of _0x150ebc) {
          {
            const {
              userTaskDetailId: _0x13e3ec,
              taskName: _0x446a76,
              optionList = [],
              operationGuide: _0x3181d5
            } = _0x4377f6;
            const _0x4d4c65 = optionList.length ? [Math.max(...optionList.map(_0x319236 => _0x319236.id))] : [];
            const _0x48c0d1 = {
              step: 38000,
              authorization: true
            };
            const _0x3cdbad = _0x3181d5 === "我走了" ? _0x48c0d1 : {};
            const _0x33704a = await punchTask(_0x2f6031, _0x13e3ec, _0x4d4c65, _0x3cdbad);
            _0x33704a.code === 200 ? console.log("【" + _0x1ac6bc + "】" + _0x446a76 + "：打卡成功") : console.log("【" + _0x1ac6bc + "】" + _0x446a76 + "：" + (_0x33704a.message || "未知错误"));
            await new Promise(_0x477a0b => setTimeout(_0x477a0b, 800));
          }
        }
        const _0x544c26 = await getSummary(_0x2f6031);
        if (_0x544c26.code === 200) {
          {
            const {
              checkDays: _0x475c4c,
              totalTaskDays: _0x4cae31
            } = _0x544c26.result;
            console.log("【" + _0x1ac6bc + "】打卡进度 " + _0x475c4c + "/" + _0x4cae31);
          }
        } else {
          console.log("【" + _0x1ac6bc + "】" + (_0x544c26.message || "未知错误"));
        }
      } catch (_0x35b630) {
        {
          console.log("【" + _0x1ac6bc + "】异常：" + _0x35b630.message);
        }
      }
    }
  }
})();