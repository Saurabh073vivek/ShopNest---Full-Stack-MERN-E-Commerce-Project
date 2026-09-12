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

const ReturnPolicy = () => {
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
        Return & Refund Policy
      </h2>

      <p style={{ marginBottom: "20px" }}>
        At <strong style={{ color: "#fff" }}>ShopNest</strong>, we are
        committed to providing quality products and a great shopping
        experience. If you are not satisfied with your purchase, you may
        request a return within 30 days of receiving your order.
      </p>

      <h4 style={headingStyle}>1. Eligibility for Returns</h4>

      <p style={paragraphStyle}>
        To be eligible for a return, the product must be unused and in the
        same condition in which you received it. The item should also be in
        its original packaging and include the receipt or valid proof of
        purchase.
      </p>

      <h4 style={headingStyle}>2. Refund Processing</h4>

      <p style={paragraphStyle}>
        Once we receive your returned product, it will be inspected to
        determine whether it meets our return requirements. You will receive
        an email notification regarding the approval or rejection of your
        refund request.
      </p>

      <p style={paragraphStyle}>
        If your refund is approved, the amount will be refunded to your
        original payment method. Refunds are generally processed within
        5–7 business days after approval.
      </p>

      <h4 style={headingStyle}>3. Non-Returnable Items</h4>

      <p style={paragraphStyle}>
        Certain products may not be eligible for return, including
        perishable goods, personalized or customized products, digital
        products, and items that have been damaged or tampered with after
        delivery.
      </p>

      <h4 style={headingStyle}>4. Return Shipping Costs</h4>

      <p style={paragraphStyle}>
        Customers may be responsible for the shipping costs associated with
        returning an item unless the product was defective, damaged, or an
        incorrect item was delivered.
      </p>

      <h4 style={headingStyle}>5. Damaged or Incorrect Products</h4>

      <p style={paragraphStyle}>
        If you receive a damaged, defective, or incorrect product, please
        contact our support team as soon as possible. We will review the
        issue and provide an appropriate replacement or refund.
      </p>

      <h4 style={headingStyle}>6. Contact Us</h4>

      <p>
        If you have any questions regarding our Return & Refund Policy,
        please contact the ShopNest support team.
      </p>
    </div>
  );
};

export default ReturnPolicy;