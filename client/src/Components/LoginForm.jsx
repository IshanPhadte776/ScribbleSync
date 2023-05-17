import React from 'react'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get('http://localhost:3001/getUsers');
          setUsers(result.data);
        };
        fetchData();
      }, []);


  return (
    <div>LoginForm</div>
  )
}

export default LoginForm