import React, { useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const fetchProfile = async () => {
    if (!username) return;
    setLoading(true);
    setProfile(null);
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      if (data.message === "Not Found") {
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="toggle-container">
        <button onClick={toggleTheme} className="toggle-btn">
          <i className={`bi bi-${theme === "light" ? "moon" : "sun"}`}></i>
        </button>
      </div>

      <div className="form-container">
        <h2>🔭 GitHub Profile Finder</h2>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchProfile}>Search</button>
      </div>

      {loading && <div className="loader">🔄 Searching...</div>}

      {profile && (
        <div className="profile-card">
          <img src={profile.avatar_url} alt="avatar" />
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
          <a href={profile.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;