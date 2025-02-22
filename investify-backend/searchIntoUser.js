import mongoose from "mongoose";
import dotenv from "dotenv";
// import getOrderDate, { getCurrentMySQLTime } from "./calculateOrderDate.js";
dotenv.config();
const mongoURI = process.env.MONGO_URI;
mongoose.connect("mongodb://localhost:27017/Investify")
.then(()=>{
  console.log("Connection Succeded");
}).catch((err)=>{
  console.log(err);
})

export async function findUser(email){
    const Database = mongoose.connection;
    const collection = Database.collection('users');
    const user = await collection.findOne({userId : email});
    if (user){
      return user;
    }else{
      return false;
    }
}

export async function findandUpdateUserId(userId,amount){
  const Database = mongoose.connection;
  const collection = Database.collection('users');
  const user = await collection.findOneAndUpdate({uuID : userId},{$set:{amount:amount}});
  if (user) return true;
  return false;
}


export async function getUpperCircuit(shareName){
  const Database = mongoose.connection;
  const collection = Database.collection('Stocks');
  const uppercirc = await collection.findOne({CODE:shareName});
  if (uppercirc){
    return uppercirc.Upper_Circuit;
  }else{
    return false;
  }
}

export async function getLowerCircuit(shareName){
  const Database = mongoose.connection;
  const collection = Database.collection('Stocks');
  const lowercirc = await collection.findOne({CODE:shareName});
  if (lowercirc){
    return lowercirc.Lower_Circuit;
  }else{
    return false;
  }
}

export async function getShareDetails(shareName){
  const Database = mongoose.connection;
  const collection = Database.collection('Stocks');
  const data = await collection.findOne({CODE:shareName});
  if (data){
    return data;
  }else{
    return false;
  }
}

export async function updateIntoMongoDB(shareName, price, change){
  const Database = mongoose.connection;
  const collection = Database.collection('Stocks');
  await collection.findOneAndUpdate({CODE:shareName},{$set:{Price:price, Change:change}});
}

export async function fetchChangefromDB(shareName){
  const Database = mongoose.connection;
  const collection = Database.collection('Stocks');
  const change = await collection.findOne({CODE:shareName});
  return change.Change;
}

export async function allStocksToArray(){
  try {
      let arr = [];
      const Database = mongoose.connection;
      const StockData = Database.collection('Stocks');
      const stocks = await StockData.find();
      const documents = await stocks.toArray();
      const date = getOrderDate();
      const time = getCurrentMySQLTime();
      documents.forEach((i)=>{
        let newArr = [];
        newArr.push(i.Price);
        newArr.push(i.CODE);
        newArr.push(date);
        newArr.push(time);
        arr.push(newArr);
      })
      return arr;
    } catch (err) {
      console.log(err);
    }
}

export async function addUserSharesIntoMongoDB(userID,shareName,noOfShares) {
  const database = mongoose.connection;
  const collection = database.collection('users');
  try {
    // const result = await collection.findOneAndUpdate({ uuID: userID },{ $push: { sharesBought: { shareName, noOfShares } } },{ new: true } );
    const result = await collection.findOne({uuID:userID});
    if (result) {
      console.log(result.sharesBought);
      let alreadyAdded = 0;
      for (let i=0; i<result.sharesBought.length; i++){
        if(result.sharesBought[i].shareName == shareName){
          result.sharesBought[i].noOfShares = parseInt(noOfShares)+parseInt(result.sharesBought[i].noOfShares);
          alreadyAdded = 1;
        }
      }
      if (alreadyAdded == 0){
        result.sharesBought.push({shareName,noOfShares});
      }
      console.log(result.sharesBought);
      try{
        await collection.updateOne({uuID:userID},{$set:{sharesBought:result.sharesBought}});
      }catch(err){
        console.log(err);
      }
    } else {
      console.log("User Not Found");
    }
  } catch (err) {
    console.error("Error while adding shares:", err);
  }
}

export async function isShareAvailable(userID, shareName, qty) {
  const Database = mongoose.connection;
  const collection = Database.collection('users');
  try {
    const result = await collection.findOne({ uuID: userID });
    if (!result || !result.sharesBought) {
      console.log("User or shares not found");
      return false;
    }
    for (let i = 0; i < result.sharesBought.length; i++) {
      const share = result.sharesBought[i];
      if (share.shareName === shareName && share.noOfShares >= qty) {
        share.noOfShares -= qty; 
        try {
          await collection.updateOne(
            { uuID: userID },
            { $set: { sharesBought: result.sharesBought } }
          );
          return true; 
        } catch (updateErr) {
          console.log("Error updating shares:", updateErr);
          return false;
        }
      }
    }
    return false; 
  } catch (err) {
    console.log("Error fetching user:", err);
    return false;
  }
}