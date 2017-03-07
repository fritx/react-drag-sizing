/* eslint-disable react/no-set-state */
import React, { PropTypes, Component } from 'react'
import DragHandler from './DragHandler'

export default class DragResize extends Component {
  static propTypes = {
    border: PropTypes.string.isRequired,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    onUpdate: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    handlerClassName: PropTypes.string,
    handlerStyle: PropTypes.object,
    handlerWidth: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    handlerStyle: {},
  };

  constructor (props) {
    super()
    this.handleStart = ::this.handleStart
    this.handleEnd = ::this.handleEnd
    this.handleUpdate = ::this.handleUpdate

    this.props = props
    this.containerMeta = this.getContainerMeta()

    this.oldSize = null
    this.oldCoord = null
    this.state = { diffCoord: 0 }
  }

  handleStart (e) {
    let { wh, xy } = this.containerMeta
    let px = getComputedStyle(this.refs.box)[wh]

    this.oldSize = parseInt(px)
    this.oldCoord = e[xy]

    if (this.props.onStart) {
      this.props.onStart(e)
    }
  }

  handleEnd (e) {
    if (this.props.onEnd) {
      this.props.onEnd(e)
    }
  }

  handleUpdate (e) {
    let { xy } = this.containerMeta
    this.setState({
      diffCoord: e[xy] - this.oldCoord
    })

    if (this.props.onUpdate) {
      this.props.onUpdate(e)
    }
  }

  render () {
    let { className, handlerClassName } = this.props
    let { style } = this.getContainerInfo()
    let { dir, style: handlerStyle } = this.getHandlerInfo()

    return (
      <div ref="box" className={className} style={{
        position: 'relative',
        ...style,
      }}>

        <DragHandler dir={dir} className={handlerClassName} style={{
          position: 'absolute',
          zIndex: 1,
          ...handlerStyle,
        }} {...{
          onStart: this.handleStart,
          onEnd: this.handleEnd,
          onUpdate: this.handleUpdate,
        }} />

        {this.props.children}
      </div>
    )
  }

  getContainerMeta () {
    let { border } = this.props
    let wh, xy, sn

    if (/^left|right$/.test(border)) {
      wh = 'width'
      xy = 'clientX'
      sn = border === 'right' ? 1 : -1
    } else if (/^top|bottom$/.test(border)) {
      wh = 'height'
      xy = 'clientY'
      sn = border === 'bottom' ? 1 : -1
    }
    return { wh, xy, sn }
  }

  getContainerInfo () {
    let { diffCoord } = this.state
    let { wh, sn } = this.containerMeta
    let style = {}

    if (this.oldSize != null) {
      style[wh] = this.oldSize + diffCoord * sn
    }
    style = {
      ...style,
      ...this.props.style,
    }
    return { style }
  }

  getHandlerInfo () {
    let { border, handlerWidth, handlerStyle } = this.props
    let dir, style = {}

    if (/^left|right$/.test(border)) {
      dir = 'ew'
      style.width = handlerWidth
      style.top = 0
      style.bottom = 0
    } else if (/^top|bottom$/.test(border)) {
      dir = 'ns'
      style.height = handlerWidth
      style.left = 0
      style.right = 0
    }
    style[border] = this.props.handlerOffset

    style = { ...style, ...handlerStyle }
    return { dir, style }
  }
}
