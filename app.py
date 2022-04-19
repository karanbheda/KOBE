from flask import Flask, render_template, request
import pandas as pd
import dao

app = Flask(__name__)

@app.route('/getData')
def getData():
  df = dao.getWinDeltaData()
  return df.to_json(orient='records')

@app.route('/getTeams')
def getTeams():
  df = dao.getTeams()
  return df.to_json(orient='records')

@app.route('/getTeamInfo')
def getTeamInfo():
  df = dao.getTeamInfo(request.args.get('team'), request.args.get('season'))
  result = {}
  result["matches"] = df.to_dict('records')
  result["total"] = len(df)
  result["won"] = len(df.query('score1 > score2'))
  return result

@app.route('/getTeamEloData')
def getTeamEloData():
  df = dao.getTeamEloData(request.args.get('team'))
  print(df)
  result = {}
  for i in list(df):
    result[i] = df[i].tolist()

  return result

@app.route('/')
def home():
    return render_template("dashboard.html")

@app.route('/temp')
def temp():
    return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)


