import pymysql
import pandas as pd
import numpy as np
import sys

eid = sys.argv[1]
adminAddr = sys.argv[2]
contractAddr = sys.argv[3]


db = pymysql.connect(host='localhost', port=3306, user='root', passwd='1234', db='sfw', charset='utf8')

cursor = db.cursor()

sql = "UPDATE USER_ELECTION SET ue_state=1 WHERE EID=" + sys.argv[1] + " AND UID=" + sys.argv[2] + ";"
cursor.execute(sql)
db.commit()

db.close()