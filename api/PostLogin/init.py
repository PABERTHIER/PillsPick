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
        mail = req.route_params.get('mail')
        query = f"SELECT * FROM Chemist WHERE mail = '{mail}'"
        cursor.execute(query)
        rows = cursor.fetchall()
        typeCl = "chemist"
        if not rows: 
            query = f"SELECT * FROM Customer WHERE mail = '{mail}'"
            cursor.execute(query)
            rows = cursor.fetchall()
            typeCl = "customer"
        data = []
        if len(rows) == 1:
            for row in rows:
                data.append([x for x in row])
        obj = { "type": typeCl, "data": data }

    return func.HttpResponse(simplejson.dumps(obj))
