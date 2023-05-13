import React, { useState } from "react";
import Walking from "../Activity/Walking";
import EditActivity from "../EditActivity/EditActivity";
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
  const navigate = useNavigate()
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editCardId, seteditCardId] = useState("false");

  const addActivity = (activity) => {
    // หา id ของการ์ดใบสุดท้ายเพื่อมาสร้าง id ใหม่
    const lastId = Math.max(...activityCard.map((ele) => ele.id));
    const newId = lastId === -Infinity ? 0 : lastId + 1;
    //นำ object ของ activityCard แล้วนำไป set id แล้ว concat ค่าใน object ที่เหลือ
    const newActivity = { id: newId, ...activity };
    const newActivities = [...activityCard, newActivity];
    setActivityCard(newActivities);
    setToggleOption(false);
  };

  const deleteActivity = (id) => {
    // filter การ์ดให้แสดงผลการ์ดที่เลข id ที่ไม่มีเลข id ที่กำหนดไว้
    setActivityCard((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  const [editActivityList, setEditActivityList] = useState({
    id: "",
    title: "",
    distance: "",
    duration: "",
    location: "",
    date: "",
    description: "",
    feeling: "",
    img: "",
  });

  const editActivity = (id) => {
    setToggleEdit(true);
    seteditCardId(id);
    setEditActivityList(activityCard[--id]);
  };

  const [activityCard, setActivityCard] = useState([
    {
      id: 1,
      title: "อยากเหนื่อย card1",
      distance: "10",
      duration: "10",
      location: "lumpini park",
      date: "2023-04-01",
      description: "เหนื่อยจังไม่ไหวแล้ววว",
      feeling: "",
      img: "",
    },
    {
      id: 2,
      title: "อยากเหนื่อย card2",
      distance: "20",
      duration: "20",
      location: "Suan dok park",
      date: "2023-04-02",
      description: "เหนื่อยจังไม่ไหวแล้ววว",
      feeling: "",
      img: "",
    },
    {
      id: 3,
      title: "อยากเหนื่อย card3",
      distance: "30",
      duration: "30",
      location: "lumpini park",
      date: "2023-04-03",
      description: "เหนื่อยจังไม่ไหวแล้ววว",
      feeling: "",
      img: "",
    },
  ]);

  const handleToggleAdd = () => {
    navigate('/AddActivity')
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
          <img src={card.feeling} />
        </div>

        <div className="status-card card-option">
          <div className="card-button">
            <img
              src={EditIcon}
              alt="Edit button"
              onClick={() => editActivity(card.id)}
              className="edit-btn"
            />
            <img
              src={deleteIcon}
              alt="delete button"
              onClick={() => deleteActivity(card.id)}
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
        <img src={card.img} />
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
          <button onClick={handleToggleAdd}>Add Activity</button>
        </aside>

        {toggleAdd && (
          <Walking onAdd={addActivity} setToggleAdd={setToggleAdd} />
        )}

        {toggleEdit && (
          <EditActivity
            editActivityList={editActivityList}
            setToggleEdit={setToggleEdit}
            setEditActivityList={setEditActivityList}
            activityCard={activityCard}
            setActivityCard={setActivityCard}
            editCardId={editCardId}
          />
        )}

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
