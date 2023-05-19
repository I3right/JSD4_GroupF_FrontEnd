import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Css/UploadImage.css"
import Spinner from "./assets/Spinner.svg";
import Swal from "sweetalert2";

const UploadImage = ({ onImageUpload }) => {
    const [loading, setLoading] = useState(false);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64) {
        setLoading(true);
        axios
            .post(`${import.meta.env.VITE_APP_KEY}/activities/uploadImage`, { image: base64 })
            .then(async (res) => {
                const imageUrl = res.data;
                onImageUpload(imageUrl); // Pass the URL to the parent component
                await Swal.fire({
                    icon: "success",
                    title: "Image uploaded!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    function UploadInput() {
        return (
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and
                            drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        onChange={uploadImage}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                    />
                </label>
            </div>
        );
    }

    return (
        <div className="flex justify-center flex-col ">
            <div>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Upload Photo
                </h2>
            </div>
            <div>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <img src={Spinner} />
                    </div>
                ) : (
                    <UploadInput />
                )}
            </div>
        </div>
    );
}

export default UploadImage