import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function ClanDetail() {
  const [clan, setClan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clanTag } = useParams();

  useEffect(() => {
    const fetchClanDetails = async () => {
      try {
        const response = await cocUrl.get(`/find-clan/${clanTag}`);
        setClan(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClanDetails();
  }, [clanTag]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Clan Detail</h1>
      {loading ? (
        <p>Loading...</p>
      ) : clan ? (
        <div className="row">
          <div className="col-md-4">
            <img src={clan.badgeUrls.large} alt="Clan Badge" className="img-fluid" />
          </div>
          <div className="col-md-4">
            <p>
              <strong>Tag:</strong> {clan.tag}
            </p>
            <p>
              <strong>Name:</strong> {clan.name}
            </p>
            <p>
              <strong>Type:</strong> {clan.type}
            </p>
            <p>
              <strong>Description:</strong> {clan.description}
            </p>
            <p>
              <strong>Location:</strong> {clan.location.name}
            </p>
            <p>
              <strong>Clan Level:</strong> {clan.clanLevel}
            </p>
            <p>
              <strong>Clan Points:</strong> {clan.clanPoints}
            </p>
            <p>
              <strong>Clan Builder Base Points:</strong> {clan.clanBuilderBasePoints}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Clan Capital Points:</strong> {clan.clanCapitalPoints}
            </p>
            <p>
              <strong>Capital League:</strong> {clan.capitalLeague.name}
            </p>
            <p>
              <strong>Required Trophies:</strong> {clan.requiredTrophies}
            </p>
            <p>
              <strong>War Frequency:</strong> {clan.warFrequency}
            </p>
            <p>
              <strong>War Win Streak:</strong> {clan.warWinStreak}
            </p>
            <p>
              <strong>War Wins:</strong> {clan.warWins}
            </p>
            <p>
              <strong>War League:</strong> {clan.warLeague.name}
            </p>
            <p>
              <strong>Members:</strong> {clan.members}
            </p>
          </div>
          <h2>Member List</h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Role</th>
                <th>Exp Level</th>
                <th>Town Hall Level</th>
                <th>Trophies</th>
                <th>Attack Wins</th>
                <th>Donations</th>
                <th>Donations Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clan.memberList.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>{member.name}</td> */}
                  <td>
                    <Link to={`/player/detail/${member.tag.replace("#", "")}`}>{member.name}</Link>
                  </td>
                  <td>{member.role}</td>
                  <td>{member.expLevel}</td>
                  <td>{member.townHallLevel}</td>
                  <td>{member.trophies}</td>
                  <td>{member.attackWins}</td>
                  <td>{member.donations}</td>
                  <td>{member.donationsReceived}</td>
                  <td>
                    <Link to={`/player/detail/${member.tag.replace("#", "")}/verify`} className="btn btn-primary">
                      Claim Account
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Clan not found</p>
      )}
    </div>
  );
}

export default ClanDetail;
