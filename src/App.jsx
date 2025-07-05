import React, { useState } from "react";
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    setProfile(data);
  };

  return (
    <div className="container">
      <h2>GitHub Profile Finder</h2>
      <input
        type="text"
        placeholder="GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Search</button>

      {profile && (
        <div className="profile">
          <img src={profile.avatar_url} alt="Avatar" />
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
          <p><a href={profile.html_url} target="_blank" rel="noreferrer">View Profile</a></p>
        </div>
      )}
    </div>
  );
}

export default App;