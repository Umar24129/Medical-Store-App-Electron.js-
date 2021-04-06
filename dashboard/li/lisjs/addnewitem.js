const {ipcRenderer} =require('electron')
let trash

function addnewitemform(){
   // ipcRenderer.send('addnewchanel',"fk off")
  
  
    let x=  document.forms["addnwform"]["producName"].value;
    //let xa=  document.forms["addnwform"]["ProduType"].value;
    let xb=  document.forms["addnwform"]["ProOriPro"].value;
    let xc=  document.forms["addnwform"]["ProdSaPi"].value;
    let xd=  document.forms["addnwform"]["ProQuan"].value;
    let obj=""
    

    let selRadio= document.querySelector('input[name="optradio"]:checked').value
    //ipcRenderer.send('addnewchanel',selRadio)

    if(document.getElementById('r4').checked){
      trash=  document.getElementById('othretype').value
      obj={
        Pname:x,
        PT:trash,
        PoPr:xb,
        PSPi:xc,
        PQ:xd
    }
    }else{
        obj={
            Pname:x,
            PT:selRadio,
            PoPr:xb,
            PSPi:xc,
            PQ:xd
        }

    }
    console.log(trash +" testing this shit")
  


  
    console.log("Trash + + + +  + ")
    ipcRenderer.send('addnewchanel',obj)

    console.log(obj)

    location.reload()

    


}
function ifother() {
 
    if (document.getElementById('r4').checked) {
     
        document.getElementById('ifYes').style.display = 'block';
        document.getElementById('ifYes').innerHTML = ` <input id="othretype" name="othretype" type="text" class="form-control"
        placeholder="Type in Case other then above" required="required">`;

        
    }

    else {
        
        document.getElementById('ifYes').innerHTML = ``;
        document.getElementById('ifYes').style.display = 'none';
    }
}