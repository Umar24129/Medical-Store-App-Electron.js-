const {ipcRenderer} =require('electron')
//let trash

function updatenewDiscountform() {
    let disMinVal=  document.forms["addnwform"]["discountMinValue"].value;
    let discPerc=  document.forms["addnwform"]["discountPercent"].value;

     let obj={
         discMVL:disMinVal,
         disPt:discPerc
     }


     setInterval(function(){ alert("Hello"); }, 3000);
     console.log(obj)

    ipcRenderer.send('discntUpO',obj)
    
}