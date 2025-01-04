let arrayofNews= []
let arrayofAuthors= []
let arrayofImages=[]
let arrayofDescription =[]
let originalContent;
let wordsFound= []
let value="";

async function getNews(){
   
    let data = await fetch('https://newsapi.org/v2/everything?q=apple&from=2025-01-03&to=2025-01-03&sortBy=popularity&apiKey=4648b16c1c2e4f258894c57786439837' )
   let res= await data.json()
console.log(res)
     for(let i=0; i<res.articles.length;i++){
        arrayofNews.push(res.articles[i].title)
        arrayofAuthors.push(res.articles[i].author)
        arrayofImages.push(res.articles[i].urlToImage)
        arrayofDescription.push(res.articles[i].description)
       
    }

    let loading= document.querySelector('.loading')
   if(loading) loading.remove()
    console.log("arrayofimages",arrayofImages)
   
   creatingNodes()
    
    
}



    function creatingNodes(val = "") {
      const contentDiv = document.querySelector('div');
      contentDiv.innerHTML = ""; 
     
        wordsFound = arrayofNews
          .map((news, index) => ({ title: news, index })) 
          .filter(item => item.title.toLowerCase().includes(val.toLowerCase())); 
    
        if (wordsFound.length === 0) {
          contentDiv.textContent = "No results found for your search.";
          return;
        }
     
        
       
      
    console.log(wordsFound)
      
      wordsFound.forEach(({ title, index }) => {
        const div = document.createElement('p');
        const button = document.createElement('button');
        const span = document.createElement('span');
        const img = document.createElement('img');
    
        img.src = arrayofImages[index] || "";
        if(img.src ===""){
          img.style.display="none"        }
    
        span.textContent = "~" + (arrayofAuthors[index] || "Unknown Author");
        button.textContent = "Read More..";
        button.addEventListener("click", () => openNews(index));
    
        div.textContent = title.substring(0, 100) + "...";
        div.prepend(img);
        div.append(button, span);
        contentDiv.append(div);
      });

      if (!originalContent) originalContent = document.body.innerHTML;
    }
    



function openNews(index){
  let htmldocu = ` 
  <img src=${arrayofImages[index]} style="padding-top:50px">
<span style="margin-left:370px ; font-size:25px; width:700px"> ${arrayofNews[index]}</span>
<span style="padding-left:900px ; padding-top:20px">  ~ ${arrayofAuthors[index]}</span>
<div style="width:600px ; font-size:22px ; margin-right:550px"> 

    ${
        arrayofDescription[index]
    }
    </div>
<button style="border:1px solid black; padding:10px;margin-left:340px" onClick="goBack()"> back </button>
  `
  

  
 document.body.innerHTML = htmldocu 

console.log(arrayofDescription[index])
}

function goBack(){
document.body.innerHTML= originalContent

}



document.querySelector('input').addEventListener("input",(e)=>{
    value= e.target.value
    console.log(value)
  creatingNodes(value)

})



getNews()





