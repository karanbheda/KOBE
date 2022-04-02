import pyodbc 

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-3G3J9CA\MSSQL;'
                      'Database=kobe;'
                      'Trusted_Connection=yes;')
