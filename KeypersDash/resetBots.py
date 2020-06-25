from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep

def makeDriver():
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920,1080')
    driver = webdriver.Chrome(options=options)
    return driver

def resetCyber(driver, em, pw):
    driver.get("https://cybersole.io/dashboard")
    sleep(5)
    email = driver.find_element_by_xpath("/html/body/div/div[2]/div/div[2]/div/div/form/div/div/div[1]/div[3]/div[1]/div/input")
    password = driver.find_element_by_xpath("/html/body/div/div[2]/div/div[2]/div/div/form/div/div/div[1]/div[3]/div[2]/div/input")
    email.clear()
    email.send_keys(em)
    password.clear()
    password.send_keys(pw)
    password.send_keys(Keys.RETURN)
    sleep(5)
    captcha = driver.find_elements_by_css_selector("div.g-recaptcha")
    if len(captcha) != 0:
        print("Captcha!")
        input("Press enter once email has been confirmed")
    new_ip = driver.find_elements_by_css_selector("span.errorSeparator-30Q6aR")
    if len(new_ip) != 0:
        print("New login, email verification required.")
        input("Press enter once email has been confirmed")
    # print(driver.
    
    authorize = driver.find_element_by_xpath("/html/body/div/div[2]/div/div[2]/div/div/div[2]/button[2]")
    authorize.click()
    sleep(5)
    reset = driver.find_element_by_xpath("/html/body/div[1]/div/div[4]/div/div/div/div[5]/div[1]/div")
    reset.click()

if __name__ == "__main__":
    driver = makeDriver()
    resetCyber(driver, "kodairental01@gmail.com", "J33pers!")
