// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>
//       HomePage
//     </div>
//   )
// }

// export default HomePage
import React from "react";
import "./HomePage.css";

const Home = () => {
  return (
    <div>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>For Teachers</h3>
            <ul>
              <li>Create a Classroom</li>
              <li>Post Learning Materials</li>
              <li>Engage with Students</li>
            </ul>
          </div>
          <div className="step">
            <h3>For Students</h3>
            <ul>
              <li>Join a Classroom</li>
              <li>Access Learning Materials</li>
              <li>Collaborate with Peers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Secure OTP Login</h3>
            <p>Join classrooms safely with OTP authentication.</p>
          </div>
          <div className="feature">
            <h3>Easy Classroom Creation</h3>
            <p>Teachers can quickly set up and manage classrooms.</p>
          </div>
          <div className="feature">
            <h3>Collaborative Learning</h3>
            <p>Students can interact, learn, and grow together.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 StudyNest | All rights reserved</p>
        <div className="social-links">
          {/* Add icons for social media */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
