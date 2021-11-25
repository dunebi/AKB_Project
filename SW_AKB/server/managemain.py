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

sql = "select e_name, e_startdate, e_enddate, e_state from ELECTION where MID=" + sys.argv[1] + ";"
cursor.execute(sql)
sub_result = cursor.fetchall()
db.close()


result = []
print(sub_result)
for i in range(len(sub_result)):
    temp_e_date = str(sub_result[i][1]) + " ~ " + str(sub_result[i][2])
    print(temp_e_date)
    temp_e_state = ""
    if(sub_result[i][3]==0):
        temp_e_state = '저장완료'
    elif(sub_result[i][3]==1):
        temp_e_state = '심사중'
    elif(sub_result[i][3]==2):
        temp_e_state = '승인완료'
    elif(sub_result[i][3]==3):
        temp_e_state = '투표중'
    temp = {'e_name':sub_result[i][0], 'e_date':temp_e_date, 'e_state':temp_e_state, 'e_flag': 0}
    result.append(temp)

"""        
for i in result:
    #print(i)
    temp = {'u_name':i[0], 'u_phonenum':i[1]}
    print(temp)
    voter += json.dumps(temp) + ", "
"""

print(result)
#print(data_list)

save_file = open('../server/downloads/election.json','w',encoding='UTF-8-sig')
json.dump(result, save_file, ensure_ascii = False)
save_file.close()
#print(result)


