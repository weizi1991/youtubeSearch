//Create a new Component should produce some HTML

//Take this Component generated HTML and put it in the dom
import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDPZ45tbZVThKlOs3VDiKJBSgW77OmqOuc';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null

    };
    this.videoSearch('hiking');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term:term}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      });
      //this.setState({videos:videos}) sytax sugar
    })
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));
