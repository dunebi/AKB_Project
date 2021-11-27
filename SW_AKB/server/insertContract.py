import pymysql
import pandas as pd
import numpy as np
import sys

eid = sys.argv[1]
adminAddr = sys.argv[2]
contractAddr = sys.argv[3]


db = pymysql.connect(host='localhost', port=3306, user='root', passwd='1234', db='sfw', charset='utf8')

cursor = db.cursor()

contract_info = [[eid,adminAddr,contractAddr]]
contract_sql = "INSERT OR UPDATE INTO ADDRESS(EID, contract, account) values (%s, %s, %s);"
cursor.executemany(contract_sql, contract_info)
db.commit()

db.close()