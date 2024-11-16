#2024-11-16 02:47:41

# 执行一次脚本，有教程说明
import os
import random
import time
import requests
import concurrent.futures
from urllib.parse import urlparse, parse_qs, urlencode

exec

def get_parameter_value(url, parameter_name):
    # 解析URL
    parsed_url = urlparse(url)
    # 获取查询字符串并将其解析为字典
    query_params = parse_qs(parsed_url.query)
    # 尝试获取参数值
    value = query_params.get(parameter_name)
    # 如果参数存在，则返回第一个值；否则返回None
    return value[0] if value else None


def getllurl(full_url):
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.post(full_url, headers)
    print(response.json())
    if response.json()['code'] == 1:
        if response.json()['data']['is_sign'] == True:
            print("已签到")
            return None
        else:
            return response.json()['data']['llurl']
    return None


def sign_in(full_url, ll_url, fb_url, wcs):
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    id = get_parameter_value(ll_url, 'id')
    patternid = get_parameter_value(ll_url, 'patternid')
    fb_data = {
        'id': id,
        'patternid': patternid,
        'wcs': wcs,
        'pattern': 'signin'
    }
    fb_res = requests.post(fb_url, data=fb_data, headers=headers)
    print(fb_res.json()['msg'])
    post_data = {
        'id': id,
        'fblx': 1,
        'wcs': wcs,
        'theway': 'signin',
        'search': 1
    }
    time.sleep(random.randint(15, 30))
    response = requests.post(full_url, data=post_data, headers=headers)
    return response.json()


def withdrawal(withdrawal_url, real_name):
    headers = {
        'Content-Type': 'application/json'
    }
    time.sleep(random.randint(3, 5))
    response = requests.post(withdrawal_url, headers)
    print(response.json())
    if response.json()['code'] == 1:
        total = response.json()['data']['form']['price']
        print(f"可提现金额：{total}元")
        txed = response.json()['data']['form']['txed']
        txid = None
        amt = None
        for item in txed:
            if float(total) >= item['price']:
                txid = item['id']
                amt = item['price']
                break
        if txid is None:
            print(f"未达到提现门槛，无法自动提现")
            return
        post_data = {
            'data[accept]': '',
            'data[reject]': '',
            'data[txfs]': 1,
            'data[txid]': txid,
            'data[price]': amt,
            'data[xm]': real_name,
            'data[zh]': '',
            'data[sxf]': 0,
            'data[income]': amt,
            'is_ajax': 1,
            'theway': 'submit',
            'search': 1
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        response = requests.post(withdrawal_url, headers, urlencode(post_data))
        print(response.json())
        if response.status_code == 200 and response.json()['msg'] == '提交成功':
            print(f'申请提现成功{amt}元')


def do(account):
    remark, auth_code, uid, real_name = account.split("#")
    full_url = f"https://mili.shensemiao.com/index.php?v=1&appid=4&appsecret=PHPCMF19F5DF41B263B&api_auth_code={auth_code}&api_auth_uid={uid}&&s=member&app=Yhxcx&c=qd&m=sign_in"
    fb_url = f'https://mili.shensemiao.com/index.php?v=1&appid=4&appsecret=PHPCMF19F5DF41B263B&&api_auth_code={auth_code}&api_auth_uid={uid}&&s=Yhxcx&c=home&m=fb_detail'
    withdrawal_url = f'https://mili.shensemiao.com/index.php?v=1&appid=4&appsecret=PHPCMF19F5DF41B263B&&api_auth_code={auth_code}&api_auth_uid={uid}&&s=member&app=yhxcx&c=tg&m=withdrawal'
    print(f'开始执行账号：{remark}')
    llurl = getllurl(full_url)
    if not llurl:
        withdrawal(withdrawal_url, real_name)
        return
    wcs = get_parameter_value(llurl, 'wcs')
    result = sign_in(full_url, llurl, fb_url, wcs)
    print(f"第{int(wcs) + 1}次浏览：{result}")
    if result['data']['llurl']:
        llurl = result['data']['llurl']
        wcs = get_parameter_value(llurl, 'wcs')
        result = sign_in(full_url, llurl, fb_url, wcs)
        print(f"第{int(wcs) + 1}次浏览：{result}")


if __name__ == "__main__":
    accounts = os.getenv("ddjz", "").splitlines()
    print('点点兼职签到 入口 #小程序://点点兼职/X31FUvnleeJcVVj')
    print('变量名：ddjz  格式: 备注#api_auth_code#api_auth_uid#微信真实名称  多账号换行分割')
    for account in accounts:
        do(account)

