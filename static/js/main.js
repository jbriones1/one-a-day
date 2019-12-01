function randNumber() {
  taskColl.get().then(snap => {
    let rand = parseInt(Math.random()*snap.size + 1);
    return rand;
    }
  );
}

function loadTask() {
  let tasks = [];
  taskColl.get().then(snap => {
    var rand = parseInt(Math.random()*snap.size);
    snap.forEach(doc => {
      var taskStr = doc.data().task;
      tasks.push(taskStr);
    });
    console.log(tasks[rand]);
    $("#task").html(tasks[rand]);
  });  
}

function getUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      checkPercent(user);
      updateLevel();
      const usersRef = userColl.doc(user.uid);
      usersRef.get()
        .then( snap => {
          if (!snap.exists) {
            createUser(user);
          }
        });
      let firstname = user.displayName.split(' ');
    }
  });
}

function createCollection() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      userColl.doc(user.uid).collection("past-tasks").doc("dummy").set({
        "task ID": "dummy task",
        "points": 0
      },{merge: true});
    }
  })
}

function createUser(user) {
  db.collection("users").doc(user.uid).set({
    "name": user.displayName,
    "email": user.email,
    "userid": user.uid,
    "experience": 0,
    "level": 1,
    "last-tasks": [0, 0, 0]
  },{merge: true});
}


function buttonPress() {
    
  const increment = firebase.firestore.FieldValue.increment(1);
  var user = firebase.auth().currentUser;
  let doc = db.collection('users').doc(user.uid);
 
  doc.update({ experience: increment});
  updateExp();
  console.log("pressed");
}

function updateExp() {
  var user = firebase.auth().currentUser;
  let exp = db.collection('users').doc(user.uid).onSnapshot(function (snap) {
    let exp = snap.data().experience;
    checkPercent(user);
  });
}

function checkPercent(user) {
  let id = user.uid;
  userColl.doc(id).onSnapshot(function (snap) {
    let exp = snap.data().experience;
    let perc = exp / 10 * 100;
    console.log(perc);
    $("#progressBar").css("width", perc+"%");
  })
}

function updateLevel() {
  var user = firebase.auth().currentUser;
  let exp = db.collection('users').doc(user.uid).onSnapshot(function (snap) {
    let lvl = snap.data().level;
    $("#numberOfPoints").html(lvl);
  });
}



