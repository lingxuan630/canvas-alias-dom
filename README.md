# `canvas-alias-dom`

> 这个包主要为了提供一个类似DOM的Canvas渲染器，目前主要基于[konva](https://github.com/konvajs/konva)提供类似DOM的API

## Usage

```
const { createElement } = require('canvas-alias-dom');

const canvasNode = createElement('Stage');

```

## 主要提供一下接口

createElement(name) : 创建一个元素

node.appendChild(domNode): 添加一个子节点

node.insertBefore(newNode, nextNode): 插入一个兄弟节点

node.replaceChild(newDom, lastDom): 更换一个子节点

node.removeChild(childNode): 删除一个子节点

node.setAttribute(): 设置属性

