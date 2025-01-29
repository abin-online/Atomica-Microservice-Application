'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateProfile } from "@/api/badge";

interface ProfileCardProps {
    user: {
        _id: string;
        name: string;
        email: string;
        bio: string;
        profilePicture: string | null;
        instagram: string;
        linkedIn: string;
        facebook: string;
        website: string;
    };
    onUpdate: (updatedProfile: ProfileCardProps["user"]) => void;
    isLoading: boolean
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onUpdate, isLoading }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState(user); // Initialize with user directly
    const [imagePreview, setImagePreview] = useState(user?.profilePicture || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        // Sync tempUser with user prop when user changes
        setTempUser(user);
        setImagePreview(user?.profilePicture || null);
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const formData = new FormData();
            formData.append("bio", tempUser?.bio);
            formData.append("instagram", tempUser?.instagram);
            formData.append("linkedIn", tempUser?.linkedIn);
            formData.append("facebook", tempUser?.facebook);
            formData.append("website", tempUser?.website);
            if (selectedFile) {
                formData.append("image", selectedFile);
            }


            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            }

            //const response: any = await updateBadge(id, uploadData, headers)
            const response : any = await updateProfile(formData, headers)
            // const response = await axios.post("/api/update-profile", formData, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // });

            if (response.status === 200) {
                onUpdate(response.data.updatedUser);
                setIsEditing(false); // Exit edit mode
                window.location.reload()
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTempUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const socialLinks = [
        { platform: "Facebook", url: tempUser?.facebook, bgColor: "bg-blue-600", hoverColor: "hover:bg-blue-700" },
        { platform: "Instagram", url: tempUser?.instagram, bgColor: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
        { platform: "LinkedIn", url: tempUser?.linkedIn, bgColor: "bg-blue-800", hoverColor: "hover:bg-blue-900" },
        { platform: "Website", url: tempUser?.website, bgColor: "bg-green-600", hoverColor: "hover:bg-green-700" },
    ];

    return (
        <div className="bg-gradient-to-r  from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6 w-80 h-[912px]">
            {/* Profile Picture */}
            <div className="px-12 relative">
                <img
                    src={imagePreview || "https://via.placeholder.com/150"}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
                />
                {isEditing && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                )}
            </div>

            {/* User Details */}
            <div className="text-center w-full">
                {isEditing ? (
                    <>
                        {/* <input
                            type="text"
                            name="name"
                            value={tempUser.name}
                            onChange={handleInputChange}
                            className="w-full mb-2 p-2 border border-gray-300 rounded-md text-black"
                        />
                        <textarea
                            name="bio"
                            value={tempUser.bio}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md text-black"
                        /> */}
                          <h1 className="text-3xl font-extrabold mb-2">{user?.name || ""}</h1>
                          <p className="text-lg italic mb-4">{user?.email || ""}</p>
                          <textarea
                            name="bio"
                            value={tempUser.bio}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md text-black"
                        /> 
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-extrabold mb-2">{user?.name || "N/A"}</h1>
                        <p className="text-lg italic mb-4">{user?.email || "N/A"}</p>
                        <p className="text-sm font-light mb-4">{user?.bio || "Type your bio..."}</p>
                    </>
                )}
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col space-y-3 mb-6 w-full">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="facebook"
                            value={tempUser.facebook}
                            onChange={handleInputChange}
                            placeholder="Facebook URL"
                            className="w-full p-2 border  text-black border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            name="instagram"
                            value={tempUser.instagram}
                            onChange={handleInputChange}
                            placeholder="Instagram URL"
                            className="w-full p-2 border  text-black border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            name="linkedIn"
                            value={tempUser.linkedIn}
                            onChange={handleInputChange}
                            placeholder="LinkedIn URL"
                            className="w-full p-2 border text-black border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            name="website"
                            value={tempUser.website}
                            onChange={handleInputChange}
                            placeholder="Website URL"
                            className="w-full p-2 border  text-black border-gray-300 rounded-md mb-2"
                        />
                    </>
                ) : (
                    socialLinks
                        .filter((link) => link.url)
                        .map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm ${link.bgColor} py-2 px-4 rounded-full shadow-md ${link.hoverColor} transition`}
                            >
                                {link.platform}: {link.url.split("/").reverse()[1]}
                            </a>
                        ))
                )}
            </div>

            {/* Buttons */}
            {isEditing ? (
                <button
                    onClick={handleSaveClick}
                    className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
                >
                    Save
                </button>
            ) : (
                <button
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-white text-indigo-600 font-bold rounded-md hover:bg-gray-200"
                >
                    Edit Profile
                </button>
            )}
        </div>
    );
};

export default ProfileCard;

