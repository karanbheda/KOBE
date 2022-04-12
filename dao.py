from config import conn
import pandas as pd

def getWinDeltaData():
    df = pd.read_sql_query('SELECT * from nba_elo', conn)
    return df

def getTeams():
    df = pd.read_sql_query('select distinct team1 as team\
                            from nba_elo    \
                            where season >= 2015    \
                            union   \
                            select distinct team2  as team\
                            from nba_elo    \
                            where season >= 2015', conn)
    return df

def getTeamInfo(team, season):
    df = pd.read_sql_query('select date, team, season, score1, score2 from (SELECT cast(date as date) date, team2 as team, season, score1, score2 from nba_elo where team1 = \''+team+'\' and season = '+season +
                            ' UNION SELECT cast(date as date) date, team1 as team, season, score1 as score2, score2 as score1 from nba_elo where team2 = \''+team+'\' and season = '+season+')A order by date desc', conn)
    return df
    