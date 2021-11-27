import pymysql
import pandas as pd
import numpy as np
import os
import json
import sys

#db 연결단계
#db = pymysql.connect(host='localhost', port=3306, user='root', passwd='thdalstn12', db='sfw', charset='utf8')

#서버와의 연결
db = pymysql.connect(host='localhost', port=3306, user='root', passwd='1234', db='sfw', charset='utf8')

cursor = db.cursor()

phone = sys.argv[2]
phone = phone[0:3] + '-' + phone[3:7]+ '-' + phone[7:]
sql = " select UID,u_name,u_phonenum from USER where u_name='" + sys.argv[1] + "' and u_phonenum='"+phone +"';"
cursor.execute(sql)
#print(cursor.fetchall())
result = cursor.fetchall()
db.close()

if len(result) > 0:
     #temp = [{'UID':str(result[0][0])}]
     print(result[0][0])
else:
    #temp = [{'UID':'NULL'}]
    print(0)



#save_file = open('../server/downloads/userlogin.json','w',encoding='UTF-8-sig')
#json.dump(temp, save_file, ensure_ascii = False)
#save_file.close()
#print(result)

