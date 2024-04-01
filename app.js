
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase,ref ,set,remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBj_zS_5rHlaxCmcOzSkkEzwjfHzXjrmM0",
    authDomain: "chat-application-5d7f8.firebaseapp.com",
    databaseURL: "https://chat-application-5d7f8-default-rtdb.firebaseio.com",
    projectId: "chat-application-5d7f8",
    storageBucket: "chat-application-5d7f8.appspot.com",
    messagingSenderId: "478837478300",
    appId: "1:478837478300:web:2ed0746ae7ac5e49502e59",
    measurementId: "G-90LNHMCJVN"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


  var msgTxt = document.getElementById("msgTxt");  
  var sender ;
  if(sessionStorage.getItem('sender')){
    sender = sessionStorage.getItem('sender')
  }else{
    sender = prompt("Enter Your name")
    sessionStorage.setItem('sender', sender)
  }

  function sendMsg(){
   var msg = msgTxt.value
   var timestamp = new Date().getTime()
   set(ref(db,"messages/"+timestamp),{
    msg : msg,
    sender : sender
   })
   msgTxt.value = ""
  }

  // to recieve messages 
  onChildAdded(ref(db,"messages"),(data)=>{
   if(data.val().sender == sender){
    messages.innerHTML +="<div class=outer style=justify-content:end id="+data.key+" ><div id=inner class=me>you : "+data.val().msg+"<button id=dltMsg onclick=dltMsg("+data.key+")> Delete </button></div></div>"
   }else{
    messages.innerHTML +="<div class=outer id="+data.key+" ><div id=inner class=notMe>"+data.val().sender+" : "+data.val().msg+"</div></div>"

   }
  })
  // to delete messages
  function dltMsg(key){
    // console.log(key)
    remove(ref(db,"messages/"+key))
   
  }
  onChildRemoved(ref(db,"messages"),(data)=>{
    // console.log(data.key)
    var msgBox = document.getElementById(data.key)
    messages.removeChild(msgBox)
  })
  window.sendMsg = sendMsg
  window.dltMsg = dltMsg