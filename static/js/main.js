$(document).ready(function () {
    loadDashboard();
});

$("#theme").click(function () {
    if (document.documentElement.getAttribute("data-theme") == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
});


/******* MENU ITEMS ****/
function loadDashboard() {
    loadTeams();
    $(".active").removeClass("active")
    $("#menu-db").addClass("active");
}

function loadAnalysis() {
    //loadTeams();
    $(".active").removeClass("active")
    $("#menu-analysis").addClass("active");
}
/***********************/


/***********DASHBOARD ************************/
function loadTeams() {
    fetchAsync("http://127.0.0.1:5000/getTeams").then(teams => {
        document.getElementById("canvas").innerHTML = ""
        let html = ""
        let i = 0;
        teams.forEach(team => {
            if (i % 9 == 0) {
                if (i != 0) { html += "</div>" }
                html += "<div class=\"row\">"
            }

            html += "<div class=\"col-md-1 col-lg-1 px-md-1 team-list-db\" id=\"" + team['team'] + "\" onclick=\"loadTeamInfo(" + team['team'] + ")\"><img class=\"img-circle team-icon-db\" src=\"../static/imgs/GSW.png\"/></div>"
            i++;
        });

        html += "</div>"
        document.getElementById("canvas").innerHTML = html
    })
}

function loadTeamInfo(elem) {
    let team = elem.id
    let html = '<div class="row"><div class="col-md-4 col-lg-4 px-md-4">'+seasonDropDown()
    fetchAsync("http://127.0.0.1:5000/getTeamInfo?team=" + team + "&season=2015").then(data => {
        document.getElementById("canvas").innerHTML = ""
        html += '<ul class="list-group list-group-flush">'
        let i = 0;
        data.matches.forEach(match => {
            html += '<li class="list-group-item">' + new Date(match.date).toDateString() + ' ' + match.score1 + ' - ' + match.score2 + ' ' + match.team + '</li>'
        });

        html += '</ul></div><div class="col-md- col-lg-8 px-md-8"><div id="win-loss-pie"></div><div id="elo-plot"></div></div></div>'

        document.getElementById("canvas").innerHTML = html
        document.getElementById("canvas-title").innerHTML = team
        data.team = team
        loadWinLossPie(data);
        loadEloPlot(team);
    })
}


function loadEloPlot(team) {
    fetchAsync("http://127.0.0.1:5000/getTeamEloData?team=" + team).then(data => {
        let layout = {
            title: 'Trending records for each NBA Team',
            legend: {
                y: 0.5,
                traceorder: 'reversed',
                font: { size: 16 },
                yref: 'paper'
            },
            xaxis: {
                range: ["2010-01-01", "2022-03-01"],
                autorange: false
            },
        };

        let plot = {
            x: data.x,
            y: data.y,
            mode: 'lines',
            name:team,
            connectgaps: true,
            line: {
                color: 'rgb(128, 0, 128)',
                width: 1
            },
            isColored: false,
            totalMatches: 0,
            matchesWon: 0,
        };

        console.log(plot)
        Plotly.newPlot('elo-plot', [plot], layout);
    })
    
}

function loadWinLossPie(data) {
    let pieData = [{
        values: [data.won, data.total - data.won],
        labels: ['Matches won', 'Matches lost'],
        marker: {
            colors: ['rgb(44, 160, 44)', 'rgb(175, 51, 21)']
        },
        type: 'pie'
    }];

    let pieLayout = {
        title: 'Win/Loss stats for Team ' + data.team,
        height: 400,
        width: 500
    };

    Plotly.newPlot('win-loss-pie', pieData, pieLayout);  
}

function seasonDropDown() {
    let dropdown = '<div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Season: 2015</button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'
    for (let year = 2010; year <= 2021; year++) {
        dropdown += '<li><a class="dropdown-item" onclick="updateSeason(' + year + ')">' + year + '</a></li>'
    }
    dropdown += '</ul></div>'
    return dropdown
}

/************************************************** */

/************ Analysis **********************/
function loadTeams() {
    fetchAsync("http://127.0.0.1:5000/getTeams").then(teams => {
        document.getElementById("canvas").innerHTML = ""
        let html = ""
        let i = 0;
        teams.forEach(team => {
            if (i % 9 == 0) {
                if (i != 0) { html += "</div>" }
                html += "<div class=\"row\">"
            }

            html += "<div class=\"col-md-1 col-lg-1 px-md-1 team-list-db\" id=\"" + team['team'] + "\" onclick=\"loadTeamInfo(" + team['team'] + ")\"><img class=\"img-circle team-icon-db\" src=\"../static/imgs/GSW.png\"/></div>"
            i++;
        });

        html += "</div>"
        document.getElementById("canvas").innerHTML = html
    })
}
/***************************************** */
async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json().then(function (resp) { return resp; });
    return data;
}