import "./test.css";

function Test_page() {
  return (
    <>
      <h2>test</h2>
      <div className="name_plates">
        <h3>unassigned</h3>
        <h3>name</h3>
        <h3>name</h3>
        <h3>name</h3>
      </div>
      <div className="slider_container">
        <form className="slider">
            <h6 className="filename_position">filename</h6>
          <div className="radio_box" id="radio_box">
            
            <div className="line"></div>
            <input
              type="radio"
              className="radio_button"
              id="blank"
              name="box"
            ></input>
            <input
              type="radio"
              className="radio_button"
              id="first"
              name="box"
            />
            <input
              type="radio"
              className="radio_button"
              id="second"
              name="box"
            />
            <input
              type="radio"
              className="radio_button"
              id="third"
              name="box"
            />
          </div>
          <input className="textbox_position" type="text"></input>
        </form>
      </div>
    </>
  );
}

export default Test_page;
