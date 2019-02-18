import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default class ModalReportPhoto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false
    }
  }

  onBlock () {
    this.toggle()
    this.props.onBlock()
  }

  toggle () {
    this.setState(state => ({ isShowModal: !state.isShowModal }))
  }

  render () {
    return (
      <Modal
        isOpen={this.state.isShowModal}
        toggle={() => this.toggle()}
        onOpened={() => this.refs.player && this.refs.player.play()}
        // onClosed={() => this.refs.player.stop()}
        // className='modal-lg'
        color='primary'
      >
        <ModalHeader toggle={() => this.toggle()}>Report Photo</ModalHeader>
        <ModalBody className='text-center'>
          {this.props.report && this.props.report.file_url && (
            <img
              src={this.props.report.file_url}
              alt='profile'
              className='img-thumbnail img-fluid'
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='warning' onClick={() => this.onBlock()}>Block</Button>{' '}
          <Button color='secondary' onClick={() => this.toggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
