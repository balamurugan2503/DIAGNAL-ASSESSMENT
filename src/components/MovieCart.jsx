import { useEffect, useState } from "react"

const MovieCart=()=>{
    const [listCart,setListCart]=useState({})
    const [search,setSearch]=useState("")
    const [SearchList,setSearchList]=useState({})
    const[searchOpen,setSearchOpen]=useState(false)
const listApi= async()=>{
    const response=await fetch("https://test.create.diagnal.com/data/page1.json")
    const res= await response.json()
    
    setListCart(res.page)
}
    useEffect(()=>{
     listApi()
    },[])
    const handleSearch=(e)=>{
        setSearch(e.target.value)
       const searchData=listCart?.["content-items"]?.content?.filter((s)=>s.name.toLowerCase().includes(e.target.value.toLowerCase()))
       setSearchList(searchData)
    }
    console.log(SearchList)
    const handleOpenInput=()=>{
        setSearchOpen(!searchOpen)
    }
    return <>
   <header>
            <div class="nav-head">
                <div class="left-wrap">
                    <a onClick={()=>setSearchOpen(false)} style={{cursor:"pointer"}}><img src="img/left-arrow.png" alt="left-arrow" /></a>
                    <h3>{listCart.title}</h3>
                   
                    
                </div>
                {searchOpen==true? <input type="text" placeholder="search..." value={search} onChange={handleSearch}/>:<button onClick={handleOpenInput}><img src="img/search.png" alt="search" /></button>}
               
                
            </div>
        </header>
        <main>
            {search==""? <div class="page-wrapper">
                <div class="list-full">
                    {listCart?.["content-items"]?.content?.map((data)=>(
                     <div class="movie-card">
                        <img src={`https://test.create.diagnal.com/images/${data["poster-image"]}`} />
                        <p>{data.name}</p>
                    </div>
                    ))
                    }
                  
                </div>
            </div>: 
            
            <div class="page-wrapper">
                <div class="list-full">
                    {SearchList.length !==0?<> {SearchList?.map((data)=>(
                     <div class="movie-card">
                       
                        <img src={`https://test.create.diagnal.com/images/${data["poster-image"]}`} />
                        <p>{data.name}</p>
                    </div>
                    ))
                    }</>:<>No Data Found</>}
                   
                  
                </div>
            </div>}
           
        </main>
    </>
}

export default MovieCart