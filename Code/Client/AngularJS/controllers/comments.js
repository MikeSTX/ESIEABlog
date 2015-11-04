blogESIEA.controller('commentCtrl', function($scope, $rootScope, $http)
{

  /* **
    > Function to display all comments according to their article
    ______________________________________________________________
  ** */
  $http.get('http://localhost:8000/displayComments').then(function(response)
  {
    var allComments = $scope.allComments = [];


    if (response.data == "Fetch all comments - FAILED")
    {
      $rootScope.ServerInformation = {
        'divView': true,
        'iconViewOK': false,
        'iconViewNOK': true,
        'iconViewInfo': false,
        'label': 'ERROR - Fetch comment in DB'
      };
    }
    else
    {

      for(cursorComment = 0; cursorComment < response.data.length; cursorComment++)
      {
        $scope.allComments.push(response.data[cursorComment]);
      }

    }
  });


  /* **
    > Function to add a new comment on an article
    ______________________________________________________________
  ** */
  $scope.addNewComment = function(idArticle)
  {
    if ($rootScope.InformationConnectUser.Pseudo != '')
    {
      authorComment = $rootScope.InformationConnectUser.Pseudo;
    }
    else
    {
      authorComment = 'Anonymous';
    }

    // Creation de l'object newComment
    // -----------------------------------------
    var newComment = {
      refArticle: idArticle,
      title: $scope.titleComment,
      comment: $scope.textComment,
      author: authorComment
    }

    $http.post('http://localhost:8000/addNewComment', newComment).then(function(response)
    {
      console.log(response.data);
      // Deal with the response of the database
      // -------------------------------------------------------
      if(response.data == "Insert of new comment - FAILED")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': true,
          'iconViewInfo': false,
          'label': 'ERROR during publishing of the comment, try again later'
        };
      }
      else
      {
        $scope.allComments.push(response.data);

        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'Your comment has been published now, thank you !'
        };

        // Re init the comment box
        // ----------------------------------------
        $scope.titleComment = '';
        $scope.textComment = '';
      }

    });

  }
});
