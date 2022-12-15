import pymongo
def insert(name,max,min,avarge):
 client = pymongo.MongoClient('10.2.0.3',27017)
 db = client['mydb']
 mycol = db["grades"]
 mydict = { "name": name, "max": max ,"min": min, "avarage": avarge}
 mycol.insert_one(mydict)


#def count():
# client = pymongo.MongoClient('10.2.0.3',27017)
# db = client['mydb']
# mycol = db["grades"]
# name = {
     
# }
# return mycol.count_documents(name)


def fetchAll():
 client = pymongo.MongoClient('10.2.0.3',27017)
 db = client['mydb']
 mycol = db["grades"]
 return list(mycol.find())