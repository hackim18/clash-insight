import React, { useState, useEffect } from "react";
import cocUrl from "../utils/axios";
import { Link } from "react-router-dom";

function MyAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await cocUrl.get("/get-account", { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDeleteAccount = async (id) => {
    try {
      await cocUrl.delete(`/delete-account/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
      setAccounts(accounts.filter((account) => account.id !== id));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">All My Accounts</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>Game Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={account.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/player/detail/${account.playerTag.replace("#", "")}`}>{account.playerTag}</Link>
              </td>
              <td>
                <button onClick={() => handleDeleteAccount(account.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAccounts;
