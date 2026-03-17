import { ActivityCalendar } from "react-activity-calendar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {

const token = localStorage.getItem("token");

const [user,setUser] = useState(null);
const [editMode,setEditMode] = useState(false);
const [error,setError] = useState(null);

useEffect(()=>{
if(token){
fetchProfile();
}
},[token]);


/* FETCH PROFILE */
const fetchProfile = async () => {

try{

const res = await axios.get(
"http://localhost:5500/api/user/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
});

setUser(res.data);

}catch(err){

// 🔥 HANDLE DELETED USER

if(err.response?.status === 404){

alert("Your account no longer exists");

// clear everything
localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("role");

// redirect to login
window.location.href = "/login";

}

else{
console.error(err);
}

}

};

/* GENERATE HEATMAP DATA */
const generateActivityData = () => {

const today = new Date();
const start = new Date();
start.setFullYear(today.getFullYear() - 1);

const data = [];

for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {

const dateStr = d.toISOString().split("T")[0];

const existing = user?.activity?.find(a => a.date === dateStr);

const count = existing ? existing.count : 0;

data.push({
date: dateStr,
count: count,
level: count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 6 ? 3 : 4
});

/* insert real blank day before each month */
if (d.getDate() === 1) {

const gapDay = new Date(d);
gapDay.setDate(gapDay.getDate() - 1);

data.push({
date: gapDay.toISOString().split("T")[0],
count: 0,
level: 0
});

}

}
return data;
};

/* HANDLE INPUT */

const handleChange = (e) => {

setUser({
...user,
[e.target.name]:e.target.value
});

};

/* SAVE PROFILE */

const saveProfile = async () => {

try{

const res = await axios.put(
"http://localhost:5500/api/user/profile",
{
fullName:user.fullName,
phoneNumber:user.phoneNumber,
gender:user.gender,
bio:user.bio,
university:user.university,
github:user.github,
linkedin:user.linkedin
},
{
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
}
});

setUser(res.data.user || res.data);
setEditMode(false);

alert("Profile updated");

}catch(err){

alert("Profile update failed");

}

};


/* UPLOAD PROFILE PICTURE */
const uploadProfilePicture = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);
  try {

    const res = await axios.post(
      "http://localhost:5500/api/user/upload-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    const updatedUser = {
      ...user,
      profilePicture: res.data.profilePicture
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("storage"));

    alert("Profile picture updated");
    return () => window.removeEventListener("storage", updateUser);

  } catch (err) {

    console.error(err);
    alert("Upload failed");

  }

};
/* LOGOUT */

const logout = () => {

localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("role");

window.location.href="/login";

};

if(error){
return <div className="profile-error">{error}</div>;
}

if(user === null){
return <div style={{color:"white"}}>Loading profile...</div>
}

return (

<div className="profile-container">

{/* PROFILE + INFO */}

<div className="top-section">

{/* PROFILE HEADER */}

<div className="profile-card">

<div className="profile-header-row">

<img
  src={
    user?.profilePicture &&
    user.profilePicture !== "" &&
    !user.profilePicture.includes("default")
      ? `http://localhost:5500${user.profilePicture}`
      : user?.gender === "female"
      ? "/images/Default_women_avatar.png"
      : "/images/Default_men_avatar.png"
  }
  className="profile-avatar"
/>

{editMode && (
<input
type="file"
accept="image/*"
onChange={uploadProfilePicture}
/>
)}

<div className="profile-details">

<h2>{user.fullName}</h2>
<p className="username">@{user.userId}</p>

</div>

</div>

{editMode ? (

<textarea
className="bio-edit"
name="bio"
value={user.bio || ""}
onChange={handleChange}
rows="3"
/>

) : (

<p className="profile-bio">
{user.bio || "No bio added yet."}
</p>

)}

<div className="profile-edit-buttons">

{editMode ? (

<>
<button className="save-btn" onClick={saveProfile}>
Save
</button>

<button
className="cancel-btn"
onClick={()=>{
setEditMode(false);
fetchProfile();
}}
>
Cancel
</button>
</>

) : (

<button className="edit-btn" onClick={()=>setEditMode(true)}>
Edit Profile
</button>

)}

</div>

</div>

{/* INFO */}

<div className="profile-info">

<h3>Info</h3>

<div className="info-row">

<div className="info-item">
<label>Full Name</label>
<input
name="fullName"
value={user.fullName || ""}
onChange={handleChange}
disabled={!editMode}
/>
</div>

<div className="info-item">
<label>Mobile</label>
<input
name="phoneNumber"
value={user.phoneNumber || ""}
onChange={handleChange}
disabled={!editMode}
/>
</div>

<div className="info-item">
<label>Email</label>
<input value={user.email || ""} disabled />
</div>

<div className="info-item">
<label>Gender</label>
<input value={user.gender || ""} disabled/>
</div>

<div className="info-item">
<label>University</label>
<input
name="university"
value={user.university || ""}
onChange={handleChange}
disabled={!editMode}
/>
</div>

<div className="info-item">
<label>Github</label>
<input
name="github"
value={user.github || ""}
onChange={handleChange}
disabled={!editMode}
/>
</div>

<div className="info-item">
<label>LinkedIn</label>
<input
name="linkedin"
value={user.linkedin || ""}
onChange={handleChange}
disabled={!editMode}
/>
</div>

<div className="info-item">
<label>Date Joined</label>
<input
value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
disabled
/>
</div>

</div>
</div>
</div>

{/* STATS */}

<div className="stats-wrapper">

<div className="stats-grid">

<div className="stat-card">
<h4>Global Rank</h4>
<p>{user?.rank || 0}</p>
</div>

<div className="stat-card">
<h4>Country Rank</h4>
<p>{user?.countryRank || 0}</p>
</div>

<div className="stat-card">
<h4>Score</h4>
<p>{user?.score || 0}</p>
</div>

<div className="stat-card">
<h4>Solved</h4>
<p>{user?.solvedChallenges || 0}</p>
</div>

<div className="stat-card">
<h4>Submissions</h4>
<p>{user?.submissions || 0}</p>
</div>

</div>

</div>

{/* BADGES */}

<div className="badges">

<h3>Badges</h3>

<div className="badge-grid">

{user.badges?.length ? (
user.badges.map((badge,i)=>(
<div key={i} className="badge-card">

<img src={badge.icon} alt={badge.name} />

<p>{badge.name}</p>

</div>
))
) : (
<p>No badges yet</p>
)}

</div>

</div>

{/* ACTIVITY HEATMAP */}
<ActivityCalendar
data={generateActivityData()}
blockSize={15}
blockMargin={5}
showWeekdayLabels
theme={{
dark: ['#1f2937','#9be9a8','#40c463','#30a14e','#216e39'],
light: ['#1f2937','#9be9a8','#40c463','#30a14e','#216e39']
}}
/>

{/* RECENT SOLVES */}
<div className="recent-solves">

<h3>Recent Solves</h3>

<table>

<thead>
<tr>
<th>Challenge</th>
<th>Category</th>
<th>Points</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{user.recentSolves?.length ? (
user.recentSolves.map((solve,i)=>(
<tr key={i}>
<td>{solve.challenge}</td>
<td>{solve.category}</td>
<td>{solve.points}</td>
<td>{new Date(solve.date).toLocaleDateString()}</td>
</tr>
))
) : (
<tr>
<td colSpan="4">No solves yet</td>
</tr>
)}

</tbody>

</table>

</div>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

);

};

export default Profile;