import React , {useState} from 'react'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';





function App() 
{ const [username, setUsername] = useState(''); 
    const [profile, setProfile] = useState(null); const [darkMode, setDarkMode] = useState(false); const [error, setError] = useState('');

const toggleMode = () => { setDarkMode(!darkMode); document.body.classList.toggle('dark-mode'); };

const fetchProfile = async () => { if (!username.trim()) { setError('⚠ Please enter a GitHub username.'); setProfile(null); return; }

setError('');
setProfile(null);

try {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  if (data.message === 'Not Found') {
    setError('❌ No user found with that username.');
    setProfile(null);
  } else {
    setError('');
    setProfile(data);
  }
} catch (err) {
  setError('🚫 Something went wrong. Try again later.');
  setProfile(null);
}

};

return (
  <div className="app">
    <button className="toggle-btn" onClick={toggleMode}>
      <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
    </button>

    <div className="search-box glass">
      <h2><i className="bi bi-github"></i> GitHub Profile Finder</h2>
      <input
        type="text"
        placeholder="GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Search</button>
    </div>

    {error && <p className="error-msg">{error}</p>}

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
