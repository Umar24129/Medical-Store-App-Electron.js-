
const { ipcRenderer } = require('electron')
require('events').EventEmitter.defaultMaxListeners = 150000;
let totalbill = 0
let flagofnotgenerateTotal = false
let listsize = 0
let amountpayedFlagon = false

let nameS = ""
let qttysoldS = 0
let qttynewS = 0
let priceperitemS = 0
let priceSoldonS = 0
let itemtypeS = 0
let itemsSoldAmountReceieved = 0
let allObjectArray = []
let itemOrig=0



let discountperc = 0
let discountMinval = 0
let discountCalculated = 0
ipcRenderer.send('discountgetIpc', "poof")
ipcRenderer.on("discountgetIpc", (e, args) => {

  console.log("discounttt")

  discountperc = args.discountPercentage
  discountMinval = args.minValue
  console.log(discountperc + " AND " + discountMinval)

})






//itmOriPri
document.getElementById('totalamounthead').innerHTML = 0
ipcRenderer.send('getallitems', "poof")
let tempdataselected = ""
ipcRenderer.on("getallitems", (e, args) => {

  console.log("test")
  console.log(args + "testt")




  document.getElementById('selectorthingi').innerHTML = ""
  var newHTML = "";
  for (i = 0; i < args.length; i++) {

      console.log(args[i].itmOriPri)

    newHTML += ` <option   >${args[i].itmname} || ${args[i].itmType} || ${args[i].itmSalPri} || ${args[i].itmQuant} || ${args[i].itmOriPri}  </option>
                 
           `

  }
  document.getElementById('selectorthingi').innerHTML += newHTML;

})



function showselecteditems() {
  totalbill = 0
  discountCalculated=0
  document.getElementById('addingtotable').innerHTML = ""

  let inewHTML = ""

  var brands = $('#selectorthingi option:selected');
  var selected = [];
  $(brands).each(function (index, brand) {
    selected.push([$(this).val()]);
  });

  console.log(selected);

  // console.log(selected[0][0] + " ing")
  // console.log(selected[1][0] + " test1")
  // console.log(selected[2][0] + " test2")


  //console.log(spliteditems[0])


  let spliteditems = ""
  listsize = selected.length

  for (i = 0; i < selected.length; i++) {
    let testity = selected[i][0].toString()
    spliteditems = testity.split(" || ")  //2 index is price and 3 is qtty and 4 is original price
    console.log(spliteditems[3] + "testing quty")
    if (spliteditems[3] !== "0") {
      flagofnotgenerateTotal = true

      inewHTML += `  <tr>
      <th rules="groups">${i + 1}</th>
      <td id="prodname${i}">${spliteditems[0]}</td>
      <td id="prodTyp${i}">${spliteditems[1]}</td>
      <td><input id="qtty${i}" name="amOuntrecD" type="number" min="0" max="${Number(spliteditems[3])}" step="1"
       class="form-control"
      value="1" onchange="actiontoqttychange();"  required="required" style="display: flex; flex-direction: row;"></td>
      <td id="priceperItem${i}">${spliteditems[2]}</td>
      <input id="oriIgnalPrice${i}" type="hidden" value="${spliteditems[4]}">
     
    </tr>`

      // document.getElementById("qtty"+i).value=1

      totalbill += Number(spliteditems[2]) * 1

    }


  }

  if (selected.length !== 0 && flagofnotgenerateTotal === true) {

    console.log("trash")
    if(totalbill>=discountMinval){
    discountCalculated = Number(((discountperc*totalbill)/100).toFixed(2))
  }



    console.log(totalbill + " = Total Bill")

      inewHTML += `<tr class="active">
      <th ></th>
      <td style="color: black; font-weight: bold;">Total Amount</td>
      <td>            </td>
      <td id="tbletotalamnt" style="color: black; font-weight: bold;">${Math.round(totalbill)}</td>
    </tr>

    <tr class="active">
      <th ></th>
      <td style="color: black; font-weight: bold;">Discounted Amount </td>
      <td>            </td>
      <td id="discCalcu" style="color: black; font-weight: bold;">${Math.round(discountCalculated)}</td>
    </tr>

    <tr class="active">
      <th ></th>
      <td style="color: black; font-weight: bold;">Amount Due By Customer</td>
      <td>            </td>
      <td id="AmountDue" style="color: black; font-weight: bold;"  step="0.01">${  Math.round(totalbill-discountCalculated)}</td>
    </tr>

      <tr class="active">
      <th ></th>
      <td style="color: black; font-weight: bold;">Amount Received</td>
      <td>  
      
      </td>
      <td>
      <input id="amOuntrecD" name="amOuntrecD" type="number" class="form-control"
      placeholder="Amount Received from cutomer" onchange="actiontogenpay();" min="0" step="1" required="required" style="display: flex; flex-direction: row;"> 
      
      
      
      </td>
      
      
      
      
      </tr>  
      <tr id="addingleftover" class="active">
      </tr>
      `
        //${totalbill}
        document.getElementById('totalamounthead').innerHTML = Math.round(totalbill-discountCalculated)

     
    
  } else {
    document.getElementById('totalamounthead').innerHTML = 0
  }

  document.getElementById('addingtotable').innerHTML += inewHTML

}


function actiontogenpay() {
  amountpayedFlagon = true
  document.getElementById('addingleftover').innerHTML = ""
  let inewHTML = ""
  let x = document.getElementById('amOuntrecD').value


  console.log(x + " testing am rec")







  inewHTML += `
  <th ></th>
  <td style="color: black; font-weight: bold;">Amount Payable</td>
  <td>            </td>
  <td style="color: black; font-weight: bold;">${x - Math.round(totalbill-discountCalculated)}</td>
`

  document.getElementById('addingleftover').innerHTML = inewHTML


}


function actiontoqttychange() {
  discountCalculated=0

  console.log(listsize + " Testing on qtty change")

  var x = document.getElementById("thisistableforshow").rows.length

  console.log("table length = " + x)


  console.log(document.getElementById("qtty" + 0).value)
  let retotalbill = 0
  totalbill = 0

  for (i = 0; i < x - 6; i++) {
    console.log(document.getElementById("qtty" + i).value + " aka items" + i)
    console.log(document.getElementById("priceperItem" + i).innerHTML + " NA mate price check items" + i)
    totalbill += Number(document.getElementById("qtty" + i).value) * Number(document.getElementById("priceperItem" + i).innerHTML)

  }
   
  if(totalbill>=discountMinval){
    discountCalculated = Number(Math.round((discountperc*totalbill)/100))
  }
   
  console.log("Total Bill = " + totalbill)
  document.getElementById('totalamounthead').innerHTML = Math.round(totalbill-discountCalculated)
  document.getElementById('tbletotalamnt').innerHTML =Math.round(totalbill)
  document.getElementById('AmountDue').innerHTML = Math.round(totalbill-discountCalculated)
  document.getElementById('discCalcu').innerHTML = Math.round(discountCalculated)



  if (amountpayedFlagon === true) {
    actiontogenpay()
  }


}

function geninvandadd() {

  var x = document.getElementById("thisistableforshow").rows.length
 let totaloriginalPr=0
  console.log(x)
  // let objForReceipt=""

  let totalAmountS = 0
  if (x > 6) {

    //decreasing qtty in original items below ** we will retrieve name and qtty of item
    totalAmountS = document.getElementById("tbletotalamnt")
    for (i = 0; i < x - 6; i++) {

      console.log(document.getElementById('prodname' + i).innerHTML)
      console.log(document.getElementById('qtty' + i).value)
      console.log(document.getElementById("qtty" + i).max + "Checking Max")
      //priceperItemi


      nameS = document.getElementById('prodname' + i).innerHTML
      qttysoldS = Number(document.getElementById('qtty' + i).value)
      qttynewS = Number(document.getElementById("qtty" + i).max) - qttysoldS
      priceperitemS = Number(document.getElementById("priceperItem" + i).innerHTML)
      priceSoldonS = priceperitemS * qttysoldS
      itemtypeS = document.getElementById("prodTyp" + i).innerHTML
      itemOrig= Number(document.getElementById("oriIgnalPrice"+i).value)

      // itemsSoldAmountReceieved=Number(document.getElementById("amOuntrecD").value)
      obj = {
        itemname: nameS,
        itemsoldqtty: qttysoldS,
        itemqttynew: qttynewS,
        itemsoldPerPriceS: priceperitemS,
        itemsoldonPrice: priceSoldonS,
        itemsoldType: itemtypeS
        //  itemssoldAmtReciv:itemsSoldAmountReceieved
      }

      allObjectArray.push({
        itemname: nameS,
        itemtype: itemtypeS,
        quantityselling: qttysoldS,
        PricePerItem: priceperitemS,
      })

      
      totaloriginalPr= (itemOrig*qttysoldS)+totaloriginalPr
      console.log(totaloriginalPr+ " Umar Khan 2")

      ipcRenderer.send('geninvoicProfitAndDecrement', obj)

      console.log(JSON.stringify(obj))





    }

    // let discountedAm= document.getElementById('')

    allObjectArray.push({
      totalAmount:  document.getElementById('tbletotalamnt').innerHTML,
      discOuntedAmount:document.getElementById('discCalcu').innerHTML,
      discAmountDue: document.getElementById('AmountDue').innerHTML,
      aMountReceievedFrCustom:document.getElementById('amOuntrecD').value,
      totalAmountOfOriginalPri:totaloriginalPr

    })

    console.log(JSON.stringify(allObjectArray) +  "Test of array Object")
    
      
    ipcRenderer.send('gEnInvReceipt', allObjectArray)
    //// Up left over work after discord Added////
    ///decreasing qtty in original items above

  } else {
    ipcRenderer.send('dialogforemptyGenInvoice', "nothing")
  }



}
