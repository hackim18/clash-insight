import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function PlayerVerification() {
  const { playerTag } = useParams();
  const [token, setToken] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleVerifyToken = async () => {
    try {
      setLoading(true);
      const response = await cocUrl.post(
        `players/%23${playerTag}/verifytoken`,
        { token },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      setVerificationResult(response.data);

      if (response.data.status !== "invalid") {
        await cocUrl.post(
          "/add-account",
          { playerTag: response.data.tag },
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );
        navigate("/my-accounts");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleVerifyToken();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Player Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="playerTag" className="form-label">
            Player Tag:
          </label>
          <input type="text" id="playerTag" className="form-control" value={playerTag} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="token" className="form-label">
            Token:
          </label>
          <input type="text" id="token" className="form-control" value={token} onChange={(e) => setToken(e.target.value)} />
          <div style={{ fontSize: "small" }}>
            Please enter your API token. You can find it in the game, under Settings - More Settings - API Token.
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Verifying..." : "Verify Token"}
        </button>
      </form>
      {verificationResult && (
        <div className="mt-4">
          <h2>Verification Result</h2>
          <p>
            <strong>Status:</strong> {verificationResult.status ? verificationResult.status.toString() : "Not Available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default PlayerVerification;
