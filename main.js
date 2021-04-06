const electron = require('electron')
const { dialog } = require("electron")
const db = require('./db/db')

// Modules
const { app, BrowserWindow, webContents, Menu, MenuItem, ipcMain } = electron
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let mainmenu = new Menu()

// let menuitems = new MenuItem({
//   label: 'electron maybe',
//   submenu: [{ label: 'devtools', role: 'toggledevtools' }, { label: '2 item', submenu: [{ label: 'subsubmenu1' }] },
//   {
//     label: '3 item', click: () => {
//       console.log("3rd item clicked")
//     }
//   }]
// })

// mainmenu.append(menuitems)

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  let primarydisplay = electron.screen.getPrimaryDisplay()



  // mainWindow = new BrowserWindow({

  //   width: primarydisplay.size.width, height: primarydisplay.size.height,
  //   webPreferences: { nodeIntegration: true },
  //   show:false
  // })

  mainWindow = new BrowserWindow({

    width: 1000, height: 800, minHeight: 800, minWidth: 900,
    webPreferences: { nodeIntegration: true },
    show: false
  })
  // mainWindow.setMenu(null)
  mainWindow.removeMenu()

  let wc = mainWindow.webContents
  mainWindow.webContents.on("did-finish-load", e => {

    // mainWindow.webContents.send('mailbox',
    //   {

    //     from: 'umar',
    //     residence: 'nowhere'


    //   })
  })



  wc.on('context-menu', (e, pararm) => {
    let selectedtext = pararm.selectionText
    wc.executeJavaScript(`alert("${selectedtext}")`)

  })

  // wc.on('before-input-event',(e,input)=>
  // {
  //   console.log(`${input.key} : ${input.type}`)  //prints input keystroke by useron keyboard.
  // })
  // wc.on('new-window',(e,url)=>
  // {
  //   console.log(url)  //so we got our url through this way of doing it.
  // })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  //mainWindow.loadURL("https://www.google.com")
  // Open DevTools - Remove for PRODUCTION!
mainWindow.webContents.openDevTools();
  mainWindow.on('ready-to-show', mainWindow.show)

  // Menu.setApplicationMenu(mainmenu)  //telling electron to use the menu which we defined
  // // Listen for window being closed
  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })
}

ipcMain.on('loginchanel', (e, args) => {

  //   let user ={
  //     id: '24129'
  //   }
  //   console.log(user.id)
  //   db.inserst(user).then((result) => {
  //     if (result.error) {
  //         console.log("error while writing")
  //     } else {
  //         console.log(result)
  //     }
  // }).catch((error) => {console.log(error)})



  console.log("nothing")
  console.log(args)
  db.getaddlog(args.nunid, args.passd).then((result) => {


    if (result < 1) {
      dialog.showMessageBox({ message: "DataBase Error" })
    }
    else if (result.message) {


      dialog.showMessageBox({ message: result.message })
      // e.sender.send("loginresponsechanel", result)
    } else {

      console.log(result)
      e.sender.send("loginresponsechanel", result)
    }

  })





})        //chanel are unique identifier to listen etc   "args is the data receieved"

ipcMain.on("registerationchanel", (e, args) => {
  let user = {
    name: args.name,
    idunq: args.idu,
    idpassd: args.passd
  }

  if (user.name === "" || user.idunq === "" || user.idpassd === "") {
    dialog.showMessageBox({ message: "Please fill up each and every slot" })

  } else {
    console.log(JSON.stringify(user) + " testing ")
    db.reginsusr(user).then((result) => {
      console.log(result)
      dialog.showMessageBox({ message: result.message })
    })
    console.log(args.name + " " + args.passd + " To register them")
  }
})

ipcMain.on("regkeyFailchanel", (e, args) => {
  dialog.showMessageBox({ message: "Wrong registeration Key" })
})

ipcMain.on("addnewchanel", (e, args) => {
  // console.log(args + " W T  F ")
  console.log(args.Pname + " " + args.PT + " " + args.PoPr + " " + args.PSPi + " " + args.PQ + "N O D E")
  let tem = {
    itmid: args.Pname.toLowerCase().replace(/\s/g, ""),
    itmname: args.Pname,
    itmType: args.PT,
    itmOriPri: args.PoPr,
    itmSalPri: args.PSPi,
    itmQuant: args.PQ

  }

  db.regitemsNw(tem).then((result) => {
    console.log(result)
    dialog.showMessageBox({ message: result.message })
  })



  // dialog.showMessageBox({ message: args.PT })
})

//////////////////////////////////test down./////////
ipcMain.on("test", (e, args) => {
  db.getallusr(args).then((result) => {

    if (!result.message) console.log(result[0] + " check")
    else dialog.showMessageBox({ message: result.message })
  })


  //dialog.showMessageBox({ message: "Wrong registeration Key" })
})

ipcMain.on("getallitems", (e, args) => {
  db.getallitems().then((result) => {

    if (!result.message) {
      console.log(result.length + " check")

      e.sender.send('getallitems', result)



    }
    else dialog.showMessageBox({ message: result.message })
  })


  //dialog.showMessageBox({ message: "Wrong registeration Key" })
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on("updatingstuff", (e, args) => {

  console.log(args.Pname + " update " + args.PoPr + " update " + args.PSPi + " update " + args.PQ + " update ") //a b c ab ac bc abc

  if (args.PoPr === "" && args.PSPi === "" && args.PQ === "") {

    console.log("All Empty is empty")
    dialog.showMessageBox({ message: "Please enter atleast 1 of those 3 fields" })

  }

  else if (args.PoPr === "" && args.PSPi === "") {

    console.log("product Original And Sale price is empty")//quantity not empty
    // db.updateQuant
    console.log("product Sale price And Quantity is empty")//Ori not empty
    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateQuant(id, args.PQ).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Product Quantity Updated to " + args.PQ })


      } else {
        console.log("Item not updated")
        dialog.showMessageBox({ message: "Product Quantity was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })



  }
  else if (args.PoPr === "" && args.PQ === "") {

    console.log("product original price And QUantity is empty") //Sale not empty

    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateSale(id, args.PSPi).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Sale Price Updated to " + args.PSPi })


      } else {
        console.log("Item not updated")
        dialog.showMessageBox({ message: "Sale Price was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })

  }
  else if (args.PSPi === "" && args.PQ === "") {

    console.log("product Sale price And Quantity is empty")//Ori not empty
    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateOriginal(id, args.PoPr).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Original Price Updated to " + args.PoPr })


      } else {

        console.log("Item not updated")
        console.log(rst.error)
        dialog.showMessageBox({ message: "Original Price was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })

  }

  else if (args.PoPr === "") {

    console.log("product original price is empty")//Sale and QUant not empty
    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateSaleAndQuant(id, args.PQ, args.PSPi).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Sale Price Updated to " + args.PSPi + " And Quantity updated to " + args.PQ })
      } else {
        console.log("Item not updated")
        dialog.showMessageBox({ message: "Sale Price And Product Quantity was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })


  }
  else if (args.PSPi === "") {

    console.log("product Sale price is empty")//Original ANd quant not empty

    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateOrigAdQuant(id, args.PQ, args.PoPr).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Original Price Updated to " + args.PoPr + " And Quantity updated to " + args.PQ })
      } else {
        console.log("Item not updated")
        dialog.showMessageBox({ message: "Original Price And Product Quantity was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })


  }
  else if (args.PQ === "") {

    console.log("product Quantity is empty")//Original And Sale not empty
    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateOriginalAdSale(id, args.PSPi, args.PoPr).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Original Price Updated to " + args.PoPr + " And Sale Price Updated to " + args.PSPi })
      } else {
        console.log("Item not updated")
        dialog.showMessageBox({ message: "Original Price And Product Quantity was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })


  } else {
    console.log("Updating Original and Sale and quantity")//none empty
    let id = args.Pname.toLowerCase().replace(/\s/g, "")
    console.log(id + " = Adding name Test")

    db.updateAllOriQuantSale(id, args.PoPr, args.PSPi, args.PQ).then((rst) => {
      if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
        console.log("Updated now ")
        dialog.showMessageBox({ message: "Original Price Updated to " + args.PoPr + ", Sale Price Updated to " + args.PSPi + " And Quantity Updated to " + args.PQ })
      } else {
        console.log("Item not updated")
        dialog.showMessageBox({ message: "Original Price And Product Quantity was Not updated due to some certain omission" })
      }
      // console.log(rst.result.n)
      // console.log(typeof(rst.result.n))
    })
  }




  // db.getallusr(args).then((result) => {

  //   if (!result.message) console.log(result[0] + " check")
  //   else dialog.showMessageBox({ message: result.message })
  // })


  //dialog.showMessageBox({ message: "Wrong registeration Key" })
})

//emptyselect
ipcMain.on("emptyselect", async (e, args) => {

  dialog.showMessageBox({ message: "Please Select an Item before proceedig" })
  //dialog.showMessageBox({ message: "Wrong registeration Key" })
})
ipcMain.on("dialogforemptyGenInvoice", async (e, args) => {

  dialog.showMessageBox({ message: "Incomplete invoice" })
})

ipcMain.on("discountgetIpc", async (e, args) => {


       db.getdiscountValue().then((result)=>{
         if(result.length!= 0){
          e.sender.send('discountgetIpc', result)
         }
         else {
          dialog.showMessageBox({ message: "Discount Value Not Added into Database" })
         }
       })

  

})
//   Bewlow is discount Updation

ipcMain.on("discntUpO", async (e, args) => {


  console.log(args)
  db.updateDiscounVl(args.discMVL,args.disPt).then((rst) => {
    if (rst.result.n === 1 && rst.result.nModified === 1 && rst.result.ok === 1) {
      console.log("Updated now ")
      dialog.showMessageBox({ message: "Discount Standards Updated "  })
    } else {
      console.log("Item not updated")
      dialog.showMessageBox({ message: "Failed to Update Discount Standards" })
    }

  })



  // dialog.showMessageBox({ message: "Incomplete invoice"})
  //  geninvoic
})

ipcMain.on("geninvoicProfitAndDecrement", async (e, args) => {


  console.log(args)
  db.sellgeninvoiceAndaddtoLedg(args).then((result) => {

  })

 
  // dialog.showMessageBox({ message: "Incomplete invoice"})
  //  geninvoic
})




/////////test above///////////

ipcMain.on("gEnInvReceipt",async(e,args)=>{
  console.log(JSON.stringify(args))
  console.log("QAH")
   let arrayLength=args.length
   let profit=(args[arrayLength-1].discAmountDue)-(args[arrayLength-1].totalAmountOfOriginalPri)
   console.log(profit+" = Profit")
 db.geninvProfitgenDbInsertData(profit).then(result=>{
   
    if (result.result.n === 1 && result.result.ok === 1) {
      console.log("Profit Added ")
     

    } else {
   
      dialog.showMessageBox({ message: "Profit not added into dataebase due to an error" })
    }
  })


})


ipcMain.on("profitRetrival",async(e,args)=>{
  console.log(JSON.stringify(args))
  console.log("QAH")
 
 db.pRofitRetrieve(args.datst,args.daten).then(result=>{
   
    if(result.length !== 0){
      e.sender.send('profitRetrival', result)
    }else {
      dialog.showMessageBox({ message: "No record found" })
    }

  })
})

///

// Electron `app` is ready
app.on('ready', () => {
  console.log(app.getPath('desktop'))

  console.log(app.getPath('music'))

  console.log(app.getPath('userData'))


  createWindow()
})







// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
debugger
// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
