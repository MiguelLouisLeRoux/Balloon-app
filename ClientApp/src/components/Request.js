import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Modal, Button} from 'react-bootstrap';
import ColourRatings from './ColourRatings';
import FactoryLogic from './Logic';
import { Hint } from 'react-autocomplete-hint';
import TimelimitModal  from "./TimelimitModal";
import { IoBalloon } from 'react-icons/io5';
import CssColourList from './cssColours'
import axios from 'axios';
const factory = FactoryLogic();


export default class Request extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            colour : '',
            submit: '',
            timeLimit : 5,
            showHideRequestModal : false,
            colourSelectedForUpdate : '',
            cssColourNameSelectedForUpdate : '',
            colourRequestSelectedForUpdate : '',
            colourRequestUpdateChange : '',
            colourRequestUpdateSubmitHandle : '',
            allballooncolourslist: [],
            trendList : factory.filtering("trending"),
            popList : factory.filtering("popular"),
            upList : factory.filtering("up and coming"),
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.timeLimitModal = this.timeLimitModal.bind(this);
        this.handleRequestModalShowHide = this.handleRequestModalShowHide.bind(this);
        this.handleRequestUpdate = this.handleRequestUpdate.bind(this);
        this.colourRequestUpdateSubmit = this.colourRequestUpdateSubmit.bind(this);
        this.removeColour = this.removeColour.bind(this);
       
        // setInterval(()=>{
        //     this.setState({
        //     trendList : factory.filtering("trending"),
        //     popList : factory.filtering("popular"),
        //     upList : factory.filtering("up and coming")})
        // }, 1000);
    }

    async componentDidMount() {
        this.populateBalloonColours();
    }

    componentDidUpdate(){
        console.log("component updated!");
        // this.populateBalloonColours();
       
    }

    handleChange(event) { 
        this.setState({
            colour : event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
            this.setState({
            submit: this.state.colour
        });
        factory.timeLimit(this.state.timeLimit);
        if (factory.cssColourValidation(this.state.colour) !== false) {
            axios.post("/ballooncolours/" + this.state.colour, this.state.colour);
            // this.populateBalloonColours();
            // factory.getColourList(this.state.allballooncolourslist);
            // this.setState({
            //     trendList : factory.filtering("trending"),
            //     popList : factory.filtering("popular"),
            //     upList : factory.filtering("up and coming") 
            // })
        }
    }

    removeColour(colVal){
        axios.delete("/ballooncolours/" + colVal, colVal);
        // this.populateBalloonColours();
        // factory.getColourList(this.state.allballooncolourslist);
    }

    timeLimitModal(timeLimitVal){
        this.setState({timeLimit : timeLimitVal})
        axios.put("/ballooncolours/" + timeLimitVal, timeLimitVal);
        // this.populateBalloonColours();
        factory.timeLimit(timeLimitVal);
        // this.setState({
        //     trendList : factory.filtering("trending"),
        //     popList : factory.filtering("popular"),
        //     upList : factory.filtering("up and coming")
        // })
    }

    handleRequestModalShowHide(cssVal, colVal, reqVal){
        this.setState({
            showHideRequestModal : !this.state.showHideRequestModal,
            cssColourNameSelectedForUpdate : cssVal,
            colourSelectedForUpdate : colVal,
            colourRequestSelectedForUpdate : reqVal
        })
    }

    handleRequestUpdate(event){
        this.setState({
            colourRequestUpdateChange : event.target.value
        })
    }
    
    colourRequestUpdateSubmit(event) {
        event.preventDefault()
        this.setState({
            colourRequestUpdateSubmitHandle : this.state.colourRequestUpdateChange
        })
        axios.put("/ballooncolours/" + this.state.cssColourNameSelectedForUpdate + "/" + this.state.colourRequestUpdateChange, this.state.cssColourNameSelectedForUpdate, this.state.colourRequestUpdateChange);
        // this.populateBalloonColours();
        // factory.getColourList(this.state.allballooncolourslist);
        // this.setState({
        //     colourRequestSelectedForUpdate : this.state.colourRequestUpdateChange,
        //     trendList : factory.filtering("trending"),
        //     popList : factory.filtering("popular"),
        //     upList : factory.filtering("up and coming")
        // })
    }


    render(){
        return (
            <div>
                <div className="container pl-5 pr-5 mt-2 d-flex justify-content-start">
                <TimelimitModal theTimeLimit={this.state.timeLimit} timeLimitFunction={this.timeLimitModal}/>
                <Modal show={this.state.showHideRequestModal}>
                    <Modal.Header>
                        <Modal.Title><IoBalloon color={this.state.cssColourNameSelectedForUpdate}/>{this.state.colourSelectedForUpdate} currently has {this.state.colourRequestSelectedForUpdate} requests.</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.colourRequestUpdateSubmit}>
                        <Form.Group>
                            <Modal.Body>Set new amount of requests: <Form.Control type="number" min="1" value={this.state.colourRequestUpdateChange} onChange={this.handleRequestUpdate} required></Form.Control></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>this.handleRequestModalShowHide()}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form.Group>
                    </Form>
                </Modal>
                </div>
                <div className="container mt-5 mb-3">
                    <div className="row">
                        <Form onSubmit={this.handleSubmit} className="form-inline">
                            <Form.Group>
                                <div className="form-inline">
                                    <Form.Label for="colourInput" className="col-4 d-flex mx-auto justify-content-start"><h5>Request a colour:</h5></Form.Label>
                                    <div className="input-group d-flex justify-content-center">
                                        <Hint options={CssColourList}><input type="text" id="colourInput" className="form-control" placeholder="Enter colour" value={this.state.colour} onChange={this.handleChange} style={{'width': '23em'}} required/></Hint>
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-primary">Request</button>
                                        </div>
                                    </div>
                                </div>
                            </Form.Group>
                        </Form> 
                    </div>
                </div>
                <div className="container">
                    <div className="row pl-3 pr-3">
                        <div className="col">
                            <ColourRatings colourRank={"🔥 Trending"} colours={this.state.trendList} myFunction={this.removeColour} modalHandle={this.handleRequestModalShowHide}/>
                        </div>
                        <div className="col">
                            <ColourRatings colourRank={"😎 Popular"} colours={this.state.popList} myFunction={this.removeColour} modalHandle={this.handleRequestModalShowHide}/>
                        </div>
                        <div className="col">
                            <ColourRatings colourRank={"🔝 Up and Coming Colours"} colours={this.state.upList} myFunction={this.removeColour} modalHandle={this.handleRequestModalShowHide}/>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }

    async populateBalloonColours() {
        const data = (await axios.get('/ballooncolours')).data;
        this.setState({allballooncolourslist: data});
        factory.getColourList(this.state.allballooncolourslist);
        const timedata = (await axios.get('/ballooncolours/' + this.state.timeLimit)).data;
        this.setState({timeLimit: timedata});
        factory.getTimeLimitVal(this.state.timeLimit);
    }
}