/**
 * screenshot class
 */

 import NodeTypes from './node-types';

 import Konva from 'konva';

 const ABSOLUTE_OPACITY = 'absoluteOpacity',
    ABSOLUTE_TRANSFORM = 'absoluteTransform',
    LISTENING = 'listening',
    VISIBLE = 'visible',
    STAGE = 'stage';

 /** 
  * 扩展Konva.Node
  * 在konva中，所有元素都基于Konva.Node这个类
 */
  Konva.Util.addMethods(Konva.Node, {

    appendChild: function(konvaNode){
      if(this.add){
        this.add(konvaNode);
      }else{
        console.warn('only stage, layer, group can add element');
      }
      return this;
    },

    /**
     * 插入子节点
     * @param {*} newNode 
     * @param {*} nextNode 
     */
    insertBefore: function(newNode, nextNode){
      
      if (this.children && this.children.length > 0) {
        this.children.splice(nextNode.index, 0, newNode);
        this._setChildrenIndices();
      }else{
        this.appendChild(newNode);
      }

      // every cached attr that is calculated via node tree
      // traversal must be cleared when removing a node
      this._clearSelfAndDescendantCache(STAGE);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      this._clearSelfAndDescendantCache(VISIBLE);
      this._clearSelfAndDescendantCache(LISTENING);
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

      return this;
    },

    replaceChild: function(newDom, lastDom){
      if (this.children && this.children.length > 0) {
        this.children.splice(lastDom.index, 1, newDom);
        this._setChildrenIndices();
      }else{
        this.appendChild(newNode);
      }

      // every cached attr that is calculated via node tree
      // traversal must be cleared when removing a node
      this._clearSelfAndDescendantCache(STAGE);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      this._clearSelfAndDescendantCache(VISIBLE);
      this._clearSelfAndDescendantCache(LISTENING);
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

      return this;
    },

    removeChild: function(konvaNode){
      konvaNode.destroy();
    },

    setAttribute: function(key, value){
      this.setAttr(key, value);
    }
  })
 
 export function createElement(name) {
  if(NodeTypes.indexOf(name) === -1){
    console.warn(`create element fail, return null: inviable type ${name}`);
    return null;
  }

  const className = Konva[name];

  if(name === 'Stage'){
    const containerELe = document.createElement('div');
    return new Konva.Stage({
      container: containerELe
    });
  }
  
  return new className();
 }

 export default createElement;