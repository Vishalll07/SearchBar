import "./styles.css";
import React, { useState , useEffect , UseRef , useCallback } from "react";


  export default function App(){
    const [searchText , setSearchText] = useState("");
    const [results , setResults] = useState([]);

    const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A watched pot never boils.",
    "Actions speak louder than words.",
    "lamborghini aventador",
    "I am ",
    "Hi everyone",
    "football",
    "Cristiano Ronaldo"
    ]

    const searchAPI = (query) => {
      const LATENCY = 200;
      return new Promise((resolve, reject)=>{
        console.log("fetching results")
        const result = [];


        if(!query) return resolve(result);

        const queryLower = query.toLowerCase();

        for(const sentence of sentences){
          const sentenceLower = sentence.toLowerCase();
          if(sentenceLower.includes(queryLower)){
            result.push(sentence);
          }
        }

        setTimeout(() => {
          resolve(result);
        },LATENCY);

      });
    };

    const debounce = (callback , delay) => {
      let timer ;
      return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          callback(...args);
        },delay);
      }
    }

    const debouncedSearchAPI = useCallback(
      debounce((query) =>{
        searchAPI(query).then((res)=>{
          setResults(res);
        })
        .catch((err)=>{
          console.error(err);
        });
      },500),[]
    );

    const onChange = (query) => {
      setSearchText(query);
      debouncedSearchAPI(query);
    };

    return(
      <div className="App">
      <h3>SEARCH BAR</h3>
      <input
      id="search"
      type="search"
      placeholder="search"
      value={searchText}
      onChange={(e)=> onChange(e.target.value)}
      />
      <div id="result">
        {results.map((result , idx)=>(
          <div 
          key={idx}
          id="result"
          onClick={()=>setSearchText(result)}>{result}</div>
        ))}
        </div>
      </div>
    );
  }