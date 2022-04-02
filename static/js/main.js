$(document).ready(function () {
    document.documentElement.setAttribute("data-theme", "light");
    loadTeams();
});

$("#theme").click(function () {
    if (document.documentElement.getAttribute("data-theme") == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
});

$("#teams").click(function () {
    $("#header").text("Teams")
    loadTeams()
});


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
    fetchAsync("http://127.0.0.1:5000/getTeamInfo?team="+team+"&season=2015").then(data => {
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

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json().then(function (resp) { return resp; });
    return data;
}