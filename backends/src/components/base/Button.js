import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class Button extends Component {
     //默认值
    static defaultProps={
        context:'我是按钮'
    }
    //验证
    static propTypes = {
      context:PropTypes.string
    }
    render() {
        return (
            <button ref={this.ref}>
              {this.props.context}
              {this.props.children}
            </button>
        )
    }
}
export default Button