import { useParams } from "react-router-dom";
import { BASEURL } from "../../assets/api_adapter";
import { useEffect, useState } from "react";
import "./repo_page.css";

function Repo_page() {
  const [repo, setRepo] = useState({});
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({});

  useEffect(() => {
    async function fetch_repo() {
      console.log("checkpoint alpha");
      try {
        const response = await fetch(`${BASEURL}/repo/get_entire_repo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        setLoading(false); //* Set loading to false when data is fetched
        console.log("folder data", translatedData);
      } catch (error) {
        console.log("Error Fetching all folders", error);
        setLoading(false);
      }
    }
    fetch_repo();
  }, []);

  function handle_file_change(event){
      // get the selection change, 
      const event_file_id = parseInt(event.target.name, 10)
      const new_section_selected = event.target.id
      // update the connected file 

      const fileIndex = files.findIndex(file => file.file_id === event_file_id);

      console.log("index",fileIndex, "file id", event_file_id, "new section", new_section_selected)
      if (fileIndex !== -1) {
        // Create a copy of the object with the updated `section_selected` property
        const updatedFile = { ...files[fileIndex], section_selected: new_section_selected };
        
        // Update the `files` array with the updated object
        const updatedFiles = [...files];
        updatedFiles[fileIndex] = updatedFile;
      console.log(updatedFile)
      setFiles(updatedFiles)
      } else {
        console.log('File not found');
      }

      // save the change in a diferent array to submit change on "save"
  }

  return (
    <>
      <h2>REPO PAGE</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {folders.map((folder) => (
            <div className="folder_container" key={folder.folder_id}>
              <h2>{folder.title}</h2>
              <div>
                {files
                  .filter((file) => file.folder_id == folder.folder_id)
                  .map((file) => (
                    <div className="file_container">
                      <p key={file.file_id}>{file.filename}</p>
                      <div>
                        <form>
                          {sections.map((section) => (
                            <div>
                              <input
                                type="radio"
                                id={section.section_location}
                                name={file.file_id}
                                value={section.section_title}
                                checked={section.section_location === file.section_checked}
                                onChange={handle_file_change}
                              />
                              <label htmlFor="no">
                                {section.section_title}
                              </label>
                            </div>
                          ))}
                        </form>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Repo_page;
