import React, { useState, useEffect } from "react";
import "./Tennis.css";

function Tennis(props) {
  const [matchData, setMatchData] = useState({});
  const [firstPlayerData, setFirstPlayerData] = useState({});
  const [secondPlayerData, setSecondPlayerData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let matchId = props.match.params.matchId;

      const response = await fetch(
        `https://cric.dreamcasino.live/sportsdata/?mid=${matchId}`
      );
      const fetchedData = await response.json();
      console.log(fetchedData);

      if (fetchedData.result[0].event == "exception") {
        setMatchData(false);
        return;
      }

      let data = fetchedData?.result[0]?.data?.match;

      let matchResult = {
        gameScore: data.gamescore,
        set: data.status.name,
      };
      let playerOne = players(data, "home");
      let playerTwo = players(data, "away");

      setMatchData(matchResult);
      setFirstPlayerData(playerOne);
      setSecondPlayerData(playerTwo);
    };
    getData();
  }, [matchData]);

  const players = (data, order) => {
    let player = {
      name: data.teams[order].name,
      score: data.result[order],
      periods: data.periods,
      icon: data.teams[order].cc.a2,
    };
    return player;
  };

  return (
    <div className="tennis">
      {matchData && (
        <section className="above-section">
          <div className="player-details">
            <img
              src={`https://ls.sportradar.com/ls/crest/big/${firstPlayerData?.icon}.png`}
              alt="flag"
            />
            <p className="player-name">{firstPlayerData.name}</p>
          </div>

          <div>
            <p className="set">
              {matchData.set == "Not started" || matchData.set == "Ended" ? (
                matchData.set
              ) : (
                <b>Set: {matchData.set}</b>
              )}
            </p>
            <p className="goals">
              {matchData.gameScore?.home
                ? matchData.gameScore.home
                : firstPlayerData.score}{" "}
              :{" "}
              {matchData.gameScore?.away
                ? matchData.gameScore.away
                : secondPlayerData.score}
            </p>
          </div>

          <div className="player-details">
            <img
              src={`https://ls.sportradar.com/ls/crest/big/${secondPlayerData?.icon}.png`}
              alt="flag"
            />
            <p className="player-name">{secondPlayerData.name}</p>
          </div>
        </section>
      )}

      <section className="below-section">
        <div className="table">
          {firstPlayerData.periods && (
            <ul>
              {Object.keys(firstPlayerData.periods).map((keyName, index) => {
                return <li key={index}>{++index}</li>;
              })}
              <li>T</li>
            </ul>
          )}
        </div>
        <div className="results">
          <div className="results-list first">
            <div className="player-details scores">
              <img
                src={`https://ls.sportradar.com/ls/crest/big/${firstPlayerData?.icon}.png`}
                alt="flag"
              />
              <p className="player-name">{firstPlayerData.name}</p>
            </div>
            {firstPlayerData.periods && (
              <ul>
                {Object.keys(firstPlayerData.periods).map((keyName, index) => {
                  return (
                    <li key={index}>{firstPlayerData.periods[keyName].home}</li>
                  );
                })}
                <li>{firstPlayerData.score}</li>
              </ul>
            )}
          </div>

          <div className="results-list second">
            <div className="player-details scores">
              <img
                src={`https://ls.sportradar.com/ls/crest/big/${secondPlayerData?.icon}.png`}
                alt="flag"
              />
              <p className="player-name">{secondPlayerData.name}</p>
            </div>
            {secondPlayerData.periods && (
              <ul>
                {Object.keys(secondPlayerData.periods).map((keyName, index) => {
                  return (
                    <li key={index}>
                      {secondPlayerData.periods[keyName].away}
                    </li>
                  );
                })}
                <li>{secondPlayerData.score}</li>
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tennis;
