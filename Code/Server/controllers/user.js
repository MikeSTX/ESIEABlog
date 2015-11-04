/* ---------------------------------------------------------

	-----------------
	NODE JS
	----------------

---------------------------------------------------------- */

/* Install node's module for mongoDB
-------------------------------------------- */
var mongoose = require('mongoose');


/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send information from the mongo DB to check if the pseudo doesn't already
  exist in the database

-----------------------------------------------------------*/
exports.checkPseudo = function(request, result)
{
  console.log("> Check pseudo existance");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'users'
  // --------------------------------
  console.log(" > Creation/Get collection usersCollection");
  var collectionUsers = database.get('usersCollection');

  console.log(" > Check Pseudo");
  collectionUsers.findOne(
    {
      Pseudo: request.body.PseudoToCheck
    }, function(errorFindPseudo, document)
      {
        if (!errorFindPseudo)
        {
          if(document == null)
          {
            console.log("   > No Pseudo");
            result.send("false");
          }
          else
          {
            console.log("   > There is a pseudo");
            result.send("true");
          }

        }
        else
        {
          console.log("Error with fonction MONGO DB - find() : ", errorFindPseudo);
          result.send("true");
        }
      }
  )

};



/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send information from the mongo DB to add a new user

-----------------------------------------------------------*/
exports.addUser = function(request, result)
{

  console.log("> Add a new user");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'users'
  // --------------------------------
  console.log(" > Creation/Get collection usersCollection");
  var collectionUsers = database.get('usersCollection');

  // Create the object "newUsers"
  // ------------------------------------
  console.log(" > Recover Object new User");
  var newUser = {
    "Firstname" : request.body.Firstname,
    "Lastname" : request.body.Lastname,
    "Pseudo" : request.body.Pseudo,
    "Email" : request.body.Email,
    "Password" : request.body.Password
  }

  // Submit data to the database
  // ---------------------------------------------------------
  console.log(" > Insert new User");
  collectionUsers.insert(
      newUser, function(errorInsert, document)
      {
        if(!errorInsert)
        {
          console.log("   > Insert of new user - SUCCES");
          result.send(document).end("Insert of new user - SUCCES");
        }
        else
        {
          console.log("   > Insert of new user - FAILED");
          result.end("Insert of new user - FAILED");
        }
      }
  );


};




/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send information from the mongo DB to connect user to his/her account if the
  inforations are correct

-----------------------------------------------------------*/
exports.connectUser = function(request, result)
{
  console.log("> Connexion user");


  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'users'
  // --------------------------------
  console.log(" > Get collection usersCollection");
  var collectionUsers = database.get('usersCollection');


  // Check if Pseudo corresponding to the password
  // ----------------------------------------------------------------
  console.log(" > Check Pseudo & password");
  collectionUsers.findOne(
    {
      Pseudo: request.body.Pseudo,
      Password: request.body.Password
    }, function(errorFindUser, document)
      {
        if (!errorFindUser)
        {
          if(document == null)
          {
            console.log("   > Connecting user FAILED - Pseudo");
            result.end("Connecting user FAILED");
          }
          else
          {
            console.log("   > connecting user SUCCES : ", document);
            result.send(document).end("Connecting user SUCCES");
          }

        }
        else
        {
          console.log("Error with fonction MONGO DB - find() : ", errorFindUser);
          result.end("Error with fonction MONGO DB - find()");
        }
      }
  )
};




/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-

	Send information from the mongo DB to remove the account of the user
-----------------------------------------------------------*/
exports.removeAccount = function(request, result)
{
  console.log("> Remove User");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'users'
  // --------------------------------
  console.log(" > Get collection usersCollection");
  var collectionUsers = database.get('usersCollection');

  // Check if Pseudo corresponding to the password
  // ----------------------------------------------------------------
  console.log(" > Let's remove th account");
  collectionUsers.remove(
    {
      Pseudo: request.body.Pseudo
    }, function(errorRemoveAccount, document)
      {
        if (!errorRemoveAccount)
        {
          if(document == null)
          {
            console.log("   > Connecting user FAILED - Pseudo");
            result.end("Remove account FAILED");
          }
          else
          {
            console.log("   > Remove account SUCCES : ", document);
            result.end("Remove account SUCCES");
          }

        }
        else
        {
          console.log("Error with function MONGO DB - remove() : ", errorRemoveAccount);
          result.end("Error with function MONGO DB - remove()");
        }
      }
  )



}
