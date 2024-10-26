#2024-10-26 14:24:23
"""
* 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
* 猫猫看看 V2.20

* 活动入口,微信打开：
* 如果连接过期了运行一下就出来了最新的入口！
* http://9pw4.dsdtew.shop/haobaobao/auth/58487f291985c5f32c16b3b01b96a912
* 打开活动入口，抓包的任意接口cookies中的Cookie参数
* 
* 变量格式：
* 新建同名环境变量
* 变量名：mykkyd
* 变量值：
* # 3000 代表 3毛，后面两个推送参数可不填，那就必须配置全局推送！
* 账号备注#Cookie参数#提现金额如3000#wxpushApptoken#wxpushTopicId
* 
* 其他参数说明（脚本最下方填写参数）
* wxpusher全局参数：wxpusherAppToken、wxpusherTopicId
* 具体使用方法请看文档地址：https://wxpusher.zjiecode.com/docs/#/
* 
* 也可使用 微信机器人：wechatBussinessKey
* 
* 支持支付宝提现：账号备注#Cookie参数#提现金额如3000#wxpushApptoken#wxpushTopicId#支付宝姓名#支付宝账号
* 只想提现支付宝，不想填写其他参数，最少的参数就是：账号备注#Cookie参数###支付宝姓名#支付宝账号
*
* 增加 自定义检测文章等待时间：mykkydReadPostDelay，默认值是 15-20秒
* 增加 精简日志：mykkydReadPureLog，默认值是 true（也就是精简日志，如果需要显示完整的，请设置为 false）
*
* 定时运行每半小时一次
* 达到标准，自动提现
"""

import hashlib
import json
import math
import os
import sys
import time
import requests
import random
import re
from urllib.parse import quote, urlparse, parse_qs
import urllib3
from urllib.parse import parse_qs, urlsplit
import hashlib

urllib3.disable_warnings()

# 填wxpusher的appToken，配置在环境变量里这样没配置的账号会自动使用这个推送
wxpusherAppToken = os.getenv("wxpusherAppToken") or ""
wxpusherTopicId = os.getenv("wxpusherTopicId") or ""
wechatBussinessKey = os.getenv("wechatBussinessKey") or ""
mykkydDetectingSealStatus = True
mykkydDisabledDetectingSealSetting = os.getenv("mykkydDisabledDetectingSeal")
if mykkydDisabledDetectingSealSetting not in ["", None]:
    if mykkydDisabledDetectingSealSetting in ["1", "true", True]:
        mykkydDetectingSealStatus = False
readPostDelay = 0
if os.getenv("mykkydReadPostDelay") and os.getenv("mykkydReadPostDelay").isdecimal():
    readPostDelay = int(os.getenv("mykkydReadPostDelay"))
mykkydReadPureLog = True
if os.getenv("mykkydReadPureLog"):
    mykkydReadPureLog = os.getenv("mykkydReadPureLog") == "true"
# 设置代理地址和端口
proxies = None
if os.getenv("mykkydHttpProxyUrl"):
    proxies = {
        "http": os.getenv("mykkydHttpProxyUrl"),
        "https": os.getenv("mykkydHttpProxyUrl"),
    }


def check_file_md5(url, expected_md5):
    # 获取文件内容
    response = safe_request("GET", url)
    data = response.content

    # 计算MD5
    md5 = hashlib.md5()
    md5.update(data)
    calculated_md5 = md5.hexdigest()
    # print("当前文件的MD5值为：", calculated_md5)
    # 比较MD5
    return calculated_md5 == expected_md5


def check_str_md5(str, expected_md5):
    # 计算MD5
    md5 = hashlib.md5()
    md5.update(str.encode("utf-8"))
    calculated_md5 = md5.hexdigest()
    # print("当前内容的MD5值为：", calculated_md5)
    # 比较MD5
    return calculated_md5 == expected_md5


def extract_middle_text(source, before_text, after_text, all_matches=False):
    results = []
    start_index = source.find(before_text)

    while start_index != -1:
        source_after_before_text = source[start_index + len(before_text) :]
        end_index = source_after_before_text.find(after_text)

        if end_index == -1:
            break

        results.append(source_after_before_text[:end_index])
        if not all_matches:
            break

        source = source_after_before_text[end_index + len(after_text) :]
        start_index = source.find(before_text)

    return results if all_matches else results[0] if results else ""


def push(appToken, topicIds, title, link, text, type):
    datapust = {
        "appToken": appToken,
        "content": f"""<body onload="window.location.href='{link}'">出现检测文章！！！\n<a style='padding:10px;color:red;font-size:20px;' href='{link}'>点击我打开待检测文章</a>\n请尽快点击链接完成阅读\n备注：{text}</body>""",
        "summary": title or "猫猫看看阅读",
        "contentType": 2,
        "topicIds": [topicIds or "11686"],
        "url": link,
    }
    # print(datapust)
    urlpust = "http://wxpusher.zjiecode.com/api/send/message"
    try:
        p = safe_request("POST", url=urlpust, json=datapust, verify=False)
        # print(p)
        if p.json()["code"] == 1000:
            print("✅ 推送文章到微信成功，请尽快前往点击文章，不然就黑号啦！")
            return True
        else:
            print("❌ 推送文章到微信失败，完犊子，要黑号了！")
            return False
    except:
        print("❌ 推送文章到微信失败，完犊子，要黑号了！")
        return False


def pushWechatBussiness(robotKey, link):
    datapust = {"msgtype": "text", "text": {"content": link}}
    # print(datapust)
    urlpust = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=" + robotKey
    try:
        p = safe_request("POST", url=urlpust, json=datapust, verify=False)
        # print(p)
        if p.json()["errcode"] == 0:
            print("✅ 推送文章到企业微信成功！")
            return True
        else:
            print("❌ 推送文章到企业微信失败！")
            return False
    except:
        print("❌ 推送文章到企业微信失败！")
        return False


def getinfo(link):
    try:
        r = safe_request("GET", link, verify=False)
        # print(link, r.text)
        html = re.sub("\s", "", r.text)
        biz = re.findall('varbiz="(.*?)"\|\|', html)
        if biz != []:
            biz = biz[0]
        if biz == "" or biz == []:
            if "__biz" in link:
                biz = re.findall("__biz=(.*?)&", link)
                if biz != []:
                    biz = biz[0]
        nickname = re.findall('varnickname=htmlDecode\("(.*?)"\);', html)
        if nickname != []:
            nickname = nickname[0]
        user_name = re.findall('varuser_name="(.*?)";', html)
        if user_name != []:
            user_name = user_name[0]
        msg_title = re.findall("varmsg_title='(.*?)'\.html\(", html)
        if msg_title != []:
            msg_title = msg_title[0]
        text = f"公众号唯一标识：{biz}|文章:{msg_title}|作者:{nickname}|账号:{user_name}"
        print(text)
        return nickname, user_name, msg_title, text, biz
    except Exception as e:
        # print(e)
        print("❌ 提取文章信息失败")
        return False


def trimSpaceCharacters(text):
    return "".join(text.split())


class LinkCache:
    def __init__(self, file_path):
        self.file_path = file_path
        self.cache = self.load_cache()

    def load_cache(self):
        try:
            with open(self.file_path, "r") as f:
                data = json.load(f)
            return data
        except (FileNotFoundError, json.JSONDecodeError):
            return {}

    def save_cache(self):
        try:
            with open(self.file_path, "w") as f:
                json.dump(self.cache, f, indent=2)
        except Exception as e:
            print("无法保存链接到本地缓存文件：", e)

    def add_link(self, link, date):
        if link not in self.cache:
            self.cache[link] = {"publishDate": date, "count": 1}
        else:
            self.cache[link]["count"] += 1
        self.save_cache()

    def get_link_info(self, link):
        return self.cache.get(link, None)

    def get_all_links(self):
        return list(self.cache.keys())


link_cache = LinkCache("huansheng_mykk_link_cache.json")


def fetch_wx_time_and_record(url, link_cache):
    max_retries = 3
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; RMX1971 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160083 MMWEBSDK/20231202 MMWEBID/8342 MicroMessenger/8.0.47.2560(0x28002F51) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64"
    }
    for i in range(max_retries):
        try:
            response = requests.get(url, headers=headers)
            wx = response.text
            wz_time_regex = r"var createTime = '(.*?)';"
            match = re.search(wz_time_regex, wx)
            if match:
                article_time = match.group(1)
                print(f"微信文章发布时间: {article_time}")
                link_info = link_cache.get_link_info(url)
                print(f"该检测文章，已记录了 {link_info['count'] if link_info else 0 + 1} 次")
                link_cache.add_link(url, article_time)
                return True
        except Exception as e:
            print(f"检测微信文章时间发生错误: {e}")
            return True


def safe_request(method, url, retries=3, **kwargs):
    for i in range(retries):
        try:
            if method.upper() == "GET":
                response = requests.get(url, **kwargs)
            elif method.upper() == "POST":
                response = requests.post(url, **kwargs)
            else:
                print(f"不支持的请求类型: {method}")
                return None
            return response
        except requests.exceptions.RequestException as e:
            print(f"请求失败: {e}")
            if i < retries - 1:  # 如果不是最后一次尝试，就等待一段时间再重试
                wait = random.randint(1, 5)  # 随机等待时间
                print(f"等待 {wait} 秒后重试...")
                time.sleep(wait)
            else:
                print("尝试请求失败，已达到最大尝试次数")
                return None  # 或者你可以返回一个特定的值或对象来表示请求失败


def ts():
    return str(int(time.time())) + "000"


checkDict = {
    "MzkxNTE3MzQ4MQ==": ["香姐爱旅行", "gh_54a65dc60039"],
    "Mzg5MjM0MDEwNw==": ["我本非凡", "gh_46b076903473"],
    "MzUzODY4NzE2OQ==": ["多肉葡萄2020", "gh_b3d79cd1e1b5"],
    "MzkyMjE3MzYxMg==": ["Youhful", "gh_b3d79cd1e1b5"],
    "MzkxNjMwNDIzOA==": ["少年没有乌托邦3", "gh_b3d79cd1e1b5"],
    "Mzg3NzUxMjc5Mg==": ["星星诺言", "gh_b3d79cd1e1b5"],
    "Mzg4NTcwODE1NA==": ["斑马还没睡123", "gh_b3d79cd1e1b5"],
    "Mzk0ODIxODE4OQ==": ["持家妙招宝典", "gh_b3d79cd1e1b5"],
    "Mzg2NjUyMjI1NA==": ["Lilinng", "gh_b3d79cd1e1b5"],
    "MzIzMDczODg4Mw==": ["有故事的同学Y", "gh_b3d79cd1e1b5"],
    "Mzg5ODUyMzYzMQ==": ["789也不行", "gh_b3d79cd1e1b5"],
    "MzU0NzI5Mjc4OQ==": ["皮蛋瘦肉猪", "gh_58d7ee593b86"],
    "Mzg5MDgxODAzMg==": ["北北小助手", "gh_58d7ee593b86"],
    "MzIzMDczODg4Mw==": ["有故事的同学Y", "gh_b8b92934da5f"],
    "MzkxNDU1NDEzNw==": ["猫猫看看服务", "gh_e50cfefef9e5"],
    "MzkzNTYxOTgyMA==": ["韭菜炒鱿鱼", "gh_c131c3ee1187"],
    "MzkxNDYzOTEyMw==": ["蓝莓可乐", "gh_73ca238add97"],
    "MzkwMTYwNzcwMw==": ["艾克里鸭", "gh_77acafd552da"],
    "MzkyNjY0MTExOA==": ["大道智简", "gh_5146130b1789"],
    "MzkyMjYxNzQ2NA==": ["九点准时睡9点", "gh_48fda2f8936c"],
    "MzkzMTYyMDU0OQ==": ["一罐奶兔兔子", "gh_8841ec6f590a"],
    "MzkzNDYxODY5OA==": ["没有星期8", "gh_9143bf676245"],
    "MzkwNzYwNDYyMQ==": ["文学爱好者007", "gh_eeabb4dfebed"],
}


class HHYD:
    def __init__(self, cg):
        self.Cookie = cg["Cookie"]
        self.txbz = cg["txbz"]
        self.topicIds = cg["topicIds"]
        self.appToken = cg["appToken"]
        global wechatBussinessKey
        self.wechatBussinessKey = wechatBussinessKey or ""
        self.aliAccount = cg["aliAccount"] or ""
        self.aliName = cg["aliName"] or ""
        self.name = cg["name"]
        self.domnainHost = "1698855139.hxiong.top"
        self.request_id = ""
        self.headers = {
            "Connection": "keep-alive",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090621) XWEB/8351 Flue",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": f"http://{self.domnainHost}/",
            "Origin": f"http://{self.domnainHost}",
            # "Host": f"{self.domnainHost}",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": self.Cookie,
        }
        self.lastbiz = ""
        self.readJumpPath = ""
        self.retryReading = False
        self.remain_gold = 0
        self.remain = 0
        self.readApiVersion = "8.0"
        self.addGoldPath = ""
        self.getReadUrlPath = ""

    def user_info(self):
        u = f"http://{self.domnainHost}/haobaobao/user"
        r = ""
        try:
            r = safe_request("GET", u, headers=self.headers)
            rj = r.json()
            if rj.get("errcode") == 0:
                print(f"账号[{self.name}]获取信息成功，用户ID为 {r.json()['data']['userid']}")
                return True
            else:
                print(f"账号[{self.name}]获取用户信息失败，账号异常 或者 Cookie无效，请检测Cookie是否正确")
                return False
        except:
            print(r.text)
            print(f"账号[{self.name}]获取用户信息失败,Cookie无效，请检测Cookie是否正确")
            return False

    def gold(self):
        r = ""
        try:
            u = f"http://{self.domnainHost}/haobaobao/workinfo"
            r = safe_request("GET", u, headers=self.headers)
            # print(r.json())
            rj = r.json()
            self.remain_gold = math.floor(int(rj.get("data").get("remain_gold")))
            self.remain = float(rj.get("data").get("remain"))
            print(
                f'今日已经阅读了{rj.get("data").get("dayreads")}篇文章 当前金币{rj.get("data").get("remain_gold")} 当前余额{self.remain}'
            )
        except:
            print(f"账号[{self.name}]获取金币失败")
            return False

    def getKey(self):
        uk = ""
        ukRes = None
        for i in range(10):
            u = f"http://{self.domnainHost}{self.readJumpPath}"
            # print("提示 getKey：", u)
            p = f""
            r = safe_request("POST", u, headers=self.headers, data=p, verify=False)
            # print("getKey：", r.text)
            rj = r.json()
            domain = rj.get("data").get("domain")
            # print("请求中转页：", r.text)
            pp = parse_qs(urlparse(domain).query)
            hn = urlparse(domain).netloc
            uk = pp.get("uk")[0]
            ukRes = r.text
            if uk:
                break
        if uk == "":
            print(f"账号[{self.name}]获取uk失败，返回错误：{ukRes}")
            return
        time.sleep(0.5)
        r = safe_request(
            "GET",
            domain,
            headers={
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Connection": "keep-alive",
                "Host": f"{hn}",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
            },
            verify=False,
        )
        # <script src="https://image.hzysmyy.cn/yunsaoma/newproject/js/article.js?v4.0"></script>
        readJsVersion = extract_middle_text(r.text, "js/article.js?", '"')
        if readJsVersion:
            checkJsCodeChanged = (
                check_file_md5(
                    extract_middle_text(r.text, '<script src="', '"></scrip'),
                    "0674299674c2c54e4c9c8111012552a7",
                )
                == False
            )
            if (readJsVersion != "v11.0") or checkJsCodeChanged:
                print(
                    f"账号[{self.name}] 检测到接口版本发生变化，当前接口版本为：{readJsVersion}，拉响警报，台子搞事，要抓人了，开始撤退，退出程序 >> "
                )
                sys.exit(0)
            else:
                # print(f"账号[{self.name}] 阅读准备完成：{uk}，提取到的地址：{domain}")
                if mykkydReadPureLog == False:
                    print(
                        f"账号[{self.name}] 阅读准备成功，当前接口版本为：{readJsVersion} 即将开始阅读 ✅ ，阅读参数为：{uk}"
                    )
        else:
            resText = trimSpaceCharacters(r.text)
            getReadUrlStr = extract_middle_text(
                resText,
                trimSpaceCharacters("function read_jump_read() {"),
                trimSpaceCharacters(
                    "localStorage.setItem('art_start_time', art_start_time);"
                ),
            )
            self.getReadUrlPath = extract_middle_text(
                getReadUrlStr,
                trimSpaceCharacters('url: domain+"/'),
                trimSpaceCharacters("?time="),
            )
            addGoldStr = extract_middle_text(
                resText,
                trimSpaceCharacters("function getGold(time) {"),
                trimSpaceCharacters('$(".goldNum").html(res.data.gold);'),
            )
            self.addGoldPath = extract_middle_text(
                addGoldStr,
                trimSpaceCharacters('url: domain+"/'),
                trimSpaceCharacters("?time="),
            )
            # http://0f2bb1b650.t1713515229s.zach-iot.online/yd2.html?uk=e4bd143c3e2572da80c2dfd6e13e7a78&t=1713515256
            readApiVersion = extract_middle_text(
                resText,
                trimSpaceCharacters(
                    f'url: domain+"/{self.getReadUrlPath}?time="+ time +"&mysign=168&vs='
                ),
                trimSpaceCharacters('&uk="+ uk,'),
            )
            if readApiVersion:
                self.readApiVersion = readApiVersion
            if (
                trimSpaceCharacters(
                    f'url: domain+"/{self.getReadUrlPath}?time="+ time +"&mysign=168&vs={self.readApiVersion}&uk="+ uk,'
                )
                in resText
                and trimSpaceCharacters(
                    f'url: domain+"/{self.addGoldPath}?time="+time+"&psign="+psign+"&uk="+uk,'
                )
                in resText
                # and check_str_md5(
                #     extract_middle_text(
                #         resText, '<script type="text/javascript">', "</script>"
                #     ).replace(
                #         f'url: domain+"/wenzjks?time="+ time +"&mysign=168&vs=8.0&uk="+ uk,',
                #         f'url: domain+"/wenzjks?time="+ time +"&mysign=168&vs={self.readApiVersion}&uk="+ uk,',
                #     ),
                #     "f34ab3dd2d38a82baba3ac0a549407d9",
                # )
            ):
                print(f"账号[{self.name}] 阅读准备完成，当前 加密代码hash值 与 预设值一致，加密内容未修改，可继续阅读 ✅ ")
            else:
                print(f"账号[{self.name}] 检测到加密代码内容发生变化，拉响警报，台子搞事，要抓人了，开始撤退，退出程序 >> ")
                os._exit(0)
        time.sleep(3)
        h = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            "Host": hn,
            "Origin": f"https://{hn}",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
        }
        return uk, h

    def read(self):
        info = self.getKey()
        if len(info) == 0:
            print(f"账号[{self.name}]获取阅读参数失败，停止往后阅读！⚠️ ")
            return
        # print(info)
        time.sleep(2)
        arctileTime = 1
        self.retryReading = False
        while True:
            res = {"errcode": -1}
            # rawRes = ""
            refreshTime = 0
            while res["errcode"] != 0:
                self.retryReading = False
                timeStamp = str(ts())
                mysign = hashlib.md5(
                    (info[1]["Host"] + timeStamp + "Lj*?Q3#pOviW").encode()
                ).hexdigest()
                self.params = {
                    "time": timeStamp,
                    "mysign": "168",
                    "vs": self.readApiVersion,
                    "uk": info[0],
                }
                u = f"http://{info[1]['Host']}/{self.getReadUrlPath}"
                # print(
                #     "阅读文章参数查看：",
                #     u,
                #     self.params,
                #     info,
                #     info[1]["Origin"].replace("https://", "").replace("/", ""),
                # )
                r = safe_request(
                    "GET",
                    u,
                    headers=info[1],
                    params=self.params,
                    verify=False,
                    timeout=60,
                    proxies=proxies,
                )
                print("-" * 50)
                # if mykkydReadPureLog == False:
                #     print(
                #    f"账号[{self.name}]第[{refreshTime+1}]次获取阅读文章[{info[0]}]目的页：{r.text}"
                # )
                # rawRes = r.text
                # print("获取文章阅读链接：", r.text)
                if r.text == "":
                    print(
                        f"账号[{self.name}]第[{refreshTime+1}]次获取阅读文章[{info[0]}]目的页失败，请检查网络或稍后再试"
                    )
                    return False
                if r.text and r.json()["errcode"] == 0:
                    res = r.json()
                    print(
                        f"账号[{self.name}]第[{refreshTime+1}]次获取第[{arctileTime}]篇阅读文章[{info[0]}]跳转链接成功"
                    )
                else:
                    decoded_str = json.loads(r.text)
                    if decoded_str["msg"]:
                        print(
                            f"账号[{self.name}]第[{refreshTime+1}]次获取第[{arctileTime}]篇阅读文章[{info[0]}]跳转链接失败：{decoded_str['msg']}"
                        )
                        return False
                    else:
                        print(
                            f"账号[{self.name}]第[{refreshTime+1}]次获取第[{arctileTime}]篇阅读文章[{info[0]}]跳转链接失败：{r.text}"
                        )
                time.sleep(1.5)
                refreshTime = refreshTime + 1
                if refreshTime >= 5:
                    print(f"⚠️ 账号[{self.name}]获取阅读第[{arctileTime}]篇文章[{info[0]}]超时……")
                    return
            wechatPostLink = ""
            print("获取文章数据：", res)
            if res.get("errcode") == 0:
                returnLink = ""
                try:
                    returnLink = res.get("data").get("link")
                except Exception as e:
                    errorMsg = res.get("data")
                    # print("1报错：", e)
                    # print("1返回：", rawRes)
                    if "404 Not Found" in errorMsg:
                        errorMsg = "台子接口不行，崩了~"
                        self.retryReading = True
                        print(
                            f"⚠️ 账号[{self.name}]获取阅读第[{arctileTime}]篇文章[{info[0]}]链接失败，疑似台子接口太垃圾，崩了，返回数据为：",
                            errorMsg,
                        )
                        break
                    print(
                        f"⚠️ 账号[{self.name}]获取阅读第[{arctileTime}]篇文章[{info[0]}]链接失败，疑似台子接口太垃圾，崩了，返回数据为：",
                        errorMsg,
                    )
                    continue
                if "mp.weixin.qq.com" in returnLink:
                    if mykkydReadPureLog == False:
                        print(f"账号[{self.name}] 阅读第[{arctileTime}]篇微信文章：{returnLink}")
                    wechatPostLink = returnLink
                else:
                    # print(f"账号[{self.name}] 阅读第[{arctileTime}]篇文章准备跳转：{link}")
                    wechatPostLink = self.jump(returnLink)
                    if mykkydReadPureLog == False:
                        print(
                            f"账号[{self.name}] 阅读第[{arctileTime}]篇微信文章：{wechatPostLink}"
                        )
                if mykkydReadPureLog == False:
                    print(f"账号[{self.name}] 阅读第[{arctileTime}]篇文章：{wechatPostLink}")
                postInfo = getinfo(wechatPostLink)
                if postInfo == False:
                    print(
                        f"⚠️ 账号[{self.name}]因 获取公众号文章信息不成功，导致阅读第[{arctileTime}]篇文章[{info[0]}] 失败……"
                    )
                    return False
                sleepTime = random.randint(7, 10)
                # 如果是检测特征到的文章 或者 后一篇文章与前一篇相似
                if (
                    checkDict.get(postInfo[4]) != None
                    # or ("&idx=1" not in wechatPostLink)
                    or ("&idx=7" in wechatPostLink)
                    or ("&idx=5" in wechatPostLink)
                    or (res.get("data").get("a") == 2)
                    or ("&chksm=" in wechatPostLink)
                ):
                    sleepTime = readPostDelay or random.randint(15, 20)
                    print(
                        f"⚠️ 账号[{self.name}]阅读第[{arctileTime}]篇文章[{info[0]}] 检测到疑似检测文章，正在推送，等待过检测，等待时间：{sleepTime}秒。。。"
                    )
                    global link_cache
                    fetch_wx_time_and_record(wechatPostLink, link_cache)
                    if self.wechatBussinessKey:
                        pushWechatBussiness(self.wechatBussinessKey, wechatPostLink)
                    elif self.appToken:
                        push(
                            self.appToken,
                            self.topicIds,
                            "猫猫看看阅读过检测",
                            wechatPostLink,
                            f"账号[{self.name}]阅读第[{arctileTime}]篇文章[{info[0]}] 正在等待过检测，等待时间：{sleepTime}秒\n幻生提示：快点，别耽搁时间了！",
                            "mykkyd",
                        )
                    else:
                        print(
                            f"⚠️ 账号[{self.name}]阅读第[{arctileTime}]篇文章[{info[0]}] 需要过检测，但是未配置推送token，为了避免黑号，停止阅读。。。"
                        )
                        return False
                else:
                    print(
                        f"✅ 账号[{self.name}]阅读第[{arctileTime}]篇文章[{info[0]}] 非检测文章，模拟读{sleepTime}秒"
                    )
                self.lastbiz = postInfo[4]
                time.sleep(sleepTime)
                u1 = f"http://{info[1]['Host']}/{self.addGoldPath}?time={sleepTime}&psign={random.randint(1, 1000)}&uk={info[0]}"
                r1 = safe_request("GET", u1, headers=info[1], verify=False)
                try:
                    # print("增加金币：", u1, info[1], r1.text)
                    if r1.text and r1.json():
                        try:
                            print(
                                f"✅ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]所得金币：{r1.json()['data']['gold']}个，账户当前金币：{r1.json()['data']['last_gold']}个，今日已读：{r1.json()['data']['day_read']}次，今日未读 {r1.json()['data']['remain_read']}篇文章"
                            )
                        except Exception as e:
                            print(
                                f"❌ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]异常：{r1.json().get('msg')}"
                            )
                            if "本次阅读无效" in r1.json().get("msg"):
                                continue
                            else:
                                break
                    else:
                        print(
                            f"❌ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]失败：{r1.text}"
                        )
                        break
                except Exception as e:
                    # print("2报错：", e)
                    # print("2返回：", r1.text)
                    errorMsg = r1.text
                    if "404 Not Found" in errorMsg:
                        errorMsg = "台子接口不行，崩了~"
                        self.retryReading = True
                        print(
                            f"⚠️ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]异常，返回数据为：",
                            errorMsg,
                        )
                        break
                    print(
                        f"⚠️ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]异常，返回数据为：",
                        errorMsg,
                    )
                    continue
            elif res.get("errcode") == 405:
                print(f"⚠️ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]阅读重复")
                time.sleep(1.5)
            elif res.get("errcode") == 407:
                print(f"⚠️ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]阅读结束")
                return True
            else:
                print(f"⚠️ 账号[{self.name}] 阅读第[{arctileTime}]篇文章[{info[0]}]未知情况")
                time.sleep(1.5)
            arctileTime = arctileTime + 1

    def jump(self, link):
        print(f"账号[{self.name}]开始本次阅读……")
        hn = urlparse(link).netloc
        h = {
            "Host": hn,
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090621) XWEB/8351 Flue",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh",
            "Cookie": self.Cookie,
        }
        r = safe_request("GET", link, headers=h, allow_redirects=False, verify=False)
        # print(r.status_code)
        Location = r.headers.get("Location")
        print(f"账号[{self.name}]开始阅读文章 - {Location}")
        return Location

    def withdrawPost(self):
        u = f"http://{self.domnainHost}/haobaobao/getwithdraw"
        p = f"signid={self.request_id}&ua=0&ptype=0&paccount=&pname="
        if self.aliAccount and self.aliName:
            p = f"signid={self.request_id}&ua=2&ptype=1&paccount={quote(self.aliAccount)}&pname={quote(self.aliName)}"
        r = safe_request(
            "POST",
            u,
            headers={
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": self.Cookie,
                "Host": f"{self.domnainHost}",
                "Origin": f"http://{self.domnainHost}",
                "Proxy-Connection": "keep-alive",
                "Referer": f"http://{self.domnainHost}/haobaobao/withdraw",
                "X-Requested-With": "XMLHttpRequest",
            },
            data=p,
            verify=False,
        )
        print(f"✅ 账号[{self.name}] 提现结果：", r.json()["msg"])

    def withdraw(self):
        gold = int(int(self.remain_gold) / 1000) * 1000
        print(f"账号[{self.name}] 本次提现金额 ", self.remain, "元 ", gold, "金币")
        withdrawBalance = round((int(self.txbz) / 10000), 3)
        if gold or (self.remain >= withdrawBalance):
            if gold and ((float(self.remain) + gold / 10000) <= 30):
                # 开始提现
                # 以下逻辑没用，不管你gold为多少，它都是全部兑换
                # maxCanExchangeGold = (29.9 - self.remain) * 10000
                # if maxCanExchangeGold > 0:
                #     gold = min(maxCanExchangeGold, gold)
                #     print(f"账号[{self.name}] 为避免超过三十块，本次兑换金币数为 ", gold, "金币")
                u1 = f"http://{self.domnainHost}/haobaobao/getgold"
                p1 = f"request_id={self.request_id}&gold={gold}"
                r = safe_request(
                    "POST",
                    u1,
                    data=p1,
                    headers={
                        "Accept": "application/json, text/javascript, */*; q=0.01",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "zh-CN,zh;q=0.9",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Cookie": self.Cookie,
                        "Host": f"{self.domnainHost}",
                        "Origin": f"http://{self.domnainHost}",
                        "Proxy-Connection": "keep-alive",
                        "Referer": f"http://{self.domnainHost}/haobaobao/withdraw",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    verify=False,
                )
                try:
                    res = r.json()
                    if res.get("errcode") == 0:
                        withdrawBalanceNum = self.remain + float(res["data"]["money"])
                        print(
                            f"✅ 账号[{self.name}] 金币兑换为现金成功，开始提现，预计到账 {withdrawBalanceNum} 元 >>> "
                        )

                        if withdrawBalanceNum < withdrawBalance:
                            print(f"账号[{self.name}]没有达到提现标准 {withdrawBalance} 元")
                            return False
                        self.withdrawPost()
                        return
                    else:
                        print(
                            f"账号[{self.name}] 金币兑换为现金失败：",
                            r.text,
                            " 提现地址：",
                            u1,
                            " 提现参数：",
                            p1,
                        )
                except Exception as e:
                    # raise e
                    # 处理异常
                    print(f"账号[{self.name}] 提现失败：", e)
            self.withdrawPost()

    def init(self):
        try:
            r = safe_request(
                "GET",
                getNewInviteUrl(),
                headers={
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    "Cookie": self.Cookie,
                },
                verify=False,
                # 禁止重定向
                allow_redirects=False,
            )
            self.domnainHost = r.headers.get("Location").split("/")[2]
            # print(r.text)
            if mykkydReadPureLog == False:
                print(f"账号[{self.name}]提取到的域名：{self.domnainHost}")
            # self.headers = {
            #     "Connection": "keep-alive",
            #     "Accept": "application/json, text/javascript, */*; q=0.01",
            #     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090621) XWEB/8351 Flue",
            #     "X-Requested-With": "XMLHttpRequest",
            #     "Referer": f"http://{self.domnainHost}/",
            #     "Origin": f"http://{self.domnainHost}",
            #     # "Host": f"{self.domnainHost}",
            #     "Accept-Encoding": "gzip, deflate",
            #     "Accept-Language": "zh-CN,zh",
            #     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            #     "Cookie": self.Cookie,
            # }
            # # 获取requestId
            self.readJumpPath = ""
            if mykkydDetectingSealStatus:
                r = safe_request(
                    "GET",
                    f"http://{self.domnainHost}/haobaobao/home",
                    headers={
                        "Upgrade-Insecure-Requests": "1",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "zh-CN,zh;q=0.9",
                        "Cookie": self.Cookie,
                    },
                    verify=False,
                )
                htmltext = r.text
                read_jump_read_text = extract_middle_text(
                    htmltext, "function read_jump_read(){", "success: function"
                )
                if read_jump_read_text:
                    readJumpPath = extract_middle_text(
                        read_jump_read_text, "url: domain+'", "',"
                    )
                    if readJumpPath:
                        self.readJumpPath = readJumpPath
                    else:
                        if "直接提" not in self.name:
                            print(
                                f"账号[{self.name}] 初始化失败，请手动访问下确认页面没崩溃 或者 稍后再试吧，一直不行，请前往TG群反馈~ "
                            )
                            return False
                else:
                    hiddenTipText = extract_middle_text(
                        htmltext, '<!-- <p style="color:red">', "<br>"
                    )
                    # 移除掉注释的公告部分
                    htmltext = htmltext.replace(
                        '<!-- <p style="color:red">' + hiddenTipText + "<br>", ""
                    )
                    tipText = extract_middle_text(
                        htmltext, '<p style="color:red">', "<br>"
                    )
                    if "直接提" not in self.name:
                        if "存在违规操作" in htmltext:
                            print(f"账号[{self.name}] 被检测到了，已经被封，终止任务，快去提醒大家吧~ ")
                            return False
                        elif "系统维护中" in tipText:
                            # <p style="color:red">系统维护中，预计周一恢复，与码无关！<br>
                            print(f"账号[{self.name}] 检测到系统维护中，公告内容为 [{tipText}] ，终止任务")
                            sys.exit(0)
                        else:
                            print(
                                f"账号[{self.name}] 初始化失败，请手动访问下确认页面没崩溃 或者 稍后再试吧，一直不行，请前往TG群反馈~ "
                            )
                            return False
            else:
                self.readJumpPath = "/haobaobao/wtmpdomain2"
            # # 获取提现页面地址
            r = safe_request(
                "GET",
                f"http://{self.domnainHost}/haobaobao/withdraw",
                headers={
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    "Cookie": self.Cookie,
                },
                verify=False,
            )
            htmltext = r.text
            signidl = re.search('request_id = "(.*?)"', htmltext)
            if signidl == []:
                if mykkydReadPureLog == False:
                    print(f"账号[{self.name}]初始化 提现参数 失败，尝试另一种初始化 >>> ")
                r = safe_request(
                    "GET",
                    f"https://code.sywjmlou.com.cn/baobaocode.php",
                    verify=False,
                )
                domnainHost = r.json()["data"]["luodi"].split("/")[2]
                r = safe_request(
                    "GET",
                    f"http://{domnainHost}/haobaobao/withdraw",
                    headers={
                        "Upgrade-Insecure-Requests": "1",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309071d) XWEB/8461 Flue",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "zh-CN,zh;q=0.9",
                        "Cookie": self.Cookie,
                    },
                    verify=False,
                )
                htmltext = r.text
                signidl = re.search('request_id = "(.*?)"', htmltext)
                if signidl == []:
                    print(f"账号[{self.name}] 多次初始化 提现参数 失败, 账号异常，请检查Cookie！")
                    r = safe_request(
                        "GET",
                        f"https://code.sywjmlou.com.cn/baobaocode.php",
                        verify=False,
                    )
                    self.domnainHost = r.json()["data"]["luodi"].split("/")[2]
                    return False
                else:
                    self.request_id = signidl[1]
            else:
                self.request_id = signidl[1]
            return True
        except Exception as e:
            # raise e
            print(f"账号[{self.name}]初始化失败,请检查你的ck")
            return False

    def run(self):
        if self.init():
            self.user_info()
            self.gold()
            if "直接提" not in self.name:
                self.read()
                # 如果接口崩了，就尝试三次重启阅读
                if self.retryReading == True:
                    if mykkydReadPureLog == False:
                        print(f"账号[{self.name}] 检测到阅读接口异常，尝试重试~")
                    for i in range(3):
                        self.read()
                        # 随机延迟
                        time.sleep(random.random() * 3 + 1)
                        if self.retryReading == False:
                            break
                time.sleep(3)
                self.gold()
            time.sleep(3)
            self.withdraw()


def getNewInviteUrl():
    r = safe_request(
        "GET", "https://code.sywjmlou.com.cn/baobaocode.php", verify=False
    ).json()
    if r.get("code") == 0:
        newEntryUrl = r.get("data").get("luodi")
        parsed_url = urlparse(newEntryUrl)
        host = parsed_url.hostname
        return f"http://s1i6.1obg.shop/haobaobao/auth/58487f291985c5f32c16b3b01b96a912".replace(
            "s1i6.1obg.shop", host or "s1i6.1obg.shop"
        )
    else:
        return "http://s1i6.1obg.shop/haobaobao/auth/58487f291985c5f32c16b3b01b96a912"


if __name__ == "__main__":
    # appToken：这个是填wxpusher的appToken
    # topicIds：这个是wxpusher的topicIds改成你自己的
    # 示例: 幻生#oZdBp04psgoN8dN1ET_uo81NTC31#3000#AT_UyIlbj2222nynESbM2vJyA7DrmUmUXD#11686
    accounts = os.getenv("mykkyd")
    inviteUrl = getNewInviteUrl()
    if accounts is None:
        print(f"你没有填入mykkyd，咋运行？\n走下邀请呗：{inviteUrl}")
    else:
        # 获取环境变量的值，并按指定字符串分割成多个账号的参数组合
        accounts_list = os.environ.get("mykkyd").split("&")

        # 输出有几个账号
        num_of_accounts = len(accounts_list)
        moreTip = ""
        if readPostDelay > 0:
            moreTip = f"已设置的推送文章等待点击时间为 {readPostDelay}秒 "
        print(
            f"当前脚本版本：幻生魔改自用版 V1.61 \n幻生提示：获取到 {num_of_accounts} 个账号 {moreTip}\n注册地址：{inviteUrl}"
        )

        # 遍历所有账号
        for i, account in enumerate(accounts_list, start=1):
            # print("\n")
            print("-" * 50)
            print(f"账号[{account.split('#')[0]}]开始执行任务 >>>")
            # print("\n")
            # 按@符号分割当前账号的不同参数
            values = account.split("#")
            # print(values)
            cg = {}
            try:
                if len(values) == 2:
                    cg = {
                        "name": values[0],
                        "Cookie": values[1],
                        "txbz": 3000,
                        "aliAccount": "",
                        "aliName": "",
                    }
                else:
                    cg = {
                        "name": values[0],
                        "Cookie": values[1],
                        "txbz": values[2] or 3000,
                        "aliAccount": "",
                        "aliName": "",
                    }
            except Exception as e:
                # 处理异常
                print("幻生逼逼叨:", "配置的啥玩意，缺参数了憨批，看清脚本说明！")
                continue
            cg["appToken"] = wxpusherAppToken or ""
            cg["topicIds"] = wxpusherTopicId or ""
            # print("手动：", len(values), values[4])
            if len(values) >= 4:
                if values[3]:
                    cg["appToken"] = values[3]
            if len(values) >= 5:
                if values[4]:
                    cg["topicIds"] = values[4]
            if len(values) >= 6:
                if values[5]:
                    cg["aliName"] = values[5]
            if len(values) >= 7:
                if values[6]:
                    cg["aliAccount"] = values[6]
            try:
                if wechatBussinessKey == "":
                    if cg["appToken"].startswith("AT_") == False:
                        print(f"幻生提示，账号[{account.split('#')[0]}] wxpush 配置错误，快仔细看头部说明！")
                        continue
                    if (cg["appToken"].startswith("AT_") == False) or (
                        cg["topicIds"].isdigit() == False
                    ):
                        print(f"幻生提示，账号[{account.split('#')[0]}] wxpush 配置错误，快仔细看头部说明！")
                        continue
                api = HHYD(cg)
                if cg["aliName"] and cg["aliAccount"]:
                    print(
                        f"幻生提示，账号[{account.split('#')[0]}] 采用了 支付宝提现，姓名：{cg['aliName']}，账户：{cg['aliAccount']}"
                    )
                else:
                    print(f"幻生提示，账号[{account.split('#')[0]}] 采用了 微信提现")
                try:
                    api.run()
                except Exception as e:
                    # raise e
                    print(f"幻生提示，账号[{account.split('#')[0]}] 执行出错：", e)
            except Exception as e:
                print(
                    f"幻生提示，账号[{account.split('#')[0]}] 出错啦，也许是平台接口问题，可以过一会尝试重新运行，如果还是不行，请将下面报错截图发到tg交流群:"
                )
                raise e
                continue
            # print("\n")
            print("-" * 50)
            print(f"账号[{account.split('#')[0]}]执行任务完毕！")
            # print("\n")
