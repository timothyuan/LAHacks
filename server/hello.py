import csv
import sys

results = []
with open("disease_db.csv") as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        results.append(row)

symptoms = []
for item in results:
    if item[0] not in symptoms:
        symptoms.append(item[0])

ls = []
for item in symptoms:
    item = item.replace('\n', '')
    ls.append(item)

print(ls)

f = open("f.txt", "w+")
for item in ls:
    f.write(str(item) + "\n")
f.close()
