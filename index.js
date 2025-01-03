
let arrayofNews= []
let arrayofAuthors= []
let arrayofImages=[]
let arrayofDescription =[]
let originalContent;
let wordsFound= []
let value="";
let res;

async function getNews(){
    wordsFound=[]
    let data = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-12-03&sortBy=publishedAt&apiKey=4648b16c1c2e4f258894c57786439837')
     res= await data.json()

     for(let i=0; i<res.articles.length;i++){
        arrayofNews.push(res.articles[i].title)
        arrayofAuthors.push(res.articles[i].author)
        arrayofImages.push(res.articles[i].urlToImage)
        arrayofDescription.push(res.articles[i].description)
       
    }

    let loading= document.querySelector('.loading')
    loading.remove()
    console.log("arrayofimages",arrayofImages)
   
   creatingNodes()
    
    
}

getNews()


function creatingNodes(val){
  wordsFound= []
  
    for(let i=0; i<arrayofNews.length;i++){
        if(val !== "" && arrayofNews[i].includes(val)){

    wordsFound.push(arrayofNews[i])


        }
        if(arrayofNews[i] !="[Removed]"){
            let div= document.createElement('p')
            let button= document.createElement('button')
            let span= document.createElement('span')
            span.textContent="~"+arrayofAuthors[i]
            let img= document.createElement('img')
            img.src=  arrayofImages[i]
           
            if(arrayofImages[i] ==null){
               img.style.display ="none"
            }
            
    button.textContent="Read More.."
    button.addEventListener("click",()=>{
        openNews(i)
    })
            div.textContent = i,arrayofNews[i].substring(0,100)+"..."
           div.prepend(img)
        div.append(button,span)
          document.querySelector('div').append(div)
        }
       
     

    }
    originalContent = document.body.cloneNode(true);
    console.log("words::",wordsFound)
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
document.body.innerHTML= originalContent.innerHTML

}

let ul =document.querySelector("ul")

document.querySelector('input').addEventListener("input",(e)=>{
    value= e.target.value
    console.log(value)
  creatingNodes(value)

})








