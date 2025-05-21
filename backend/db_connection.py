import pymongo

url = 'mongodb+srv://RMDB_admin:dadPZ8JUXsMlhDQB@cluster0.unw3ppl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
client = pymongo.MongoClient(url)

db = client['rmdb_db']

