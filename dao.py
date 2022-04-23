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
                            ' UNION SELECT cast(date as date) date, team1 as team, season, score2 as score1, score1 as score2 from nba_elo where team2 = \''+team+'\' and season = '+season+')A order by date desc', conn)
    return df

def getTeamEloData(team):
    df = pd.read_sql_query('select cast(date as date) as x, elo1_post as y\
                            from nba_elo \
                            where team1 = \'' + team + '\' \
                            and season >= 2010 and season <= 2021 \
                            union \
                            select cast(date as date) as x, elo2_post as y \
                            from nba_elo \
                            where team2 = \'' + team + '\'\
                            and season >= 2010 and season <= 2021', conn)
    return df
    
def getWinProbData():
    df = pd.read_sql_query('SELECT * from nba_winprobs', conn)
    return df

def getPerformanceStats(team, season):
    df = pd.read_sql_query('select 1.0*sum(expected)/sum(total) y, 1.0*sum(actual)/sum(total) x \
                            from \
                            (select count(*) total, sum(case when elo_prob1 > elo_prob2 then 1 else 0 end) expected, sum(case when score1 > score2 then 1 else 0 end) actual \
                            from nba_elo \
                            where team1 = \'' + team + '\' and season = ' + season + ' \
                            union \
                            select count(*) total, sum(case when elo_prob2 > elo_prob1 then 1 else 0 end) expected, sum(case when score2 > score1 then 1 else 0 end) actual \
                            from nba_elo \
                            where team2 = \'' + team + '\' and season = ' + season + ') A', conn)
    return df