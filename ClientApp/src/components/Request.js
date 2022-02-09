import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ColourRatings from './ColourRatings';
import TimelimitModal  from "./TimelimitModal";
import TheForm from "./Form";
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import FactoryLogic from './Logic';
const factory = FactoryLogic();

export default function Request (props){
    const [timeLimit, setTimeLimit] = useState(5);
    const [colourslist, setColourList] = useState([]);
    const [connection, setConnection] = useState(null);

    const populateBalloonColours = async ()=> {
        const colourdata = (await axios.get('/ballooncolours')).data;
        setColourList(colourdata);
        factory.getColourList(colourdata);
        const timedata = (await axios.get('/ballooncolours/' + timeLimit)).data;
        setTimeLimit(timedata);
    };

    useEffect(()=>{
        populateBalloonColours();
       
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/BalloonHub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    },[]);

    useEffect(()=>{
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('GetBalloons', list => {
                      
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    },[connection]);

    const handleSubmit = (colVal) => {
        if (factory.cssColourValidation(colVal) !== false) {
            axios.post("/ballooncolours/" + colVal, colVal);
        }
    }

    const removeColour = (colVal) => {
        axios.delete("/ballooncolours/" + colVal, colVal);
    }

    const timeLimitModal = (timeLimitVal) => {
        setTimeLimit(timeLimitVal);
        axios.put("/ballooncolours/" + timeLimitVal, timeLimitVal);
    }

    const colourRequestUpdate = (cssVal, reqVal) => {
        axios.put("/ballooncolours/" + cssVal + "/" + reqVal, cssVal, reqVal);
    }

    return (
        <div>
            <div className="container pl-5 pr-5 mt-2 d-flex justify-content-start">
                <TimelimitModal theTimeLimit={timeLimit} timeLimitFunction={timeLimitModal}/>
            </div>
            <div className="container mt-5 mb-3">
                <div className="row">
                    <TheForm submitFunc={handleSubmit}/>
                </div>
            </div>
            <div className="container">
                <div className="row pl-3 pr-3">
                    <div className="col">
                        <ColourRatings colourRank={"🔥 Trending"} colours={factory.filtering("trending")} myFunction={removeColour} modalHandle={colourRequestUpdate}/>
                    </div>
                    <div className="col">
                        <ColourRatings colourRank={"😎 Popular"} colours={factory.filtering("popular")} myFunction={removeColour} modalHandle={colourRequestUpdate}/>
                    </div>
                    <div className="col">
                        <ColourRatings colourRank={"🔝 Up and Coming Colours"} colours={factory.filtering("up and coming")} myFunction={removeColour} modalHandle={colourRequestUpdate}/>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}