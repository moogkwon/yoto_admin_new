import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default class ModalConfirm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false
    }
  }

  onConfirm () {
    this.toggle()
    this.props.onConfirm()
  }

  toggle () {
    this.setState(state => ({ isShowModal: !state.isShowModal }))
  }

  render () {
    return (
      <Modal isOpen={this.state.isShowModal} toggle={() => this.toggle()} className='modal-sm' color={this.props.color}>
        <ModalHeader toggle={() => this.toggle()}>Confirmation</ModalHeader>
        <ModalBody>{this.props.message}</ModalBody>
        <ModalFooter>
          <Button color={this.props.color || 'primary'} onClick={() => this.onConfirm()}>{this.props.action}</Button>{' '}
          <Button color='secondary' onClick={() => this.toggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
