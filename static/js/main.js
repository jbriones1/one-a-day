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
      console.log(user.displayName);
      let firstname = user.displayName.split(' ')
      // document.getElementById("customizeHere").innerHTML = firstname[0];
      db.collection("users").doc(user.uid).set({
        "name": user.displayName,
        "email": user.email,
        "userid": user.uid,
        "experience": 0,
        "level": 1,
        "last-tasks": [0, 0, 0]
      },{merge: true});
    } else {
      console.log(user);
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


