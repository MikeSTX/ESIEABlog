/* ---------------------------------------------------------

	-----------------
	NODE JS
	----------------

---------------------------------------------------------- */

/* Install node's module for mongoDB
-------------------------------------------- */
var mongoose = require('mongoose');



/*	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
	Send information from the mongo DB to display the page "blog.html" with all
  informations

-----------------------------------------------------------*/
exports.index = function(request, result)
{

  console.log("The server work !");
  result.end("The server work !");

};
