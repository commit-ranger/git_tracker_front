import { useEffect, useState } from "react";
import { BASEURL, currentId, currentToken } from "../../assets/api_adapter";
import { Link } from "react-router-dom";

function Profile(){

    const [repos, setRepos] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetch_profile() {
          try {
            const response = await fetch(`${BASEURL}/users/profile`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken}`,
              },
              body: JSON.stringify({
                id: currentId,
              }),
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
    
            const translatedData = await response.json();
            setRepos(translatedData[0]);
            setInfo(translatedData[1]);
            setLoading(false);


            console.log("folder data", translatedData);
          } catch (error) {
            console.log("Error Fetching all folders", error);
            setLoading(false);
          }
        }
        fetch_profile();
      }, []);
    

    return(<div>
        <h3>Profile</h3>
        <p>basic info here</p>

        <h3>REPO's </h3>
{loading ? 
<p>Loading...</p>:
<div>

{repos.length ? repos.map((repo) =>(
    <div>
        <Link to={`/repo/${repo.repo_id}`}>
    <h3>{repo.title}</h3>
        </Link>
    </div>
)): <p>no connected repos</p>  } 
</div>
}

    </div>)
}

export default Profile

// profile info
// repoos you have access too