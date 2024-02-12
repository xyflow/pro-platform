## Usage Instructions

The example app contains some default nodes with different sizes. If you drag a node around, you can see that the node will snap and align with the boundaries of other nodes while a helper line is displayed.

## Core Concept

To implement helper lines, we need to solve two problems: Displaying the helper lines at the right place and snapping the dragged node to the position of the helper line.

For the calculation of the helper lines, we need to compare the bounding box of the currently dragged node to the bounding boxes of all other nodes first. If the bounds collide (with a certain threshold), we need to adjust the position of the dragged node to be aligned with the helper line and display the helper lines.

It is important that only one helper line can be shown at a time for one direction (horizontal, vertical) as multiple nodes can be within the helper line threshold. In our algorithm, we want to calculate the two helper lines that are closest to the node.

## Getting Started

This example has no third party dependencies, so the only dependency that you need to install is `reactflow` itself (in case you don't have it already):

```sh
npm install reactflow
```

In initialElements.ts. We don't display any edges in this example, as it's just about the helper lines between nodes.

## Implementing a custom `onNodesChange` function

The core piece of this example is the custom `onNodesChange` function which is being used to calculate the helper lines and node position while a node is being dragged. Within the `onNodesChange` callback, we can access the node changes that are being triggered within React Flow (for example a position change while dragging a node) and apply them to our local state outside of React Flow. If you are not familiar with this concept, yet, you can read more in our [documentation](https://reactflow.dev/learn/getting-started/adding-interactivity).

A typical `onNodesChange` function would look like this:

```js
import { applyNodeChanges } from 'reactflow';

const setNodes = useState(myNodes);

function onNodesChange(changes) {
  setNodes((nodes) => applyNodeChanges(changes, nodes));
}
```

In our example, we are adjusting this `onNodesChange` function because we want to calculate the helper lines while dragging a node and overwriting the node position to snap it to the helper line. This is being done by overwriting the position change object within the onNodesChange callback. So, within our custom onNodesChange callback, we are first checking if the change that has triggered the callback is a single node being dragged (only then we want to calculate the helper lines, all other changes are staying the same):

```js
function onNodesChange(changes) {
  // detect if this is a position change from a single node being dragged
  if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
    // 1️⃣ calculate the helper lines based on the position where the node has been dragged
    // 2️⃣ adjust the change position to the snap coordinates of the helper line, will be applied later
    // 3️⃣ set the state of the helper lines to display them
  }
  // applyNodeChanges (will apply the modified change object, too)
}
```

The `applyNodeChanges` is a helper function built into React Flow which manipulates the nodes using the changes. You can use this function to manipulate your local nodes state with the changes triggered by React Flow (for example by dragging a node).

## The `getHelperLines` function

Within the `onNodesChange` callback, we now need to call a helper function which will calculate the helper line positions and the node snap position based on the dragged node. Therefore, we pass the current nodes and the node change object to the function.

Please note that the helper line position might be different from the node snap position, for example if it should snap to the right boundary. So, an example result of the `getHelperLines` function looks like this:

```js
{
  // vertical helper line at coordinate 15
  vertical: 15,
  // no horizontal helper line
  horizontal: undefined,
  // snap the node x coordinate to position -20
  snapPosition: { x: -20, y: undefined }
}
```

Within the function, we are creating two bounding boxes to compare: The node that has been dragged and the bounding box of the node to compare to. For all the cases that we want the helper lines to being displayed, we are checking if the node position is within the specified distance of the other nodes position and adding it to our result. We are storing the current distances so that we return the helper line with the least distance whenever we found multiple ones. This code section checks for the vertical helper line between node A and node B:

```js
//  |‾‾‾‾‾‾‾‾‾‾‾|
//  |     A     |
//  |___________|
//              |
//              |
//              |‾‾‾‾‾‾‾‾‾‾‾|
//              |     B     |
//              |___________|
const distanceRightLeft = Math.abs(nodeABounds.right - nodeBBounds.left);

if (distanceRightLeft < verticalDistance) {
  result.snapPosition.x = nodeBBounds.left - nodeABounds.width;
  result.vertical = nodeBBounds.left;
  verticalDistance = distanceRightLeft;
}
```

As you can see, the result contains a different snap position than the position of the helper line because node A needs to be shifted by its width. For the whole function, please see utils.ts.

## Displaying the helper lines on a canvas

Now that we have the current helper lines, we can display them in our React Flow app. Therefore, we pass the horizontal and vertical position to our HelperLines component. This component renders a `canvas` element on top of React Flow and draws the lines using the canvas API:

```js
if (typeof vertical === 'number') {
  ctx.moveTo(vertical * transform[2] + transform[0], 0);
  ctx.lineTo(vertical * transform[2] + transform[0], height);
  ctx.stroke();
}
```

As you can see, it takes the transform and scale of the React Flow viewport into account which makes the helper lines display correctly even if the viewport is moved or zoomed.

## Summary

This example was designed so that it can be easily adapted to your use case. You can customize the appearance of the helper lines, change the snap distance or add more helper lines (for example in the center of a node). If you need help or have any questions regarding this example, please reach out!

## License

MIT License

Copyright (c) 2023 webkid GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
