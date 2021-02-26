import React, { useState, useRef } from "react";
import "./App.css";
import Graph from "./Graph";

function ScoreCard() {
  const [firstTeamName, setFirstTeamName] = useState();
  const [secondTeamName, setSecondTeamName] = useState();
  const [teamNumber, setTeamNumber] = useState(1);

  const team1Ref = useRef();
  const team2Ref = useRef();

  const getTeamName = (name1, name2) => {
    setFirstTeamName(name1);
    setSecondTeamName(name2);
  };

  const active = (e) => {
    e.target.classList.add("active");
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.classList.remove("active");
      setTeamNumber(1);
    } else {
      e.target.previousElementSibling.classList.remove("active");
      setTeamNumber(2);
    }
  };

  return (
    <div className="app">
      <div className="innings">
        <div
          className="team team1 active"
          ref={team1Ref}
          onClick={(e) => {
            active(e);
          }}
        >
          {firstTeamName} INNS
        </div>
        <div
          className="team team2"
          ref={team2Ref}
          onClick={(e) => {
            active(e);
          }}
        >
          {secondTeamName} INNS
        </div>
      </div>
      <Graph getTeamName={getTeamName} teamNumber={teamNumber} />
    </div>
  );
}

export default ScoreCard;
