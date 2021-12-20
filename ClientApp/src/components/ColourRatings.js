import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { IoBalloon } from 'react-icons/io5';

export default function ColourRatings(props){
    const [display, modalShow] = useState(false);
    const [updateCol, update] = useState({cssVal: "", colVal: "", reqVal: ""});
    const [requestVal, reqUpdate] = useState('');

    const showModal = (cssVal, colVal, reqVal)=>{
        modalShow(true);
        update({cssVal: cssVal, colVal: colVal, reqVal: reqVal});
    }

    return(
        <>
            <div className="mt-5">
                <h4 className="mb-3">{props.colourRank}</h4>
                <div className="border rounded p-4" style={{"backgroundColor": "#D2F2FF", "borderColor": "#D2F2FF"}}>
                    <Table className="table table-hover text-center">
                        <thead>
                        <tr>
                            <th>Colour</th>
                            <th>Requests</th> 
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.colours.map(colourElem =>
                            <tr> 
                                <td><IoBalloon color={colourElem.cssStyleColourValue}/>{colourElem.colour}</td>
                                <td>{colourElem.requests}</td>
                                <td><Button className="btn btn-danger btn-sm" type="button" value={colourElem.cssStyleColourValue} onClick={()=>props.myFunction(colourElem.cssStyleColourValue)}>Remove</Button> 
                                    <Button className="btn btn-secondary btn-sm mx-1" type="button" value={colourElem.cssStyleColourValue} onClick={()=>showModal(colourElem.cssStyleColourValue, colourElem.colour, colourElem.requests)}>Edit</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={display}>
                <Modal.Header>
                    <Modal.Title><IoBalloon color={updateCol.cssVal}/>{updateCol.colVal} currently has {updateCol.reqVal} requests.</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group>
                        <Modal.Body>Set new amount of requests: <Form.Control type="number" min="1" value={requestVal} onChange={event => reqUpdate(event.target.value)} required></Form.Control></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>modalShow(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="button" onClick={()=>props.modalHandle(updateCol.cssVal, requestVal)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form.Group>
                </Form>
            </Modal>
        </>
    );
} 