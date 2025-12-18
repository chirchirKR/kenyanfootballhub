var table = {
    "define": "mp/w/d/l/pts/gf/ga/gd/pos/last5/name",
    "kcb":    "13/6/3/4/21/15/11/4/1/wdwww/KCB",
    "kenpol": "11/6/3/2/21/9/6/3/2/wwlwd/Kenya Police FC",
    "tusker": "13/6/3/4/21/12/10/2/3/llwww/Tusker FC",
    "posta":  "14/5/6/3/21/14/15/-1/4/lwwdd/Posta Rangers",
    "gor":    "11/6/2/3/20/14/8/6/5/wwlld/Gor Mahia FC",
    "kaka":   "12/5/5/2/20/16/12/4/6/dlwdd/Kakamega Homeboyz",
    "shaba":  "12/5/4/3/19/14/11/3/7/wdwwd/Shabana FC",
    "afcleo": "11/4/6/1/18/11/8/3/8/lddwd/AFC Leopards",
    "mara":   "12/4/5/3/17/10/7/3/9/dllww/Mara Sugar",
    "mathau": "13/4/3/6/15/8/11/-3/10/wlwld/Mathare United",
    "bandari":"13/2/8/3/9/9/0/14/11/ddldd/Bandari",
    "bidco":  "13/3/5/5/14/7/10/-3/12/dllld/Bidco United",
    "nairobi":"9/4/1/4/13/11/11/0/13/wwlld/Nairobi United",
    "ulinzi": "13/3/4/6/13/11/14/-3/14/wwdll/Ulinzi Stars",
    "aps":    "13/3/4/6/13/13/17/-4/15/wdwdl/APS Bomet",
    "seal":   "12/2/6/4/12/11/13/-2/16/ddddd/Murang'a SEAL",
    "sofa":   "13/3/3/7/12/11/16/-5/17/lldll/Sofapaka",
    "kario":  "12/1/5/6/8/7/14/-7/18/lddll/Kariobangi Sharks"
}
var Ids = ["kenpol","kcb","posta","tusker","gor","kaka","afcleo","shaba","kario","sofa","seal","aps","ulinzi","mara","mathau","bidco","bandari","nairobi"];
function getTeam(teamId) {
  teamId = teamId.toLowerCase();
    if (!table[teamId]) {
      return null;
    }
    if (table[teamId].split('/').length < 11) {
      throw new Error(`This team of id \"${teamId}\" has less details`);
      return null;
    }
    let [mp,w,d,l,pts,gf,ga,gd,pos,last5,name] = table[teamId].split('/');
    let new_map = {
      mp: mp, w:w,d:d,l:l,pts:pts,gf:gf,ga:ga,gd:gd,pos:pos,last5:last5,name:name
    }
    return new_map;
}


function getRange(start=1,end=18,_ids_=Ids) {
  let a = 1, b = 18;
  if (start > end) {a = end;b = start;} else {a = start; b = end; }
  let arr = []; let positions = [];
  _ids_.forEach(function (id) {
    let pos = getTeam(id).pos;
    if ((pos == start || pos == end) || (pos > a && pos < b)) {
      arr.push(getTeam(id));
      positions.push(pos);
    }
  });
  
  //console.log(JSON.stringify(arr));
  positions = positions.sort((a,b) => (a-b));
  //console.log(positions)
  return [arr,positions];
}

function edit(mode=0,v=1,m=1) {
  var new_array = [];
  let html = [`
  <h3>KENYA PREMIER LEAGUE</h3>
  <table class="stand-top4">
  <tr>
  <th>POS</th><th>TEAM</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th>
  </tr>`];
  if (mode == 0) {
    let arrOfTeams = getRange();
    let pos = arrOfTeams[1];
    let array = arrOfTeams[0];
    pos.forEach((POS) => {
      array.forEach( (team) => {
        if (team.pos == POS) {
          new_array.push(team);
        }
      });
    });
    new_array.forEach(function (team) {
      html.push(`<tr><td>${team.pos}.</td><td>${team.name}</td><td>${team.mp}</td><td>${team.w}</td><td>${team.d}</td><td>${team.l}</td><td>${team.pts}</td></tr>`);
    });
    html.push('</table>');
    return html.join('\n');
  }
  
}
//console.log(edit());