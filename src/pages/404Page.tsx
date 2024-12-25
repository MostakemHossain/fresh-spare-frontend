import { Link } from "react-router-dom"; 
import notFound from "../assets/images/404 page.png";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src={notFound}
        alt="404 page"
        style={{
          maxWidth: "90%",
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            backgroundColor: "#364fe1",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "25px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#2517f1";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#051ed9";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
