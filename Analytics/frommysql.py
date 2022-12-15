import mysql.connector
def fetchAll(): 
 dataBase = mysql.connector.connect(
 host ='10.2.0.4',
 user ='root',
 passwd ='123456',
 port ='3306'
 )
 cursorObject = dataBase.cursor()
 cursorUseDataBase= dataBase.cursor()
 useDataBase = 'USE todoDB'
 cursorUseDataBase.execute(useDataBase)
 query = "SELECT name,grade1,grade2,grade3,grade4,grade5 FROM grades"
 cursorObject.execute(query)
 myresult = cursorObject.fetchall()
 dataBase.close()
 return myresult

 