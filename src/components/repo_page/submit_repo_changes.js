import { BASEURL } from "../../assets/api_adapter";

async function submit_repo(old_array, changed_array) {
  //TODO compair files, and put changed files into the edited files array

  const changed_files = changed_array.filter((changed_item) => {
    // ! link together the files with the same file_id
    const linked_file = old_array.find(
      (old_item) => old_item.file_id === changed_item.file_id
    );

    //! return only the files with diferent section

    return (
      linked_file &&
      linked_file.section_checked !== changed_item.section_checked
    );
  });

  console.log("changed_array", changed_files);
  //TODO submit edited files to DB

    const only_changed_files = changed_files

  const response = await fetch(`${BASEURL}/file/update_selected_checkbox`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        only_changed_files
    }),
  });
}

export default submit_repo;
