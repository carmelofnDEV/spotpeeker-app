import { useState,useEffect} from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null);
 
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost//test/`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetch Example</h1>
      {data ? (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App
