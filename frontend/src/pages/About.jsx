
import React from "react";

const About = () => {
  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "40px",
    background: "#18181b",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt="Saurabh Vivek"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #f97316",
          marginBottom: "20px",
          boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
        }}
      />

      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
          color: "#fff",
        }}
      >
        About Me
      </h2>

      <h3
        style={{
          fontSize: "1.5rem",
          color: "#f97316",
          marginBottom: "15px",
        }}
      >
        Saurabh Vivek
      </h3>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.2rem",
          lineHeight: "1.8",
          maxWidth: "600px",
          margin: "0 auto 30px auto",
        }}
      >
        <strong style={{ color: "#fff" }}>
         
        </strong>{" "}
       
      </p>
    </div>
  );
};

export default About;

