import pymysql
import pandas as pd
import numpy as np
import os
import json
import sys


db = pymysql.connect(host='localhost', port=3306, user='root', passwd='1234', db='sfw', charset='utf8')

cursor = db.cursor()
sql = "select c_num, c_name FROM CANDIDATE where EID=" + sys.argv[1] + ";"
cursor.execute(sql)
#print(cursor.fetchall())
candidate_info = cursor.fetchall()
sql = "select contract , account FROM ADDRESS where EID=" + sys.argv[1] + ";"
cursor.execute(sql)
address_info = cursor.fetchall()

db.close()

candidate = []
for i in range(len(candidate_info)):
    temp = {'c_num':candidate_info[i][0], 'c_name':candidate_info[i][1]}
    if i == len(candidate_info)-1:
        candidate.append(temp)
    else:
        candidate.append(temp)

address = []
for i in range(len(address_info)):
    temp = {'contract':address_info[i][1], 'account':address_info[i][0]}
    if i == len(address_info)-1:
        address.append(temp)
    else:
        address.append(temp)

"""        
for i in candidate:
    #print(i)
    temp = {'u_name':i[0], 'u_phonenum':i[1]}
    print(temp)
    candidate += json.dumps(temp) + ", "
"""


print(candidate)
print(address)

save_file = open('../server/downloads/voteCandidate.json','w',encoding='UTF-8-sig')
json.dump(candidate, save_file, ensure_ascii = False)
save_file.close()

save_file = open('../server/downloads/address.json','w',encoding='UTF-8-sig')
json.dump(address, save_file, ensure_ascii = False)
save_file.close()
#print(candidate)
