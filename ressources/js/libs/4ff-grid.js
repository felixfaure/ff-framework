/**
* ff-grid.js
*
* @fileoverview Minimal grid zero dependency responsive oriented
*
* @author David Félix-Faure
* @author http://www.felixfaure.fr/
*
*/
(function (global) {

  'use strict';

  //Vendor prefix transform property
  var transformProp;
  (function () {
    var style = document.createElement('a').style;
    var prop;
    if (style[prop = 'webkitTransform'] !== undefined) {
      transformProp = prop;
    }
    if (style[prop = 'msTransform'] !== undefined) {
      transformProp = prop;
    }
    if (style[prop = 'transform'] !== undefined) {
      transformProp = prop;
    }
  }());

  function getBCR(el) {
    return el.getBoundingClientRect();
  }

  function toArray(list) {
    return list ? Array.prototype.slice.call(list) : [];
  }

  //Select only the first node (or #id)
  function q(selector, container) {
    if (!container && selector.indexOf('#') === 0) return document.getElementById(selector.substr(1, selector.length));
    return (container || document).querySelector(selector);
  };

  //Select all the node and convert to array
  function qq(selector, container) {
    return toArray( (container || document).querySelectorAll(selector) );
  }

  //Main function
  function ffgrid (args) {
    //No support for no csstransform browsers
    if(!transformProp) {
      return false;
    }

    //Get container element (with string or node element)
    var containerEle = args.cont instanceof Node ? args.cont : q(args.cont);
    if (!containerEle) {
      return false;
    }
    //Get items
    var itemsNodeList = Array.isArray(args.item) ? args.item : qq(args.item,containerEle);
    containerEle.style.width = '';
    if (itemsNodeList.length === 0) {
      containerEle.style.height = '0px';
      return false;
    }
    containerEle.style.width = containerEle.clientWidth+'px';

    //Dimensions
    var containerWidth = getBCR(containerEle).width;
    var firstChildWidth = getBCR(itemsNodeList[0]).width;
    var cols = args.cols ? args.cols : Math.max(Math.round(containerWidth / firstChildWidth), 1);
    var gutterW = args.gutterW ? args.gutterW : (containerWidth - cols * firstChildWidth) / (cols - 1);
    var gutterH = args.gutterH ? args.gutterH : gutterW;
    var colW = (containerWidth - (cols - 1) * gutterW) / cols;
    var nb = itemsNodeList.length;
    var variableW = args.variableW ? true : false;

    //Initials Calculs
    var itemsPosY = [];
    var itemsPosX = [];
    for ( var g = 0 ; g < cols ; ++g ) {
      itemsPosX.push(g * colW + g * gutterW);
      itemsPosY.push(0);
    }

    //Calcul of the items position
    var count = 0;
    itemsNodeList.forEach(function(item) {
      var itemCols = variableW ? (item.hasAttribute('data-cols') ? parseInt(item.getAttribute('data-cols')) : 1) : 1;
      var itemIndexSort = itemsPosY
      .slice(0)
      .sort(function (a, b) {
        return a - b;
      });
      var itemIndex = 0;
      for (var i = 0; i < cols; i++) {
        itemIndex = itemIndexSort.shift();
        itemIndex = itemsPosY.indexOf(itemIndex);
        if(!variableW || cols - itemIndex - itemCols >= 0) { //TODO a revoir ça ne fonctionne pas si place puis element plus haut
          break;
        }
      }
      set_item(item, itemIndex, itemCols);
    });

    function set_item(item, itemIndex, itemCols) {
      var posX = itemsPosX[itemIndex];
      var posY = itemsPosY[itemIndex];
      var itemsPosYFirst = itemsPosY[itemIndex] + getBCR(item).height + gutterH;
      for (var i = 1; i <= itemCols; i++) {
        if(itemIndex + (i - 1) < itemsPosY.length) {
          itemsPosY[itemIndex + (i - 1)] = itemsPosYFirst;
        }
      }
      count++;
      item.style.position = 'absolute';
      if (!args.animate) {
        item.style[transformProp] = 'translate(' + posX + 'px,' + posY + 'px)';
      } else {
        return args.animate(item, posX, posY, count);
      }
    }

    //Container height
    var containerHeight = itemsPosY
    .slice(0)
    .sort(function (a, b) {
      return a - b;
    })
    .pop();
    containerEle.style.height = containerHeight - gutterH + 'px';
  }

  // Exports in global environment
  global.ffgrid = ffgrid;

})(this);
