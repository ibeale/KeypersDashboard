from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep
import requests
import time
import json


def makeDriver(proxy=None):
    options = webdriver.ChromeOptions()
    if proxy:
        options.add_argument(proxy)
    options.add_argument('headless')
    options.add_argument('window-size=1920,1080')

    driver = webdriver.Chrome(options=options)
    return driver


def discordLogin(driver, em, pw):
    email = []
    timeout = time.time() + 60
    while len(email) == 0:
        if time.time() > timeout:
            return "Timeout Discord Login"
        email = driver.find_elements_by_name(
            "email")
    email = email[0]
    password = driver.find_element_by_name(
        "password")
    email.clear()
    email.send_keys(em)
    password.clear()
    password.send_keys(pw)
    password.send_keys(Keys.RETURN)
    sleep(5)
    captcha = driver.find_elements_by_css_selector("div.g-recaptcha")
    if len(captcha) != 0:
        print("Captcha!")
        return "There was an error resetting Cyber. [Captcha]"
    new_ip = driver.find_elements_by_css_selector("span.errorSeparator-30Q6aR")
    if len(new_ip) != 0:
        print("New login, email verification required.")
        return "There was an error resetting Cyber. [Server IP]"
    authorize = []
    while len(authorize) == 0:
        if time.time() > timeout:
            return "Timeout Discord Auth"
        authorize = driver.find_elements_by_css_selector(
        "button.lookFilled-1Gx00P>div.contents-18-Yxp")
    authorize=authorize[0]
    authorize.click()
    return 0


def resetCyber(bot_cookie):
    try:
        driver = makeDriver(proxy="--proxy-server=108.163.66.164:8080")
        
        driver.get("https://cybersole.io")
        driver.add_cookie(bot_cookie)
        driver.get("https://cybersole.io/dashboard")
        # error = discordLogin(driver, em, pw)
        reset = []
        timeout = time.time() + 25
        while len(reset) == 0:
            if time.time() > timeout:
                return "Timeout Cyber"
            reset = driver.find_elements_by_xpath(
                "/html/body/div[1]/div/div[4]/div/div/div/div[5]/div[1]/div")
        reset = reset[0]
        reset.click()
        return 0
    except Exception as e:
        print(e)
        return(str(e))


def resetKodai(bot_cookie):
    try:
        headers = {
        'authority': 'hub.kodai.io',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://hub.kodai.io',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://hub.kodai.io/management',
        'accept-language': 'en-US,en;q=0.9'
        }

        cookie = {"kodai_dashboard":bot_cookie['value']}

        data = '{"unbind_type":"machine"}'
        proxy = {
            'http': 'http://108.163.66.164:8080',
            'https': 'https://108.163.66.164:8080'
        }
        response = requests.post('https://hub.kodai.io/api/user/unbind', headers=headers,cookies=cookie,data=data, proxies=proxy)
        if response.status_code == 200:
            if not response.json()['success']:
                return "Error Resetting. Rate Limit"
            else:
                return 0
        else:
            return f"Error resetting [{response.status_code}]"
    except Exception as e:
        print(e)
        return "Unknown error occurred"


def getKodaiCookie(username, password):
    driver = makeDriver()
    driver.get("https://hub.kodai.io/auth")
    discord_button = []
    timeout = time.time() + 60
    while len(discord_button) == 0:
        discord_button = driver.find_elements_by_xpath(
            "/html/body/div[1]/div/div[2]/div[2]/div[2]/div[2]/div[2]/button")
    discord_button = discord_button[0]
    discord_button.click()
    error = discordLogin(driver, username, password)
    found = False
    while found == False:
        for cookie in driver.get_cookies():
            if cookie['name'] == "kodai_dashboard":
                found = True
    for cookie in driver.get_cookies():
        if cookie['name'] == 'kodai_dashboard':
            print(json.dumps(cookie))

def getCyberCookie(username,password):
    driver = makeDriver()
    driver.get("https://cybersole.io/dashboard")
    discordLogin(driver, username, password)
    sleep(5)
    input()
    for cookie in driver.get_cookies():
        if cookie['name'] == "cf_clearance":
            print(json.dumps(cookie))


