const { ipcRenderer } = require('electron')

function startDatepick(){
    console.log(document.getElementById("startDatepickOi").value)
 }

 function endDatepick(){
    console.log(document.getElementById("endDatepickOe").value)
 }
 
async function calculateProfit(){
  let inewHTML=""
  let obj={
  datst: document.getElementById("startDatepickOi").value,
  daten: document.getElementById("endDatepickOe").value

   }
let timee= ""
    ipcRenderer.send('profitRetrival', obj)
    ipcRenderer.on("profitRetrival", (e, args) => {
              
        console.log(args)
        for(i =0 ; i < args.length ;i++){

            timee= args[i].datewithSeconds

            timee = new Date(timee)
            

                inewHTML += `  <tr>
            <th rules="groups">${i + 1}</th>
            <td id="prodname">${timee}</td>
            <td id="prodTyp">${args[i].profitis}</td>
          </tr>`
        }

        document.getElementById('profitTableShow').innerHTML = inewHTML
    })
}