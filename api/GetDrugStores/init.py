import logging
import pyodbc
import json as simplejson
import azure.functions as func

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
        cursor.execute("SELECT * FROM DrugStore")
        rows = cursor.fetchall()
        data = []
        for row in rows:
            data.append([x for x in row])

    return func.HttpResponse(simplejson.dumps(data))
