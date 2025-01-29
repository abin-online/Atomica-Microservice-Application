'use client'
import { getProfile } from "@/api/badge";
import { collabLists } from "@/api/collaboration";
import React, { useState, useEffect } from "react";

import Pagination from "@/app/components/Pagination";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton";
import Streak from "@/components/Profile/Streak";
import { getUserContestData } from "@/api/contest";

const Profile = () => {


  const user: any = localStorage.getItem('user')
  const USER = JSON.parse(user)

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  const [isTestBadgeModalOpen, setIsTestBadgeModalOpen] = useState(false);
  const [isBadgeImageModalOpen, setIsBadgeImageModalOpen] = useState(false);
  const [selectedBadgeImage, setSelectedBadgeImage] = useState(null);


  const openBadgeImageModal = (image: any) => {
    setSelectedBadgeImage(image);
    setIsBadgeImageModalOpen(true);
  };
  const closeBadgeImageModal = () => setIsBadgeImageModalOpen(false);


  const openTestBadgeModal = () => setIsTestBadgeModalOpen(true);
  const closeTestBadgeModal = () => setIsTestBadgeModalOpen(false);


  const [userProblem, setUserProblem] = useState<{
    _id: string;
    name: string;
    email: string;
    badges: string[];
    attempted: number;
    solved: number;
    completed: {
      problem: string;
      submissionDate: string;
      _id: string;
    }[];
    streak: {
      current: string;
      highest: string;
      lastUpdated: string;
    }
    points: number;
  } | null>(null);

  const [createdSessions, setCreatedSession] = useState(null)
  const [joinedSessions, setJoinedSessions] = useState(null)

  const [userMCQ, setUserMCQ] = useState({
    _id: "",
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
    instagram: "",
    linkedIn: "",
    X: "",
    facebook: "",
    website: "",
    badges: [],
    testAttended: 0,
    questionAttended: 0,
    wrongAnswers: 0,
    rightAnswers: 0,
    points: 0,
  });

  const [contestData, setContestData] = useState({
    contestName : "",
    name: "",
    duration : 0,
    points : 0,
    createdAt: ""
  })


  const [testBadges, setTestBadges] = useState({
    name: '',
    description: '',
    minQuestionsSolved: 0,
    category: 'test',
    imageURL: null as File | null,
  });

  const [problemBadges, setProblemBadges] = useState<
    {
      name: string;
      description: string;
      minQuestionsSolved: number;
      category: string;
      imageURL: string | null;
    }[]
  >([]);




  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const [response, collabResponse, ]: any = await Promise.all([getProfile(),
        collabLists(), ])
        const userContestResponse = await getUserContestData(USER?.name)
        console.log("user contest response ", userContestResponse)
        setContestData(userContestResponse?.data)
        console.log("collab", collabResponse)
        setCreatedSession(collabResponse.data.createdSessions);
        setJoinedSessions(collabResponse.data.joinedSessions);

        setUserProblem(response.data.userProblem);
        setUserMCQ(response.data.userMCQ);
        setProblemBadges(response.data.problemBadges);
        setTestBadges(response.data.testBadges)

        console.log("#MCQ", response.data.userProblem)
        console.log(collabResponse.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }


    }
    fetchUserProfile()
  }, [])

  const paginate = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);

  const openImageModal = (imageURL: string) => {
    setSelectedImageURL(imageURL);
    setIsImageModalOpen(true);
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageURL(null);
  };

  const [activeTab, setActiveTab] = useState('recentSolved');
  const [activeSubTab, setActiveSubTab] = useState('created');

  const formatDuration = (durationString: any) => {
    const duration = new Date(durationString).getTime(); // Convert timestamp to milliseconds

    if (isNaN(duration)) {
      return "Invalid duration"; // Fallback if the duration is invalid
    }

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    let formattedDuration = "";

    if (hours > 0) {
      formattedDuration += `${hours}h `;
    }
    if (remainingMinutes > 0 || hours > 0) { // Only show minutes if hours are shown, or minutes > 0
      formattedDuration += `${remainingMinutes}m `;
    }
    if (remainingSeconds > 0 || (minutes === 0 && hours === 0)) { // Only show seconds if less than a minute or no hours/minutes
      formattedDuration += `${remainingSeconds}s`;
    }

    return formattedDuration.trim();
  };

  const handleUpdateProfile = (updatedProfile: typeof userMCQ) => {
    setUserMCQ(updatedProfile);
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-6">
      <div className="flex justify-center items-start max-w-[1110px] w-full">
        {/* Sidebar */}
        {isLoading ? (
          <ProfileSkeleton />
        ) :
          <ProfileCard user={userMCQ} onUpdate={handleUpdateProfile} isLoading={isLoading} />

        }

        {/* Main Content */}
        <div className="flex flex-col gap-6 w-full">


          <div className="flex gap-6 justify-center">
            {/* Achievements Section */}
            <div className="bg-white shadow-md rounded-lg p-6 w-[400px] h-64">
              <h2 className="text-lg font-bold text-gray-800 mb-2">PROBLEMS</h2>
              {userProblem ? (
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Points:</span> {userProblem.points}
                  </p>
                  <p>
                    <span className="font-semibold">Attempted Problems:</span>{" "}
                    {userProblem.attempted}
                  </p>
                  <p>
                    <span className="font-semibold">Solved Problems:</span>{" "}
                    {userProblem.solved}
                  </p>
                  {/* Last Submission Date */}
                  <p>
                    <span className="font-semibold">Last Submission Date:</span>{" "}
                    {userProblem.completed.length > 0
                      ? new Date(
                        userProblem.completed[userProblem.completed.length - 1]
                          .submissionDate
                      ).toLocaleDateString()
                      : "No submissions yet"}
                  </p>
                  <button
                    onClick={openModal}
                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    View Problem Badges
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No data available</p>
              )}
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-[600px] p-6 rounded-lg shadow-md relative">

                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    ×
                  </button>

                  <h2 className="text-xl font-semibold mb-4">Problem Badges</h2>

                  {/* Table displaying the problem badges */}
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Badge Name</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Minimum Questions Solved</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Badge Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problemBadges.map((badge, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{badge.name}</td>
                          <td className="px-4 py-2">{badge.description}</td>
                          <td className="px-4 py-2">{badge.minQuestionsSolved}</td>
                          <td className="px-4 py-2">{badge.category}</td>
                          <td className="px-4 py-2">
                            {badge.imageURL ? (
                              <img
                                src={badge.imageURL}
                                alt={badge.name}
                                className="w-12 h-12 object-cover cursor-pointer"
                                onClick={() => openImageModal(badge?.imageURL)}
                                title="Click to view full image"
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>


                </div>
              </div>
            )}

            {isImageModalOpen && selectedImageURL && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-md relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-0.5 right-0.5 text-3xl text-gray-500 hover:text-gray-700"
                    onClick={closeImageModal}
                  >
                    ×
                  </button>

                  {/* Image */}
                  <img
                    src={selectedImageURL}
                    alt="Full-size Badge"
                    className="w-[500px] h-[500px] object-contain"
                  />
                </div>
              </div>
            )}






            {/* QUICKTEST Section */}
            <div className="bg-white shadow-md rounded-lg p-6 w-[400px] h-64">
              <h2 className="text-lg font-bold text-gray-800 mb-2">QUICK TEST</h2>
              {userMCQ ? (
                <div className="text-sm text-gray-600">


                  <p>
                    <span className="font-semibold">Points:</span> {userMCQ.points}
                  </p>
                  <p>
                    <span className="font-semibold">Tests Attended:</span> {userMCQ.testAttended}
                  </p>
                  <p>
                    <span className="font-semibold">Questions Attended:</span> {userMCQ.questionAttended}
                  </p>
                  <p>
                    <span className="font-semibold">Wrong Answers:</span> {userMCQ.wrongAnswers}
                  </p>
                  <p>
                    <span className="font-semibold">Right Answers:</span> {userMCQ.rightAnswers}
                  </p>
                  <button
                    onClick={openTestBadgeModal}
                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    View Test Badges
                  </button>


                </div>
              ) : (
                <p className="text-sm text-gray-600">No activity recorded</p>
              )}
            </div>

          </div>


          {isTestBadgeModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-[600px] p-6 rounded-lg shadow-md relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeTestBadgeModal}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">Test Badges</h2>
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Badge Name</th>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-left">Minimum Questions Solved</th>
                      <th className="px-4 py-2 text-left">Badge Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testBadges?.map((badge: any, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="px-4 py-2">{badge.name}</td>
                        <td className="px-4 py-2">{badge.description}</td>
                        <td className="px-4 py-2">{badge.minQuestionsSolved}</td>
                        <td className="px-4 py-2">
                          {badge.imageURL ? (
                            <img
                              src={badge.imageURL}
                              alt={badge.name}
                              className="w-12 h-12 object-cover rounded cursor-pointer"
                              onMouseEnter={() => openBadgeImageModal(badge.imageURL)}
                            />
                          ) : (
                            <span className="text-gray-500 italic">No Image</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {isBadgeImageModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={closeBadgeImageModal}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {selectedBadgeImage && (
                  <img src={selectedBadgeImage} alt="Badge Preview" className="max-w-full max-h-[500px] object-contain" />
                )}
              </div>
            </div>
          )}





          {/* Row 2: Full-Width Div */}
          <Streak />


          <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto h-[500px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Activities</h2>

            {/* Main Tabs */}
            <div className="flex space-x-4 border-b mb-4 w-[750px]">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "recentSolved" ? "border-b-2 border-blue-500" : "text-gray-600"
                  }`}
                onClick={() => setActiveTab("recentSolved")}
              >
                Recently Solved
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "recentSessions" ? "border-b-2 border-blue-500" : "text-gray-600"
                  }`}
                onClick={() => setActiveTab("recentSessions")}
              >
                Recent Sessions
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "Contest" ? "border-b-2 border-blue-500" : "text-gray-600"
                  }`}
                onClick={() => setActiveTab("Contest")}
              >
                Contest
              </button>
            </div>

            {/* Recently Solved Tab */}
            {activeTab === "recentSolved" && (
              <div className="h-[calc(100%-80px)] overflow-auto w-[750px]">
                {userProblem?.completed.length > 0 ? (
                  <div>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left text-gray-700">Problem</th>
                          <th className="px-4 py-2 text-left text-gray-700">Submission Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginate(userProblem.completed).map((completion) => (
                          <tr key={completion._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{completion.problem}</td>
                            <td className="px-4 py-2">{new Date(completion.submissionDate).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>


                    <Pagination
                      totalItems={userProblem.completed.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />


                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mt-4">No completed problems yet</p>
                )}
              </div>
            )}

            {/* Recent Sessions Tab */}
            {activeTab === "recentSessions" && (
              <div className="h-[calc(100%-80px)] overflow-auto w-[750px]">
                {/* Sub-Tabs */}
                <div className="flex space-x-4 border-b mb-4">
                  <button
                    className={`px-4 py-2 font-medium ${activeSubTab === "created" ? "border-b-2 border-blue-500" : "text-gray-600"
                      }`}
                    onClick={() => setActiveSubTab("created")}
                  >
                    Created Sessions
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activeSubTab === "joined" ? "border-b-2 border-blue-500" : "text-gray-600"
                      }`}
                    onClick={() => setActiveSubTab("joined")}
                  >
                    Joined Sessions
                  </button>
                </div>

                {activeSubTab === "created" && (
                  <div>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left text-gray-700">Session ID</th>
                          <th className="px-4 py-2 text-left text-gray-700">Time</th>
                          <th className="px-4 py-2 text-left text-gray-700">Duration</th>
                          <th className="px-4 py-2 text-left text-gray-700">Members</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginate(createdSessions).map((session) => (
                          <tr key={session._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{session.roomId}</td>
                            <td className="px-4 py-2">{new Date(session.createdAt).toLocaleString()}</td>
                            <td className="px-4 py-2">{formatDuration(session.duration)}</td>

                            <td className="px-4 py-2">{session.members.join(",") || "No members joined"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      totalItems={createdSessions.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}

                {activeSubTab === "joined" && (
                  <div>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left text-gray-700">Session ID</th>
                          <th className="px-4 py-2 text-left text-gray-700">Host</th>
                          <th className="px-4 py-2 text-left text-gray-700">Time</th>
                          <th className="px-4 py-2 text-left text-gray-700">Members</th>
                          <th className="px-4 py-2 text-left text-gray-700">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginate(joinedSessions).map((session) => (
                          <tr key={session._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{session.roomId}</td>
                            <td className="px-4 py-2">{session.createdBy.split('@')[0]}</td>
                            <td className="px-4 py-2">
                              {new Date(session.createdAt).toLocaleString("en-US", {
                                weekday: "short", // Optional: "Mon"
                                year: "numeric", // "2025"
                                month: "short", // "Jan"
                                day: "numeric", // "1"
                                hour: "2-digit", // "11"
                                minute: "2-digit", // "02"
                                hour12: true, // 12-hour format (AM/PM)
                              })}
                            </td>
                            <td className="px-4 py-2">
                              {session.members.length > 0
                                ? session.members.map((element: any) => (
                                  <span key={element}>{element.split('@')[0]}<br /></span>
                                ))
                                : "No members joined"
                              }
                            </td>
                            <td className="px-4 py-2">{formatDuration(session.duration)}</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      totalItems={joinedSessions?.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === "Contest" && (
              <div className="h-[calc(100%-80px)] overflow-auto w-[750px]">
                {contestData?.length > 0 ? (
                  <div>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left text-gray-700">Contest Name</th>
                          <th className="px-4 py-2 text-left text-gray-700">Duration</th>
                          <th className="px-4 py-2 text-left text-gray-700">Points</th>
                          <th className="px-4 py-2 text-left text-gray-700">Submission Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginate(contestData).map((data, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{data.contestName}</td>
                            <td className="px-4 py-2">{data.duration}</td>
                            <td className="px-4 py-2">{data.points}</td>
                            <td className="px-4 py-2">{new Date(data.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>


                    <Pagination
                      totalItems={userProblem.completed.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />


                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mt-4">No completed problems yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Profile;
