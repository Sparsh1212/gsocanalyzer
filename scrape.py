import requests
import html5lib
from bs4 import BeautifulSoup
import json

base="https://summerofcode.withgoogle.com"
data=[]

for year in reversed(range(2016,2021)):
  url="https://summerofcode.withgoogle.com/archive/"+str(year)+'/organizations/'
  pg=requests.get(url)
  soup=BeautifulSoup(pg.content,'html5lib')
  org=soup.findAll('a',class_='organization-card__link')
  print("Scraping", year)
  for i in range(len(org)):
    dic={}
    urlo=base+(org[i].attrs['href'])
    pg=requests.get(urlo)
    sp=BeautifulSoup(pg.content,'html5lib')
    name=sp.find('h3',class_='banner__title').text
    f=0
    for d in data:
      if d['name']==name:
        d['year'].append(year)
        proj=sp.findAll('h5',class_="archive-project-card__student-name")
        d['proj'].append(len(proj))
        dic['url']=urlo
        f=1
    if(f==0):
      dic['url']=urlo
      dic['name']=sp.find('h3',class_='banner__title').text
      tech = sp.findAll('li', attrs={'class': 'organization__tag organization__tag--technology'})
      for j in range(len(tech)):
        tech[j]=tech[j].text.strip()
      dic['tech']=tech
      cat = sp.find('li', attrs={'class': 'organization__tag organization__tag--category'})
      te=cat.text.replace('\n','')
      te=te.replace('\t','')
      dic['cat']=te
      top = sp.findAll('li', attrs={'class': 'organization__tag organization__tag--topic'})
      for j in range(len(top)):
        top[j]=top[j].text
      dic['top']=top
      dic['year']=[year]
      proj=sp.findAll('h5',class_="archive-project-card__student-name")
      dic['proj']=[len(proj)]
      data.append(dic)

for year in reversed(range(2009,2016)):
  url="https://www.google-melange.com/archive/gsoc/"+str(year)
  base="https://www.google-melange.com"
  pg=requests.get(url)
  soup=BeautifulSoup(pg.content,'html5lib')
  org=soup.findAll('span',class_="mdl-list__item-primary-content")
  print("Scraping", year)
  for i in range(len(org)):
    link=org[i].find('a')
    urlo=base+(link.attrs['href'])
    pg=requests.get(urlo)
    sp=BeautifulSoup(pg.content,'html5lib')
    name=link.text
    f=0
    for d in data:
      if d['name']==name:
        d['year'].append(year)
        proj=sp.findAll('li',class_="mdl-list__item mdl-list__item--two-line")
        d['proj'].append(len(proj))

for d in data:
  d['project']=[]
  for year in range(2009,2021):
    f=1
    for y in range(len(d['year'])):
      if year==d['year'][y]:
        d['project'].append(d['proj'][y])
        f=0
        break
    if f==1:d['project'].append(0)
  d.pop('proj') 

with open('data.json', 'w') as fout:
    json.dump(data , fout,indent = 6)