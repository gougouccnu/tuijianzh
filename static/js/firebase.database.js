function writeNewImageUrl(uid, imageUrl) {
  // A post entry.
  var postData = {
    uid: uid,
    image_url: imageUrl
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('imageUrl').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/imageUrl/' + newPostKey] = postData;
  updates['/user-imageUrls/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

function writeUserData(userId, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    image_url : imageUrl
  });
}

