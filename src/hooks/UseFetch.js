import { useState, useEffect } from 'react';

const UseFetch = (initialUrl) => {
  // create state variables
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  // Called whenever the URL changes
  useEffect(() => {
    if (!url) return;
    // Loading
    setIsLoading(true);
    // clear old search
    setData(null);
    setError(null);

    // Fetch data
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // error handling for nonexistent data
        setIsLoading(false);
        if (data.cod >= 400) {
          setError(data.message);
          return;
        }
        // Set state for data
        setData(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [url]);

  // Returns data, error, if data is loading and method to change URL
  return { data, error, isLoading, setUrl };
};

export default UseFetch;
