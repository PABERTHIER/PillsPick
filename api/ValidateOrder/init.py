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
        id = req.route_params.get('id')
        query = f"SELECT status FROM Orders WHERE id = {id}"
        cursor.execute(query)
        status = cursor.fetchall()[0][0] + 1
        query_update = f"UPDATE Orders SET status = {status} WHERE id = {id}"
        cursor.execute(query_update)
        cnxn.commit()

    return func.HttpResponse()
