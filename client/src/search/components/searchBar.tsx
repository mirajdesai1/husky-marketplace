import { useCallback, useState } from 'react';
import youtubeAPI from '../../api/youtubeAPI';


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([]);

    const fetchVideos = useCallback(() => {
        youtubeAPI.get('/search', {
            params: {
                q: searchTerm
            }
        }).then(resp => {
            setSearchResults(resp.data.items)

        }).catch(e => console.log(e))
    }, [searchTerm])

    return (
        <div>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button onClick={fetchVideos} >Search</button>
            {searchResults.map((searchResult, index) => {
                return (
                    <div>
                        <img src={(searchResult as any).snippet.thumbnails.high.url}></img>
                    </div>
                )
            })}
        </div>
    )

}

export default SearchBar;