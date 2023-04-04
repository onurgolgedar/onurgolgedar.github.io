import "../../css_files/sectionArcade_style.css";
import "../../css_files/singleGame_style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useLocation, NavLink } from "react-router-dom";
import { useState } from "react";

import SingleGameDescription from "./SingleGameDescription";
import SingleGamePlay from "./SingleGamePlay";

const SectionArcade = ({type}) => {
  const [linkGame, setLinkGame] = useState("description");
  
  const location = useLocation();
  const game_data = location.state.game_data;

  const handleClick = (path) => {
    setLinkGame(path)
  }

  return (
    <div>
      <section className="sectionArcade--body">
        <div className="SingleGame_TopSection">
          <h2>{type === "arcade" ? "Arcade" : "Wiki"}</h2>
          <div className="SingleGame_TopButtons">
            <NavLink
              to={"/arcade/123/description"}
              state={{game_data: game_data, type: type}}
              type="button"
              className={linkGame === "description" ? "btn btn-light" : "btn btn-dark"}
              onClick={() => {handleClick("description")}}
            >
              Description/Comments
            </NavLink>

            {
              type === "arcade" &&
              <NavLink
              to={"/arcade/123/play"}
              state={{game_data: game_data, type: type}}
              type="button"
              className={linkGame === "play" ? "btn btn-light play_btn" : "btn btn-dark play_btn"}
              onClick={() => handleClick("play")}>
              PLAY
            </NavLink>}

          </div>
        </div>
        <div className="Content-Wrapper">
            {linkGame === "description" ? (
            <SingleGameDescription data={game_data} type={type}/>
          ) : (
            <SingleGamePlay data={game_data}/>
          )}
        </div>
        
      </section>
    </div>
  );
};

export default SectionArcade;
