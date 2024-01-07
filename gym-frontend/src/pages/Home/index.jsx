import './index.css'
import { useContext } from 'react';
import UserList from '../../components/UserList'
import SearchBar from '../../components/SearchBar'
import FilterSearch from '../../components/FilterSearch'
import { WebsiteNecessaties } from '../../App';

const Home = () => {
  const {users} = useContext(WebsiteNecessaties)
  const userList = users[0]

  return (
    <>
      { userList ? 
        <div className='homeWrapper'>
          <div className='filters'>
            <FilterSearch />
            <SearchBar />
          </div>
          <div>
            <UserList userList={userList}/>
          </div>
        </div>
        : <div><span>Loading spinner here</span></div>
      }
    </>
  );
}

export default Home;