import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import CssColourList from './cssColours';
import { Hint } from 'react-autocomplete-hint';

export default function TheForm(props){
    const[input, setColour] = useState("");
    
    return (
        <>
            <Form className="form-inline">
                <Form.Group>
                    <div className="form-inline">
                        <Form.Label className="col-4 d-flex mx-auto justify-content-start"><h5>Request a colour:</h5></Form.Label>
                        <div className="input-group d-flex justify-content-center">
                            <Hint options={CssColourList}><input type="text" id="colourInput" className="form-control" placeholder="Enter colour" value={input} onChange={event => setColour(event.target.value)} style={{'width': '23em'}} required/></Hint>
                            <div className="input-group-append">
                                <button type="button" onClick={()=>props.submitFunc(input)} className="btn btn-primary">Request</button>
                            </div>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </>
    );
}