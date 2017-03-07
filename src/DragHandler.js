/* eslint-disable react/no-set-state */
import React, { PropTypes, Component } from 'react'

export default class DragHandler extends Component {

  static propTypes = {
    // cusor: xx-resize
    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor
    dir: PropTypes.string.isRequired,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    onUpdate: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    onEnd () {},
    onStart () {},
    onUpdate () {},
  };

  constructor () {
    super()
    this.handleMouseDown = ::this.handleMouseDown
    this.handleMouseUp = ::this.handleMouseUp
    this.handleMouseMove = ::this.handleMouseMove
    this.state = { isDragging: false }
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown (e) {
    this.setState({ isDragging: true })
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    this.props.onStart(e)
  }

  handleMouseUp (e) {
    this.setState({ isDragging: false })
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
    this.props.onEnd(e)
  }

  // todo: mousemove throttle
  handleMouseMove (e) {
    this.props.onUpdate(e)
  }

  render () {
    let { dir, style, className, children } = this.props
    return (
      <div onMouseDown={this.handleMouseDown}
        className={className}
        style={{
          cursor: `${dir}-resize`,
          ...style,
        }}>

        {this.state.isDragging && <style>{`
        * {
          cursor: ${dir}-resize !important;
          -webkit-user-select: none !important;
        }
        `}</style>}

        {children}
      </div>
    )
  }
}
