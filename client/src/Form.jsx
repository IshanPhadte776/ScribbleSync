import React, { useState } from 'react';
import axios from 'axios';


function Form() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/addUsers', {
          username,
          email,
          password,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
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
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign up</button>
    </form>
    </div>
  )
}

export default Form;