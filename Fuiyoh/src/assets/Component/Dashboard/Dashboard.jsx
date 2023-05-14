import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";


const Dashboard = () => {
  const navigate = useNavigate();
  const [activityCard, setActivityCard] = useState([]);

  const getData = async () => {
    try {
      const returnData = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities`)
      if (returnData) {
        setBlogs(returnData.data);
      }
    }
    catch { }

    const [editActivityList, setEditActivityList] = useState({
      _id: "",
      type: "",
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

    const [activityCard, setActivityCard] = useState([]);

    const handleToggleAdd = () => {
      navigate('/AddActivity')
    };

    useEffect(() => {
      //ดึงข้อมูลจาก database เพื่อนำมาโชว์ในหน้า dashboard
      const getData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities/all`);
          const data = response.data;
          setActivityCard(data);
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      };

      getData();
    }, []);

    // delete ข้อมูลใน database
    const confirmDelete = (id) => {
      Swal.fire({
        title: "คุณต้องการลบการ์ดเหี้ยนี่ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        // ยืนยันการลบข้อมูล
        if (result.isConfirmed) {
          // เรียกฟังกชันเพื่อลบข้อความ
          deleteData(id);
        }
      });
    };

    const deleteData = async (id) => {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_APP_KEY}/activities/delete/${id}`);
        console.log(response.data);
        setActivityCard(selectedActivity => selectedActivity.filter(activity => activity._id !== id));
      } catch (error) {
        console.log(error);
      }
    };

    // add mockdata

    const addMockData = async () => {
      try {
        const mockData =
          { type: "walking", title: "soodlhor", distance: Math.floor(Math.random() * 100), duration: Math.floor(Math.random() * 100), location: "bkk", description: "test krub pom" };
        const response = await axios.post(`${import.meta.env.VITE_APP_KEY}/activities/create`, mockData);
        console.log(response.data);
        getData();
      } catch (error) {
        console.log(error.response);
      }
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
                onClick={() => confirmDelete(card._id)}
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
              <h3>{(card.duration / card.distance) % 1 === 0 ? (card.duration / card.distance) : (card.duration / card.distance).toFixed(2)}</h3>
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

        {/* add mockdata */}
        <button onClick={addMockData}>Add Mock Data</button>
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
