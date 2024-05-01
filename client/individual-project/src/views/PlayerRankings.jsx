import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cocUrl from "../utils/axios";

function PlayerRankings() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await cocUrl.get("/get-country");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchPlayerRankings = async () => {
      try {
        setLoading(true);
        const response = await cocUrl.post("/player-rankings", { country: selectedCountry });
        setPlayers(response.data);
        setLoading(false);
        console.log(selectedCountry);
      } catch (error) {
        console.error("Error fetching player rankings:", error);
        setLoading(false);
      }
    };

    fetchPlayerRankings();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleClaimAccount = (playerId) => {
    console.log("Claiming account with ID:", playerId);
  };

  return (
    <div className="container">
      <h2 className="my-4">Player Rankings</h2>
      <div className="mb-3">
        <label htmlFor="countrySelect" className="form-label">
          Select Country:
        </label>
        <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange} className="form-select">
          <option value="global">Global</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Player Rankings for {selectedCountry}</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Exp Level</th>
                <th>Trophies</th>
                <th>Attack Wins</th>
                <th>Clan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {players.items.map((player, index) => (
                <tr key={index}>
                  <td>{player.rank}</td>
                  <td>
                    <Link to={`/player/detail/${player.tag.replace("#", "")}`}>{player.name}</Link>
                  </td>
                  <td>{player.expLevel}</td>
                  <td>
                    <img src={player.league.iconUrls.small} alt="Exp Level Icon" style={{ maxWidth: "30px" }} />
                    <span>{player.trophies}</span>
                  </td>
                  <td>{player.attackWins}</td>
                  <td>
                    {player.clan ? (
                      <>
                        <Link to={`/clan/detail/${player.clan.tag.replace("#", "")}`}>
                          {/* <img src={player.clan.badgeUrls.small} alt="Clan Badge" style={{ maxWidth: "30px" }} /> */}
                          <span>{player.clan.name}</span>
                        </Link>
                      </>
                    ) : (
                      <span>No Clan</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/player/detail/${player.tag.replace("#", "")}/verify`} className="btn btn-primary">
                      Claim Account
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PlayerRankings;
