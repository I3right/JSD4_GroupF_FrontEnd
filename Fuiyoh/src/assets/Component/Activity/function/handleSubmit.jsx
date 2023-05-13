import axios from "axios";

export const submitData = (props) => {

    const {
      activity_type,
      title,
      distance,
      duration,
      location,
      date,
      description,
      feeling,
      img,
    } = props;
  
    axios.post('http://localhost:7777/activities/create',{
      activity_type,
      title,
      distance,
      duration,
      location,
      date,
      description,
      feeling,
      img,
    })


};
