import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cocUrl from "../utils/axios";

function ClanRankings() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [clans, setClans] = useState([]);
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
    const fetchClanRankings = async () => {
      try {
        setLoading(true);
        const response = await cocUrl.post("/clan-rankings", { country: selectedCountry });
        setClans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clan rankings:", error);
        setLoading(false);
      }
    };

    fetchClanRankings();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="my-4">Clan Rankings</h2>
      <div className="mb-3">
        <label htmlFor="countrySelect" className="form-label">
          Select Country:
        </label>
        <select id="countrySelect" className="form-select" value={selectedCountry} onChange={handleCountryChange}>
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
          <h3>Clan Rankings for {selectedCountry}</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Clan Level</th>
                <th scope="col">Members</th>
                <th scope="col">Clan Points</th>
              </tr>
            </thead>
            <tbody>
              {clans.items.map((clan, index) => (
                <tr key={index}>
                  <td>{clan.rank}</td>
                  <td>
                    <img src={clan.badgeUrls.medium} alt="Clan Badge" style={{ width: 50, height: 50 }} />
                    <Link to={`/clan/detail/${clan.tag.replace("#", "")}`}>{clan.name}</Link>
                  </td>
                  <td>{clan.location.name}</td>

                  <td>{clan.clanLevel}</td>
                  <td>{clan.members}</td>
                  <td>{clan.clanPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClanRankings;
