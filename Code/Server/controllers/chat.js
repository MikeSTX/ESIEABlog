/* ---------------------------------------------------------

	-----------------
	NODE JS
	----------------

---------------------------------------------------------- */

/* Install node's module for mongoDB
-------------------------------------------- */
var mongoose = require('mongoose');


/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Fetch all conversations of the user in the mongo DB

-----------------------------------------------------------*/
exports.displayConversations = function(request, result)
{
  console.log("> Get all conversation of the user in the mondo DB");

  // Recover our database
  // -----------------------------
  var database = request.database;

  // Get our collections 'articlesCollection'
  // ------------------------------------------------
  console.log(" > Get collection conversationCollection");
  var conversationCollection = database.get('conversationCollection');

  // Get all articles & all informations in the articles
  // ----------------------------------------------------------------
  console.log(" > Fetch all conversation of the user");
  var response = conversationCollection.find(
    {
      $or: [
        {user1: request.body.currentUser},
        {user2: request.body.currentUser}
      ]
    }, function(errorQuery, document)
      {
        if (!errorQuery)
        {
          console.log("   > Fetch all conversations - SUCCES");
          result.send(document).end("Fetch all conversations - SUCCES")
        }
        else
        {
          console.warn("   > Fetch all conversations - FAILED");
          result.end("Fetch all conversations - FAILED")
        }
      }
    );

}




/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Fetch all dialogs of the user in the mongo DB

-----------------------------------------------------------*/
exports.displayDialogs = function(request, result)
{
  console.log("> Get all dialogs of the user in the mondo DB");

  // Recover our database
  // -----------------------------
  var database = request.database;

  // Get our collections 'articlesCollection'
  // ------------------------------------------------
  console.log(" > Get collection dialogCollection");
  var dialogCollection = database.get('dialogCollection');

  // Get all articles & all informations in the articles
  // ----------------------------------------------------------------
  console.log(" > Fetch all dialog of the user");
  var response = dialogCollection.find(
    {
      $or: [
        {sender: request.body.currentUser},
        {recipient: request.body.currentUser}
      ]
    }, function(errorQuery, document)
      {
        if (!errorQuery)
        {
          console.log("   > Fetch all dialog - SUCCES");
          result.send(document).end("Fetch all dialog - SUCCES")
        }
        else
        {
          console.warn("   > Fetch all dialog - FAILED");
          result.end("Fetch all dialog - FAILED")
        }
      }
    );

};


/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Delete a message in mongo DB

-----------------------------------------------------------*/
exports.deleteMessage = function(request, result)
{
  console.log("> Delete the message");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection dialogCollection");
  var dialogCollection = database.get('dialogCollection');

  // Set the request
  // --------------------------
  dialogCollection.remove(
    {_id: request.body.idMessage}
  )

  console.log(" > Send update information");
  dialogCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )
}



/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send a message by saving it in the mongo DB

-----------------------------------------------------------*/
exports.checkExistanceRecipient = function(request, result)
{
  console.log("> Check existance of the recipient");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection usersCollection");
  var usersCollection = database.get('usersCollection');

  usersCollection.find(
    {
      Pseudo: request.body.recipient
    }, function(errorFind, document)
        {
            result.send(document);
        }
  )
};


exports.checkExistanceConversation = function(request, result)
{
  console.log("> Send a new message");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection conversationCollection");
  var conversationCollection = database.get('conversationCollection');

  // Check if the conversation with the recipient already exist
  // --------------------------------------------------------------------
  console.log(" > Check existance of the conversation");
  var conversationExist = conversationCollection.find(
    {
      $or:
      [
        {
          $and:
          [
            {user1: request.body.sender},
            {user2: request.body.recipient}
          ]
        },
        {
          $and:
          [
            {user1: request.body.recipient},
            {user2: request.body.sender}
          ]
        }
      ]
    }, function(errorQuery, document)
      {
        if (!errorQuery)
        {
          console.log("   > Check existance of conversation - SUCCES");
          result.send(document).end("Check existance of conversation - SUCCES");
        }
        else
        {
          console.warn("   > Check existance of conversation - FAILED");
          result.end("Check existance of conversation - FAILED")
        }
      }
    );

};


exports.createConversation = function(request, result)
{
  console.log("> Create the new conversation");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection conversationCollection");
  var conversationCollection = database.get('conversationCollection');

  // Create the object "newMessage"
  // ------------------------------------
  console.log(" > Recover Object new conversation");
  var newConversation =
    {
      "user1" : request.body.sender,
      "user2" : request.body.recipient
    };

  // Submit data to the database
  // ---------------------------------------------------------
  console.log(" > Let's create it");
  conversationCollection.insert(
      newConversation, function(errorInsert, document)
      {
        if(!errorInsert)
        {
          console.log("   > Create new conversation - SUCCES");
          result.send(document).end("Create new conversation - SUCCES");
        }
        else
        {
          console.log("   > Create new conversation - FAILED");
          result.end("Create new conversation - FAILED");
        }
      }
  );
};



exports.sendNewMessage = function(request, result)
{
  console.log("> Let's send the message");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection dialogCollection");
  var dialogCollection = database.get('dialogCollection');

  // Create the object "newMessage"
  // ------------------------------------
  console.log(" > Recover Object new message");
  var newMessage = {
    "idConversation": request.body.idConversation,
    "sender" : request.body.sender,
    "recipient" : request.body.recipient,
    "message" : request.body.message,
    "date": Date.now()
  }

  // Submit data to the database
  // ---------------------------------------------------------
  console.log(" > Insert new Message");
  dialogCollection.insert(
      newMessage, function(errorInsert, document)
      {
        if(!errorInsert)
        {
          console.log("   > Insert of new message - SUCCES");
        }
        else
        {
          console.log("   > Insert of new message - FAILED");
        }
      }
  );

  console.log(" > Send update information");
  dialogCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )

};




exports.answerMessage = function(request, result)
{
  console.log("> Let's answer the message");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection dialogCollection");
  var dialogCollection = database.get('dialogCollection');

  // Create the object "newMessage"
  // ------------------------------------
  console.log(" > Recover Object new message");
  var newMessage = {
    "idConversation": request.body.idConversation,
    "sender" : request.body.sender,
    "recipient" : request.body.recipient,
    "message" : request.body.message,
    "date": Date.now()
  }

  // Submit data to the database
  // ---------------------------------------------------------
  console.log(" > Insert new Message");
  dialogCollection.insert(
      newMessage, function(errorInsert, document)
      {
        if(!errorInsert)
        {
          console.log("   > Insert of new message - SUCCES");
        }
        else
        {
          console.log("   > Insert of new message - FAILED");
        }
      }
  );


  console.log(" > Send update information");
  dialogCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )
}




exports.getListUsers = function(request, result)
{
  console.log("> Get the user list");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection usersCollection");
  var usersCollection = database.get('usersCollection');

  usersCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )
};
