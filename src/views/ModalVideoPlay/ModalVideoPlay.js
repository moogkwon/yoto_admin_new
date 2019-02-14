import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Player, LoadingSpinner } from 'video-react'
import 'video-react/dist/video-react.css'

export default class ModalVideoPlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false
    }
  }

  onReject () {
    this.toggle()
    this.props.onReject()
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
        <ModalHeader toggle={() => this.toggle()}>User profile</ModalHeader>
        <ModalBody className='text-center'>
          {this.props.user && (
            this.props.user.profile_video_url
              ? (
                <Player
                  ref='player'
                  playsInline
                  // poster='/assets/poster.png'
                  src={this.props.user && this.props.user.profile_video_url}
                >
                  <LoadingSpinner />
                </Player>
              )
              : this.props.user.profile_photo_url
                ? <img
                  src={this.props.user.profile_photo_url}
                  alt='profile photo'
                  className='img-thumbnail img-fluid'
                />
                : null
          )}

        </ModalBody>
        <ModalFooter>
          <Button color='warning' onClick={() => this.onReject()}>Reject</Button>{' '}
          <Button color='secondary' onClick={() => this.toggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
