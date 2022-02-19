import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ColourRatings from './ColourRatings';
import TimelimitModal  from "./TimelimitModal";
import TheForm from "./Form";
import axios from 'axios';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import FactoryLogic from './Logic';
const factory = FactoryLogic();

export default Request = () => {
    const [ timeLimit, setTimeLimit ] = useState(0);
    const [ colourslist, setColourList ] = useState([]);
    const [ connection, setConnection ] = useState(null);
    const [ content, setContent ] = useState();

    //Get functions
    const populateBalloonColours = async ()=> {
        const colourdata = (await axios.get('/ballooncolours')).data;
        setColourList(colourdata);
        const timedata = (await axios.get('/ballooncolours/' + timeLimit)).data;
        setTimeLimit(timedata);
    };

    useEffect(()=>{
        populateBalloonColours();
      
        const newConnection = new HubConnectionBuilder()
            .withUrl('/BalloonHub')
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    },[]);

    useEffect(()=>{
        if (connection) {
            connection.start()
            .then(() => {
                console.log('Connected!');

                connection.on('GetBalloons', (data, time) => {
                    console.log(data);
                    setColourList(data);
                    setTimeLimit(time);
                  
                });
            })
            .catch(e => console.log('Connection failed: ', e));
        }
    },[connection]);

    useEffect(()=>{  
        if (timeLimit !== 0 && colourslist !== []) {
            factory.getColourList(colourslist);
            setContent(loadingContent());
        } else {
            setContent(stillLoading());
        }
    }, [timeLimit, colourslist])


    //Action functions (post, put, delete)
    const handleSubmit = async (colVal) => {
        
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


    //Displayed Content functions
    const loadingContent = () => {
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
        );
    }

    const stillLoading = ()=>{
        return (
            <div className="alert alert-info mt-5 mb-5 ml-5 mr-5">
                <h1 className="text-primary display-4 text-center">Loading...</h1>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    )
}