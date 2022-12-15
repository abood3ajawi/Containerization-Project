import mango
import frommysql
from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write('Hello, world!')
        mysqlData = frommysql.fetchAll()
        mongoData = mango.fetchAll()
        lstmongo =[]
        for data in mongoData:
               lstmongo.append(data)
        print(len(mysqlData))
        print(len(lstmongo))
    
        count  =1
        for datamysql in mysqlData:
           t=True
           count = count +1
           for data in lstmongo:
               if(data['name'] ==datamysql[0]):
                   t =False
                   break  
           if t:
              name   = datamysql[0]
              grade1 = datamysql[1]
              grade2 = datamysql[2]
              grade3 = datamysql[3]
              grade4 = datamysql[4]
              grade5 = datamysql[5]
              average = grade1+grade2+grade3+grade4+grade5/5
              mango.insert(name,min(grade1,grade2,grade3,grade4,grade5),max(grade1,grade2,grade3,grade4,grade5),average)
        print(count)
          
          

        

httpd = HTTPServer(('0.0.0.0', 7000), SimpleHTTPRequestHandler)
httpd.serve_forever()













