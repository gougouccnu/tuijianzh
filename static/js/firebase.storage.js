// function writeNewImageUrl(uid, imageUrl) {
//   console.log('append new record');
//   // A post entry.
//   var postData = {
//     image_url: imageUrl
//   };

//   // Get a key for a new Post.
//   var newPostKey = firebase.database().ref().child('users').push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/urls/' + newPostKey] = postData;
//   updates['/users/' + uid + '/' + newPostKey] = postData;

//   return firebase.database().ref().update(updates);
// }

function writeNewImageUrl(uid, imageUrl) {
  console.log('append new record:');

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('users').push().key;
  return firebase.database().ref('users/' + uid + '/' + newPostKey).set(imageUrl);
  //return newPostKey;
}


function writeUserData(userId, imageUrl) {
  console.log('userid is:' + userId);
  firebase.database().ref('users/' + userId).set({
    image_url : imageUrl
  });
}



    var auth = firebase.auth();
    var userId, progressBar;
    var storageRef = firebase.storage().ref();

    function handleFileSelect(evt) {
      //evt.stopPropagation();
      //evt.preventDefault();
      var file = evt.target.files[0];
      var metadata = {
        'contentType': file.type
      };
      // Push to child path.
      // [START oncomplete]
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          document.getElementById('progressBar').style.visibility = 'visible';
          $('.progress-bar').css('width', progress +'%');
          
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('auth error');
            break;

          case 'storage/canceled':
            // User canceled the upload
            console.log('upload canceled');
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('unknown error');
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log('append new record:');

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('users').push().key;
        firebase.database().ref('users/' + uid + '/' + newPostKey).set(imageUrl).then(function() {
          document.getElementById('progressBar').style.visibility = 'hidden';
          $('.progress-bar').css('width', '0%');
          // redirect to image edit page
          window.location.href = '/signin';
        }).catch(function(error) {
            console.log('Synchronization failed');
        });
      });    
    }
    //   .then(function(snapshot) {
    //     console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    //     console.log(snapshot.metadata);
    //     var url = snapshot.downloadURL;
    //     console.log('File available at', url);
        
    //     //writeUserData(userId, url);
    //     var newPostKey = writeNewImageUrl(userId, url);

    //     // redirect to image edit page
    //     //window.location.href = '/signin';
    //     // [START_EXCLUDE]
    //     //document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
    //     // [END_EXCLUDE]
    //   }).catch(function(error) {
    //     // [START onfailure]
    //     console.error('Upload failed:', error);
    //     // [END onfailure]
    //   });
    //   // [END oncomplete]
    // }
    window.onload = function() {
      document.getElementById('fileElem').addEventListener('change', handleFileSelect, false);
      document.getElementById('progressBar').style.width = '50%';
      auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log('Anonymous user signed-in.', user);
          document.getElementById('fileElem').disabled = false;
        } else {
          console.log('There was no anonymous session. Creating a new anonymous user.');
          // Sign the user in anonymously since accessing Storage requires the user to be authorized.
          auth.signInAnonymously();
        }
        userId = firebase.auth().currentUser.uid;
      });
    }

    $(document).ready(function(){
    console.log('document ready');
    //$('.progress-bar').css('width', '50%');
});
