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
  return df.to_json(orient='records')

@app.route('/')
def hello():
    return render_template("dashboard.html")

if __name__ == "__main__":
  app.run(debug=True)


