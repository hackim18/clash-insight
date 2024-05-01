import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function PlayerDetail() {
  const [player, setPlayer] = useState(null);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playerTag } = useParams();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await cocUrl.get(`/find-player/${playerTag}`);
        setPlayer(response.data);

        const img = await cocUrl.get(`/get-image`);
        setImage(img.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerDetails();
  }, [playerTag]);

  const handleClaimAccount = () => {
    console.log("Claim Account button clicked!");
  };

  return (
    <div className="container">
      <h1 className="my-4">{player?.name}</h1>
      <Link to={`/player/detail/${player?.tag?.replace("#", "")}/verify`} className="btn btn-primary">
        Claim Account
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : player ? (
        <div className="row">
          <div className="col-md-4">
            <img
              src={image[Math.floor(Math.random() * image.length)].imgUrl}
              alt="Profile"
              className="img-fluid"
              width="300"
              height="300"
            />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <p>
                  <strong>Tag:</strong> {player.tag}
                </p>
                <p>
                  <strong>Name:</strong> {player.name}
                </p>
                <p>
                  <strong>Town Hall Level:</strong> {player.townHallLevel}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>Exp Level:</strong> {player.expLevel}
                </p>
                <p>
                  <strong>Trophies:</strong> {player.trophies}
                </p>
                <p>
                  <strong>Best Trophies:</strong> {player.bestTrophies}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>War Stars:</strong> {player.warStars}
                </p>
                <p>
                  <strong>Attack Wins:</strong> {player.attackWins}
                </p>
                <p>
                  <strong>Defense Wins:</strong> {player.defenseWins}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <p>
                  <strong>Builder Hall Level:</strong> {player.builderHallLevel}
                </p>
                <p>
                  <strong>Builder Base Trophies:</strong> {player.builderBaseTrophies}
                </p>
                <p>
                  <strong>Best Builder Base Trophies:</strong> {player.bestBuilderBaseTrophies}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>Role:</strong> {player.role}
                </p>
                <p>
                  <strong>Donations:</strong> {player.donations}
                </p>
                <p>
                  <strong>Donations Received:</strong> {player.donationsReceived}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>Clan Capital Contributions:</strong> {player.clanCapitalContributions}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3>Player Heroes</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Max Level</th>
                </tr>
              </thead>
              <tbody>
                {player.heroes?.map((troop, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{troop.name}</td>
                    <td>{troop.level}</td>
                    <td>{troop.maxLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Player Troops</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Max Level</th>
                  <th>village</th>
                </tr>
              </thead>
              <tbody>
                {player.troops.map((troop, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{troop.name}</td>
                    <td>{troop.level}</td>
                    <td>{troop.maxLevel}</td>
                    <td>{troop.village}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Player Spells</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Max Level</th>
                  <th>village</th>
                </tr>
              </thead>
              <tbody>
                {player.spells.map((troop, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{troop.name}</td>
                    <td>{troop.level}</td>
                    <td>{troop.maxLevel}</td>
                    <td>{troop.village}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Player not found</p>
      )}
    </div>
  );
}

export default PlayerDetail;
