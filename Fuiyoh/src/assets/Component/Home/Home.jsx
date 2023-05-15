import React from "react";
import LayoutNormal from "../Layout/LayoutNormal";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <LayoutNormal>
      <div id="maincontent" className="row">
        <div className="col-6"></div>
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
      {/* <!-- contact section  --> */}

      <div className="row" id="contact">
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

      {/* <!-- footer section  --> */}

      <p className="footer">Copyright YUNHWANG</p>
    </LayoutNormal>
  );
};

export default Home;
