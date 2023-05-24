import settingLogo from "../../Picture/dashboard/SettingIcon.svg";
import account from "../../Picture/dashboard/account.svg";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import badgeHeart from "./assets/badge-heartt.png";
import axios from "axios";
import badgeLuna from "./assets/badge-luna.png";
import badgeGenTH from "./assets/badge-genth.png";
import bmiThin from "./assets/bmi-thin.png"
import bmiNormal from "./assets/bmi-normal.png"
import bmiFat from "./assets/bmi-fat.png"
import { useNavigate, useParams } from "react-router-dom";
import { getUserId } from "../../service/authorize.js";

const Profile = ({ handleAddActivity }) => {
    const userId = useParams();
    // const userToken = getUserId();
    // console.log(userToken)

    const navigate = useNavigate();
    const [quest, setQuest] = useState({
        hikingDistance: 0,
        runningDistance: 0,
        badge: '',
        type: "",
    });

    const [user, setUser] = useState({
        height: 0,
        weight: 0,
    });

    //link to edit profile
    const editUser = (id) => {
        // console.log(id)
        // console.log(userToken)
        navigate(`/edituser/${id.userId}`);
    };

    //mini profile
    const [userDisplay, setUserDisplay] = useState({
        username: "",
        fullname: "",
        // weight: "",
        // height: "",
        userPhoto: "",
      });

    const getUserDisplay = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_KEY}/users/getuserid/${userId.userId}`
          );
            if (response) {
                console.log(response)
                const { username } = response.data;
                let { fullname, weight, height, userPhoto } = response.data;
                if (userPhoto==="" || userPhoto=== null ) {
                    userPhoto = account;
                }
                console.log(userPhoto);
                setUserDisplay(()=> ({
                    ...userDisplay,
                    username: username,
                    fullname: fullname,
                    userPhoto: userPhoto,
                }));
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const getUserHeight = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/users/getUserHeight/${userId.userId}`);
            const data = response.data;
            if (data && data.height !== undefined) {
                setUser((prevUser) => ({ ...prevUser, height: data.height }));
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const getUserWeight = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/users/getUserWeight/${userId.userId}`);
            const data = response.data;
            if (data && data.weight !== undefined) {
                setUser((prevUser) => ({ ...prevUser, weight: data.weight }));
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const getSumHiking = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities/getSumHikingDistances/${userId.userId}`);
            const data = response.data;
            if (data && data.sum !== undefined) {
                setQuest((prevQuest) => ({ ...prevQuest, hikingDistance: data.sum }));
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSumRunning = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities/getSumRunningDistances/${userId.userId}`);
            const data = response.data;
            if (data && data.sum !== undefined) {
                setQuest((prevQuest) => ({ ...prevQuest, runningDistance: data.sum }));
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSumHiking();
        getSumRunning();
        getUserHeight();
        getUserWeight();
        getUserBadge();
        getUserDisplay();
    }, []);


    const addBadge = async (value) => {
        try {
            const userBadge = {
                badge: value,
            };
            const response = await axios.put(
                `${import.meta.env.VITE_APP_KEY}/users/addBadge/${userId.userId}`,
                userBadge
            );
            // console.log(response.data);
            // getData();i
        } catch (error) {
            console.log(error);
        }

        if (value === "heart") {
            await Swal.fire({
                title: 'ยินดีด้วย คุณได้รับเพื่อนเพิ่มขึ้น 1ea',
                text: 'freindzone badge!',
                imageUrl: badgeHeart,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'heart',
            });
        }

        if (value === "luna") {
            await Swal.fire({
                title: 'ยินดีด้วย',
                text: 'คุณได้ 1 LUNA.png',
                imageUrl: badgeLuna,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'LUNA',
            });
        }

        if (value === "genth") {
            await Swal.fire({
                title: 'ยินดีด้วย',
                text: 'คุณกำลังจะจบแล้ว!',
                imageUrl: badgeGenTH,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'GenTH',
            });
        }
        getUserBadge();
    };


    const getUserBadge = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/users/getUserBadge/${userId.userId}`);
            const data = response.data;
            if (data && data.badge !== undefined) {
                setQuest((prevQuest) => ({ ...prevQuest, badge: data.badge }));
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const calculateBMI = () => {
        const heightInMeters = user.height / 100;
        const bmi = user.weight / (heightInMeters * heightInMeters);
        const roundedBMI = bmi.toFixed(2);
        let result;
        let img = "";

        if (roundedBMI < 18.5) {
            result = "Thin";
            img = bmiThin;
        } else if (roundedBMI >= 18.5 && roundedBMI <= 24.9) {
            result = "Normal";
            img = bmiNormal;
        } else {
            result = "Fat";
            img = bmiFat;
        }

        return (
            <>
                {isNaN(roundedBMI) ? (
                    <p className="text-red-500 noBMI-info">"Please add your height and weight"</p>
                ) : (
                    <>
                        <p className="BMI-info">Your BMI is <strong>{roundedBMI} ({result})</strong></p>
                        <img src={img} alt="bmi" />
                    </>
                )}
            </>
        );
    };



    const checkBadge = () => {
        return (
            <div className="badge-container">
                {quest.badge.includes("heart") && <img src={badgeHeart} alt="badge" />}
                {quest.badge.includes("luna") && <img src={badgeLuna} alt="badge" />}
                {quest.badge.includes("genth") && <img src={badgeGenTH} alt="badge" />}
            </div>
        );
    };

    const handleClickTwitter = () => {
        const tweetText = encodeURIComponent('I love Generation Thailand');
        const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

        window.open(tweetUrl, '_blank');

        setTimeout(() => {
            addBadge("genth");
        }, 5000);
    };

    return (
        <aside>
            <div className="dashboard-profile">
                {userDisplay.userPhoto && 
                <figure>
                    <img src={userDisplay.userPhoto} alt="Profile picture" />
                </figure>
                }
             
                <div>
                    <span><b>{userDisplay.fullname? userDisplay.fullname :userDisplay.username}</b></span>
                    <div>
                        <img 
                            src={settingLogo} 
                            alt="Logo setting" 
                            onClick={()=>{editUser(userId)}}
                        />
                    </div>
                </div>

            </div>

            <button className="add-activity-btn" onClick={handleAddActivity}>Add Activity</button>

            <div className="bmi">
                <div className="weightAndHeight d-flex justify-content-between">
                    <div className="height d-flex flex-column gap-2">
                        <p>Height: </p>
                        <h2>{user.height}<small>cm.</small></h2> 
                    </div>
                    <div className="weight d-flex flex-column gap-2">
                        <p>Weight: </p>
                        <h2>{user.weight}<small>kg.</small></h2> 
                    </div>
                </div>
                <div className="bmi-result">
                    {calculateBMI()}
                </div>
            </div>

            <div className="badge">
            { quest.badge.length !== 0 &&<h6 className="text-violet-600">Badges</h6>}
                {checkBadge()}
            </div>

            <div className="quest">
                <h6>Quests</h6>
                <div className="ClimbToHerHeart mainquest">

                
                <div className="questName d-flex justify-content-between">
                    <p>ปีนไปสู่หัวใจเธอ (Hiking):</p>
                    <p>{quest.hikingDistance} / ???</p>
                </div>

                <div className="questbar w-full overflow-hidden bg-gray-200 mt-4">
                    <div
                    className="
                        bg-violet-400 text-xs font-medium text-violet-100 text-center p-0.5 leading-none rounded-l-full h-1 overflow-hidden"
                        style={{
                            width: (quest.hikingDistance / 10000) * 100 + "%",
                        }}
                    >
                    </div>
                </div>
                <button
            
                    onClick={() => addBadge("heart")}
                    className={`inline-block px-6 py-2.5 ${quest.hikingDistance < 10000 || quest.badge.includes("heart")
                        ? "bg-gray-400 cursor-default"
                        : "bg-violet-400 hover:bg-violet-500"
                        } quest-btn text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}
                    disabled={quest.hikingDistance < 10000 || quest.badge.includes("heart")}
                >
                    {
                        quest.hikingDistance < 10000
                            ? "UNABLE"
                            : quest.badge.includes("heart")
                                ? "CLAIMED"
                                : "CLAIM"
                    }
                </button>
                </div>
            </div>

            <div className="runToDamoon mainquest">
                <div className="questName d-flex justify-content-between">
                    <p>Run To Da Moonnnnn (running):</p>
                    <p>{quest.runningDistance} / 10000</p>
                </div>
                <div className="questbar w-full overflow-hidden bg-gray-200 mt-4">

                    <div
                        className="bg-violet-400 text-xs font-medium text-violet-100 text-center p-0.5 leading-none rounded-l-full h-1 overflow-hidden"
                        style={{
                            width: (quest.runningDistance / 10000) * 100 + "%",
                        }}
                    >
                    </div>
                </div>
                <button
                    onClick={() => addBadge("luna")}
                    className={`inline-block px-6 py-2.5 ${quest.runningDistance < 10000 || quest.badge.includes("luna")
                        ? "bg-gray-400 cursor-default"
                        : "bg-violet-400 hover:bg-violet-500"
                        } quest-btn text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}
                    disabled={quest.runningDistance < 10000 || quest.badge.includes("luna")}
                >
                    {
                        quest.runningDistance < 10000
                            ? "UNABLE"
                            : quest.badge.includes("luna")
                                ? "CLAIMED"
                                : "CLAIM"
                    }
                </button>


            </div>
            
            <div>
                <button
                    onClick={handleClickTwitter}
                    className={`inline-block px-6 py-2.5 tweetBtn ${quest.badge.includes("genth")
                        ? "bg-gray-400 cursor-default"
                        : "bg-[#1D9BF0] hover:bg-[#177CC0]"
                        } text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}
                    disabled={quest.badge.includes("genth")}
                >
                    {quest.badge.includes("genth") ? `Tweeted` : `Tweet`}
                </button>

            </div>

        </aside>
    );
};

export default Profile;
