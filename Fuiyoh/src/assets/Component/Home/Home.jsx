import React from "react";
import LayoutNormal from "../Layout/LayoutNormal";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import setyourgoal from "./assets/setyourgoal.png";
import challengeyourself from "./assets/challengeyourself.png";
import viewyourreccords from "./assets/viewyourreccords.png";

const Home = () => {
  const cardInfo = {
    card1: {
      img: setyourgoal,
      header: "Set Your Goal",
      paragraph:
        "Setting clear exercise goals can help you stay motivated, focused, and on track towards achieving the specific outcomes you desire from your fitness routine.",
    },
    card2: {
      img: challengeyourself,
      header: "Challenge Your Self",
      paragraph:
        "Challenging yourself regularly is the key to personal growth and achieving success beyond your comfort zone.",
    },
    card3: {
      img: viewyourreccords,
      header: "View your records ",
      paragraph:
        "View and share your post records. To see your improvement and shows to your friends.",
    },
  };

  const cards = Object.values(cardInfo).map((card, cardindex) => (
    <div className="card-container" key={cardindex}>
      <div>
        <img src={card.img} alt={card.header} />
        <h4>{card.header}</h4>
      </div>
      <p>{card.paragraph}</p>
    </div>
  ));

  return (
    <LayoutNormal>
      <div id="maincontent" className="row">
        <div id="maincontent-picture" className="col-6"></div>
        <div id="textcontent" className="col-6">
          <div id="textcontent1" className="card-body">
            <h5 className="card-title">YUNWHANG</h5>
            <p className="card-text">
              The ultimate tool for achieving your fitness goals. With features
              such as goal setting, workout tracking, and progress monitoring,
              you can stay motivated and on track towards your desired outcomes.
              Our user-friendly interface makes it easy to create custom
              workouts, track your progress, and view your records. Plus, with
              our social sharing feature, you can share your achievements and
              inspire others on their fitness journey. Download our app today
              and start your journey towards a healthier and more active
              lifestyle!
            </p>
            <div className="button">
              <Link to="/login" id="buttonGetStart">
                Get Start
              </Link>
              <Link to="/Register" id="buttonRegister">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Cards section */}
      <div className="section2-container">{cards}</div>
      {/* <!-- contact section  --> */}

      <div className="row d-flex justify-content-center" id="contact">
        <div className="row " id="contact-sub">
          <div className="col-6">
            <iframe
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.02846872441!2d-122.4726193946364!3d37.75776267831458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2z4LiL4Liy4LiZ4Lif4Lij4Liy4LiZ4LiL4Li04Liq4LmC4LiBIOC5geC4hOC4peC4tOC4n-C4reC4o-C5jOC5gOC4meC4teC4oiDguKrguKvguKPguLHguJDguK3guYDguKHguKPguLTguIHguLI!5e0!3m2!1sth!2sth!4v1667290329668!5m2!1sth!2sth"
            ></iframe>
          </div>
          <div className="col-6 contact">
            <h4>CONTACT</h4>
            <div>
              <p>
                EMAIL: admin@yunhwang.com <br /> ADDRESS: 808 Lynch Street San
                Francisco <br />
                California(CA), 93240 <br /> PHONE: 098-XXX-XXX
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- footer section  --> */}

      <footer><p className="footer">Copyright YUNHWANG</p></footer>
    </LayoutNormal>
  );
};

export default Home;
