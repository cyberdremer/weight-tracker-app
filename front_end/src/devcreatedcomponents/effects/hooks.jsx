import { useEffect, useState } from "react";
import { protectedGetRequest } from "@/utils/requests";
import backendUrl from "@/utils/backendurl";

const useFetchData = (endpoint) => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await protectedGetRequest(endpoint);
        if (response.error) {
          throw new Error(response.error.message);
        }

        setEntries(response.data.entries);
        setLoading(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return { entries, error, loading, setEntries };
};

export default useFetchData;
