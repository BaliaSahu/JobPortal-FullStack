import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ContactActions = ({ mobile, email }) => {
  if (!mobile && !email) return null;

  return (
    <div className="d-flex gap-2">

      {/* 📞 Call */}
      {mobile && (
        <a
          href={`tel:${mobile}`}
          className="btn btn-outline-primary btn-sm"
          title="Call"
        >
          <i className="bi bi-telephone-fill"></i>
        </a>
      )}

      {/* 💬 WhatsApp */}
      {mobile && (
        <a
          href={`https://wa.me/${mobile}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-success btn-sm"
          title="WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      )}

      {/* ✉️ Email */}
      {email && (
        <a
          href={`mailto:${email}`}
          className="btn btn-outline-danger btn-sm"
          title="Email"
        >
          <i className="bi bi-envelope-fill"></i>
        </a>
      )}

    </div>
  );
};

export default ContactActions;
