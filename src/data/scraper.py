import json
import requests

r = requests.get('https://api.gsocorganizations.dev/organizations.json')
data = r.json()

newOrgs = []

for org in data:
    newData = {}
    newData['name'] = org['name']
    newData['tech'] = org['technologies']
    newData['cat'] = org['category']
    newData['top'] = org['topics']
    newData['project'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for year in org['years']:
        numYear = int(year)
        newData['url'] = org['years'][year]['projects_url'] # losing url on successive iteration is intentional, to keep the link to projects from the latest year
        newData['project'][numYear - 2009] = org['years'][year]['num_projects']
    newOrgs.append(newData)

f = open('src/data/finalData.json', 'w')
f.write(json.dumps(newOrgs, indent=4))
f.close()