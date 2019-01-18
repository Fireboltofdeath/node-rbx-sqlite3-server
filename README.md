# node-rbx-sqlite3-server
This is meant for users who already know how to use Node.JS;
[Roblox Api](#roblox-api);

# HOW TO USE
This is made to be used on Glitch or your own VPS. I highly recommending investing in your own VPS, however it is up to you.

# Glitch Tutorial
### Creating an account

To create an account, visit the [glitch website](https://glitch.com/) and in the top right, click Sign In. I recommend signing in through a github account, however you can choose any of the listed options.

### Creating a new project

After you create an account, or login you must now create a new project. Click [here](https://glitch.com/edit/#!/remix/hello-express) to create a new express project.
Before you setup anything, you'll want to goto the top left of the website and select the dropdown, which will have a random name next to it. You may change the name of your project, and the description. You'll also want to click the lock icon, which will make your repo private so no one can see your private keys. If you would like to keep the project public you may use the (KEY).env file which will not show to anyone except editors.

### Setting up your project

You'll want to replace the files in your glitch project with the files in this repo's [/node-js](https://github.com/Fireboltofdeath/node-rbx-sqlite3-server/tree/master/node-js) directory. All files should already be there and can be replaced, but if they aren't you can click the New File button and type the name of the files.

## Configuring the project

Inside of server.js, you will see several variables above a comment, do not modify anything below unless you know what you're doing.
Configurations settings:

- **databaseFile**: This is the file where your SQLite3 data is stored. Changing this will reset all data.
- **tables**: This is the tables that you want. Tables allow you to seperate categories of information.
- **ApiToken**: This is the token you will use to access the database. I highly recommend using a password generating and storing the password in your .env file
- **tableKeyLength**: Ignore, doesn't do anything.
- **tableValueLength**: Ignore, doesn't do anything.
- **getAsyncAllowStar**: Allow you to get all data from a table by specifying the key as "*"; If a key is a "*" you will not be able to access it with this option on.

# Roblox Api

The roblox API is located in the [/roblox](https://github.com/Fireboltofdeath/node-rbx-sqlite3-server/tree/master/roblox) subdirectory in this repo.
Copy the source of sql.lua into a new ModuleScript in roblox studio. After doing so, you can require the module and it'll return a few configuration options.
- **ApiUrl**: Set this to the url of your glitch (or website) without a trailing slash. EX: https://example.fireboltofdeath.tk
- **Token**: Set this to the token you set inside of your server.js

###### Roblox Module Callback
if Success: Callback(boolean Success(true), table ServerResponse)

if Failure: Callback(boolean Success(false), string errorMessage, table ServerResponse)

##### ServerResponse table
{

  Success: boolean,
  
  (if not success) Message: string Error Message,
  
  (postAsync) Changes: int
  
  (deleteAsync) KeyDeleted: boolean
  
  (getAsync) ValueExists: boolean
  
  (getAsync) Value: string or null
  
}

## Documentation



##### sql:GetAsync(string Table, string Key, function Callback)
Get a value from the database.

Example: sql:GetAsync("table1", "ROBLOX", function(Success, Value, Response) if (Success) then (Value is the value from key or null if it doesn't exist) end end)

##### sql:PostAsync(string Table, string Key, string Value \[, function Callback]);
This sets (or creates) a value in the database.

Example: sql:PostAsync("table1", "ROBLOX", 'Some Information About Roblox');

##### sql:DeleteAsync(string Table, string Key \[, function Callback]);
This deletes a value in the database.

Example: sql:DeleteAsync("table1", "ROBLOX")
