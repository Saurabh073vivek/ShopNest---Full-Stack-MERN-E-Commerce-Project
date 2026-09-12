import React from "react";

const textualStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "40px",
  background: "#18181b",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  lineHeight: "1.8",
  color: "#a1a1aa",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
};

const headingStyle = {
  color: "#f97316",
  marginTop: "25px",
  marginBottom: "10px",
};

const paragraphStyle = {
  marginBottom: "15px",
};

const Disclaimer = () => {
  return (
    <div style={textualStyle}>
      <h2
        style={{
          color: "#fff",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "15px",
        }}
      >
        Legal & Site Disclaimer
      </h2>

      <p style={{ marginBottom: "20px" }}>
        <strong style={{ color: "#fff" }}>ShopNest</strong> is an
        educational and demonstration e-commerce project created for
        learning and portfolio purposes. The website demonstrates common
        e-commerce features such as product browsing, cart management,
        authentication, and payment integration.
      </p>

      <h4 style={headingStyle}>1. Product Information</h4>

      <p style={paragraphStyle}>
        Product names, descriptions, images, prices, and other product
        information displayed on ShopNest may be used for demonstration
        purposes only. Some product images may be sourced from publicly
        available image services and may not represent actual products
        available for purchase.
      </p>

      <h4 style={headingStyle}>2. Payment Disclaimer</h4>

      <p style={paragraphStyle}>
        Payment functionality on ShopNest is intended for testing and
        demonstration purposes. If a payment gateway such as Razorpay is
        integrated, transactions should be performed only through the
        appropriate test or sandbox environment during development.
      </p>

      <p style={paragraphStyle}>
        ShopNest does not store sensitive card information, passwords, or
        other confidential payment details directly on the website.
      </p>

      <h4 style={headingStyle}>3. External Links</h4>

      <p style={paragraphStyle}>
        ShopNest may contain links to external websites or third-party
        services. We are not responsible for the content, availability,
        security, or privacy practices of external websites.
      </p>

      <h4 style={headingStyle}>4. No Guarantee</h4>

      <p style={paragraphStyle}>
        While reasonable efforts are made to keep the information on
        ShopNest accurate and functional, no guarantee is provided regarding
        the completeness, accuracy, reliability, or availability of the
        website or its content.
      </p>

      <h4 style={headingStyle}>5. Educational Purpose</h4>

      <p style={paragraphStyle}>
        This project is primarily intended for educational, development,
        testing, and portfolio purposes. It should not be considered a
        fully operational commercial marketplace unless separately
        configured and deployed for real-world use.
      </p>

      <p
        style={{
          marginTop: "30px",
          fontStyle: "italic",
          fontSize: "0.9rem",
          color: "#71717a",
        }}
      >
        By using ShopNest, you acknowledge that this website is primarily
        provided as a demonstration and educational project.
      </p>
    </div>
  );
};

export default Disclaimer;