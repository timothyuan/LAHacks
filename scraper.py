import requests
r = requests.get('http://people.dbmi.columbia.edu/~friedma/Projects/DiseaseSymptomKB/index.html')

from bs4 import BeautifulSoup
soup = BeautifulSoup(r.text, 'html.parser')
results = soup.find_all('p', attrs={'class':'MsoNormal'})
#print(results[11])

disease_tuple = []
sympt_tuple = []


symptom_dictionary = {}

for index in range(11, len(results), 3):
    if results[index].find('span') != None:
        disease_tuple.append(results[index].find('span').text)
    if(index+2 < len(results)):
        sympt_tuple.append(results[index+2].find('span').text)

records = []

for index in range(0, len(disease_tuple)):
    if(disease_tuple[index] != '\xa0'):
        disease_name = disease_tuple[index]
    records.append((sympt_tuple[index], disease_name))
    # if(sympt_tuple[index] not in symptom_dictionary.keys()):
    #     symptom_dictionary[sympt_tuple[index]] = [disease_name]
    # else:
    #     symptom_dictionary[sympt_tuple[index]].append(disease_name)

records.sort()

# for result in results:
#     if result.find('span') != None:
#         records.append(result.find('span').text)

#
import pandas as pd
#df = pd.DataFrame(data=symptom_dictionary)
df = pd.DataFrame(records, columns=['symptoms', 'disease'])
print(df.head())
# df['date'] = pd.to_datetime(df['date'])
df.to_csv('disease_db.csv', index=False, encoding='utf-8')
