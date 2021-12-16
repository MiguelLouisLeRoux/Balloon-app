import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default class TimelimitModal extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        show : false,
        time : ''
      }

      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.setTime = this.setTime.bind(this);
      this.submitTimeLimit = this.submitTimeLimit.bind(this);
    }

    handleClose () {
      this.setState({
        show : false
      })
    }

    handleShow () {
      this.setState({
        show : true
      })
    }

    setTime(event) {
      this.setState({
        time : event.target.value
      })
    }

    submitTimeLimit(event) {
      event.preventDefault();
      this.props.timeLimitFunction(this.state.time);
    }
    
    render () {
    return (

      <div>
        <p  className="text-primary cursor-pointer" style={{"cursor": "pointer"}} onClick={this.handleShow}>
            Set time limit for trending balloons
        </p>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Current trending time limit is: {this.props.theTimeLimit}min</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.submitTimeLimit}>
            <Modal.Body>Set new time limit (minutes): <Form.Control type="number" min="1" value={this.state.time} onChange={this.setTime} required></Form.Control></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
    }
  }