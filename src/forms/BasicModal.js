import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from  'reactstrap';
import React, {Component} from 'react';

class BasicModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isOpen : props.isOpen,
    };

  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> {this.props.modalTitle} </ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default BasicModal;