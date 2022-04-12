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
            html += '<li class="list-group-item">' + match.date + ' ' + match.score1 + ' - ' + match.score2 + ' ' + match.team + '</li>'
        });

        html += '</ul></div><div class="col-md- col-lg-8 px-md-8"></div></div>'

        document.getElementById("canvas").innerHTML = html
    })
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