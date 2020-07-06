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
            print(driver.page_source)
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


def resetCyber(em, pw):
    driver = makeDriver()
    driver.get("https://cybersole.io")
    driver.add_cookie({'domain': 'cybersole.io', 'expiry': 1625538525, 'httpOnly': True, 'name': 'dashboard_session', 'path': '/', 'sameSite': 'None', 'secure': False, 'value': 'CfDJ8LKwgtB2ErpHr7t65tLDoWFDswS49s-50XJ4j6yId80z53_yweh0Kg7FSPpqDJNaZkjKw96rfPT-ZSjB1zAJZP2y3EN6pDWqbOqRXYphIlZJYwL3eolvW78M3ekN6I2uTT0iSnGBTFyQrR1Wtg_j8k6gqXHuOQJkM7XqHPMxF4c7XJgYSoYqkqEULB8PwL1BEcQFEANrdP2aw8GYKVxFwuhOLRjvdPMMlld5OboIYGW-FR594fvxRQBOjctXBu7v67OzxeCoQIFyThECvbVBvFXeIKlFhC3i-8_QlMf2D_1wlKLHzsZNnvAHkXZJENqQV-IE1JLdX-FFmy7fC2mHSSBHwhUNQ6c50BoVZfU9eOX6qD0RopKq85z8oYAZ4JhrLIyWI5aVXSEMW_iqw5ATYyiwoVrC5fecti_0G9XrNmnUPPwfhLhBWugPt4Mz9OJxe_Ofq5sNjKTnKEQKjiio5d3K6e4zeezONWEKY5Ie_bZIfDbzrIvD23uHfuG93TevNZIEt2QdV7jCDHZ9wvkLQqTML3UPUvGl6xGbsMDlmedP8PCYAK1dlCmZyOR5tnmHEgj7OYlgkLFm_zl68Y9ZVio24RYDCr9a1B5zKRsWEL0gtSfi7c6Ysro1Q9EWpUhaYxpD-Bw5Pg6Oln7DjmyUHqmMtVbY9E3RyR7CYtYNROaK1M7XjKSGDAdVcqUJqtFEGg'})
    driver.get("https://cybersole.io/dashboard")
    # error = discordLogin(driver, em, pw)
    reset = []
    timeout = time.time() + 60
    while len(reset) == 0:
        if time.time() > timeout:
            return "Timeout Cyber"
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
            return "Timeout Kodai Discord Login"
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
            return "Timeout Kodai Cookie"
        for cookie in driver.get_cookies():
            if cookie['name'] == "kodai_dashboard":
                found = True
    driver.get("https://hub.kodai.io/management")
    deactivate = []
    while len(deactivate) == 0:
        if time.time() > timeout:
            return "Timeout Kodai Reset 1"
        deactivate = driver.find_elements_by_xpath(
            "//*[contains(text(), 'Deactivate')]")
    deactivate[0].click()
    confirm = []
    while len(confirm) == 0:
        if time.time() > timeout:
            return "Timeout Kodai Reset 2"
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
    resetCyber("kodairental01@gmail.com", "J33pers!")
