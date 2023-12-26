import axios from 'axios'
import './index.css'
import { useEffect, useState } from 'react';

const Home = () => {
  const [userList,setUserList] = useState([]);
  const [loading,setLoading] =useState(true);

  useEffect(() => {
      const getUsers = async() => {
        try {
          const response = await axios.get("http://localhost:8080/users");
          console.log("Users: ", response.status)
          setUserList(response.data);
          setLoading(false)
        } catch (error) {
          console.log("Its not working");
        }
      }
      if(loading)
        getUsers();
    },[loading])

  return (
    <div className='homeWrapper'>
      {
        loading? "Loading": userList.map((data)=><li><img src={data.userImage} alt='Loading'/></li>)
      }
    </div>
  );
}

export default Home;