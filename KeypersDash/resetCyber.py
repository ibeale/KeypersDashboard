from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep

def resetCyber(em, pw):
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920,1080')
    driver = webdriver.Chrome('./chromedriver.exe', options=options)
    driver.get("https://cybersole.io/dashboard")
    print(f"HELLOISAAC: {driver.current_url}")
    sleep(5)
    email = driver.find_element_by_xpath("/html/body/div/div[2]/div/div[2]/div/div/form/div/div/div[1]/div[3]/div[1]/div/input")
    password = driver.find_element_by_xpath("/html/body/div/div[2]/div/div[2]/div/div/form/div/div/div[1]/div[3]/div[2]/div/input")
    email.clear()
    email.send_keys(em)
    password.clear()
    password.send_keys(pw)
    password.send_keys(Keys.RETURN)
    sleep(5)
    authorize = driver.find_element_by_xpath("/html/body/div/div[2]/div/div[2]/div/div/div[2]/button[2]")
    authorize.click()
    sleep(5)
    reset = driver.find_element_by_xpath("/html/body/div[1]/div/div[4]/div/div/div/div[5]/div[1]/div")
    reset.click()

if __name__ == "__main__":
    resetCyber("kodairental01@gmail.com", "J33pers!")
