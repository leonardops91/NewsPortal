import React from 'react';
import Header from '../header/Header';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FiSearch } from 'react-icons/fi';
import './style.css'
import api from '../../services/api';

export default function Home() {
  const [news, setNews] = useState([])
  const [search, setSearch] = useState(""); 
  const [emptyReturn, setEmptyReturn] = useState("");

  useEffect(() => {
    if(news == '' && search == '') {
      api.get('/').then(Response => setNews(Response.data.articles));
      setEmptyReturn("");
    }
  }, [news, search]);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      await api.get(`search?country=br&category=${search}`)
        .then(Response => {
          {setNews(Response.data.articles)}
          {
            if(Response.data.totalResults == 0){
              setEmptyReturn(`Poxa... Nenhuma notícia foi encontrada com 
                categoria "${search}", tente "tecnologia!"`)
            }else{
              setEmptyReturn("");
            }
          }
        }
      );
    } catch (error) {
      alert("Sua solicitação retornou o erro: " + error.message)
    }
  }

  function handleTranslation(e){
    var lib = new Map();
    lib.set("tecnologia", "technology")
    lib.set("saude", "health")
    lib.set("esporte", "sports")
    lib.set("entretenimento", "entertainment")

    for(var [key, value] of lib) {
      if(e == key) {
        setSearch(value.toString());
        return;
      }else{
        setSearch(e);
      }
    }
  }

  return(
    <div className="container">
      <Header  />
      <div  className="feed">
          <ul>
            <span>{emptyReturn}</span>
            {news.map((news, index) => (
                <a href = {news.url}><li key = {index}>
                    <div className="img">
                      <img src={news.urlToImage} alt="Ilustration"/>
                    </div>
                    <div className="description">
                      <p>{news.title}</p>
                      <div className="name">
                        <p>{news.source.name}</p>
                      </div>
                    </div>
                    <div className="date">
                      <p>{format(new Date(news.publishedAt), 'dd/MM/yyyy')}</p>
                    </div>
               </li></a>
            ))}
          </ul>
      </div>
      <div className="search">
          <form onSubmit = {handleSearch}>
            <button type='submit' >
              <FiSearch className = 'iconSearch' size = {30}></FiSearch>
            </button>
            <input onChange = {e => handleTranslation(e.target.value)}
             type="text" id = "search" placeholder="Busque por categorias">
            </input>
          </form>
      </div>
    </div>
  );
}
