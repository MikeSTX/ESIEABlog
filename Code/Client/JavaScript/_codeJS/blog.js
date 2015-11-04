/* **
  Function loading when the page's ready - JQuery & Bootstrap
  | ---------------------------------------------------------------

* **/
$(function()
{
  // Tooltip for buttons
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  $('[data-toggles = "tooltip"]').tooltip();

  // Appear action button of the right bottom menu
  //  > BTN_writeNewMessage
  // --------------------------------------------------------------------
  $("#menuRightBottom").hover(function()
  {
    $("#BTN_writeNewMessage").animate({opacity: 1.0}, 200);
  });

  $("#menuRightBottom").mouseout(function()
  {
    $("#BTN_writeNewMessage").animate({opacity: 0.0}, 200);
  });

});



/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  f() : TOGGLELEFTMENU
  ---------------------------

    Animate the toggle apparition of the left menu

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function toggleLeftMenu()
{
  // Get ID of the left menu
  // ---------------------------------------------------------------------------
  var menu_Left = document.getElementById("leftMenu");

  // Show / hide the left menu
  // ---------------------------------------------------------------------------
  if (menu_Left.style.opacity == "0")
  {
    $(function()
    {
      $("#leftMenu").animate({width: '170px', opacity: 1.0}, 200);
      $("#content").animate({width: '73%', marginLeft: '210px'}, 200);
    });
  }
  else
  {
    $(function()
    {
      $("#leftMenu").animate({width: '0px', opacity: 0.0}, 200);
      $("#content").animate({width: '87%', marginLeft: '27px'}, 200);
    });
  }
}



/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  f() : TOGGLEACCOUNTMENU
  ---------------------------

    Animate the toggle apparition of the account menu

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function toggleAccountMenu()
{
  // Get id of Account menu's elements
  // -------------------------------------------
  var arrow = document.getElementById("arrowUp");
  var accountMenu = document.getElementById("divAccount");

  // Toggle account menu
  if(accountMenu.style.display == "block")
  {
    arrow.style.display = "none";
    accountMenu.style.display = "none";
  }
  else
  {
    arrow.style.display = "block";
    accountMenu.style.display = "block";
  }

}
