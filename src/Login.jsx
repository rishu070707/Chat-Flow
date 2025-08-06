import React, { useEffect } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import swordImage from "./sword.jpg";
import video from "./2.mp4";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    await signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          toast.success("Signed in with Google");
          navigate("/chat");
          return;
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User detected from auth state", user);
        navigate("/chat");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${swordImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* White Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.08)",
          zIndex: 1,
        }}
      />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          zIndex: 2,
          opacity: 0.4,
        }}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Login Card */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", zIndex: 3, position: "relative" }}
      >
        <div
          className="card p-4 text-white"
          style={{
            width: "25rem",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 20px rgba(0,0,0,0.6)",
          }}
        >
          <div className="card-body text-center">
            <h1 className="fw-bold mb-4 text-uppercase">Login</h1>
            <hr className="my-3" />
            <button className="btn btn-danger btn-lg w-100 mb-3" onClick={handleGoogleSignIn}>
              <i className="fab fa-google me-2"></i> Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
