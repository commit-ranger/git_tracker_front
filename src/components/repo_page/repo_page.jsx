import { useParams } from "react-router-dom";
import { BASEURL, currentToken} from "../../assets/api_adapter";
import { useEffect, useState } from "react";
import "./repo_page.css";
import submit_repo from "./submit_repo_changes";




function Repo_page() {
  const [repo, setRepo] = useState({});
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [mainFolder, setMainFolder] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({});

  // current folder is going to be what the page is looking at
  const [currentFolder, setCurrentFolder] = useState([]);
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  

  useEffect(() => {
    async function fetch_repo() {
      try {
        const response = await fetch(`${BASEURL}/repo/get_entire_repo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify({
            id: 2, //TODO: CHANGE THIS WHEN TESTING IS DONE
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const translatedData = await response.json();
        setRepo(translatedData[0]);
        setSections(translatedData[0].can_modify);
        setFolders(translatedData[1]);
        setFiles(translatedData[2]);
        setOriginalFiles(translatedData[2]);
        setGroups(translatedData[3])
        setMainFolder(translatedData[4][0])
        setCurrentFolder(translatedData[4][0])
        console.log(translatedData[4][0])
        setLoading(false); //* Set loading to false when data is fetched
        console.log("folder data", translatedData);
      } catch (error) {
        console.log("Error Fetching all folders", error);
        setLoading(false);
      }
    }
    fetch_repo();
  }, []);

  // ! FILTER THE FILES AND FOLDERS DEPENDING ON THE CURRENT FOLDER USESTATE
  useEffect(() => {
      const connected_folders = folders.filter(item => item.parent_folder_id == currentFolder.folder_id)
      const connected_files = files.filter(item => item.folder_id == currentFolder.folder_id)

      setFilteredFolders(connected_folders)
      setFilteredFiles(connected_files)
  }, [currentFolder])

  function handle_file_change(event) {
    const event_file_id = parseInt(event.target.name, 10);
    const new_section_selected = parseInt(event.target.id);
  
    const fileIndex = files.findIndex((file) => file.file_id === event_file_id);
  
    if (fileIndex !== -1) {
      const updatedFile = { ...files[fileIndex], section_checked: new_section_selected };
      const updatedFiles = [...files];
      updatedFiles[fileIndex] = updatedFile;
  
      setFiles(updatedFiles);
    } else {
      console.log('File not found');
    }
  }
  useEffect(() => {
  }, [files]);
    


  // submit changes to the DBs
function handle_save(){
submit_repo(originalFiles, files)
// TODO REPLACE THE FILES SO IF THEY UPDATE IT AGAIN IT DOES NOT RESUBMIT AN ALREADY SUBMITTED CHANGES
//? DONT KNOW IF THIS REALLY MATTERS
}

// TODO ADD FILE 

function handle_add_file(){}

// TODO DELETE FILE

function handle_delete_file(){}

// TODO ADD FOLDER

function handle_add_folder(){}

//TODO DELETE FOLDER

function handle_delete_folder(){}

  return (
    <>
      <h2>REPO PAGE</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={() => setCurrentFolder(mainFolder)}>HOME</button>

        <h4>{currentFolder.title}</h4>
        {filteredFolders.length ? filteredFolders.map((folder) => {
          return(
            <button key={folder.id} onClick={() => setCurrentFolder(folder)}>
            {folder.title}
          </button>
          )
        }): <p>no repos yet</p>
        }
        {filteredFiles.length ? filteredFiles.map((file) => {
          return(
            <>
            <p>{file.filename}</p>
            </>
          )
        }): <p>no repos yet</p>
        }

        </div>
      )}
    </>
  );
}

export default Repo_page;
