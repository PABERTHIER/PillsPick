import logging
import pyodbc
import base64
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
        cursor.execute("SELECT * FROM Picture")
        rows = cursor.fetchall()
        data = []
        for row in rows:
            binary_base64 = base64.b64encode(row[1])
            row[1] = binary_base64.decode("utf-8")
            data.append([x for x in row])
    return func.HttpResponse(simplejson.dumps(data))
