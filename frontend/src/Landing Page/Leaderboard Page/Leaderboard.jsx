import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {

const [users, setUsers] = useState([]);

useEffect(() => {

const fetchLeaderboard = async () => {

try {

const res = await axios.get(
"http://localhost:5500/api/leaderboard/global"
);

setUsers(res.data);

} catch (error) {

console.error("Error fetching leaderboard:", error);

}

};

fetchLeaderboard();

}, []);

return (

<div className="leaderboard">

<h2>Global Leaderboard</h2>

<table>

<thead>
<tr>
<th>Rank</th>
<th>User</th>
<th>Score</th>
<th>Country</th>
</tr>
</thead>

<tbody>

{users.map((u, i) => (

<tr key={i}>
<td>{i + 1}</td>
<td>{u.fullName}</td>
<td>{u.score}</td>
<td>{u.country}</td>
</tr>

))}

</tbody>

</table>

</div>

);

};

export default Leaderboard;