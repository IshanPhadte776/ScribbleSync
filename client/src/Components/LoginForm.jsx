import React, { useState,useEffect } from 'react';
import axios from 'axios';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [users, setUsers] = useState([]);

    const [loggedIn, setloggedIn] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get('http://localhost:3001/getUsers');
          setUsers(Object.values(result.data)[0]);
        };
        fetchData();
      }, []);

    const handleSubmit = async (e) => {
        //prevents the reload of the page
        e.preventDefault();

        users.forEach(function(element) {
            if (element.username === username && element.password === password){
                setloggedIn(true)
            }
            
            else {
            }
        });

        if (loggedIn) {
            console.log(true)
        }

        else {
            console.log(false)
        }

    };


  return (
    <div>
    <form onSubmit={handleSubmit}>
     <label>
       Username:
       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
     </label>
     <label>
       Password:
       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     </label>
     <button type="submit">Login</button>
   </form>
   </div>
  )
}

export default LoginForm