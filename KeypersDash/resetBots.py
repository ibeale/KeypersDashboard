from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep
import requests


def makeDriver():
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920,1080')
    driver = webdriver.Chrome(options=options)
    return driver


def discordLogin(driver, em, pw):
    sleep(5)
    email = driver.find_element_by_xpath(
        "/html/body/div/div[2]/div/div[2]/div/div/form/div/div/div[1]/div[3]/div[1]/div/input")
    password = driver.find_element_by_xpath(
        "/html/body/div/div[2]/div/div[2]/div/div/form/div/div/div[1]/div[3]/div[2]/div/input")
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

    authorize = driver.find_element_by_xpath(
        "/html/body/div/div[2]/div/div[2]/div/div/div[2]/button[2]")
    authorize.click()
    sleep(5)
    return 0


def resetCyber(em, pw):
    driver = makeDriver()
    driver.get("https://cybersole.io/dashboard")
    sleep(5)
    discordLogin(driver, em, pw)
    reset = driver.find_element_by_xpath(
        "/html/body/div[1]/div/div[4]/div/div/div/div[5]/div[1]/div")
    reset.click()


def resetKodai(em, pw):
    driver = makeDriver()
    driver.get("https://hub.kodai.io/auth")
    discord_button = driver.find_element_by_xpath(
        "/html/body/div[1]/div/div[2]/div[2]/div[2]/div[2]/div[2]/button")
    discord_button.click()
    sleep(5)
    discordLogin(driver, em, pw)
    driver.get("https://hub.kodai.io/management")
    sleep(2)
    deactivate = driver.find_element_by_xpath(
        "/html/body/div[1]/div/div[2]/div[2]/div[2]/div[4]/div/span/div[1]/button[2]")
    deactivate.click()
    sleep(2)
    confirm = driver.find_element_by_xpath(
        "/html/body/div[2]/div/div/div/div[2]/button[2]")
    confirm.click()
    sleep(2)
    failed = driver.find_elements_by_xpath(
        "//*[contains(text(), 'Failed to Reset License Key')]")
    if failed:
        print("Failed")
        return "There was an error resetting Kodai. [Rate Limit]"
    return 0


if __name__ == "__main__":
    resetKodai("kodairental01@gmail.com", "J33pers!")
