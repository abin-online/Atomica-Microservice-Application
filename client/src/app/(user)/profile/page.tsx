'use client'
import { getProfile } from "@/api/badge";
import React, { useState, useEffect } from "react";



const Profile = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  const [isTestBadgeModalOpen, setIsTestBadgeModalOpen] = useState(false);
const [isBadgeImageModalOpen, setIsBadgeImageModalOpen] = useState(false);
const [selectedBadgeImage, setSelectedBadgeImage] = useState(null);


const openBadgeImageModal = (image) => {
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
    points: number;
  } | null>(null);

  const [userMCQ, setUserMCQ] = useState({
    _id: "",
    name: "",
    email: "",
    badges: [],
    testAttended: 0,
    questionAttended: 0,
    wrongAnswers: 0,
    rightAnswers: 0,
    points: 0,
  });


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




  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response: any = await getProfile()
        // const {userProblem,
        //   userMCQ,
        //   problemBadges,
        //   testBadges} = response.data
        setUserProblem(response.data.userProblem);
        setUserMCQ(response.data.userMCQ);
        setProblemBadges(response.data.problemBadges);
        setTestBadges(response.data.testBadges)

        console.log(response.data)
      } catch (error) {
        console.log(error)
      }


    }
    fetchUserProfile()
  }, [])

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


  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-6">
      <div className="flex justify-center items-start max-w-[1110px] w-full">
        {/* Sidebar */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6 w-80 h-[912px]">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold">{userProblem?.name || userMCQ?.name}</h1>
              <p className="text-sm"> <span className="font-semibold">{userProblem?.email || userMCQ?.email}</span></p>
              {/* <p className="text-sm">Global Rank: <span className="font-semibold">#12345</span></p>

              <p className="text-sm">Country: <span className="font-semibold">USA</span></p> */}
              <button className="mt-4 px-4 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100">
                {/* View Full Profile */}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1: Div 2 and Div 3 */}
          {/* <div className="flex gap-6 justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-[400px] h-64  ">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Achievements</h2>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                ullamcorper ultricies nisi.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-[400px] h-64   ">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Activity</h2>
              <p className="text-sm text-gray-600">
                Aliquam nec dui nec urna volutpat mollis. Nullam eleifend, turpis
                non sagittis tempor.
              </p>
            </div>
          </div> */}

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
                {testBadges.map((badge, index) => (
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
          <div className="bg-white shadow-md rounded-lg p-6 w-[824px] h-52  self-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Overview</h2>
            <p className="text-sm text-gray-600">
              Phasellus fermentum ipsum ut mi facilisis gravida. Suspendisse in
              nunc sed metus malesuada accumsan eget sit amet sapien.
            </p>
          </div>

          {/* Row 3: Full-Width Div */}
          {/* <div className="bg-white shadow-md rounded-lg p-6 w-[824px] h-[400px]  self-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Overview</h2>
            <p className="text-sm text-gray-600">
              Phasellus fermentum ipsum ut mi facilisis gravida. Suspendisse in
              nunc sed metus malesuada accumsan eget sit amet sapien.
            </p>
          </div> */}

          <div className="bg-white shadow-md rounded-lg p-6 w-[824px] h-[400px] self-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Recently Solved</h2>
            <p className="text-sm text-gray-600">
            </p>

            {userProblem && userProblem.completed.length > 0 ? (
              <div className="mt-4">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Problem</th>
                      <th className="px-4 py-2 text-left">Submission Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProblem.completed.map((completion) => (
                      <tr key={completion._id} className="border-b">
                        <td className="px-4 py-2">{completion.problem}</td>
                        <td className="px-4 py-2">{new Date(completion.submissionDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-600 mt-4">No completed problems yet</p>
            )}
          </div>


        </div>
      </div>
    </div>

  );
};

export default Profile;
