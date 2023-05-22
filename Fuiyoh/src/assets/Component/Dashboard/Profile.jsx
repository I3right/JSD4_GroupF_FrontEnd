import settingLogo from "../../Picture/dashboard/SettingIcon.svg";
import account from "../../Picture/dashboard/account.svg";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import badgeHeart from "./assets/badge-heart.png";
import axios from "axios";
import badgeLuna from "./assets/badge-luna.png";
import badgeGenTH from "./assets/badge-genth.png";
import bmiThin from "./assets/bmi-thin.png"
import bmiNormal from "./assets/bmi-normal.png"
import bmiFat from "./assets/bmi-fat.png"


const Profile = ({ handleAddActivity }) => {
    const [quest, setQuest] = useState({
        hikingDistance: 0,
        runningDistance: 0,
        badge: "",
        type: "",
    });

    const [user, setUser] = useState({
        height: 0,
        weight: 0,
    });

    const getUserHeight = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/users/getUserHeight/646b244a6effbee9eeaaa9c9`);
            const data = response.data;
            console.log(data.height);
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
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/users/getUserWeight/646b244a6effbee9eeaaa9c9`);
            const data = response.data;
            console.log(data.weight);
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
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities/getSumHikingDistances`);
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
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/activities/getSumRunningDistances`);
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
    }, []);


    const addBadge = async (value) => {
        try {
            const userBadge = {
                badge: value,
            };
            const response = await axios.put(
                `${import.meta.env.VITE_APP_KEY}/users/addBadge/646b244a6effbee9eeaaa9c9`,
                userBadge
            );
            console.log(response.data);
            getData();
        } catch (error) {
            console.log(error.response);
        }

        if (value === "heart") {
            await Swal.fire({
                title: 'ยินดีด้วย',
                text: 'คุณได้หัวใจเธอ!',
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
            const response = await axios.get(`${import.meta.env.VITE_APP_KEY}/users/getUserBadge/646b244a6effbee9eeaaa9c9`);
            const data = response.data;
            console.log(data)
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
                <p>Your BMI is {roundedBMI} {result}</p>
                <img src={img} alt="bmi" />
            </>
        );
    };


    console.log(quest)
    const checkBadge = () => {
        return (
            <div>
                {quest.badge.includes("heart") && <img src={badgeHeart} alt="badge" />}
                {quest.badge.includes("luna") && <img src={badgeLuna} alt="badge" />}
                {quest.badge.includes("genth") && <img src={badgeGenTH} alt="badge" />}
            </div>
        );
    };

    const handleClick = () => {
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
            <div>
                <h6>Height: {user.height} CM.</h6>
                <h6>Weight: {user.weight} KG.</h6>
                <div>
                    {calculateBMI()}

                </div>
            </div>
            <div className="badge">
                <h6 className="text-violet-600">badges</h6>
                {checkBadge()}

            </div>
            <div>
                <button
                    onClick={handleClick}
                    className={`inline-block px-6 py-2.5 ${quest.badge.includes("genth")
                        ? "bg-gray-400 cursor-default"
                        : "bg-[#1D9BF0] hover:bg-[#177CC0]"
                        } text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}
                    disabled={quest.badge.includes("genth")}
                >
                    {quest.badge.includes("genth") ? "Tweeted" : "Tweet"}
                </button>

            </div>
            <div>
                <h6>Quests</h6>
                <div>
                    <p>ปีนไปสู่หัวใจเธอ:</p>
                    <p>{quest.hikingDistance} / ???</p>
                </div>
                <div className="w-full overflow-hidden bg-gray-200 mt-4">


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
                        } text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}
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
            <div>
                <div>
                    <p>Run To Da Moonnnnn:</p>
                    <p>{quest.runningDistance} / 10000</p>
                </div>
                <div className="w-full overflow-hidden bg-gray-100 mt-4">

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
                        } text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}
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
            <button className="add-activity-btn" onClick={handleAddActivity}>Add Activity</button>
        </aside>
    );
};

export default Profile;
