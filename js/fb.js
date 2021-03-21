const email = document.getElementById('s-email');
const namee = document.getElementById('s-username');
const pasword = document.getElementById('s-password');
const mobile = document.getElementById('s-mobile');


const database = firebase.database();
console.log('working?')
firebase.auth().onAuthStateChanged(function (user) {
  if (user!=null) {
    var db = firebase.database().ref('user/' + user.uid + '/user_name');
    db.on('value',(snapshot) =>{
      const datas = snapshot.val();
      document.getElementById("wlcm").innerHTML = 'Welcome, ' + datas;
    });
    document.getElementById("buttuns-id").style.display = "none";
    document.getElementById("wlcm-part").style.display = "flex";
    document.getElementById("logout-a").style.display = "inline-block";
  }
   else {
    document.getElementById("buttuns-id").style.display = "inline-block"; 
    document.getElementById("wlcm-part").style.display = "none";    
  }
  
});
document.getElementById("logout-a").addEventListener('click',(e)=>{
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
  window.location.reload();
});
signup.addEventListener('click', (e) => {
  e.preventDefault();
  

  firebase.auth().createUserWithEmailAndPassword(email.value, pasword.value)
    .then(function success(userData){
      // Signed in 
      var user = userData.user.uid;
      console.log(user);
      // ...
      database.ref('/user/' + user).set({
        user_email: email.value,
        user_pass: pasword.value,
        user_mob: mobile.value,
        user_name: namee.value
        
    })
    
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
    
      });
  alert('signed up')
  window.location.reload();
});

login.addEventListener('click', (e) => {
  const email = document.getElementById('l-email');
  const pasword = document.getElementById('l-password');
  e.preventDefault();
  console.log("hi")
  firebase.auth().signInWithEmailAndPassword(email.value, pasword.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;;
      // ...

      document.getElementById("buttuns-id").style.display = "none";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(email.value)
      console.log(errorCode);
      console.log(errorMessage);
    });

    //window.location.reload();
});
