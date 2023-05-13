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

  
    axios.get('http://localhost:7777/test')



};
