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
  var json = {"children":[{"data":{"File name":"app/assets/stylesheets/base.css.erb","playcount":41,"$color":"#FF1111","$area":41},"id":"app/assets/stylesheets/base.css.erb","name":"app/assets/stylesheets/base.css.erb"},{"data":{"File name":"app/views/labels/new.html.erb","playcount":33,"$color":"#FF2222","$area":33},"id":"app/views/labels/new.html.erb","name":"app/views/labels/new.html.erb"},{"data":{"File name":"app/helpers/labels_helper.rb","playcount":24,"$color":"#FF3333","$area":24},"id":"app/helpers/labels_helper.rb","name":"app/helpers/labels_helper.rb"},{"data":{"File name":"app/models/label.rb","playcount":21,"$color":"#FF4444","$area":21},"id":"app/models/label.rb","name":"app/models/label.rb"},{"data":{"File name":"app/views/layouts/application.html.erb","playcount":19,"$color":"#FF5555","$area":19},"id":"app/views/layouts/application.html.erb","name":"app/views/layouts/application.html.erb"},{"data":{"File name":"app/assets/javascripts/member_info.js","playcount":14,"$color":"#FF6666","$area":14},"id":"app/assets/javascripts/member_info.js","name":"app/assets/javascripts/member_info.js"},{"data":{"File name":"app/controllers/labels_controller.rb","playcount":14,"$color":"#FF7777","$area":14},"id":"app/controllers/labels_controller.rb","name":"app/controllers/labels_controller.rb"},{"data":{"File name":"app/helpers/application_helper.rb","playcount":13,"$color":"#FF8888","$area":13},"id":"app/helpers/application_helper.rb","name":"app/helpers/application_helper.rb"},{"data":{"File name":"app/models/snapshot/label.rb","playcount":12,"$color":"#FF9999","$area":12},"id":"app/models/snapshot/label.rb","name":"app/models/snapshot/label.rb"},{"data":{"File name":"app/views/labels/show.html.erb","playcount":11,"$color":"#FF10101010","$area":11},"id":"app/views/labels/show.html.erb","name":"app/views/labels/show.html.erb"}]};
  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    //show only one tree level
    levelsToShow: 1,
    //parent box title heights
    titleHeight: 0,
    //enable animations
    animate: animate,
    //box offsets
    offset: 1,
    //use canvas text
    Label: {
      type: labelType,
      size: 9,
      family: 'Tahoma, Verdana, Arial'
    },
    //enable specific canvas styles
    //when rendering nodes
    Node: {
      CanvasStyles: {
        shadowBlur: 0,
        shadowColor: '#000'
      }
    },
    //Attach left and right click events
    Events: {
      enable: true,
      onClick: function(node) {
        if(node) tm.enter(node);
      },
      onRightClick: function() {
        tm.out();
      },
      //change node styles and canvas styles
      //when hovering a node
      onMouseEnter: function(node, eventInfo) {
        if(node) {
          //add node selected styles and replot node
          node.setCanvasStyle('shadowBlur', 7);
          node.setData('color', '#888');
          tm.fx.plotNode(node, tm.canvas);
          tm.labels.plotLabel(tm.canvas, node);
        }
      },
      onMouseLeave: function(node) {
        if(node) {
          node.removeData('color');
          node.removeCanvasStyle('shadowBlur');
          tm.plot();
        }
      }
    },
    //duration of the animations
    duration: 1000,
    //Enable tips
    Tips: {
      enable: true,
      type: 'Native',
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
    //Implement this method for retrieving a requested  
    //subtree that has as root a node with id = nodeId,  
    //and level as depth. This method could also make a server-side  
    //call for the requested subtree. When completed, the onComplete   
    //callback method should be called.  
    request: function(nodeId, level, onComplete){  
      var tree = eval('(' + json + ')');  
      var subtree = $jit.json.getSubtree(tree, nodeId);  
      $jit.json.prune(subtree, 1);  
      onComplete.onComplete(nodeId, subtree);  
    },
    //Add the name of the node in the corresponding label
    //This method is called once, on label creation and only for DOM labels.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
    }
  });
  
  var pjson = eval('(' + json + ')');  
  $jit.json.prune(pjson, 1);
  
  tm.loadJSON(pjson);
  tm.refresh();
  //end
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
