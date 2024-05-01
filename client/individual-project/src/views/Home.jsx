import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [playerTag, setPlayerTag] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPlayerTag(event.target.value);
  };

  const handleSearchPlayer = () => {
    console.log("Searching for player with tag:", playerTag);
    if (playerTag) {
      navigate(`/player/detail/${playerTag.replace("#", "")}`);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to ClashInsight</h1>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Enter player tag..." value={playerTag} onChange={handleInputChange} />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleSearchPlayer}>
        Search Player
      </button>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://res.cloudinary.com/dkuq6sef1/image/upload/v1710655634/z42tn5q5azqrloyhfrjq.png"
              className="card-img-top"
              alt="My Accounts"
            />
            <div className="card-body">
              <h5 className="card-title">My Accounts</h5>
              <p className="card-text">Manage your Clash of Clans accounts here.</p>
              <Link to="/my-accounts" className="btn btn-primary">
                Go to My Accounts
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://res.cloudinary.com/dkuq6sef1/image/upload/v1710656690/qaahfp09yhc0pv5lwpdw.webp"
              className="card-img-top"
              alt="Player Rankings"
            />
            <div className="card-body">
              <h5 className="card-title">Player Rankings</h5>
              <p className="card-text">Explore the top players in Clash of Clans.</p>
              <Link to="/player-rankings" className="btn btn-primary">
                Go to Player Rankings
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://res.cloudinary.com/dkuq6sef1/image/upload/v1710655990/dca9p7rqb8rl30wivxi5.png"
              className="card-img-top"
              alt="Clan Rankings"
            />
            <div className="card-body">
              <h5 className="card-title">Clan Rankings</h5>
              <p className="card-text">Discover the best clans in Clash of Clans.</p>
              <Link to="/clan-rankings" className="btn btn-primary">
                Go to Clan Rankings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
