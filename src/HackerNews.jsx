import React, { useEffect, useState } from 'react'

const HackerNews = () => {
    let [news,setNews] = useState([])
    let [noItem,setNoItem] = useState('react')
    let [currentpage,setCurrentpage] = useState(1)
    let [postperpage,SetPostperpage] = useState(10)
    function search(){
        fetch(`https://hn.algolia.com/api/v1/search?query=${noItem}&page=${currentpage}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data,'dataaa');
            setNews(data.hits)
        })
    }
    useEffect(()=>{
        search()
    },[])
    function next(){
        if(currentpage>=Math.ceil(news.length/postperpage)){setCurrentpage(1)}
        else{setCurrentpage(currentpage+1)}
      }
      function prev(){
        if(currentpage<=1){setCurrentpage(Math.ceil(news.length/postperpage))}
        else{setCurrentpage(currentpage-1)}
      }
    let lastindex = currentpage * postperpage
    let firstindex = postperpage - lastindex
    let currentposts = news.slice(firstindex,lastindex)
    function del(i){
        let update=[...currentposts]
        update.splice(i,1)
        setNews(update)
      }

  return (
    <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
    <h1>HackerNews</h1>
    <div>
        <input onChange={(e)=>setNoItem(e.target.value)} type="text" />
        <button onClick={search}>Search</button>
    </div>
        <div>
            {currentposts.map((item,i)=>{
                return(
                <>
                <div style={{border: '1px solid', marginTop: '30px',borderRadius: '5px',boxShadow: '10px 10px 15px grey',padding:'10px'}}>
                    <h3>{item.title}</h3>
                    <a href={item.url}>{item.url}</a>
                    <div>
                        <button style={{marginTop: '30px'}} onClick={()=> del(i)}>Delete</button>
                    </div>
                </div>
                </>
                )
            })}
            <div style={{marginTop: '20px'}}>

            <button onClick={prev}>Previous</button>
            <button style={{marginLeft: '10px'}} onClick={next}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default HackerNews