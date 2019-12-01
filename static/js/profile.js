function showName() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      checkPercent(user);
      console.log(user.displayName);
      let firstname = user.displayName.split(' ')
      document.getElementById("customizeHere").innerHTML = firstname[0];
    } else {
      console.log("No user.");
    }
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
      


