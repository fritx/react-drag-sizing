# react-drag-resize

\[WIP\] "Drag to resize" as React Component.

<img width="359" src="demo.gif">

### Layout

```js
import DragResize from 'react-drag-resize'

<div className="chat-top"></div>
<div className="chat-body">
  <div className="chat-left">
    <MessageList />
    <DragResize border="top"
      handlerOffset={-4}
      onStart={this.handleEditorResizeStart}
      onEnd={this.handleEditorResizeEnd}>
      <Editor />
    </DragResize>
  </div>
  <div className="chat-right">
    <DragResize border="left">
      <MemberList />
    </DragResize>
  </div>
</div>
```

### Hooks

```js
handleEditorResizeStart () {
  this.shouldStickToBottom = true || false
}
handleEditorResizeEnd () {
  if (this.shouldTickToBottom) {
    this.scrollToBottom()
  }
}

<DragResize border="top"
  onStart={this.handleEditorResizeStart}
  onEnd={this.handleEditorResizeEnd}>
  <Editor />
</DragResize>
```

### Props

```js
border: PropTypes.string.isRequired, // left|right|top|bottom
onStart: PropTypes.func,
onEnd: PropTypes.func,
onUpdate: PropTypes.func,
className: PropTypes.string,
style: PropTypes.object,
handlerClassName: PropTypes.string,
handlerStyle: PropTypes.object,
handlerWidth: PropTypes.number,
```
