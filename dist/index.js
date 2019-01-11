'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;
exports.isCanvasElement = isCanvasElement;

var _nodeTypes = require('./node-types');

var _nodeTypes2 = _interopRequireDefault(_nodeTypes);

var _konva = require('konva');

var _konva2 = _interopRequireDefault(_konva);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * screenshot class
 */

var ABSOLUTE_OPACITY = 'absoluteOpacity',
    ABSOLUTE_TRANSFORM = 'absoluteTransform',
    LISTENING = 'listening',
    VISIBLE = 'visible',
    STAGE = 'stage';

/**
 * 扩展Konva.Node
 * 在konva中，所有元素都基于Konva.Node这个类
 */
_konva2.default.Util.addMethods(_konva2.default.Node, {
  appendChild: function appendChild(konvaNode) {
    if (this.add) {
      this.add(konvaNode);
      // konvaNode.cache && konvaNode.cache();
    } else {
      console.warn('only stage, layer, group can add element');
    }
    this.update();
    return this;
  },

  update: function update() {
    var layer = this.getLayer();
    if (layer) {
      layer.batchDraw();
    } else {
      // console.warn('update canvas fail: can not find layer');
    }
  },


  isCanvasNode: true,

  /**
   * 插入子节点
   * @param {*} newNode
   * @param {*} nextNode
   */
  insertBefore: function insertBefore(newNode, nextNode) {
    if (this.children && this.children.length > 0) {
      this.children.splice(nextNode.index, 0, newNode);
      this._setChildrenIndices();
    } else {
      this.appendChild(newNode);
    }

    // every cached attr that is calculated via node tree
    // traversal must be cleared when removing a node
    this._clearSelfAndDescendantCache(STAGE);
    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    this._clearSelfAndDescendantCache(VISIBLE);
    this._clearSelfAndDescendantCache(LISTENING);
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

    this.update();
    return this;
  },

  replaceChild: function replaceChild(newDom, lastDom) {
    if (this.children && this.children.length > 0) {
      this.children.splice(lastDom.index, 1, newDom);
      this._setChildrenIndices();
    } else {
      this.appendChild(newNode);
    }

    // every cached attr that is calculated via node tree
    // traversal must be cleared when removing a node
    this._clearSelfAndDescendantCache(STAGE);
    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    this._clearSelfAndDescendantCache(VISIBLE);
    this._clearSelfAndDescendantCache(LISTENING);
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

    this.update();
    return this;
  },

  removeChild: function removeChild(konvaNode) {
    konvaNode.destroy();
    this.update();
    return this;
  },

  setAttribute: function setAttribute(key, value) {
    this.setAttr(key, value);
    this.update();
    return this;
  }
});

function createElement(name) {
  if (_nodeTypes2.default.indexOf(name) === -1) {
    console.warn('create element fail, return null: inviable type ' + name);
    return null;
  }

  var konvaType = name.replace('canvas', '');

  var className = _konva2.default[konvaType];

  if (konvaType === 'Stage') {
    var containerELe = document.createElement('div');
    return new _konva2.default.Stage({
      container: containerELe
    });
  }

  return new className();
}

function isCanvasElement(name) {
  return _nodeTypes2.default.indexOf(name) !== -1;
}

exports.default = createElement;