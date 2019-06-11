// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyCxZS2eCPmyC87oDJ6zM22dinmw0f4Zung",
   authDomain: "charisse-s-circles.firebaseapp.com",
   databaseURL: "https://charisse-s-circles.firebaseio.com",
   projectId: "charisse-s-circles",
   storageBucket: "charisse-s-circles.appspot.com",
   messagingSenderId: "280619593708",
   appId: "1:280619593708:web:e98fae65aa250280"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
let database = firebase.database()
 
let scoreboard = {}

let User=document.getElementById("User")

let x=700
let y=400

let c=200
let d=300

let direction

let direction2

let score

let enemycount

let time

let level

let speed

let g= [105, 300, 600, 800]
let l= [250, 450, 490, 600]

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/1051
  direction=1
  direction2= [1,1,1,1]
  score=0
  enemycount=4
  level=1
  speed=3.9
  time=390
}

function draw() {
  time = time-0.20
  if (time > 0) {
  background(30,195,230);

  fill(210,150,50)
  circle(x*s,y,50*s)
	  
  if (touches.length == 0)   {
    controls for main character
}
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 10
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 10
  }
if (keyIsDown(UP_ARROW)) {
    y = y - 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 10
  }
  
  fill(90, 250, 600)
  circle(c*s,d,70*s)
  c = c + 4.5 * direction
  if ( c*s > width || c*s < 0) {
	direction = direction * -1
  }
  if (dist( x*s, y, c*s, d) < 50*s + 70*s) {
	score = score + 1
  }
  if (score > 189 && level == 2) {
    speed = speed + 5
    level = 3
  }


  
  for (i=0; i<enemycount; i=i+1) {
    
    fill(270, 50, 300)
    circle(g[i]*s,l[i],99*s)
    l[i] = l[i] - speed * direction2[i]
    if ( l[i] > height || l[i] < 0) {
      direction2[i] = direction2[i] * -1
    }
  

    if(dist(x*s, y, g[i]*s, l[i]) < 50*s + 99*s) {
      score = score - 1
    }
  }
  
  
  if (score > 95 && level == 1) {
      enemycount = enemycount + 3
      level = 2
      g.push.apply(g, [330, 500, 850])
      l.push.apply(l, [400, 650, 720])
      direction2.push.apply(direction2, [1, 1, 1])

      
    }


  
  
  textSize(30)
    text("Score: " + score,130,30)
    text("Time: " + time.toFixed(0),700,30)
}
  else{
    User.innerHTML = "Name? <input id = 'Player'><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
  noLoop()

  }
 }


function restart() { 
        let Player = document.getElementById("Player")
		name = Player.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("Scoreboard: " + JSON.stringify(scoreboard,null,1)) 
		time = 200
		score = 0
		loop()
		User.innerHTML = ""
        generate_leaderboard()
}


function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()




