/* ---------------------------------------------------------

	-----------------
	NODE JS
	----------------

---------------------------------------------------------- */

// On appelle les modules Node.js dont on a besoin
//----------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var cors = require('cors');
var cookieSession = require('cookie-session');
var colorConsole = require('extended-console');
var emailJS = require('emailjs');
var mongoDB  = require('mongoose');
var monk = require('monk');





// Call modules of ESIEA Blog
// ---------------------------------------------------------
var blogController = require('./controllers/index')
var userController = require('./controllers/user')
var articleController = require('./controllers/article')
var commentController = require('./controllers/comments')
var chatController = require('./controllers/chat')



/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Début du programme

-------------------------------------------------------------------- */




// Definition of square path (public)
// -----------------------------------------------------------------------------------
var blog = express();
blog.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
blog.use(cors());



// Creation & Connection to our mongo DB
// -----------------------------------------------
var database = monk('localhost:27017/blog');

// Now, make our DB accessible everywhere
blog.use(function(request, result, next)
{
    request.database = database;
    next();
});



// Definition of main path of the intranet website
// -----------------------------------------------------------------------------

// Root of the blog
// ----------------------
blog.get('/', blogController.index); // Root page

// Root about USERS
// ----------------------
blog.post('/checkPseudo', bodyParser.json(), userController.checkPseudo); // Check if the pseudo don't already exist in the database
blog.post('/addUser', bodyParser.json(), userController.addUser);// Add a new user in the mongo DB
blog.post('/connectUser', bodyParser.json(), userController.connectUser); // Connect the user
blog.post('/removeAccount', bodyParser.json(), userController.removeAccount); // Remove the account of the user


// Root about ARTICLES
// --------------------------------
blog.get('/displayArticle', articleController.displayArticle); // Display article from the mongo DB
blog.post('/addNewArticle', bodyParser.json(), articleController.addNewArticle); // Add a new article in the mongo DB
blog.post('/deleteArticle', bodyParser.json(), articleController.deleteArticle); // Delete an Article in the DB
blog.post('/thumbUp', bodyParser.json(), articleController.thumbUp); // Thumb up the article
blog.post('/thumbDown', bodyParser.json(), articleController.thumbDown); // Thumb down the article

  // SubRoot about Comments
  // ------------------------------
  blog.get('/displayComments', commentController.displayComments); // Display comments according to their article, from the mongo DB
  blog.post('/addNewComment', bodyParser.json(), commentController.addnewComment); // add new comment to an article


// Root about CHAT
// --------------------------------
blog.post('/displayConversations', bodyParser.json(), chatController.displayConversations); // Display conversation of the user, from the mongoDB
blog.post('/displayDialogs', bodyParser.json(), chatController.displayDialogs); // Display dialogs of the user, from the mongo DB
blog.post('/checkExistanceRecipient', bodyParser.json(), chatController.checkExistanceRecipient); // Check if the recipient exist in the mongo DB
blog.post('/checkExistanceConversation', bodyParser.json(), chatController.checkExistanceConversation); // Check if a conversation already exit or not
blog.post('/createConversation', bodyParser.json(), chatController.createConversation); // Create a new conversation
blog.post('/sendNewMessage', bodyParser.json(), chatController.sendNewMessage); // Send new message to a user
blog.post('/answerMessage', bodyParser.json(), chatController.answerMessage); // Answer to a conversation
blog.post('/deleteMessage', bodyParser.json(), chatController.deleteMessage); // Delete the message
blog.get('/getListUsers', chatController.getListUsers); // Get the list of all the users



// On place le serveur sur le canal '9000'
// ----------------------------------------------------
blog.listen(8000);
module.exports = blog;
