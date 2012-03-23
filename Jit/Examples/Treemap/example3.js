var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
  //init data
  var json = {"children":[{"data":{"File name":"app/models/label.rb","playcount":167,"$color":"#FF1111","$area":167},"id":"app/models/label.rb","name":"app/models/label.rb"},{"data":{"File name":"app/controllers/labels_controller.rb","playcount":137,"$color":"#FF2222","$area":137},"id":"app/controllers/labels_controller.rb","name":"app/controllers/labels_controller.rb"},{"data":{"File name":"app/assets/stylesheets/base.css.erb","playcount":133,"$color":"#FF3333","$area":133},"id":"app/assets/stylesheets/base.css.erb","name":"app/assets/stylesheets/base.css.erb"},{"data":{"File name":"app/views/labels/new.html.erb","playcount":110,"$color":"#FF4444","$area":110},"id":"app/views/labels/new.html.erb","name":"app/views/labels/new.html.erb"},{"data":{"File name":"app/models/user.rb","playcount":108,"$color":"#FF5555","$area":108},"id":"app/models/user.rb","name":"app/models/user.rb"},{"data":{"File name":"app/helpers/labels_helper.rb","playcount":99,"$color":"#FF6666","$area":99},"id":"app/helpers/labels_helper.rb","name":"app/helpers/labels_helper.rb"},{"data":{"File name":"app/views/labels/show.html.erb","playcount":88,"$color":"#FF7777","$area":88},"id":"app/views/labels/show.html.erb","name":"app/views/labels/show.html.erb"},{"data":{"File name":"app/views/layouts/application.html.erb","playcount":76,"$color":"#FF8888","$area":76},"id":"app/views/layouts/application.html.erb","name":"app/views/layouts/application.html.erb"},{"data":{"File name":"app/helpers/application_helper.rb","playcount":76,"$color":"#FF9999","$area":76},"id":"app/helpers/application_helper.rb","name":"app/helpers/application_helper.rb"},{"data":{"File name":"app/controllers/application_controller.rb","playcount":67,"$color":"#FF10101010","$area":67},"id":"app/controllers/application_controller.rb","name":"app/controllers/application_controller.rb"}]};
  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    //no parent frames
    titleHeight: 0,
    //enable animations
    animate: animate,
    //no box offsets
    offset: 0,
    //add cushion gradients
    cushion: useGradients,
    //duration of the animation
    duration: 1500,
    //Enable tips
    Tips: {
      enable: true,
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
        var html = "<div class=\"tip-title\">" + node.name 
          + "</div><div class=\"tip-text\">";
        var data = node.data;
        if(data.artist) {
          html += "Artist: " + data.artist + "<br />";
        }
        if(data.playcount) {
          html += "Play count: " + data.playcount;
        }
        if(data.image) {
          html += "<img src=\""+ data.image +"\" class=\"album\" />";
        }
        tip.innerHTML =  html; 
      }  
    },
    //Add the name of the node in the correponding label
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
        var style = domElement.style;
        style.display = '';
        style.cursor = 'default';
        style.border = '1px solid transparent';
        domElement.onmouseover = function() {
          style.border = '1px solid #9FD4FF';
        };
        domElement.onmouseout = function() {
          style.border = '1px solid transparent';
        };
    }
  });

  tm.loadJSON(json);
  tm.refresh();
  //end
  //add events to radio buttons
  var sq = $jit.id('r-sq'),
      st = $jit.id('r-st'),
      sd = $jit.id('r-sd');
  var util = $jit.util;
  util.addEvent(sq, 'change', function() {
    if(!sq.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Squarified);
    tm.refresh();
  });
  util.addEvent(st, 'change', function() {
    if(!st.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Strip);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  util.addEvent(sd, 'change', function() {
    if(!sd.checked) return;
    util.extend(tm, new $jit.Layouts.TM.SliceAndDice);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  //add event to the back button
  var back = $jit.id('back');
  $jit.util.addEvent(back, 'click', function() {
    tm.out();
  });
}
