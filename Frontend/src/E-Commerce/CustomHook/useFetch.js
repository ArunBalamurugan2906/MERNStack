import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        const token = localStorage.getItem("token");

        let response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Please Login First");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  return { products, error, isLoading, setProducts };
}

export default useFetch;
