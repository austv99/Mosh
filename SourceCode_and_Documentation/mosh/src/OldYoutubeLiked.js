/*
        var channelOptions = {
            access_token:access_token,
            key:userKey,
            part:'contentDetails',
            maxResults:10,
            mine:true
            
        }
        const playlistOptions = {
            part:'contentDetails',
            key:userKey,
            client_id:clientId,
            playlistId:''
        }
        const channelQuery = Object.keys(channelOptions).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(channelOptions[k])).join('&');
        var channelURL = 'https://www.googleapis.com/youtube/v3/channels?' + channelQuery;
        //var URL1 = 'https://www.googleapis.com/youtube/v3/playlistItems?';

        // GET request using fetch inside useEffect React hook

        
        
        fetch(channelURL)
        .then(response => response.json())
        .then(responseData => {
            //console.log(responseData);
            if (responseData.items == null){
                console.log(responseData)
            } else {
                var likedPlaylist = (responseData.items).map(a => a.contentDetails.relatedPlaylists.likes);
                console.log(likedPlaylist);
                console.log(responseData)
                playlistOptions.playlistId = likedPlaylist;
            }
        }).then(() =>{

            var query1 = Object.keys(playlistOptions).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(playlistOptions[k])).join('&');
            var playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems?' + query1;
            console.log(playlistURL)
            fetch(playlistURL)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.items == null){
                    console.log(responseData)
                } else {
                    var likedVideos = (responseData.items).map(a => a.contentDetails.videoId);
                    console.log(likedVideos);  
                    setResult(likedVideos[0]) 
                    
                }
            })
        });
        */