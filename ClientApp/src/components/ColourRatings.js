import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button } from 'react-bootstrap';
import { IoBalloon } from 'react-icons/io5';

export default function ColourRatings(props){

    return(
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
                            <td><Button className="btn btn-danger btn-sm" type="button" value={colourElem.cssStyleColourValue} onClick={()=>props.myFunction(colourElem.cssStyleColourValue)}>Remove</Button> <Button className="btn btn-secondary btn-sm" type="button" value={colourElem.cssStyleColourValue} onClick={()=>props.modalHandle(colourElem.cssStyleColourValue, colourElem.colour, colourElem.requests)}>Edit</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
} 