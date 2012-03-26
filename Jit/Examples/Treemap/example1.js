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
  var json = {
    "children": [
        {
            "data": {
                "Filename": "app/assets/stylesheets/base.css.erb",
                "playcount": 41,
                "$color": "#FF1100",
                "$area": 41
            },
            "id": "app/assets/stylesheets/base.css.erb",
            "name": "app/assets/stylesheets/base.css.erb"
        },
        {
            "data": {
                "Filename": "app/views/labels/new.html.erb",
                "playcount": 33,
                "$color": "#FF1100",
                "$area": 33
            },
            "id": "app/views/labels/new.html.erb",
            "name": "app/views/labels/new.html.erb"
        },
        {
            "data": {
                "Filename": "app/helpers/labels_helper.rb",
                "playcount": 24,
                "$color": "#FF1100",
                "$area": 24
            },
            "id": "app/helpers/labels_helper.rb",
            "name": "app/helpers/labels_helper.rb"
        },
        {
            "data": {
                "Filename": "app/models/label.rb",
                "playcount": 21,
                "$color": "#FF1100",
                "$area": 21
            },
            "id": "app/models/label.rb",
            "name": "app/models/label.rb"
        },
        {
            "data": {
                "Filename": "app/views/layouts/application.html.erb",
                "playcount": 19,
                "$color": "#FF1100",
                "$area": 19
            },
            "id": "app/views/layouts/application.html.erb",
            "name": "app/views/layouts/application.html.erb"
        },
        {
            "data": {
                "Filename": "app/assets/javascripts/member_info.js",
                "playcount": 14,
                "$color": "#FF1100",
                "$area": 14
            },
            "id": "app/assets/javascripts/member_info.js",
            "name": "app/assets/javascripts/member_info.js"
        },
        {
            "data": {
                "Filename": "app/controllers/labels_controller.rb",
                "playcount": 14,
                "$color": "#FF1100",
                "$area": 14
            },
            "id": "app/controllers/labels_controller.rb",
            "name": "app/controllers/labels_controller.rb"
        },
        {
            "data": {
                "Filename": "app/helpers/application_helper.rb",
                "playcount": 13,
                "$color": "#FF1100",
                "$area": 13
            },
            "id": "app/helpers/application_helper.rb",
            "name": "app/helpers/application_helper.rb"
        },
        {
            "data": {
                "Filename": "app/models/snapshot/label.rb",
                "playcount": 12,
                "$color": "#FF1100",
                "$area": 12
            },
            "id": "app/models/snapshot/label.rb",
            "name": "app/models/snapshot/label.rb"
        },
        {
            "data": {
                "Filename": "app/views/labels/show.html.erb",
                "playcount": 11,
                "$color": "#FF1100",
                "$area": 11
            },
            "id": "app/views/labels/show.html.erb",
            "name": "app/views/labels/show.html.erb"
        },
        {
            "data": {
                "Filename": "app/controllers/application_controller.rb",
                "playcount": 10,
                "$color": "#FF1100",
                "$area": 10
            },
            "id": "app/controllers/application_controller.rb",
            "name": "app/controllers/application_controller.rb"
        },
        {
            "data": {
                "Filename": "app/views/labels/_view_performance_category_details.html.erb",
                "playcount": 10,
                "$color": "#FF1100",
                "$area": 10
            },
            "id": "app/views/labels/_view_performance_category_details.html.erb",
            "name": "app/views/labels/_view_performance_category_details.html.erb"
        },
        {
            "data": {
                "Filename": "app/controllers/mailbox_controller.rb",
                "playcount": 9,
                "$color": "#FF1100",
                "$area": 9
            },
            "id": "app/controllers/mailbox_controller.rb",
            "name": "app/controllers/mailbox_controller.rb"
        },
        {
            "data": {
                "Filename": "app/views/labels/_dimensions.html.erb",
                "playcount": 9,
                "$color": "#FF1100",
                "$area": 9
            },
            "id": "app/views/labels/_dimensions.html.erb",
            "name": "app/views/labels/_dimensions.html.erb"
        },
        {
            "data": {
                "Filename": "app/views/home/index.html.erb",
                "playcount": 9,
                "$color": "#FF1100",
                "$area": 9
            },
            "id": "app/views/home/index.html.erb",
            "name": "app/views/home/index.html.erb"
        },
        {
            "data": {
                "Filename": "app/models/user.rb",
                "playcount": 9,
                "$color": "#FF1100",
                "$area": 9
            },
            "id": "app/models/user.rb",
            "name": "app/models/user.rb"
        },
        {
            "data": {
                "Filename": "app/views/labels/_label_details.html.erb",
                "playcount": 9,
                "$color": "#FF1100",
                "$area": 9
            },
            "id": "app/views/labels/_label_details.html.erb",
            "name": "app/views/labels/_label_details.html.erb"
        },
        {
            "data": {
                "Filename": "app/assets/javascripts/new_white_label.js",
                "playcount": 9,
                "$color": "#FF1100",
                "$area": 9
            },
            "id": "app/assets/javascripts/new_white_label.js",
            "name": "app/assets/javascripts/new_white_label.js"
        },
        {
            "data": {
                "Filename": "app/views/labels/_view_photograph_category_details.html.erb",
                "playcount": 8,
                "$color": "#FF1100",
                "$area": 8
            },
            "id": "app/views/labels/_view_photograph_category_details.html.erb",
            "name": "app/views/labels/_view_photograph_category_details.html.erb"
        },
        {
            "data": {
                "Filename": "app/models/notification_group.rb",
                "playcount": 8,
                "$color": "#FF1100",
                "$area": 8
            },
            "id": "app/models/notification_group.rb",
            "name": "app/models/notification_group.rb"
        }
    ]
};
  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    //parent box title heights
    titleHeight: 15,
    //enable animations
    animate: animate,
    //box offsets
    offset: 1,
    //Attach left and right click events
    Events: {
      enable: true,
      onClick: function(node) {
        if(node) tm.enter(node);
      },
      onRightClick: function() {
        tm.out();
      }
    },
    duration: 1000,
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
        if(data.playcount) {
          html += "play count: " + data.playcount;
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
