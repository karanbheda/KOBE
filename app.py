from flask import Flask, render_template, request
import pandas as pd
import dao
import json

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

  result = {}
  for i in list(df):
    result[i] = df[i].tolist()

  return result
  
@app.route('/getWinProbData')
def getWinProbData():
  df = dao.getWinProbData()
  return df.to_json(orient='records')

@app.route('/getAllElo')
def getAllElo():
  result = {}
  for index, row in dao.getTeams().iterrows():
    df = dao.getTeamEloData(row['team'])
    elo = {}
    for i in list(df):
      elo[i] = df[i].tolist()
    result[row['team']] = elo
  
  return result

@app.route('/getPerformanceStats')
def getPerformanceStats():
  season = request.args.get('season')
  teams = request.args.get('teams')
  result = {}
  for team in teams.split(","):
    df = dao.getPerformanceStats(team, season)
    elo = {}
    for i in list(df):
      elo[i] = df[i].tolist()[0]
    result[team] = elo
  
  return result

@app.route('/getPlayerAnalysis')
def getPlayerAnalysis():
  f = open('player.json')
 
  # returns JSON object as
  # a dictionary
  data = json.load(f)

  f.close()

  return data


@app.route('/')
def home():
    return render_template("dashboard.html")

@app.route('/temp')
def temp():
    return render_template("index.html")

if __name__ == "__main__":
  app.run(debug=True)


