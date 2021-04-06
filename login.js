// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} =require('electron')
// const{dialog} =require("electron").remote.dialog


document.getElementById('loginbutton').addEventListener('click',e=>{
  let uinid= document.getElementById("uinid").value
  let passdlog =document.getElementById("password").value

  console.log(name)

  let obj={
    nunid:uinid,
    passd:passdlog
  }
  ipcRenderer.send('loginchanel',obj)
})

ipcRenderer.on("loginresponsechanel",(e,args)=>{
  console.log(args)
    window.location.href="dashboard/li/lihtml/test.html"  

})

// const button= document.getElementById("nnn")

// button.addEventListener('click'),e=>{
  
// }

ipcRenderer.on('mailbox',(e,args)=>{
    

    console.log(args)
})