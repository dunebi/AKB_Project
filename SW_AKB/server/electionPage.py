import pymysql
import pandas as pd
import numpy as np
import os
import sys

#이후 입력인자로 받을 예정
"""
MID = 1
e_name = '동국대 패장선거'
e_startdate = '2021-11-12'
e_enddate = '2021-12-04'
"""

#e_state 0:저장완료, 1:
MID = sys.argv[1]
e_name = sys.argv[2]
e_startdate = sys.argv[3]
e_enddate = sys.argv[4]
e_content = sys.argv[5]
e_state = 0
e_type = int(sys.argv[6])

#파싱단계
df = pd.read_excel(os.getcwd() + '/uploads/' + sys.argv[7])
voter_info = df.values.tolist()

df = pd.read_excel(os.getcwd() + '/uploads/' + sys.argv[8])
candidate_info = df.values.tolist()

#db 연결단계
#localhost와 연결
#db = pymysql.connect(host='localhost', port=3306, user='root', passwd='thdalstn12', db='sfw', charset='utf8')

#서버와의 연결
db = pymysql.connect(host='34.64.179.195', port=3306, user='root', passwd='1234', db='sfw', charset='utf8')

cursor = db.cursor()

election_info = [[MID, e_name, e_startdate, e_enddate, e_content, e_state, len(voter_info), 0, e_type]]
election_sql = "INSERT INTO ELECTION(MID, e_name, e_startdate, e_enddate, e_content, e_state, totalvoternum, presentvoternum, e_type) values (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
cursor.executemany(election_sql, election_info)
db.commit()

get_EID = "select EID from ELECTION order by EID desc limit 1;"
cursor.execute(get_EID)
result = cursor.fetchone()
EID = result[0]
#print(EID)

for i in range(len(voter_info)):
    user_sql = "INSERT INTO USER(u_name, u_phonenum) values (%s, %s);"
    cursor.execute(user_sql, voter_info[i])

    get_UID = "SELECT MAX(UID) FROM USER;"
    cursor.execute(get_UID)
    UID_result = cursor.fetchone()
    UID = UID_result[0]

    user_election_sql = "INSERT INTO USER_ELECTION(EID, UID, ue_state) VALUES(" + str(EID) + "," + str(UID) + "," + str(0) + ");"
    cursor.execute(user_election_sql)
    
db.commit()


candidate_sql = "INSERT INTO CANDIDATE(EID, c_num, c_name, c_birth, c_sex, c_promise) VALUES (" + str(EID) + ", %s, %s, %s, %s, %s);"
cursor.executemany(candidate_sql, candidate_info)
db.commit()


db.close()