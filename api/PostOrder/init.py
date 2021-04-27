import logging
import pyodbc
import json as simplejson
import azure.functions as func
import datetime
import numpy as np

def main(req: func.HttpRequest) -> func.HttpResponse:
   
    try:
        server = 'tcp:pillspick-server.database.windows.net' 
        database = 'PillsPick-Db' 
        username = 'PillsPick2021@pillspick-server' 
        password = 'Pills2021Pick' 
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
        print("Connection established")
    except pyodbc.DatabaseError as err:
        raise err
    else:
        cursor = cnxn.cursor()
        order = req.get_json()
        user_id = order['idUser']
        drugstore_id = order['idDrugStore']
        list_drug = order['drugIds']
        today = str(datetime.datetime.today().strftime('%d-%m-%Y'))
        status = 1 
        sql_request_order = f"INSERT INTO Orders VALUES ('{user_id}', '{drugstore_id}', '{today}', {status})"
        cursor.execute(sql_request_order)
        sql_request_id = "SELECT MAX(id) FROM Orders"
        id_order = cursor.execute(sql_request_id).fetchall()[0][0]
        cursor.commit()
        for id in list_drug:
            # Spec_drug
            price = np.random.uniform(1.0, 7.0)
            sql_request_spec = f"INSERT INTO Spec_drug VALUES ('{drugstore_id}', {id}, 100, {price})"
            cursor.execute(sql_request_spec)
            sql_request_id = "SELECT MAX(id) FROM Spec_drug"
            id_drug_spec = cursor.execute(sql_request_id).fetchall()[0][0]
            # orders_content
            sql_request_drug = f"INSERT INTO Orders_content VALUES ({id_order}, {id_drug_spec}, 1)"
            cursor.execute(sql_request_drug)
            cursor.commit()

    return func.HttpResponse("", status_code=200)