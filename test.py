from selenium import webdriver
from time import sleep
options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
driver.get("https://discord.com/api/oauth2/authorize?client_id=724104767223234631&redirect_uri=http%3A%2F%2F3.218.10.245%3A5000%2Fcallback&response_type=code&scope=identify")
print(driver.page_source)
