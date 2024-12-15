import { useState } from "react";

const useCastVote = (token) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const castVote = async (candidateId) => {
    setLoading(true); 
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/voter/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify({ candidateId }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Unknown error");
        return false;
      }

      const data = await response.json();
      return data.result || true;
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      return false;
    } finally {
      setLoading(false); 
    }
  };

  return { castVote, errorMessage, loading };
};

export default useCastVote;
