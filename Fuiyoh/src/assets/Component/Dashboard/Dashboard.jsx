import React, { useEffect, useState } from "react";
import LayoutSignin from "../Layout/LayoutSignin";
import settingLogo from "../../Picture/dashboard/SettingIcon.svg";
import account from "../../Picture/dashboard/account.svg";
import optionIcon from "../../Picture/dashboard/optionIcon.svg";
import deleteIcon from "../../Picture/dashboard/Delete.svg";
import EditIcon from "../../Picture/dashboard/Edit.svg";
import "./Dashboard.css";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activityCard, setActivityCard] = useState([]);

  const getData = async() => {
    try{
      const returnData = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities`)
      if (returnData) {
        setBlogs(returnData.data);
      }
    }
    catch{}

  }

  useEffect(()=>{
    getData()
  },[])

  const handleToAddActivity = () => {
    navigate("/AddActivity");
  };

  const cards = activityCard.map((card) => (
    <div className="dasboard-card-container" key={card.id}>
      <div className="activity-card-top">
        <figure>
          <img src={optionIcon} alt="activity icon" />
        </figure>

        <div>
          <h4>{card.title}</h4>
          <p>{card.location}</p>
        </div>

        <div className="status-card feeling">
          <img src={card.feeling} alt="" />
        </div>

        <div className="status-card card-option">
          <div className="card-button">
            <img
              src={EditIcon}
              alt="Edit button"
              onClick={() => console.log("add edit functions")}
              className="edit-btn"
            />
            <img
              src={deleteIcon}
              alt="delete button"
              onClick={() => console.log("add delete functions")}
              className="delete-btn"
            />
          </div>
        </div>
      </div>

      <div className="activity-card-info">
        <div className="activity-description-box">
          <small>{card.description}</small>
        </div>
        <div className="activity-card-detail">
          <div>
            <h6>Distance</h6>
            <h3>{card.distance}</h3>
            <small>km</small>
          </div>
          <div>
            <h6>Time</h6>
            <h3>{card.duration}</h3>
            <small>mins</small>
          </div>
          <div>
            <h6>pace</h6>
            <h3>{card.duration / card.distance}</h3>
            <small>km/mins</small>
          </div>
        </div>
      </div>

      <div>
        <img src={card.img} alt="" />
      </div>
    </div>
  ));

  return (
    <LayoutSignin>
      <div className="dashboard container-xl">
        <aside>
          <div className="dashboard-profile">
            <figure>
              <img src={account} alt="Profile picture" />
            </figure>
            <div>
              <span>Displayname example</span>
              <div>
                <img src={settingLogo} alt="Logo setting" />
              </div>
            </div>
          </div>
          <button onClick={handleToAddActivity}>Add Activity</button>
        </aside>

        <section>
          <h4 className="quote">
            “The hardest thing about exercise is start doing it”{" "}
          </h4>
          <div className="dasboard-card-section">{cards.reverse()}</div>
        </section>
      </div>
    </LayoutSignin>
  );
};

export default Dashboard;
