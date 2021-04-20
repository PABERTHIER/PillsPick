import random
from faker import Faker

list_id_drug_store = [376, 399]
list_id_drug = [4399, 3879, 14929, 8669, 849, 3539, 4789, 7059, 7689, 10649]

def get_spec_drug():
    # DrugStore : 376, 399
    # Médicaments : 4399, 3879, 14929, 8669, 849, 3539, 4789, 7059, 7689, 10649
    i = 1
    for id_drug_store in list_id_drug_store:
        for id_drug in list_id_drug:
            # price in centime
            price = random.randint(100, 500) / 100
            quantity = random.randint(0, 100)

            sql_request = f"INSERT INTO Spec_drug VALUES ({id_drug_store}, {id_drug}, {quantity}, {price});"
            print(sql_request)
            i += 1
    return


get_spec_drug()

def get_chemist():

    fake = Faker('fr_FR')
    for id_drug_store in list_id_drug_store:
        is_man = True if id_drug_store % 2 == 0 else False
        if is_man:
            first_name = fake.first_name_male()
        else:
            first_name = fake.first_name_female()
        last_name = fake.last_name()
        birth_date = fake.date_of_birth(minimum_age=16, maximum_age=100)
        address = fake.address().split("\n")
        street_address = address[0]
        zip_code = address[1][0:5]
        city = address[1][6:]
        ssn_number = random.randint(1000000, 1000000000)
        drug_store_id = id_drug_store
        mail = first_name.lower() + "." + last_name.lower() + "@gmail.com"
        phone_number = fake.phone_number()
        password = "pillspick"
        request_sql = f"INSERT INTO Chemist VALUES ('{first_name}', '{last_name}', '{birth_date}', '{street_address}', " \
                      f"'{zip_code}', '{city}', {ssn_number}, {drug_store_id}, '{mail}', '{phone_number}', '{password}');"

    print(request_sql)


