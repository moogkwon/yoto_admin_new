import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SummaryActions from '../../redux/SummaryRedux'
import AppConfig from '../../config/AppConfig'
import ws from 'adonis-websocket-client'

class Examinations extends Component {
  componentDidMount () {
    this.io = ws(AppConfig.baseURL)
    this.socket = this.io.channel('summary')
    this.socket
      .withJwt(this.props.auth.token)
      .connect()
    this.socket.on('connect', () => console.log('socket connected'))
    this.socket.on('message', message => console.log(message))
    this.socket.on('update', data => this.props.updateSummary(data))
    this.socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
  }

  componentWillUnmount () {
    this.socket.disconnect()
    delete this.socket
  }

  render () {
    return (
      <div />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(SummaryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examinations)
