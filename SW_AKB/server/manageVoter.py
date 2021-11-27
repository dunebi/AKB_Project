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

sql = "select u.uid, u.u_name, u.u_phonenum from USER u left join USER_ELECTION ue on u.UID=ue.UID where ue.EID=" + sys.argv[1] + ";"
cursor.execute(sql)
#print(cursor.fetchall())
result = cursor.fetchall()
db.close()

voter = []
for i in range(len(result)):
    temp = {'uid':result[i][0],'u_name':result[i][1], 'u_phonenum':result[i][2]}
    if i == len(result)-1:
        voter.append(temp)
    else:
        voter.append(temp)
"""        
for i in result:
    #print(i)
    temp = {'u_name':i[0], 'u_phonenum':i[1]}
    print(temp)
    voter += json.dumps(temp) + ", "
"""


print(voter)
#print(data_list)

save_file = open('../server/downloads/voter.json','w',encoding='UTF-8-sig')
json.dump(voter, save_file, ensure_ascii = False)
save_file.close()
#print(result)
