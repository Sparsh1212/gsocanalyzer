# How to use the script?
# Run the file, enter the number of duplicate entries including the original one
#
# Now enter the exact names of the duplicates
#
# Note that the first entered name will be the name of the final merged organization
# If one or more org name could not be found, the program will end abruptly, prompting the names of the entered orgs which are not present in finalData.json
#
#
# How each of the data is sanitized in final merged org?
#
#  - name
#
#     copied from the first entered org
#
#  - url
#
#     copied from the first entered org
#
#  - cat
#
#     copied from the first entered org
#
#  - tech
#
#     union of all the entered orgs
#
#  - top
#
#     union of all the entered orgs
#
#  - year
#
#     union of all the entered orgs
#
#  - project
#
#     extra care has been taken while dealing with copying number of projects data
#     for each year, if only one org has non zero number of projects, it is copied
#         if more than one org has non zero number of projects, and number of projects is not same in all the orgs, then a conflict is raised, and the user is asked to enter the correct number of projects manually for that particular year
#         (this is not likely gonna happen, as duplicate entries are because of different names in *different* years, but just in case)
#
#


import json

try:
    input = raw_input
except NameError:
    pass

num = int(input("Number of duplicate entries, including the original one: "))
dupNames = []
print("Enter the exact names of the orgs to be merged, the first name entered will be saved to the final org:\n")

for i in range(num):
    _ = input()
    dupNames.append(_)

indexForFirstOrg = -1

f = open('src/data/finalData.json')
data = json.load(f)
f.close()

temporaryDupNames = dupNames[:]
dupOrgs = []
sanitizedOrg = {}
sanitizedOrg['url'] = ''
sanitizedOrg['name'] = dupNames[0]
sanitizedOrg['tech'] = []
sanitizedOrg['cat'] = ''
sanitizedOrg['top'] = []
sanitizedOrg['year'] = []
sanitizedOrg['project'] = []


for i, org in enumerate(data):
    if org['name'] in temporaryDupNames:

        if org['name'] == dupNames[0]:
            indexForFirstOrg = i
            sanitizedOrg['url'] = org['url']
            sanitizedOrg['cat'] = org['cat']

        for t in org['top']:
            if not t in sanitizedOrg['top']:
                sanitizedOrg['top'].append(t)
        
        for t in org['tech']:
            if not t in sanitizedOrg['tech']:
                sanitizedOrg['tech'].append(t)

        dupOrgs.append(org)
        temporaryDupNames.remove(org['name'])

if (len(temporaryDupNames) > 0):
    print()
    print("These org names could not be found in finalData.json:\n")
    print("\n".join(temporaryDupNames))
    exit(1)

sanitizedOrg['year'] = []
sanitizedOrg['project'] = []

for i in range(13):
    numberOfProjects = 0
    for org in dupOrgs:
        if org['project'][i] != 0:
            if numberOfProjects == 0:
                numberOfProjects = org['project'][i]
            else:
                if numberOfProjects != org['project']:
                    print("Conflict found. For the year " + str(i + 2009) + ", there are two different number of projects: " + str(numberOfProjects) + " " + str(org['project'][i]) + ". Please fix the conflict by entering the correct number of projects: ")
                    numberOfProjects = int(input())
                    continue
    
    if numberOfProjects != 0:
        sanitizedOrg['year'].append(i + 2009)
    
    sanitizedOrg['project'].append(numberOfProjects)

del data[indexForFirstOrg]
data.insert(indexForFirstOrg, sanitizedOrg)

firstOrgName = dupNames[0];
del dupNames[0];

data[:] = [d for d in data if not d['name'] in dupNames]

with open('src/data/finalData.json', 'w') as fout:
    json.dump(data , fout, indent = 6)

print("\n\nSuccessfully merged:")
print("\n".join(dupNames))
print("\nto:\n" + firstOrgName)