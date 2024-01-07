import './index.css'
import { Search } from 'react-feather'
const SearchBar = () => {
    return(
        <div className='searchBar'>
            <input type="text" className='searchBarInput'/>
            <Search className='searchBarIcon'/>
        </div>
    )
}
export default SearchBar