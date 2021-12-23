import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = process.env.REACT_APP_KEY;

//step1:create a component. This component should produce HTML.
class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            videos:[],
            selectedVideo:null
        };

        this.videoSearch('surfboards');

    }

    videoSearch(term){
        YTSearch({key:API_KEY,term:term},(videos)=>this.setState({
            videos,
            selectedVideo:videos[0]
        }));
    }

    render(){
        //throttling search bar using lodash
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

        return( 
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={(selectedVideo)=>this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        );
    }
};

export default App;

