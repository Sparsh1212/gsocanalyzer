
import html5lib
from bs4 import BeautifulSoup
import json
from selenium.webdriver import Chrome
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By

base="https://summerofcode.withgoogle.com"
data=[]
pg=webdriver.Chrome(executable_path="/Applications/driver/chromedriver")
for year in reversed(range(2016,2023)):
  url="https://summerofcode.withgoogle.com/archive/"+str(year)+'/organizations'
  print(url,'url')
  pg.maximize_window()
  pg.get(url)
  sleep(5)
  soup=BeautifulSoup(pg.page_source,'html5lib')
  x=True

  org=soup.find_all('a','content')
  while x==True:
    next_page=pg.find_element(By.CLASS_NAME,"mat-focus-indicator.mat-tooltip-trigger.mat-paginator-navigation-next.mat-icon-button.mat-button-base")
    if next_page.get_property('disabled'):
      break
    next_page.click()
       # next_page = pg.find_element(By.XPATH, '//button[contains(@class, "mat-focus-indicator mat-tooltip-trigger mat-paginator-navigation-next mat-icon-button mat-button-base")]')
    print(next_page.get_property('disabled'))
    sleep(2)
    soup=BeautifulSoup(pg.page_source,'html5lib')
    sleep(2)
    org2=soup.find_all('a','content')
    org=org+org2
  print("Scraping", year,"first loop")
  print(len(org), 'length')
  for i in range(len(org)):
    dic={}
    urlo=base+(org[i].attrs['href'])
    print(urlo)
    pg.get(urlo)
    sleep(5)
    sp=BeautifulSoup(pg.page_source,'html5lib')
    name=sp.find('span','title').string
    f=0
    for d in data:
      if d['name']==name:
        d['year'].append(year)
        proj=sp.find_all('div',"contributor__content")
        d['proj'].append(len(proj))
        dic['url']=urlo
        f=1
    if(f==0):
      dic['url']=urlo
      dic['name']=sp.find('span','title').string
      tech_string = sp.find('div',"tech__content").string
      print(tech_string)
      tech=tech_string.split(',')
      for j in range(len(tech)):
        tech[j]=tech[j].strip()
      dic['tech']=tech
      # cat = sp.find('li', attrs={'class': 'organization__tag organization__tag--category'})
      # te=cat.text.replace('\n','')
      # te=te.replace('\t','')
      dic['cat']=''
      topic_string = sp.find('div','topics__content').string
      top=topic_string.split(',')
      print(top)
      for j in range(len(top)):
        top[j]=top[j].strip()
      dic['top']=top
      dic['year']=[year]
      proj=sp.find_all('div',"contributor__content")
      dic['proj']=[len(proj)]
      data.append(dic)
print (data,'oooo')
for year in reversed(range(2009,2016)):
  url="https://www.google-melange.com/archive/gsoc/"+str(year)
  base="https://www.google-melange.com"
  pg.get(url)
  sleep(2)
  soup=BeautifulSoup(pg.page_source,'html5lib')
  org=soup.find_all('span',class_="mdl-list__item-primary-content")
  print("Scraping", year,"second loop")
  for i in range(len(org)):
    link=org[i].find('a')
    urlo=base+(link.attrs['href'])
    print(urlo,"second loop testing")
    try:
      pg.get(urlo)
    except:
      print('org not found',urlo)
    else:
      sp=BeautifulSoup(pg.page_source,'html5lib')
      name=link.text
      f=0
      for d in data:
        if d['name']==name:
          d['year'].append(year)
          proj=sp.findAll('li',class_="mdl-list__item mdl-list__item--two-line")
          d['proj'].append(len(proj))

for d in data:
  d['project']=[]

  for year in range(2009,2023):
    f=1
    for y in range(len(d['year'])):
      if year==d['year'][y]:
        d['project'].append(d['proj'][y])
        f=0
        break
    if f==1:d['project'].append(0)
  d.pop('proj') 
print(data,'lololo')
with open('data.json', 'w') as fout:
    json.dump(data , fout,indent = 6)
    print(data)