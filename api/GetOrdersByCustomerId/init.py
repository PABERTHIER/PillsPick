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
        main_cursor = cnxn.cursor()
        id_customer = req.route_params.get('id')
        query = f"SELECT * FROM Orders WHERE id_customer = {id_customer}"
        main_cursor.execute(query)
        data_list_order = main_cursor.fetchall()
        list_order = []
        for order in data_list_order:
            id_order = order[0]
            status = order[4]
            order_content = get_order_content(id_order, main_cursor)
            drugstore_name = get_drugstore_name(order[2], main_cursor)
            list_order.append([id_order, status, drugstore_name, order_content])
    return func.HttpResponse(simplejson.dumps(list_order))


def get_order_content(id, cursor):
    query = f"SELECT * FROM Orders_content WHERE id_orders = {id}"
    cursor.execute(query)
    order_content = cursor.fetchall()
    drugs_ordered = []
    for drug_ordered in order_content:
        cursor.execute(f"SELECT drug_id FROM Spec_drug WHERE id = {drug_ordered[1]}")
        drug_id = cursor.fetchall()[0][0]
        drug_name = get_drug_from_id(drug_id, cursor, drug_ordered[2], float(get_price_drug(drug_ordered[1], cursor)))
        drugs_ordered.append(drug_name)
    return drugs_ordered


def get_drug_from_id(id, cursor, quantity, price):
    cursor.execute(f"SELECT * FROM Drug WHERE id = {id}")
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    data[0]['quantity'] = quantity
    data[0]['price'] = price
    data[0]["pictureId"] = data[0].pop("picture_id")
    data[0]["cisCode"] = data[0].pop("cis_code")
    data[0]["routeAdministration"] = data[0].pop("route_administration")
    data[0]["isWatched"] = data[0].pop("is_watched")
    data[0]["headerName"] = data[0].pop("header_name")
    print(data[0])
    return data[0]


def get_price_drug(id, cursor):
    cursor.execute(f"SELECT price FROM Spec_drug WHERE id = {id}")
    return cursor.fetchall()[0][0]


def get_drugstore_name(id, cursor):
    cursor.execute(f"SELECT name FROM DrugStore WHERE id = {id}")
    return cursor.fetchall()[0][0]