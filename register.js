// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} =require('electron')
// const{dialog} =require("electron").remote.dialog


document.getElementById('regabutton').addEventListener('click',e=>{
    let keyregx = document.getElementById("keyreg").value

    if(keyregx==="done"){
  let namelog= document.getElementById("usernamereg").value
  let uqid = document.getElementById("uid").value
  let passdlog =document.getElementById("passwordreg").value

  console.log(name)

  let obj={

    name:namelog,
    idu:uqid,
    passd:passdlog
  }
  ipcRenderer.send('registerationchanel',obj)
}
else{
    ipcRenderer.send('regkeyFailchanel',"nothing")
    location.reload()
}
})

ipcRenderer.on("regrespoOChan",(e,args)=>{
  console.log(args)
    window.location.href="login.html"

})

// const button= document.getElementById("nnn")

// button.addEventListener('click'),e=>{
  
// }

ipcRenderer.on('mailbox',(e,args)=>{
    

    console.log(args)
})