export const authenticate = (response, next) => {
  // console.log(response);
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
  // สร้าง session storage (obj) เก็บข้อมูลชื่อ token เก็บข้อมูลจาก res.data.token <= json
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("userId", JSON.stringify(response.data.userId));
  }
  
  // รอรับ action ถัดไปที่จะถูกป้อนมา
  next();
};

// ดึงข้อมูล token
export const getToken = () => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token")); // .parse แปลงจาก OBJ => JSON
    } else {
      return false;
    }
  }
};

// ดึงข้อมูล user
export const getUserId = () => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    if (sessionStorage.getItem("userId")) {
      return JSON.parse(sessionStorage.getItem("userId")); // .parse แปลงจาก OBJ => JSON
    } else {
      return false;
    }
  }
};

// Logout
export const logout = (next) => {
  // กำลังใช้งาน brower อยู่?
  if (window !== undefined) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }

  // รอรับ action ถัดไปที่จะถูกป้อนมา
  next()
};
