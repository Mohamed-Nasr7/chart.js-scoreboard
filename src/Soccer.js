import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./Soccer.css";

function Soccer(props) {
  const [matchData, setMatchData] = useState();
  const [events, setEvents] = useState([]);
  const [coords, setCoords] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let matchId = props.match.params.matchId;
      const response = await fetch(
        `https://cric.dreamcasino.live/sportsdata/?mid=${matchId}`
      );

      const allData = await response.json();
      const data = allData?.result[0]?.data?.match;
      const events = allData?.result[0]?.data?.events;

      setMatchData(data);
      setEvents(events);
    };

    getData();
    calcCoords();
  }, [matchData]);

  //Chart configuration
  const options = {
    legend: {
      display: true,
      position: "top",
      align: "center",
      labels: {
        boxWidth: 0,
        fontColor: "white",
        fontStyle: "normal",
      },
    },
    /* title: {
      display: true,
      text: "title",
      fontSize: 14,
      fontColor: "grey",
      fontStyle: "light",
    }, */
    maintainAspectRatio: true,
    elements: {
      point: {
        radius: 1,
        pointStyle: "rect",
        hoverRadius: "7",
        backgroundColor: "#572",
      },
    },
    tooltips: {
      mode: "index",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          type: "linear",
          ticks: {
            autoSkip: false,
            stepSize: 15,
            suggestedMin: 0,
            max: 90,
            callback: function (value, index) {
              return index == 0 ? "" : value;
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
            autoSkip: true,
            stepSize: 200,
            max: 200,
            min: -200,
            callback: function (value) {
              return value == 0 ? value : "";
            },
          },
        },
      ],
    },
  };

  const calcCoords = () => {
    const coordinates = events.filter((item) => {
      return item.type == "ballcoordinates";
    });

    if (coordinates[0]?.coordinates[0].team == "home") {
      addPoint("home", coordinates);
    } else if (coordinates[0]?.coordinates[0].team == "away") {
      addPoint("away", coordinates);
    }
  };
  console.log(coords);

  const addPoint = (team, coordinates) => {
    let xYCoord = coords;
    if (events[0].time > time) {
      xYCoord.push({
        x: events[0].time,
        y:
          team == "home"
            ? coordinates[0]?.coordinates[0].Y
            : coordinates[0]?.coordinates[0].Y * -1,
      });
      setCoords(xYCoord);
      setTime(events[0].time);
    }
  };

  return (
    <div className="soccer">
      <div className="match-data">
        <p className="team-name">{matchData?.teams.home.name}</p>
        <div className="match-stats">
          <p className="status">
            {matchData?.status.name}
            <span>
              {events[0]?.time != undefined
                ? ` | ${events[0]?.time}' min `
                : ""}
            </span>
          </p>

          {matchData?.result && (
            <p className="result">
              {matchData?.result.home} : {matchData?.result.away}
            </p>
          )}
        </div>
        <p className="team-name">{matchData?.teams.away.name}</p>
      </div>

      <small>
        <b>{matchData?.teams.home.abbr}</b>
      </small>
      <Line
        data={{
          labels: [0, 15, 30, 45, 60, 75, 90],
          datasets: [
            {
              backgroundColor: "#1A74B510",
              borderColor: "#1A74B5",
              borderWidth: 1,
              pointRadius: 0,
              data: [...coords],
              borderJoinStyle: "round",
              label: "HT",
            },
          ],
        }}
        options={options}
        height={80}
      />
      <small>
        <b>{matchData?.teams.away.abbr}</b>
      </small>
    </div>
  );
}

export default Soccer;
