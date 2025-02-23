# Read Me Guide For Investify-v2
> Investify-v2 is a full stack stock brooking web application developed and designed for beginners to learn to invest and trade whilst not having the risk of loosing all their capital. The application has a self contained
environment in the form of ISE - Investify Stock Exchange, i.e The stock prices in the web application (or more specifically in the Investify Stock Exchange) can only be afffected by the users trading in the application.

## Running the development server : investify-v2:
To start the development server fork the repository and clone the fork in you local storage, then, in the terminal:<br>
*Navigate to investify-frontend*
**Run Command:** *npm install*<br>
> The Node Package Manager Will Start To Install All The Nescessary Packages For Running The Development Server.<br>

Once, the packages are installed:<br>
**Run Command:** *npm start*<br>
> The Development Server Will Start Running and Redirect To http://localhost:3000

## Running the production server : investify-v2:
> NOTE: To run the production server you local machine must have MongoDB, Nodemailer Application Pass, and MySQL preinstalled.<br>

To Run The Production Server:<br>
*Navigate to investify-frontend*<br>
**Run Command:** *npm run build*<br>
> This command will launch a build reference for nodeJS to post as frontend<br>

*Navigate to investify-backend*<br>
**Run Command:** *npm install*<br>

***Set up the environment variables in the .env file and we are good to go!:***<br>
```
1.PORT
2.SECRET_KEY
3.MAIL_PASS
4.AUTH_PASS_API_KEY
5.JWT_SECRET
6.MYSQL_PASSWORD
7.MSQL_DATABASE
8.MAIL_ID
```
<br>
**Run Command:** *node app.js*<br>
Navigate To http://localhost:5000 to check the production build
