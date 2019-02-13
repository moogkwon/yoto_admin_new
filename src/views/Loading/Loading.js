import React, { Component } from 'react'
import './style.css'

class Loading extends Component {
  render () {
    return (
      <div className='loading-wrap'>
        <div className='loading'>
          <div className='loading-title'>Loading...</div>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
}

export default Loading
