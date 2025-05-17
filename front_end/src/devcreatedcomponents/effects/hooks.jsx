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

const useFetchDiets = (endpoint) => {
  const [diets, setDiets] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await protectedGetRequest(endpoint);
        if (response.error) {
          throw new Error(response.error.message);
        }

        setDiets(response.data.entries);
        setLoading(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDiets();
  }, []);

  return { diets, error, loading, setDiets };
};
export { useFetchData, useFetchDiets };
