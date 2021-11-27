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

sql = "select totalvoternum FROM ELECTION where EID=" + sys.argv[1] + ";"
cursor.execute(sql)
#print(cursor.fetchall())
totalvoternum = cursor.fetchall()
totalvoternum = totalvoternum[0][0]
print(totalvoternum)

sql = "select c_num FROM CANDIDATE where EID="  + sys.argv[1] + ";"
cursor.execute(sql)
c_num = cursor.fetchall()
print(c_num)
db.close()

candidate_num = []
for i in range(len(c_num)):
    candidate_num.append(c_num[i][0])

make_json = []
make_json.append({'total' : totalvoternum , 'candidate':candidate_num})
    

print(make_json)


save_file = open('../server/downloads/election_info_block.json','w',encoding='UTF-8-sig')
json.dump(make_json, save_file, ensure_ascii = False)
save_file.close()


