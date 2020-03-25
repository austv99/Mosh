import React, { useState , useEffect } from 'react';
import YoutubeResult from './YoutubeResult';
const YoutubeSearch= () => {
	//const [location, setLocation] = useState("Seattle,WA");
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
			</form>
			
        </div>
    );
};

/*TMP
                {isSubmitted && }
setSubmitted(true); 
                    //note that we dont need submit for this to work  
                    useEffect(() => {
        setSubmitted(false); 
    }, [search]);
    
        const [isSubmitted,setSubmitted] = useState(false);

 */
export default YoutubeSearch;