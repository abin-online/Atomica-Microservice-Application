'use client';

import NavBar from '@/components/user/Navbar';
import React, { useState } from 'react';

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is Collaborative Coding?',
      answer:
        'Collaborative coding allows users to join forces and work together to solve coding problems. If a user is stuck, they can connect with others to collaborate, share insights, and overcome challenges.',
    },
    {
      question: 'How Does the MCQ Section Work?',
      answer:
        'The MCQ section is designed to enhance users\' knowledge in Computer Science topics. Users can take quizzes on various CS concepts, including algorithms, data structures, and more.',
    },
    {
      question: 'How Can I Collaborate with Others?',
      answer:
        'If you’re struggling to solve a problem, you can use the collaboration feature to find users who are interested in helping. You can chat, share code, and work together in real-time.',
    },
    {
      question: 'Is the Platform Free to Use?',
      answer:
        'Yes! The platform is free to use for all users. We aim to provide a collaborative learning environment without any barriers. However, we offer premium features for those who want to access advanced content and tools.',
    },
    {
      question: 'How Can I Contribute to the Platform?',
      answer:
        'You can contribute by solving problems, sharing your expertise in the MCQ section, and collaborating with others. You can also submit your own challenges to help expand our problem-solving library.',
    },
  ];

  return (
    <>
      <NavBar />
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-indigo-500 to-gray-800 py-12 text-center animate-fadeIn">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-400">
            About Us
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Collaborate, learn, and grow with our unique platform designed for developers by developers.
          </p>
        </header>

        {/* Main Content */}
        <div className="py-16 px-8 space-y-16">
          {/* Collaborative Coding Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col lg:flex-row items-center gap-8 transform transition-transform duration-300 hover:scale-105">
            <div className="flex-1">
              <h2 className="text-4xl font-semibold text-indigo-400">Collaborative Coding</h2>
              <p className="text-gray-300 mt-4">
                Empowering users to solve challenges together. Struggling with a coding problem? Our platform allows
                you to connect with other developers in real-time, enabling efficient problem-solving and knowledge
                sharing.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://www.teahub.io/photos/full/222-2226161_collaboration-concept.jpg"
                alt="Collaborative Coding"
                className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>

          {/* MCQ Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col lg:flex-row-reverse items-center gap-8 transform transition-transform duration-300 hover:scale-105">
            <div className="flex-1">
              <h2 className="text-4xl font-semibold text-indigo-400">MCQ Knowledge Boost</h2>
              <p className="text-gray-300 mt-4">
                Enhance your computer science expertise through our comprehensive MCQ module. Whether you're prepping
                for interviews or sharpening your skills, this section is crafted to keep you ahead.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://www.c-sharpcorner.com/article/understanding-mcq-quiz-feature-using-react-native/images/image01.jpg"
                alt="MCQ Knowledge"
                className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-gradient-to-t from-gray-900 to-gray-800 py-16 px-8">
          <h2 className="text-4xl font-bold text-center text-indigo-400 mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Real-Time Collaboration</h3>
              <p className="text-gray-300">
                Share ideas and code instantly with peers, boosting teamwork and learning.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Expertly Curated MCQs</h3>
              <p className="text-gray-300">
                Questions covering everything from basics to advanced concepts in CS.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Community Support</h3>
              <p className="text-gray-300">
                Connect with developers worldwide and gain insights into problem-solving.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-800 rounded-lg shadow-lg py-12 px-8">
      <h2 className="text-4xl font-bold text-center text-indigo-400 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ${
              activeIndex === index ? 'bg-gray-700 shadow-md' : 'bg-gray-800'
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left flex justify-between items-center px-6 py-4 text-lg font-medium text-indigo-300 hover:bg-gray-700 focus:outline-none"
            >
              {faq.question}
              <span className="text-2xl">
                {activeIndex === index ? '-' : '+'}
              </span>
            </button>
            {/* Smooth transition on expanding the content */}
            <div
              className={`${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              } overflow-hidden transition-max-height duration-700 `}
            >
              <div className="px-6 py-4 text-gray-300">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>


        {/* Call-to-Action Section */}
        <section className="bg-gray-800 py-16 px-8 text-center">
          <h2 className="text-4xl font-bold text-indigo-400 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join a growing community of learners and problem-solvers today!
          </p>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold py-3 px-8 rounded-lg transition-transform duration-300 transform hover:scale-105">
            Sign Up Now
          </button>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
