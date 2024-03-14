import { useEffect, useState } from "react";
import "./test.css";
import { BASEURL } from "./assets/api_adapter";

function Test_page() {
  const [review, setReview] = useState(null); // Define the 'review' state

  useEffect(() => {
    async function fetchData() {
      console.log("test.jsx fired")
      try {
        const response = await fetch(`${BASEURL}/users/get_all_users`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const translatedData = await response.json();
        setReview(translatedData);
        console.log(translatedData);
      } catch (error) {
        console.error('Error pulling all users:', error);
        // Add logic to inform the user or retry the fetch operation
      }
    }
    fetchData();
  }, []); // Ensure all dependencies are included in the dependency array if needed

  return (
    <>
      <h1>test page</h1>
      {/* Render review data here if needed */}
    </>
  );
}

export default Test_page;
