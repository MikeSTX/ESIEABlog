/* ---------------------------------------------------------

	-----------------
	NODE JS
	----------------

---------------------------------------------------------- */

/* Install node's module for mongoDB
-------------------------------------------- */
var mongoose = require('mongoose');



exports.displayComments = function(request, result)
{

  console.log("> Get all comments in the mondo DB");

  // Recover our database
  // -----------------------------
  var database = request.database;

  // Get our collections 'commentsCollection'
  // ------------------------------------------------
  console.log(" > Get collection commentsCollection");
  var commentsCollection = database.get('commentsCollection');

  // Get all comments & all informations in the articles
  // ----------------------------------------------------------------
  console.log(" > Fetch all comments");
  var response = commentsCollection.find(null,
    function(errorQuery, document)
    {
      if (!errorQuery)
      {
        console.log("   > Fetch all comments - SUCCES");
        result.send(document).end("Fetch all comments - SUCCES")
      }
      else
      {
        console.warn("   > Fetch all comments - FAILED");
        result.end("Fetch all comments - FAILED")
      }
    }
  );

};


/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Add new comment according to the article

-----------------------------------------------------------*/
exports.addnewComment = function(request, result)
{
  console.log("> Add a new comment");


  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'commentsCollection'
  // --------------------------------
  console.log(" > Creation/Get collection commentsCollection");
  console.log(request.body);
  console.log(request.body.refArticle);
  var commentsCollection = database.get('commentsCollection');


  // Create the object "newComments"
  // ------------------------------------
  console.log(" > Recover Object new Comment");
  var newComment = {
    "refArticle": request.body.refArticle,
    "title" : request.body.title,
    "comment" : request.body.comment,
    "author" : request.body.author,
    "date": Date.now(),
  }

  // Submit data to the database
  // ---------------------------------------------------------
  console.log(" > Insert new Comment");
  commentsCollection.insert(
      newComment, function(errorInsert, document)
      {
        if(!errorInsert)
        {
          console.log("   > Insert of new comment - SUCCES");
          result.send(document).end("Insert of new comment - SUCCES");
        }
        else
        {
          console.log("   > Insert of new comment - FAILED");
          result.end("Insert of new comment - FAILED");
        }
      }
  );
}
