import pymysql
import pandas as pd
import numpy as np
import os

#이후 입력인자로 받을 예정
MID = 1
e_name = '동국대 패장선거'
e_startdate = '2021-11-12'
e_enddate = '2021-12-04'

#파싱단계
df = pd.read_excel(os.getcwd() + '/유권자명단.xlsx')
voter_info = df.values.tolist()

df = pd.read_excel(os.getcwd() + '/후보자명단.xlsx')
candidate_info = df.values.tolist()

#db 연결단계
db = pymysql.connect(host='localhost', port=3306, user='root', passwd='thdalstn12', db='sfw', charset='utf8')

cursor = db.cursor()

election_info = [[MID, e_name, e_startdate, e_enddate, '선거하게 해주세요', '저장완료', len(voter_info), 0]]
election_sql = "INSERT INTO ELECTION(MID, e_name, e_startdate, e_enddate, e_content, e_state, totalvoternum, presentvoternum) values (%s, %s, %s, %s, %s, %s, %s, %s);"
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