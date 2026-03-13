
// Default settings
if(!localStorage.getItem("examPassword")){
localStorage.setItem("examPassword","1234");
}

if(!localStorage.getItem("examDuration")){
localStorage.setItem("examDuration","40");
}
// Set default exam password if none exists
if(!localStorage.getItem("examPassword")){
    localStorage.setItem("examPassword","1234");
}


// START EXAM (store exam link)
function startExam(link, examID){

  let settings = JSON.parse(localStorage.getItem(examID));

  if(!settings || settings.enabled !== true){
    showPopup("Exam currently disabled");
    return;
  }

  sessionStorage.setItem("examLink", link);
  sessionStorage.setItem("examTime", settings.time * 60);
  sessionStorage.setItem("examPassword", settings.password);

  window.location = "exam.html";

}


// CHECK EXAM PASSWORD
function checkPassword(){

let pass=document.getElementById("password").value;

let storedPass=sessionStorage.getItem("examPassword");

if(pass===storedPass){

startCountdown();

}

else{

alert("Incorrect password");

}

}

// 10 SECOND COUNTDOWN BEFORE EXAM STARTS
function startCountdown(){

    let seconds = 10;

    let interval = setInterval(function(){

        document.getElementById("count").innerHTML =
        "Exam starting in " + seconds;

        seconds--;

        if(seconds < 0){

            clearInterval(interval);

            launchExam();

        }

    },1000);

}


// LOAD EXAM PAGE
function launchExam(){

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("examArea").style.display = "block";

    let link = sessionStorage.getItem("examLink");

    document.getElementById("examFrame").src = link;

    startTimer();

}


// MAIN EXAM TIMER
function startTimer(){

    let timer = sessionStorage.getItem("examTime");

    let display = document.getElementById("timer");

    let interval = setInterval(function(){

        let minutes = parseInt(timer / 60,10);
        let seconds = parseInt(timer % 60,10);

        minutes = minutes < 10 ? "0"+minutes : minutes;
        seconds = seconds < 10 ? "0"+seconds : seconds;

        display.textContent = minutes + ":" + seconds;


        // 5 minute warning
        if(timer == 300){

            alert("⚠ WARNING: 5 minutes remaining!");

        }


        // 1 minute warning
        if(timer == 60){

            alert("⚠ WARNING: 1 minute remaining!");

        }


        // TIME FINISHED
        if(timer <= 0){

            clearInterval(interval);

            document.getElementById("timer").innerHTML = "00:00";

            document.getElementById("timerBox").innerHTML =
            "TIME IS UP! Please scroll to the end and click SUBMIT.";

            alert("Time is up! Please scroll down and submit your exam.");

            return;

        }

        timer--;

    },1000);

}
// OPEN ADMIN LOGIN
function adminLogin(){

document.getElementById("adminOverlay").style.display="flex";

document.getElementById("adminPassword").focus();

}


// CLOSE ADMIN LOGIN
function closeAdmin(){

document.getElementById("adminOverlay").style.display="none";

document.getElementById("adminError").innerHTML="";

document.getElementById("adminPassword").value="";

}


// VERIFY ADMIN PASSWORD
function verifyAdmin(){

let pass=document.getElementById("adminPassword").value;

if(pass==="Knightmare2026#"){

window.location="admin.html";

}

else{

let error=document.getElementById("adminError");

error.innerHTML="Wrong Admin Password";

let box=document.getElementById("adminLoginBox");

box.classList.add("shake");

setTimeout(function(){

box.classList.remove("shake");

},500);

}

}


// PRESS ENTER TO LOGIN
document.addEventListener("keydown",function(event){

if(event.key==="Enter"){

if(document.getElementById("adminOverlay").style.display==="flex"){

verifyAdmin();

}

}

});
function showPopup(message){

  // Remove old popup if exists
  let old = document.getElementById("customPopup");
  if(old) old.remove();

  // Create popup container
  let popup = document.createElement("div");
  popup.id = "customPopup";
  popup.innerHTML = message;

  document.body.appendChild(popup);

  // Show and remove after 3 seconds
  setTimeout(()=>{
    popup.remove();
  }, 3000);

}