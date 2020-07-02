from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep
import requests
import time


def makeDriver():
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920,1080')
    driver = webdriver.Chrome(options=options)
    return driver


def discordLogin(driver, em, pw):
    email = []
    timeout = time.time() + 60
    while len(email) == 0:
        if time.time() > timeout:
            return "Timeout"
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
        input()
        # return "There was an error resetting Cyber. [Captcha]"
    new_ip = driver.find_elements_by_css_selector("span.errorSeparator-30Q6aR")
    if len(new_ip) != 0:
        print("New login, email verification required.")
        return "There was an error resetting Cyber. [Server IP]"
    authorize = []
    while len(authorize) == 0:
        if time.time() > timeout:
            return "Timeout"
        authrize = driver.find_elements_by_css_selector(
        "div.contents-18-Yxp")
    authorize=authorize[0]
    authorize.click()
    return 0


def resetCyber(em, pw):
    driver = makeDriver()
    driver.get("https://cybersole.io/dashboard")
    error = discordLogin(driver, em, pw)
    if error:
        return error
    reset = []
    timeout = time.time() + 60
    while len(reset) == 0:
        if time.time() > timeout:
            return "Timeout"
        reset = driver.find_elements_by_xpath(
            "/html/body/div[1]/div/div[4]/div/div/div/div[5]/div[1]/div")
    reset = reset[0]
    reset.click()


def resetKodai(em, pw):
    driver = makeDriver()
    driver.get("https://hub.kodai.io/auth")
    discord_button = []
    timeout = time.time() + 60
    while len(discord_button) == 0:
        if time.time() > timeout:
            return "Timeout"
        discord_button = driver.find_elements_by_xpath(
            "/html/body/div[1]/div/div[2]/div[2]/div[2]/div[2]/div[2]/button")
    discord_button = discord_button[0]
    discord_button.click()
    error = discordLogin(driver, em, pw)
    if error:
        return error
    found = False
    while found == False:
        if time.time() > timeout:
            return "Timeout"
        for cookie in driver.get_cookies():
            if cookie['name'] == "kodai_dashboard":
                found = True
    driver.get("https://hub.kodai.io/management")
    deactivate = []
    while len(deactivate) == 0:
        if time.time() > timeout:
            return "Timeout"
        deactivate = driver.find_elements_by_xpath(
            "//*[contains(text(), 'Deactivate')]")
    deactivate[0].click()
    confirm = []
    while len(confirm) == 0:
        if time.time() > timeout:
            return "Timeout"
        confirm = driver.find_elements_by_xpath(
            "//*[contains(text(), 'Reset')]")
    confirm[0].click()
    sleep(5)
    failed = driver.find_elements_by_xpath(
        "//*[contains(text(), 'Failed to Reset License Key')]")
    if failed:
        print("Failed")
        return "There was an error resetting Kodai. [Rate Limit]"
    return 0


if __name__ == "__main__":
    resetKodai("kodairental01@gmail.com", "J33pers!")
