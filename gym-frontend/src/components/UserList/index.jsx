import './index.css'
const UserList = ({userList}) => {
    return(
        <ul className='listUserData'>
          <li className='exampleValues'>
              <p className='small'>Id</p>
              <p className='medium'>Name</p>
              <p className='small'>Age</p>
              <p className='small'>Height</p>
              <p className='large'>Email</p>
          </li>
         {userList.map((data,index)=>
            <li key={index} className='singleUserData'>
              <p className='small'>{data.id}</p>
              <p className='medium'>{data.firstName? data.firstName+" "+data.lastName : 'N/A'}</p>
              <p className='small'>{data.age? data.age : 'N/A'}</p>
              <p className='small'>{data.height ? data.height : 'N/A'}</p>
              <p className='large'>{data.email ? data.email : 'N/A'}</p>
            </li>
          )}
        </ul>
    )
}

export default UserList