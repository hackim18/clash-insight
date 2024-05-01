import React, { useState, useEffect } from "react";
import cocUrl from "../utils/axios";

function UnlockVip() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.async = true;
    script.onload = () => {
      //   console.log("Snap.js loaded");
    };
    script.setAttribute("data-client-key", "YOUR-CLIENT-KEY");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await fetch("http://localhost:3000/api/create-transaction", {
        // const response = await fetch("https://api-clash-insight.hackimtech.com/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          gross_amount: 99000,
          order_id: generateOrderId(),
          description: "Unlock VIP Access",
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        if (window.snap) {
          window.snap.pay(token, {
            onSuccess: function (result) {
              alert("Payment successful");
              (async () => {
                const { data } = await cocUrl.put(
                  "/update-vip",
                  { vip: true },
                  {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
                  }
                );
                console.log(data, "=>>");
              })();
              console.log(result);
              setLoading(false);
            },
            onPending: function (result) {
              alert("Payment pending");
              console.log(result);
              setLoading(false);
            },
            onError: function (result) {
              alert("Payment error");
              console.log(result);
              setLoading(false);
            },
            onClose: function () {
              alert("Payment closed");
              setLoading(false);
            },
          });
        } else {
          throw new Error("Snap.js is not initialized");
        }
      } else {
        throw new Error("Failed to create transaction");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("An error occurred. Please try again later.");
    }
  };

  const generateOrderId = () => {
    return "ORDER" + Math.floor(Math.random() * 1000000);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <h2 className="text-center mb-4">Unlock VIP</h2>
      <p className="text-center mb-4">Welcome to the VIP section!</p>
      <p className="text-center mb-4">To unlock VIP access, you need to make a payment of Rp 99.000.</p>
      <button className="btn btn-primary" onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}

export default UnlockVip;
