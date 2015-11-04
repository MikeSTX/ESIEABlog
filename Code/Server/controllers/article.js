/* ---------------------------------------------------------

	-----------------
	NODE JS
	----------------

---------------------------------------------------------- */

/* Install node's module for mongoDB
-------------------------------------------- */
var mongoose = require('mongoose');

/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Get information from the mongo DB to display all article

-----------------------------------------------------------*/
exports.displayArticle = function(request, result)
{
  console.log("> Get all article in the mondo DB");

  // Recover our database
  // -----------------------------
  var database = request.database;

  // Get our collections 'articlesCollection'
  // ------------------------------------------------
  console.log(" > Get collection articlesCollection");
  var articlesCollection = database.get('articlesCollection');

  // Get all articles & all informations in the articles
  // ----------------------------------------------------------------
  console.log(" > Fetch all articles");
  var response = articlesCollection.find(null,
    function(errorQuery, document)
    {
      if (!errorQuery)
      {
        console.log("   > Fetch all articles - SUCCES");
        result.send(document).end("Fetch all articles - SUCCES")
      }
      else
      {
        console.warn("   > Fetch all articles - FAILED");
        result.end("Fetch all articles - FAILED")
      }
    }
  );

}



/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send information from the mongo DB to add a new article

-----------------------------------------------------------*/
exports.addNewArticle = function(request, result)
{
  console.log("> Add a new article");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection articlesCollection");
  var articlesCollection = database.get('articlesCollection');


  // Create the object "newUsers"
  // ------------------------------------
  console.log(" > Recover Object new Artciles");
  var newArticle = {
    "title" : request.body.title,
    "header" : request.body.header,
    "content" : request.body.content,
    "author" : request.body.author,
    "date": Date.now(),
    "nbThumb": 0,
    "thumbUp": 0,
    "thumbDown": 0,
  }

  // Submit data to the database
  // ---------------------------------------------------------
  console.log(" > Insert new Article");
  articlesCollection.insert(
      newArticle, function(errorInsert, document)
      {
        if(!errorInsert)
        {
          console.log("   > Insert of new article - SUCCES");
          result.send(document).end("Insert of new article - SUCCES");
        }
        else
        {
          console.log("   > Insert of new article - FAILED");
          result.end("Insert of new article - FAILED");
        }
      }
  );
};


/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send information from the mongo DB to delete the article

-----------------------------------------------------------*/
exports.deleteArticle = function(request, result)
{
  console.log("> Delete the article");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection articlesCollection");
  var articlesCollection = database.get('articlesCollection');

  // Set the request
  // --------------------------
  articlesCollection.remove(
    {_id: request.body.idArticle}
  )

  console.log(" > Send update information");
  articlesCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )

};


exports.thumbUp = function(request, result)
{

  console.log("> Thumb up an article");

  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection articlesCollection");
  var articlesCollection = database.get('articlesCollection');

  console.log(" > Add thumb ");
  articlesCollection.update(
    {_id: request.body.informationsArticle},
    {
      $inc: {
        "nbThumb": 1,
        "thumbUp": 1
      }
    }
  )

  console.log(" > Send update information");
  articlesCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )

}






exports.thumbDown = function(request, result)
{

  console.log("> Thumb down an article");


  // Recover our database
  // --------------------------
  var database = request.database;

  // Set our collections 'articlesCollection'
  // --------------------------------
  console.log(" > Creation/Get collection articlesCollection");
  var articlesCollection = database.get('articlesCollection');

  console.log(" > Minus the thumb ");
  articlesCollection.update(
    {_id: request.body.informationsArticle},
    {
      $inc:
      {
        "nbThumb": 1,
        "thumbDown": 1
      }
    }
  )

  console.log(" > Send update information");
  articlesCollection.find(
    {}, function(errorFind, document)
        {
            result.send(document);
        }
  )
}
