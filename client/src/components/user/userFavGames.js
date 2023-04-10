import "../../css_files/userFavGames_style.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function UserFavGames() {
  const [profile, setProfile] = useState("");
  const [favoriteArcadeGames, setFavoriteArcadeGames] = useState([]);
  const navigate = useNavigate();
  const gamesListWiki = [
    {
      id: 0,
      src: "image src",
      title: "Game1",
    },
    {
      id: 1,
      src: "image src",
      title: "Game2",
    },
    {
      id: 2,
      src: "image src",
      title: "Game3",
    },
    {
      id: 3,
      src: "image src",
      title: "Game4",
    },
    {
      id: 4,
      src: "image src",
      title: "Game5",
    },
    {
      id: 5,
      src: "image src",
      title: "Game6",
    },
  ];
  const gamesListArcade = [];

  useEffect(() => {
    handleCheckLogIn();
    handleGetFavoriteArcadeGames();
  }, []);

  const handleCheckLogIn = async () => {
    await axios
      .get("http://localhost:7000/api/users/checklogin")
      .then((response) => {
        if (!response.data.isLoggedIn) {
          navigate("/");
        } else {
          setProfile(response.data.user);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleGetFavoriteArcadeGames = async () => {
    await axios
      .get("http://localhost:7000/api/games/arcadefavorite")
      .then((response) => {
        console.log("Favorite Arcade Games", response.data);
        setFavoriteArcadeGames(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleRemoveFromList = async (gameId) => {
    await axios
      .put(`http://localhost:7000/api/games/${gameId}`)
      .then((response) => {
        console.log("Delete from List", response.data);
        handleGetFavoriteArcadeGames();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="userFav--body">
      <div className="userFav--container card">
        <div className="fav--gamesHeading">
          <span>{profile.username + " "}</span>
          Favourite List
        </div>
        <div className="favlists-container">
          {/* <div className="singleFavList-container">
            <h1 class="fav--games2ndHeading">
              Favourite <span>Wiki</span> Games
            </h1>
            {gamesListWiki.length > 0 ? (
              <div class="fav--gamesScrollContainer">
                {gamesListWiki.map((gameWiki) => (
                  <div class="fav--element">
                    <h4>{gameWiki.title}</h4> <img src="{gameWiki.src}" />{" "}
                    <button
                      class="remove--favGame"
                      onClick="{deleteFav(gameWiki.id)}"
                    >
                      Remove{" "}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="empty--favGame">
                You do not have any Favorites yet... Don't worry add some! (
                <span>
                  <NavLink to="/wiki">Go To Wiki</NavLink>
                </span>
                )
              </h1>
            )}
          </div> */}

          <div className="singleFavList-container">
            <h1 className="fav--games2ndHeading">
              Favourite <span>Arcade</span> Games
            </h1>
            {favoriteArcadeGames.length > 0 ? (
              <div className="fav--gamesScrollContainer">
                {favoriteArcadeGames.map((gameArcade) => (
                  <div className="fav--element">
                    <h4 style={{fontWeight: 'bold'}}>{gameArcade.name}</h4>
                    <img src={gameArcade.background_image} />{" "}
                    <button
                      className="remove--favGame"
                      onClick={() => {handleRemoveFromList(gameArcade._id)}}
                    >
                      Remove{" "}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <h5 className="empty--favGame">
                You do not have any Favorites yet... Don't worry add some! (
                <span>
                  <NavLink to="/arcade">Go To Arcade</NavLink>
                </span>
                )
              </h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFavGames;
