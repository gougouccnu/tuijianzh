//require('../fabric/fabric')
/**
 * Created by aub3 on 5/1/15.
 */
var canvas = new fabric.Canvas('canvas'),
    //output_canvas = document.getElementById('output_canvas'),
    output_canvas = new fabric.Canvas('output_canvas'),
    width = canvas.getWidth(),
    height = canvas.getHeight(),
    jqwindow = $(window),
    delta_left = 0,
    delta_top = 0,
    yax = $('#yaxis'),
    state = {
        'images':[],
        'masks_present':false,
        'recompute':true,
        'results':{},
        canvas_data:null,
        mask_data:null,
        'options':{
            'pf':null,
            'slic':null
        }
    },
    network_editor,network_train_editor,network_test_editor;


queryEditImage = function() {
    console.log('query edit image');

    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey + childData);
        // childData.forEach(function(childSnapshot) {
        //   console.log(childSnapshot.key + childSnapshot.val());
        // });
      });

      var imageUrl = snapshot.val();
      console.log('imageUrl: ' + imageUrl);
      // Create a reference from an HTTPS URL
      // Note that in the URL, characters are URL escaped!
      var httpsReference = firebase.storage().refFromURL('https://firebasestorage.googleapis.com/v0/b/clipliving.appspot.com/o/images%2Fdog.jpg?alt=media&token=6c90bdd6-76a1-4b22-8da2-609226f4822b');

      httpsReference.getDownloadURL().then(function(url) {
        // Get the download URL for 'images/stars.jpg'
        // This can be inserted into an <img> tag
        // This can also be downloaded directly
        console.log(url);
        fabric.Image.fromURL(url, function (oImg) {
                        console.log(oImg)
                        // lsw added
                        oImg.set({ left: 0, top: 0 });
                        canvas.add(oImg);
                      });
      }).catch(function(error) {
        // Handle any errors
        console.log('download from firebase error');
        console.log(error);
      });

    });
}

// 浏览器不支持require，在html中import
//var firebase = require('firebase');
//var firebaseui = require('firebaseui');

initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log('user sigin in');
            // User is signed in.
            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var uid = user.uid;
            // var providerData = user.providerData;
            // user.getToken().then(function(accessToken) {
            //   document.getElementById('sign-in-status').textContent = 'Signed in';
            //   document.getElementById('sign-in').textContent = 'Sign out';
            //   document.getElementById('account-details').textContent = JSON.stringify({
            //     displayName: displayName,
            //     email: email,
            //     emailVerified: emailVerified,
            //     photoURL: photoURL,
            //     uid: uid,
            //     accessToken: accessToken,
            //     providerData: providerData
            //   }, null, '  ');
            // });
          } else {
            // User is signed out.
            console.log('user is signed out');
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
            firebase.auth().signInAnonymously();
          }
          queryEditImage();
        }, function(error) {
          console.log(error);
        });
      };

initialize_ui = function () {

    // fabric.Image.fromURL('preview_original.jpeg', function(img) {
    //         output_canvas.add(img);
    //         img.bringToFront();
    //         output_canvas.renderAll();
    //         //state.recompute = true;
    //     });

    //lsw added
    canvas.setWidth(640);
    canvas.setHeight(640);
    console.log('get canvas size');
    console.log(canvas.getWidth());
    console.log(canvas.getHeight());

    var jsfeat_gui = new dat.GUI({ autoPlace: false });
    var pf_opt, slic_opt;
    //pf_opt = function () {
    //this.sigma = 0;
    //this.threshold = 1000;
    //this.minSize = 1000;
    //};
    slic_opt = function () {
    this.regionSize = 30;
    this.minSize = 20;
    };
    //state.options.pf = new pf_opt();
    state.options.slic = new slic_opt();
    var slic_gui = jsfeat_gui.addFolder('Superpixel Segmentation');
    slic_gui.add(state.options.slic, "regionSize", 20, 400);
    slic_gui.add(state.options.slic, "minSize", 2, 100);
    //var pf_gui = jsfeat_gui.addFolder('PF Graph Segmentation (Not Used)');
    //pf_gui.add(state.options.pf, "threshold", 20, 40000);
    //pf_gui.add(state.options.pf, "sigma", 0, 20);
    //pf_gui.add(state.options.pf, "minSize", 2, 10000);
    $("#dat_gui").append(jsfeat_gui.domElement);
    canvas.backgroundColor = '#ffffff';
    $('#bg-color').val('#ffffff');
    canvas.renderAll();
    yax.hide();
    $('#imgfile').on("change",function(){
        console.log('add image to left canvas')
        file = this.files[0];
        fr = new FileReader();
        fr.onload = function () {
            img = new Image();
            img.onload = function () {
                  console.log('image loaded.');
                  fabric.Image.fromURL(img.src, function (oImg) {
                  console.log(oImg)
                  // lsw added
                  oImg.set({ left: 0, top: 0 });
                  canvas.add(oImg);
                });
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(file);
    });
      delta_left = $('#output_canvas').offset().left - $('#canvas').offset().left + jqwindow.scrollLeft();
      delta_top = $('#output_canvas').offset().top - $('#canvas').offset().top + jqwindow.scrollTop();
    jqwindow.scroll(function () {
      delta_left = $('#output_canvas').offset().left - $('#canvas').offset().left + jqwindow.scrollLeft();
      delta_top = $('#output_canvas').offset().top - $('#canvas').offset().top + jqwindow.scrollTop();
    });
//    fabric.Image.fromURL("/static/img/demo.jpg", function(oImg){canvas.add(oImg);},load_options = {crossOrigin:"Anonymous"});
};

    function renderVieportBorders() {
      var ctx = canvas.getContext();
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(
        canvas.viewportTransform[4],
        canvas.viewportTransform[5],
        canvas.getWidth() * canvas.getZoom(),
        canvas.getHeight() * canvas.getZoom());
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        canvas.viewportTransform[4],
        canvas.viewportTransform[5],
        canvas.getWidth() * canvas.getZoom(),
        canvas.getHeight() * canvas.getZoom());
      ctx.restore();
    }


(function() {
    $(canvas.getElement().parentNode).on('mousewheel', function(e) {
      var newZoom = canvas.getZoom() + e.deltaY / 300;
        if (newZoom > 0.1 && newZoom < 10){
            canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);
            //lsw 
            output_canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);
            state.recompute = true;
            renderVieportBorders();
        }
      return false;
    });

    var viewportLeft = 0,
        viewportTop = 0,
        mouseLeft,
        mouseTop,
        _drawSelection = canvas._drawSelection,
        isDown = false;

    canvas.on('mouse:down', function(options) {
      console.log(options.e.clientX, options.e.clientY);
      isDown = true;
      viewportLeft = canvas.viewportTransform[4];
      viewportTop = canvas.viewportTransform[5];
      mouseLeft = options.e.x;
      mouseTop = options.e.y;
      if (options.e.altKey) {
        _drawSelection = canvas._drawSelection;
        canvas._drawSelection = function(){ };
      }
      renderVieportBorders();
    });

    canvas.on('mouse:move', function(options) {
      //console.log(options.e.clientX, options.e.clientY);
      if (options.e.altKey && isDown) {
        var currentMouseLeft = options.e.x;
        var currentMouseTop = options.e.y;
        var deltaLeft = currentMouseLeft - mouseLeft,
            deltaTop = currentMouseTop - mouseTop;
        canvas.viewportTransform[4] = viewportLeft + deltaLeft;
        canvas.viewportTransform[5] = viewportTop + deltaTop;
        canvas.renderAll();
        renderVieportBorders();
      }
    });

    canvas.on('mouse:up', function(options) {
      //console.log(options.e.clientX, options.e.clientY);
      canvas._drawSelection = _drawSelection;
      isDown = false;
    });
  })();



(function() {
  fabric.util.addListener(fabric.window, 'load', function() {
    var canvas = this.__canvas || this.canvas,
        canvases = this.__canvases || this.canvases;

    canvas && canvas.calcOffset && canvas.calcOffset();

    if (canvases && canvases.length) {
      for (var i = 0, len = canvases.length; i < len; i++) {
        canvases[i].calcOffset();
      }
    }
  });
})();

// Define the tour!
var tour = {
  id: "hello-hopscotch",
  showPrevButton:true,
  zindex:-1,
  steps: [
    {
      title: "Click here to add image",
      content: "You can only upload one image at a time. But you can repeat the process to add more images and rearrange them.",
      target: document.querySelector("#btnLoad"),
      placement: "bottom"
    },
    {
      title: "Click inside to select, resize and move images",
      content: "Use this canvas to position and resize images.",
      target: document.querySelector("#canvas"),
      onShow:function(){
        fabric.Image.fromURL("/static/img/demo.jpg", function(oImg){canvas.add(oImg);},load_options = {crossOrigin:"Anonymous"});
        state.recompute = true;
      },
      placement: "right"
    },
    {
      title: "Draw foreground",
      content: "Mark foreground regions.",
      target: document.querySelector("#drawing-mode_f"),
      placement: "bottom"
    },
    {
      title: "Draw background",
      content: "Mark background regions.",
      target: document.querySelector("#drawing-mode_b"),
      placement: "bottom"
    },
    {
      title: "Click to segment",
      content: "Once you have marked the image click to segment, you can further edit your masks and segment again.",
      target: document.querySelector("#segment"),
      placement: "right"
    },
    {
      title: "Download",
      content: "Click to download results",
      target: document.querySelector("#rasterize"),
      placement: "bottom"
    },
    {
      title: "Export",
      content: "Or export to editor and combine with additional images.",
      target: document.querySelector("#export"),
      placement: "bottom"
    }
  ]
};



$(document).ready(function(){
    initialize_ui();
    initApp();
    $('#introModal').modal();
    //hopscotch.startTour(tour);
});


