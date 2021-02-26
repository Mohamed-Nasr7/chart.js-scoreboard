import React from "react";
import Graph from "../Graph";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { activeTeam } from "../redux/actions";

function Home(props) {
  const firstTeam = useSelector((state) => state.team.teamOne);
  const secondTeam = useSelector((state) => state.team.teamTwo);
  const activeChart = useSelector((state) => state.team.activeChart);
  let numberOfInnings = useSelector((state) => state.team.numberOfInnings);
  const dispatch = useDispatch();

  const active = (e, elementNum) => {
    Array.from(e.target.parentElement.children).forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(elementNum);
    dispatch(activeTeam(elementNum));
  };

  return (
    <div className="app">
      <div className="innings">
        {Array(numberOfInnings)
          .fill(1)
          .map((item, index) => (
            <div
              key={index}
              className={`team ${activeChart == index + 1 ? "active" : ""}`}
              //ref={`team${index + 1}Ref`}
              onClick={(e) => {
                active(e, index + 1);
              }}
            >
              {index % 2 == 0 ? firstTeam : secondTeam} INNS
            </div>
          ))}
      </div>

      <Graph params={props.match.params} />
    </div>
  );
}

export default Home;
