import mysql from 'mysql2';
import { allStocksToArray } from './searchIntoUser.js';
import getOrderDate from './calculateOrderDate.js';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dairymil1@',
    database: 'stocks'
});

connection.connect((err)=>{
    if (err){
        // console.log('Connection Not Sucessfull');
        return;
    }
    console.log("Connected to MySQL");
})

function createTableOrders(tableName){
    const query = `Create table ${tableName} (buy_or_sell varchar(4), shareName varchar(25), price decimal(8,2), qty int, userID varchar(16), date_of_order date)`;
    connection.query(query, function(err,result){
        if (err){
            throw err;
        }
        // console.log(result);
        console.log("1 Result Inserted");
    })
}

function createMatchedTable(tableName){
    const query = `Create table ${tableName} (buyID varchar(16), sellID varchar(16), price decimal(8,2), qty int, date_of_order date)`;
    connection.query(query, function(err, result){
        if (err) throw err;
        // console.log(result);
        console.log("Success");
    })
}

function createPriceTable(tableName){
    const query = `Create table ${tableName} (price decimal(8,2), shareName varchar(25), date_of_record date,time_of_record time)`;
    connection.query(query, function(err,result){
        if (err) throw err;
        // console.log(result);
        console.log("Sucess");
    })
}

export async function addOrderIntoDatabase(buyOrSell, shareName, price, qty, userID, date_of_order) {
    const query = `INSERT INTO orders (buy_or_sell, shareName, price, qty, userID, date_of_order) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [buyOrSell, shareName, price, qty, userID, date_of_order];
    connection.query(query, values, function(err, result) {
        if (err) throw err;
        // console.log(result);
        console.log("1 Row Inserted");
    });
}

export async function addMatchedOrders({ buyID, sellID, price, qty, shareName, date_of_orders }) {
    const query = `INSERT INTO matched_orders (buyID, sellID, price, qty, shareName, date_of_order) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [buyID, sellID, price, qty, shareName, date_of_orders];
    try {
        const [result] = await connection.promise().query(query, values);
        console.log("1 Row Inserted:", result.insertId);
        return result;
    } catch (err) {
        console.error("Error inserting matched order:", err);
        throw err;
    }
}


export async function stockPriceUpdateMain(){
    let arrayI = [];
    const main = await allStocksToArray();
    arrayI.push(main);
    const query = "INSERT INTO price_table (price, shareName, date_of_record, time_of_record) VALUES ?";
    const values = arrayI;
    connection.query(query, values,function (err,result){
        if (err) throw err;
        // console.log(result);
        // console.log('38 rows inserted');
    });
}

export async function getGraphData(shareName) {
    const today = getOrderDate();
    const query = `SELECT price FROM price_table WHERE date_of_record = "${today}" AND shareName = "${shareName}" AND time_of_record >= "00:00:00"`;
    return new Promise((resolve, reject) => {
        connection.query(query, function(err, result) {
            if (err) {
                reject(err);
                return;
            }
            const prices = result.map(row => row.price);
            resolve(prices);
        });
    });
}

export async function addToWatchList(userID, shareName, list_name){
    const today = getOrderDate();
    const escapedListName = list_name.replace(/'/g, "''");
    const query = `Insert into watchlist (userID, shareName, list_name, add_date) values ("${userID}", "${shareName}", "${escapedListName}", "${today}")`;
    connection.query(query, function(err,result){
        if (err) throw err;
        // console.log("Added to watchlist");
    })
}

export async function addAlert(shareName, userID, price){
    try{
        const today = getOrderDate();
        const query = `Insert into alerts (shareName, userID, price, alert_set_date, status) values ("${shareName}","${userID}",${price},"${today}","pending")`;
        connection.query(query, function(err,result){
            if (err) throw err;
            console.log(result);
        })
    }catch(err){
        console.log(err);
    }
}

export async function alertCheck(shareName,price){
    const query = `Select price from alerts where alerts.shareName="${shareName}" and status="pending" and price>=${price}`;
    return new Promise((resolve, reject) => {
        connection.query(query, async function (err,result){
            if (err){
                reject(err);
                return;
            }
            if (result.length > 0){
                try{
                    await updatePendingAlerts(shareName,price);
                }catch(err){
                    console.log(err);
                }
                resolve(true);
            }
            if (result.length == 0){
                resolve(false);
            }
        })
    })
}

export async function updatePendingAlerts(shareName, price){
    const query = `Update alerts set alerts.status="completed" where alerts.shareName="${shareName}" and status="pending" and price>=${price}`;
    connection.query(query, function (err,result){
        if (err) throw err;
        console.log(result);
        console.log("Pending Alerts Updated!");
    })
}

export async function getUserInvestments(userID) {
    const query = `SELECT price, shareName, qty FROM matched_orders WHERE matched_orders.buyID="${userID}"`;
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            const shareMap = new Map();
            result.forEach(({ price, shareName, qty }) => {
                if (!shareMap.has(shareName)) {
                    shareMap.set(shareName, { totalValue: 0, totalShares: 0 });
                }
                const shareData = shareMap.get(shareName);
                shareData.totalValue += price * qty;
                shareData.totalShares += qty;
                shareMap.set(shareName, shareData);
            });
            const finalArray = Array.from(shareMap.entries()).map(([shareName, { totalValue, totalShares }]) => ({
                shareName,
                totalValue,
                avgPrice: totalValue / totalShares,
            }));
            resolve(finalArray);
        });
    });
}

export async function getUserTotalInvestment(userID) {
    const userInvestments = await getUserInvestments(userID);
    const totalInvestment = userInvestments.reduce((sum, { totalValue }) => sum + totalValue, 0);
    return totalInvestment;
}

export async function getAllAlerts(userID) {
    const query = `SELECT * FROM alerts WHERE alerts.userID = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [userID], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(Array.isArray(result) ? result : []);
            }
        });
    });
}

export async function getAllPendingAlerts(userID){
    const query = `SELECT * FROM alerts WHERE alerts.status = "pending" AND alerts.userID = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [userID], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(Array.isArray(result) ? result : []);
            }
        });
    });
}

export async function getAllCompletedAlerts(userID){
    const query = `SELECT * FROM alerts WHERE alerts.status = "completed" AND alerts.userID = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [userID], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(Array.isArray(result) ? result : []);
            }
        });
    });
}

// console.log(await alertCheck("OLAELEC",100.53));
// console.log(await getAllCompletedAlerts("T3owCrcw3BCGp165"));