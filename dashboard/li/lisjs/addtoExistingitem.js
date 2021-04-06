const { ipcRenderer } = require('electron')
require('events').EventEmitter.defaultMaxListeners = 150000;






function test() {
    let ina = document.getElementById("test").value
    let testti = {
        name: ina
    }

    ipcRenderer.send('test', testti)



}



function abcc() {

}
// ipcRenderer.send("testget","poof")
console.log(ipcRenderer.sendSync('synchronous-message', 'ping'))




ipcRenderer.send('getallitems', "poof")
console.log("trash")


ipcRenderer.on("getallitems", (e, args) => {

    console.log("test")
    console.log(args + "testt")




    document.getElementById('selectorthingi').innerHTML = ""
    var newHTML = "";
    for (i = 0; i < args.length; i++) {


        newHTML += ` <option>${args[i].itmname}  || ${args[i].itmType}</option>
           `

    }
    document.getElementById('selectorthingi').innerHTML += newHTML;

})



// $(document).ready(function(){
//     $('input[type="radio"]').click(function(){
//         var inputValue = $(this).attr("value");
//         var targetBox = $("." + inputValue);
//         $(".box").not(targetBox).hide();
//         $(targetBox).show();
//     });
// });

function addexisitng() {

    // ipcRenderer.send('addnewchanel',"fk off")

console.log("testing adding updateng")
    let x = document.forms["addnwform"]["selectorthingi"].value;
    x = x.split(" || ")
    x=x[0]
    
    if(x===""){
        ipcRenderer.send('emptyselect',"print dialog for ampty name in that part")

        
    }


    //let xa=  document.forms["addnwform"]["ProduType"].value;
    let xb = document.forms["addnwform"]["ProOriPro"].value;
    let xc = document.forms["addnwform"]["ProdSaPi"].value;
    let xd = document.forms["addnwform"]["ProQuan"].value;



   
    //ipcRenderer.send('addnewchanel',selRadio)


    let obj = {
        Pname: x,
        PoPr: xb,
        PSPi: xc,
        PQ: xd
    }
    console.log("Trash + + + +  + ")
    // ipcRenderer.send('addnewchanel', obj)

    
    ipcRenderer.send('updatingstuff',obj)

   // location.reload()








}



