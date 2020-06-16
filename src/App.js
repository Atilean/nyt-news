/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import "./Style.css";
import NewsList from "./components/NewsList";
import SearchBar from "./components/SearchBar"


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?',
      APIkey: 'FY2Ikh6KKThCh11XcGCiAcjogb9EqNB8',
      input:'',
      results:[]
    }
  }

  handleChange = (e) => {
   this.setState({
     input : e.target.value
   })
  }

handleSubmit = () => {
  console.log(this.state.input)
  this.query()
  this.setState({input : ''})
  
}

query = () => {
  let url = this.state.baseURL+"q="+this.state.input+"&api-key="+this.state.APIkey
fetch(url).then(response => {
  if(!response.ok){
    console.log(response.statusText) 
    return
  }
  return response.json()
}).then(data => {
  let docs = data.response.docs
  let results = docs.map(doc => {
   let url = doc.web_url 
   let headline = doc.headline
   let  main = headline.main
   let  date = doc.pub_date
   let byline = doc.byline
   let author = byline.original
   let id = doc._id

   return {id: id, title: main, date: date, url: url, author: author}

  })
  this.setState({results: results})
}) 

}


  render() {
    return (
      <div className="App">
       
        <SearchBar 
         change={this.handleChange}
         submit={this.handleSubmit}
         text={this.state.input}
        />

        <NewsList results={this.state.results}/>
      </div>
    );
  }
}

export default App;
