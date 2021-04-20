import pandas as pd
from faker import Faker
import random


def get_data_drug(path):
    data = pd.read_csv(path,
                       sep=";",
                       names=["url", "name", "holder", "address", "departement", "area"],
                       index_col=False)
    return data


def sql_qry_drugstore(data):
    txt = ""
    for i, row in data.iterrows():
        address = replace_quote(row['address'])
        tab_a = address.split(" - ")
        if len(tab_a) == 2:
            adress = tab_a[0][0:-6]
            zip_code = tab_a[0][-5:]
            city = tab_a[1]
        else:
            adress = address
            zip_code = ""
            city = ""
        sql_resquest = f"INSERT INTO DrugStore VALUES ({i}, '{row['url']}', '{replace_quote(row['name'])}'," \
                       f" '{replace_quote(row['holder'])}', '{replace_quote(adress)}'," \
                       f"  '{replace_quote(row['departement'])}', '{replace_quote(row['area'])}', " \
                       f"'{replace_quote(zip_code)}', '{replace_quote(city)}');\n"
        txt += sql_resquest
        print(sql_resquest)
        print(i, end='\r')
    fichier = open("requests_drugstore.sql", "a")
    fichier.write(txt)
    return "done"


# drugstore_data = get_data_drug("./data/drugstore_data.csv")
# print(drugstore_data)
# sql_qry_drugstore(drugstore_data)


def get_ssn_number(is_man, birth_date, zip_code):
    ssn = ""
    first_nbr = 1 if is_man else 2
    second_nbr = str(birth_date.year)[2:]
    third_nbr = str(birth_date.month) if birth_date.month > 9 else "0" + str(birth_date.month)
    fourth_nbr = zip_code[:2]
    fifth_nbr = random.randint(100, 300)
    sixth_nbr = random.randint(100, 600)
    seventh_nbr = random.randint(10, 100)
    ssn = str(first_nbr) + str(second_nbr) + str(third_nbr) + str(fourth_nbr) + str(fifth_nbr) + str(sixth_nbr) + str(seventh_nbr)

    return ssn


# name / last_name / birth_date / address
# zip_code / city / ss_number / mail / phone_number / password
# fake = Faker('fr_FR')
# for i in range(5):
#     is_man = True if i % 2 == 0 else False
#     if is_man:
#         first_name = fake.first_name_male()
#     else:
#         first_name = fake.first_name_female()
#     last_name = fake.last_name()
#     birth_date = fake.date_of_birth(minimum_age=16, maximum_age=100)
#     address = fake.address().split("\n")
#     street_address = address[0]
#     zip_code = address[1][0:5]
#     city = address[1][6:]
#     ssn_number = int(get_ssn_number(is_man, birth_date, zip_code))
#     mail = first_name.lower() + "." + last_name.lower() + "@gmail.com"
#     phone_number = fake.phone_number()
#     password = "pillspick"
#     request_sql = f"INSERT INTO Customer VALUES ('{first_name}', '{last_name}', '{birth_date}', '{street_address}', " \
#                   f"'{zip_code}', '{city}', {ssn_number}, '{mail}', '{phone_number}', '{password}');"
#
#     print(request_sql)


def get_data_drug(path):
    data = pd.read_csv(path,
                       sep=";",
                       encoding='latin-1',
                       names=["cis_code", "name", "type", "how", "amm_status", "amm_type", "is_saled", "amm_date",
                              "bdm_status", "nbr_auto_europ", "titulaire", "watch"],
                       index_col=False)
    data = data.drop(columns=["amm_status",
                              "amm_type",
                              "is_saled",
                              "amm_date",
                              "bdm_status",
                              "nbr_auto_europ"])

    return data


def replace_quote(word):
    return word.replace('\'', '’')


def sql_qry_drug(data):
    header_names = ['drug', 'prescription', 'pad', 'natural_care', 'dietetic', 'cosmetic_beauty', 'heal', 'maternity', 'optical', 'orthopedic']
    txt = ""
    for i, row in data.iterrows():
        header_name = header_names[(i + 1) % 10]
        drug_name = replace_quote(row['name'].split(',')[0])
        is_watched = 1 if row['watch'] == 'oui' else 0
        sql_resquest = f"INSERT INTO Drug VALUES ('{drug_name}', '{replace_quote(row['type'])}', '', 1, {row['cis_code']}" \
                       f", '{row['how']}', '{replace_quote(row['titulaire'])}', {is_watched}, '{header_name}');\n"
        txt += sql_resquest
        print(i, end='\r')

    fichier = open("requests.sql", "a")
    fichier.write(txt)
    return "done"


drug_data = get_data_drug("./data/drug_data.csv")
sql_qry_drug(drug_data)
