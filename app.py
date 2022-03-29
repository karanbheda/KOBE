from flask import Flask, render_template
import csv
import json

app = Flask(__name__)

@app.route('/getData')
def getData():
  csvFilePath = r'nba_elo.csv'
  # create a dictionary
  data = []
    
  # Open a csv reader called DictReader
  with open(csvFilePath, encoding='utf-8') as csvf:
      csvReader = csv.DictReader(csvf)
        
      # Convert each row into a dictionary
      # and add it to data
      for rows in csvReader:
          data.append(rows)
  print(len(data))
  return json.dumps(data)

@app.route('/')
def hello():
    return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)


