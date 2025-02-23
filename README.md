# Investify

## A Self-Contained Stock Exchange Built for Risk-Free Paper Trading

---

# **ReadMe Guide for Investify-v2**

Investify-v2 is a full-stack stock broking web application designed for **beginners** who want to **learn investing and trading** without the risk of losing their capital. The application provides a **risk-free environment** where users can simulate real-world trading strategies and gain hands-on experience.

## **Investify Stock Exchange (ISE)**
Investify features its own **self-contained stock exchange (ISE - Investify Stock Exchange)**. This means that the stock prices in Investify **do not depend on real-world market conditions** but are instead affected by the trading activity of users within the application.

Users can perform trades, track their portfolio, and analyze market trends within this controlled environment, making it a great tool for **educational purposes** and **strategy testing**.

---

## **Installation Requirements**
Before setting up the application, ensure that the following dependencies are installed on your system:

1. **Install NodeJS** - Required for running the backend and frontend.
2. **Install MongoDB** - Used as the database for storing trading data.
3. **Install MySQL** - Required for structured database storage.

---

## **Running the Development Server: Investify-v2**
To start the development server, follow these steps:

1. **Fork the Repository:**
   - Go to the official Investify repository and fork it.

2. **Clone the Fork:**
   - Open a terminal and run the following command to clone your forked repository to your local system:
     ```sh
     git clone https://github.com/YOUR_GITHUB_USERNAME/investify-v2.git
     ```

3. **Navigate to the Backend Directory:**
   - Change your working directory to `investify-backend` by running:
     ```sh
     cd investify-backend
     ```

4. **Install Backend Dependencies:**
   - Run the following command to install all backend dependencies:
     ```sh
     npm install
     ```

5. **Navigate to the Frontend Directory:**
   - Change to the frontend directory:
     ```sh
     cd investify-frontend
     ```

6. **Install Frontend Dependencies:**
   - Run the following command to install all frontend dependencies:
     ```sh
     npm install
     ```

7. **Start the Development Server:**
   - Once the installation is complete, start the development server using:
     ```sh
     npm start
     ```
   - The development server will start and will be available at:
     ```sh
     http://localhost:3000
     ```
   - Now, you can open the web application in your browser and start testing its features.

---

## **Running the Production Server: Investify-v2**
### **Prerequisites:**
Before running the production server, make sure your local machine has the following installed:
- **MongoDB** (for database management)
- **Nodemailer Application Password** (for email services)
- **MySQL** (for structured database storage)

### **Steps to Run the Production Server:**

1. **Navigate to the Frontend Directory:**
   - Open a terminal and move to the frontend directory:
     ```sh
     cd investify-frontend
     ```

2. **Build the Production Version:**
   - Run the following command to generate an optimized build for deployment:
     ```sh
     npm run build
     ```
   - This will create a production-ready build that Node.js can use as the frontend reference.

3. **Navigate to the Backend Directory:**
   - Change to the backend directory:
     ```sh
     cd investify-backend
     ```

4. **Install Backend Dependencies:**
   - Run the following command to install all backend dependencies:
     ```sh
     npm install
     ```

5. **Set Up Environment Variables:**
   - Create a `.env` file in the `investify-backend` directory and define the required environment variables:
     ```sh
     PORT=5000
     SECRET_KEY=your_secret_key
     MAIL_PASS=your_mail_password
     AUTH_PASS_API_KEY=your_auth_key
     JWT_SECRET=your_jwt_secret
     MYSQL_PASSWORD=your_mysql_password
     MYSQL_DATABASE=your_mysql_database
     MAIL_ID=your_email_address
     ```

6. **Start the Production Server:**
   - Run the following command to start the backend:
     ```sh
     node app.js
     ```
   - The backend server will start and will be accessible at:
     ```sh
     http://localhost:5000
     ```
   - Now, the production build is ready to use.

---

## **Database Table Creation Functions**
The following functions create necessary tables for Investify:

### **Create Orders Table**
```js
function createTableOrders(tableName){
    const query = `Create table ${tableName} (buy_or_sell varchar(4), shareName varchar(25), price decimal(8,2), qty int, userID varchar(16), date_of_order date)`;
    connection.query(query, function(err,result){
        if (err){
            throw err;
        }
        console.log("1 Result Inserted");
    });
}
```

### **Create Matched Orders Table**
```js
function createMatchedTable(tableName){
    const query = `Create table ${tableName} (buyID varchar(16), sellID varchar(16), price decimal(8,2), qty int, date_of_order date)`;
    connection.query(query, function(err, result){
        if (err) throw err;
        console.log("Success");
    });
}
```

### **Create Price Table**
```js
function createPriceTable(tableName){
    const query = `Create table ${tableName} (price decimal(8,2), shareName varchar(25), date_of_record date,time_of_record time)`;
    connection.query(query, function(err,result){
        if (err) throw err;
        console.log("Success");
    });
}
```

Run these functions with the following parameters:
```js
createTableOrders("orders");
createMatchedTable("matched_orders");
createPriceTable("price_table");
```

---

## **Navigating the Application**
- **Frontend URL (Development Mode):** `http://localhost:3000`
- **Backend API (Production Mode):** `http://localhost:5000`
- **Investify Stock Exchange (ISE) Simulation:** Built-in trading environment managed by user interactions

---

## **License**
Investify is an open-source project licensed under the **MIT License**. You are free to use, modify, and distribute it with attribution.

---

### 🚀 Happy Trading on Investify! 🚀

