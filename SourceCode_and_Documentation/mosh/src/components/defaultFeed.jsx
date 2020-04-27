import React from 'react';
import PostForm from "./postForm"
import NewsFeed from "./newsFeed"

export default function DefaultFeed(props) {
    return(
    <>
        <PostForm/>
        <NewsFeed/>
    </>
    );
}