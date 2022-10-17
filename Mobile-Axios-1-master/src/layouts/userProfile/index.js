import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import UserCard from "./components/userCards";
import Footer from "./components/footer";

import "./styles.css";

function UserProfile() {
  return (
    <div className="UserProfile">
      <div className="container">
        <Header />
        <UserCard />
        <Footer />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<UserProfile />, rootElement);

export default UserProfile;