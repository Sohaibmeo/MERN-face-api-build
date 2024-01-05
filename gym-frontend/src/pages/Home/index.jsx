import './index.css'
import { useContext } from 'react';
import { WebsiteNecessaties } from '../../App';

const Home = () => {
  const {users} = useContext(WebsiteNecessaties)
  const userList = users[0]
  return (
    <div className='homeWrapper'>
      { userList ? 
        userList.map((data,index)=>
          <li key={index} className='listUser'>
            <img src={data.userImage} alt='Loading' height={150} width={150}/>
            <p>Name: {data.firstName+" "+data.lastName}</p>
            <p>Age: 24</p>
            <p>Height: {data.height}</p>
          </li>)
        : "Loading"
      }
    </div>
  );
}

export default Home;