blogESIEA.controller('chatCrtl', function($scope, $location, $rootScope, $http)
{

  /* **
    > Function to display all conversation of the user on the chat
    ______________________________________________________________
  ** */
  var currentUser = $rootScope.InformationConnectUser.Pseudo;
  $http.post('http://localhost:8000/displayConversations', {currentUser}).then(function(response)
  {
    $scope.allConversation = [];

    if (response.data == "Fetch all conversations - FAILED")
    {
      $rootScope.ServerInformation = {
        'divView': true,
        'iconViewOK': false,
        'iconViewNOK': true,
        'iconViewInfo': false,
        'label': 'ERROR - Fetch chat in DB'
      };
    }
    else
    {
      if (response.data.length == 0)
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': false,
          'iconViewInfo': true,
          'label': 'No conversation available'
        };
      }
      else
      {
        for(cursorConversation = 0; cursorConversation < response.data.length; cursorConversation++)
        {
          $scope.allConversation.push(response.data[cursorConversation]);
        }
      }
    }
  });



  /* **
    > Function to display all conversation of the user on the chat
    ______________________________________________________________
  ** */
  $http.post('http://localhost:8000/displayDialogs', {currentUser}).then(function(response)
  {
    $scope.allDialog = [];

    if (response.data == "Fetch all dialog - FAILED")
    {
      $rootScope.ServerInformation = {
        'divView': true,
        'iconViewOK': false,
        'iconViewNOK': true,
        'iconViewInfo': false,
        'label': 'ERROR - Fetch chat in DB'
      };
    }
    else
    {
      for(cursorDialog = 0; cursorDialog < response.data.length; cursorDialog++)
      {
        $scope.allDialog.push(response.data[cursorDialog]);
      }
    }
  });




  /* **
    > Function to send a message to an other user
    ______________________________________________________________
  ** */
  $scope.sendMessage = function()
  {

    // get the recipient
    // -----------------------------------------
    sender = $rootScope.InformationConnectUser.Pseudo;
    recipient = $scope.searchUser;

    // Create the object newMessage
    // ------------------------------------------------------------
    var newMessage = {
      idConversation: '',
      sender: sender,
      recipient: recipient,
      message: $scope.messageToSendToChat
    };


    // Check if the recipient exist
    // --------------------------------------------------------
    $http.post('http://localhost:8000/checkExistanceRecipient', {recipient}).then(function(response)
    {

      // Deal with the NODEJS server response
      // ------------------------------------------------
      if(response.data.length == 0)
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': true,
          'iconViewInfo': false,
          'label': 'Sorry, this recipient does not exist !'
        };
      }
      else
      {
        // Check if the conversation with the recipient already exist or not
        $http.post('http://localhost:8000/checkExistanceConversation', {recipient, sender}).then(function(response)
        {

          // Deal with the response of the database
          // -------------------------------------------------------
          if(response.data == "Check existance of conversation - FAILED")
          {
            $rootScope.ServerInformation = {
              'divView': true,
              'iconViewOK': false,
              'iconViewNOK': true,
              'iconViewInfo': false,
              'label': 'ERROR during publishing of the message, try again later'
            };
          }
          else
          {
            // If the conversatio doesn't exist ...
            // ---------------------------------------------------
            if (response.data.length == 0)
            {
              // ... Let's create it
              // --------------------------------------
              $http.post('http://localhost:8000/createConversation', {recipient, sender}).then(function(response)
              {
                // Deal with the response of the database
                // -------------------------------------------------------
                if (response.data == "Create new conversation - FAILED")
                {
                  $rootScope.ServerInformation = {
                    'divView': true,
                    'iconViewOK': false,
                    'iconViewNOK': true,
                    'iconViewInfo': false,
                    'label': 'ERROR during publishing of the message, try again later'
                  };
                }
                else
                {
                  // Now, let's send the message
                  // --------------------------------------------
                  newMessage.idConversation = response.data._id;

                  $http.post('http://localhost:8000/sendNewMessage', newMessage).then(function(response)
                  {
                    // Deal with the response of the database
                    // -------------------------------------------------------
                    if (response.data == "Insert of new message - FAILED")
                    {
                      $rootScope.ServerInformation = {
                        'divView': true,
                        'iconViewOK': false,
                        'iconViewNOK': true,
                        'iconViewInfo': false,
                        'label': 'ERROR during publishing of the message, try again later'
                      };
                    }
                    else
                    {
                      $rootScope.ServerInformation = {
                        'divView': true,
                        'iconViewOK': true,
                        'iconViewNOK': false,
                        'iconViewInfo': false,
                        'label': 'Your message has been send'
                      };
                    }

                  });

                }

              });
            }
            else
            {
              // ... Otherwise, let's send the message
              // --------------------------------------------------
              newMessage.idConversation = response.data[0]._id;

              $http.post('http://localhost:8000/sendNewMessage', newMessage).then(function(response)
              {
                // Deal with the response of the database
                // -------------------------------------------------------
                if (response.data == "Insert of new message - FAILED")
                {
                  $rootScope.ServerInformation = {
                    'divView': true,
                    'iconViewOK': false,
                    'iconViewNOK': true,
                    'iconViewInfo': false,
                    'label': 'ERROR during publishing of the message, try again later'
                  };
                }
                else
                {
                  $rootScope.ServerInformation = {
                    'divView': true,
                    'iconViewOK': true,
                    'iconViewNOK': false,
                    'iconViewInfo': false,
                    'label': 'Your message has been send'
                  };

                  // Update information
                  // -------------------------------------
                  $scope.allDialog = response.data;
                }

              });
            }

            // Re init the inputs
            // -----------------------------------
            $scope.searchUser = '';
            $scope.messageToSendToChat = '';

            // Re location to the chat
            // ----------------------------------------
            $location.path('/chat');
          }

        });
      }

    });

  }


  /* **
    > Function to delete a message
    ______________________________________________________________
  ** */
  $scope.deleteMessage  = function(idMessage)
  {
    $http.post('http://localhost:8000/deleteMessage', {idMessage}).then(function(response)
    {
      $rootScope.ServerInformation = {
        'divView': true,
        'iconViewOK': false,
        'iconViewNOK': false,
        'iconViewInfo': true,
        'label': 'The message has been delete'
      };

      // Update information
      // -------------------------------------
      $scope.allDialog = response.data

    });
  }


  /* **
    > Function to answer a message
    ______________________________________________________________
  ** */
  $scope.answerMessage = function(infoConversation, message)
  {
    // Determine the sender & the recipient
    // --------------------------------------------------------------------
    if (infoConversation.user1 == $rootScope.InformationConnectUser.Pseudo)
    {
      var sender = infoConversation.user1;
      var recipient = infoConversation.user2;
    }
    else
    {
      var sender = infoConversation.user2;
      var recipient = infoConversation.user1;
    }

    // Create the object newMessage
    // ------------------------------------------------------------
    var newMessage = {
      idConversation: infoConversation._id,
      sender: sender,
      recipient: recipient,
      message: message
    };

    $http.post('http://localhost:8000/answerMessage', newMessage).then(function(response)
    {
      // Deal with the response of the database
      // -------------------------------------------------------
      if (response.data == "Insert of new message - FAILED")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': true,
          'iconViewInfo': false,
          'label': 'ERROR during publishing of the message, try again later'
        };
      }
      else
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'Your message has been send'
        };

        // Update information
        // -------------------------------------
        $scope.allDialog = response.data
      }

    });
  }



  $scope.displayPseudoConversation = function(user)
  {
    if (user == $rootScope.InformationConnectUser.Pseudo)
    {
      return true;
    }
    else
    {
      return false;
    }
  }



  $scope.displayListUsers = function()
  {
    $scope.listUsers = {'visibility':'visible'};

    // Get the list of user
    // -------------------------------
    $http.get('http://localhost:8000/getListUsers').then(function(response)
    {
      if(response.data.length == 0)
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': false,
          'iconViewInfo': true,
          'label': 'Sorry, there is no other user'
         }
      }
      else
      {
        $scope.allUsers = response.data;
      }

    });
  }

})
