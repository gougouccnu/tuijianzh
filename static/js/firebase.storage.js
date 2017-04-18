function writeNewImageUrl(uid, imageUrl) {
  console.log('append new record');
  // A post entry.
  var postData = {
    image_url: imageUrl
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('users').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/urls/' + newPostKey] = postData;
  updates['/users/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

function writeUserData(userId, imageUrl) {
  console.log('userid is:' + userId);
  firebase.database().ref('users/' + userId).set({
    image_url : imageUrl
  });
}



    var auth = firebase.auth();
    var userId;
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
      storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
        
        //writeUserData(userId, url);
        writeNewImageUrl(userId, url);

        // redirect to image edit page
        //window.location.href = '/signin?index=';
        // [START_EXCLUDE]
        //document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
      // [END oncomplete]
    }
    window.onload = function() {
      document.getElementById('fileElem').addEventListener('change', handleFileSelect, false);
      //document.getElementById('file').disabled = true;
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