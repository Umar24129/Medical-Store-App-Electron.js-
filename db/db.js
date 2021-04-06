const mongodb = require("mongodb")

let url = 'mongodb://127.0.0.1:27017/'

let db = null
let x = false
let idsold = ""
mongodb.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {

        if (error !== null) {
            console.log("there are some rotten potatoes", error)
            process.exit(1)

        }
        console.log("Connected to the db")

        db = client.db("tOfinaldb")


    })


async function reginsusr(user) {
    console.log(user.name + "asdad")
    const usr = await db.collection("documents").find({ idunq: user.idunq }).toArray()
    if (usr.length >= 1) return { message: "User ID already in use" }
    else {
        await db.collection("documents").insertOne(user)
        return { message: "User Added to Database" }

    }



}

async function getaddlog(nid, npsd) {
    console.log(typeof (nid) + " unique id")
    console.log(typeof (npsd) + " pAsd")


    let query = { $and: [{ idunq: nid }, { idpassd: npsd }] }
    let result = await db.collection('documents').find(query).toArray()

    if (result.error != null) return ({ message: "unable to find user" })
    else if (result.length === 0) return ({ message: "Wrond ID or Password" })

    else {
        let user = {
            time: Date.now(),
            useerIdd: nid
        }
        await db.collection("userLoginLog").insertOne(user)


        return ({ ok: 1 })
    }
}


async function getallusr(user) {

    console.log(user + "asdad")
    await db.collection("itemdb").createIndex({ Pname: "text" })   //searching with keyword in a name
    const usr = await db.collection("itemdb").find({ $text: { $search: user.name } }).toArray()
    if (usr.length >= 1) {
        console.log(JSON.stringify(usr[0]))
        return usr
    }
    else {

        return { message: "none found " }

    }

}
async function regitemsNw(user) {
    console.log(user.PT + "asdad")

    const usr = await db.collection("itemdb").find({ itmid: user.itmid }).toArray()
    if (usr.length >= 1) return { message: "Medicine already in database" }
    else {
        await db.collection("itemdb").insertOne(user)
        return { message: "Medicine added in database" }

    }



}

async function getallitems() {
    const usr = await db.collection("itemdb").find({}).toArray()
    if (usr.length >= 1) {
        console.log(JSON.stringify(usr[0]))
        return usr
    }
    else {

        return { message: "none found " }

    }

}

/////////////Below FUnction for updating////////////

async function updateOriginal(id, originalP) {


    console.log(id + " test in db")

    let result = await db.collection('itemdb').updateOne(

        { itmid: id },
        {
            $set: { itmOriPri: originalP },
            $currentDate: { lastModified: true }
        }
    )
    return result


}
async function updateSale(id, SalelP) {



    let result = await db.collection('itemdb').updateOne(
        { itmid: id },
        {
            $set: { itmSalPri: SalelP },
            $currentDate: { lastModified: true }
        }
    )
    return result



}
async function updateQuant(id, quantUp) {
    let result = await db.collection('itemdb').updateOne(
        { itmid: id },
        {
            $set: { itmQuant: quantUp },
            $currentDate: { lastModified: true }
        }
    )
    return result


}
async function updateOriginalAdSale(id, salepR, orignalpor) {


    let result = await db.collection('itemdb').updateOne(
        { itmid: id },
        {
            $set: { itmOriPri: orignalpor, itmSalPri: salepR },
            $currentDate: { lastModified: true }
        }
    )
    return result


}
async function updateOrigAdQuant(id, quantlP, orignalpr) {


    let result = await db.collection('itemdb').updateOne(
        { itmid: id },
        {
            $set: { itmOriPri: orignalpr, itmQuant: quantilP },
            $currentDate: { lastModified: true }
        }
    )
    return result

}
async function updateSaleAndQuant(id, quantUp, SalelP) {
    let result = await db.collection('itemdb').updateOne(
        { itmid: id },
        {
            $set: { itmQuant: quantUp, itmSalPri: SalelP },
            $currentDate: { lastModified: true }
        }
    )
    return result

}

async function updateAllOriQuantSale(id, orignalpor, salepR, quantlP) {
    let result = await db.collection('itemdb').updateOne(
        { itmid: id },
        {
            $set: { itmOriPri: orignalpor, itmSalPri: salepR, itmQuant: quantlP },
            $currentDate: { lastModified: true }
        }
    )
    return result


}



/////////////////Above Function for updating////////////


////////////////Below functions for sell stuff//////////
async function sellgeninvoiceAndaddtoLedg(objsol) {
    idsold = objsol.itemname.toLowerCase().replace(/\s/g, "")
    //updating below
    let resultSold = await db.collection('itemdb').updateOne(
        { itmid: idsold },
        {
            $set: { itmQuant: objsol.itemqttynew },
            $currentDate: { lastModified: true }
        }
    )
    if (resultSold.result.n === 1 && resultSold.result.nModified === 1 && resultSold.result.ok === 1) {
        console.log("Updated now ")
        // dialog.showMessageBox({ message: "Updated Product QUantity"})
    } else {
        console.log("Item Sold Quantity Not updated")
        // dialog.showMessageBox({ message: "Product Quantity was Not updated due to some certain omission"})
    }



}



////////////////Above functions for sell stuff//////////


//////////////////Below For discount ///////////
async function getdiscountValue() {
    let result = await db.collection('discountColl').find({}).toArray()
    console.log(JSON.stringify(result[0]))
    return result[0]
}

async function updateDiscounVl(discminVl, discPet) {

    let result = db.collection("discountColl").updateOne({},
        {
            $set: {
                minValue: discminVl,
                discountPercentage: discPet
            }
        })

    return result

}


//////////////////below if Profit thingi //////////////

async function geninvProfitgenDbInsertData(profit) {


    //     let today = new Date();

    // let month = today.getMonth() + 1

    // console.log(typeof (month) + "  check")
    // if (month < 10) {
    //     month = "0" + month
    // }
    // let day = today.getDate();
    // if (day < 10) {
    //     day = "0" + day
    // }
    // let date = today.getFullYear() + '-' + (month) + '-' + day;

    let date = new Date()
    date = date.toISOString()
    let user = {
        datewithSeconds: new Date().getTime(),
        dateadded: date,
        profitis: profit
    }

    let result = await db.collection("profitThingi").insertOne(user)

    return result
}

async function pRofitRetrieve(datestart, dateend) {
    let xyz = new Date(datestart)
    xyz = xyz.toISOString()
    let zyx = new Date(dateend)
    zyx = zyx.toISOString()

    console.log(xyz)
    let result = await db.collection("profitThingi").find({
        dateadded: {
            $gte: xyz,
            $lt: zyx
        }
    }).toArray()

    return result



    // let user = {
    //     datewithSeconds: new Date().getTime(),
    //         dateadded:xyz,
    //         profitis: 16
    // }

    // //2020-04-28T22:01:38.403+00:00
    //  db.collection("profitThingi").insertOne(user)



}

module.exports = {

    reginsusr,
    getaddlog,
    getallusr,
    regitemsNw,
    getallitems,
    updateAllOriQuantSale,
    updateOrigAdQuant,
    updateOriginal,
    updateOriginalAdSale,
    updateQuant,
    updateSale,
    updateSaleAndQuant,
    sellgeninvoiceAndaddtoLedg,
    getdiscountValue,
    updateDiscounVl,
    geninvProfitgenDbInsertData,
    pRofitRetrieve
}
