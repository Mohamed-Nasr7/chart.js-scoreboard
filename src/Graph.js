import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
//import dateFormat from "dateformat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { innings } from "./redux/actions";
import { teamStarts } from "./redux/actions";
import { teamOne } from "./redux/actions";
import { teamTwo } from "./redux/actions";
import { addFirstChartData } from "./redux/actions";
import { addSecondChartData } from "./redux/actions";
import "./Graph.css";
import "./App.css";

function Graph({ params }) {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [overs, setOvers] = useState();
  const [runs, setRuns] = useState();
  const [wicket, setWicket] = useState();
  //const [runRate, setRunRate] = useState();
  const dispatch = useDispatch();
  const activeChart = useSelector((state) => state.team.activeChart);
  const startTeam = useSelector((state) => state.team.startTeam);
  const firstTeam = useSelector((state) => state.team.teamOne);
  const secondTeam = useSelector((state) => state.team.teamTwo);
  let chartOne = useSelector((state) => state.chart.chartOne);
  let chartTwo = useSelector((state) => state.chart.chartTwo);

  useEffect(() => {
    let matchId = params.matchId;
    if (JSON.parse(localStorage.getItem("cricketId")) != matchId) {
      localStorage.removeItem("persist:root");
      localStorage.setItem("cricketId", JSON.stringify(matchId));
    } else {
      localStorage.setItem("cricketId", JSON.stringify(matchId));
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      let matchId = params.matchId;
      const response = await fetch(
        `https://cric.dreamcasino.live/sportsdata/?mid=${matchId}`
      );

      const allData = await response.json();
      const buildData = allData?.result[0]?.data?.match;

      let noOfInnings;
      buildData?.resultinfo?.innings &&
        Object.keys(buildData?.resultinfo?.innings).map((keyName, index) => {
          noOfInnings = index + 1;
        });

      dispatch(innings(noOfInnings));
      dispatch(teamStarts(buildData?.resultinfo?.innings[1]?.team)); //home or away

      if (startTeam == "home") {
        dispatch(teamOne(buildData?.teams?.home?.name));
        dispatch(teamTwo(buildData?.teams?.away?.name));
      } else {
        dispatch(teamOne(buildData?.teams?.away?.name));
        dispatch(teamTwo(buildData?.teams?.home?.name));
      }

      //setTeam(buildData.teams[startTeam].name);
      setOvers(buildData?.resultinfo?.innings[activeChart]?.overs);
      setRuns(buildData?.resultinfo?.innings[activeChart]?.runs);
      //setRunRate(buildData?.current_run_rate);
      setWicket(buildData?.resultinfo?.innings[activeChart]?.wickets);

      setData(allData?.result);
      setChartData(buildData);
      buildChartData();
    };
    getData();
  }, [chartData]);

  const addPoint = () => {
    const newPoint = {
      x: chartData?.resultinfo?.innings[activeChart]?.overs
        ? chartData?.resultinfo?.innings[activeChart]?.overs
        : 0,
      y: chartData?.current_run_rate ? chartData?.current_run_rate : 0,
    };
    return newPoint;
  };

  const buildChartData = () => {
    if (activeChart == 1) {
      let chartData = chartOne;
      let newPoint = addPoint();
      if (
        chartData[chartData.length - 1]?.x !== newPoint.x &&
        newPoint.x != 0
      ) {
        let newChartData = [...chartData, newPoint];
        dispatch(addFirstChartData(newChartData));
      }
    } else {
      let chartData = chartTwo;
      let newPoint = addPoint();
      if (
        chartData[chartData.length - 1]?.x !== newPoint.x &&
        newPoint.x != 0
      ) {
        let newChartData = [...chartData, newPoint];
        dispatch(addSecondChartData(newChartData));
      }
    }
  };

  const teamCoords = () => {
    return activeChart === 1 ? chartOne : chartTwo;
  };

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
      text: `${dateFormat(new Date(), "mmm d")} ${
        data[0]?.data?.match?._dt?.time
          ? ` | ${data[0]?.data?.match?._dt?.time}`
          : ""
      }`,
      fontSize: 14,
      fontColor: "grey",
      fontStyle: "light",
    }, */
    maintainAspectRatio: true,
    responsive: true,
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
            stepSize: 5,
            suggestedMin: 0,
            suggestedMax: 50,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            autoSkip: true,
            stepSize: 10,
            max: 10,
          },
        },
      ],
    },
  };

  return (
    <div className="graph">
      {data?.length > 0 && (
        <div className="container">
          <div className="teams">
            <p>{chartData?.teams?.home?.name}</p>
            <p className="status">{chartData?.status?.name}</p>
            <p>{chartData?.teams?.away?.name}</p>
          </div>

          {chartData?.resultinfo?.innings && (
            <div className="match-info">
              <p>
                {startTeam === "home"
                  ? `${
                      chartData.resultinfo.innings[1]
                        ? chartData.resultinfo.innings[1].runs +
                          "/" +
                          chartData.resultinfo.innings[1].wickets
                        : "Yet to bat"
                    } : ${
                      chartData.resultinfo.innings[2]
                        ? chartData.resultinfo.innings[2].runs +
                          "/" +
                          chartData.resultinfo.innings[2].wickets
                        : "Yet to bat"
                    }`
                  : `${
                      chartData.resultinfo.innings[2]
                        ? chartData.resultinfo.innings[2].runs +
                          "/" +
                          chartData.resultinfo.innings[2].wickets
                        : "Yet to bat"
                    } : ${
                      chartData.resultinfo.innings[1]
                        ? chartData.resultinfo.innings[1].runs +
                          "/" +
                          chartData.resultinfo.innings[1].wickets
                        : "Yet to bat"
                    }`}
              </p>

              <p>
                {activeChart === 1 ? firstTeam : secondTeam} are {runs} runs for{" "}
                {wicket} wickets after {overs} overs
              </p>
            </div>
          )}

          <Line
            data={{
              datasets: [
                {
                  backgroundColor: "#1A74B510",
                  borderColor: "#1A74B5",
                  borderWidth: 1,
                  pointRadius: 0,
                  data: [...teamCoords()],
                  label: "RUN RATE", //name of th axis
                  borderJoinStyle: "round",
                },
              ],
            }}
            options={options}
            height={110}
          />
        </div>
      )}
    </div>
  );
}

export default Graph;
