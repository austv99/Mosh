import React, { useState , useEffect } from 'react';
import YoutubeResult from './YoutubeResult';
import YoutubeLiked from './YoutubeLiked';

const YoutubeSearch= () => {
    const [submitted,setSubmitted] = useState("");
    const [search,setSearch] = useState("");
    useEffect(() => {
        setSubmitted("false"); 
    }, [search,setSearch,submitted,setSubmitted]);
    return (
        <div className="search-params">
            {search}
            <form
				onSubmit={e => {
					e.preventDefault(); //prevents sending html post form
                    setSubmitted("true"); 
                }}
            >
                <label htmlFor="SongName">
                    Input Song Name<br/>
					<input
						id="search"
						value={search}
						placeholder="SongName"
						//anytime change occurs it will auto change
						onChange={event => setSearch(event.target.value)}
					/>
				</label>
				<button>Submit</button>
                <YoutubeResult InputTitle={search} isSubmitted={submitted}/>
                <YoutubeLiked/>

			</form>
        </div>
    );
};
export default YoutubeSearch;