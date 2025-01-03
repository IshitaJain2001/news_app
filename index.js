
let arrayofNews= []
let arrayofAuthors= []
let arrayofImages=[]
let arrayofDescription =[]
async function getNews(){
    let data = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-12-03&sortBy=publishedAt&apiKey=4648b16c1c2e4f258894c57786439837')
    let res= await data.json()

    for(let i=0; i<res.articles.length;i++){
        arrayofNews.push(res.articles[i].title)
        arrayofAuthors.push(res.articles[i].author)
        arrayofImages.push(res.articles[i].urlToImage)
        arrayofDescription.push(res.articles[i].description)
    }
    console.log(arrayofImages)
    console.log(res.articles)
    console.log("list of titles")
    let loading= document.querySelector('.loading')
    loading.remove()
  
    for(let i=0; i<arrayofNews.length;i++){
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
            div.textContent = arrayofNews[i].substring(0,100)+"..."
           div.prepend(img)
        div.append(button,span)
          document.querySelector('div').append(div)
        }
       
     

    }
}

getNews()

function openNews(index){
  let htmldocu = `
  
<img src=${arrayofImages[index]} style="padding-top:50px">
<span style="margin-left:370px ; font-size:25px; width:700px"> ${arrayofNews[index]}</span>
<span style="padding-left:900px ; padding-top:20px">  ~ ${arrayofAuthors[index]}</span>
<div style="width:600px ; font-size:22px ; margin-right:500px"> 

    ${
        arrayofDescription[index]
    }
    </div>
<button style="border:1px solid black; padding:10px;margin-left:400px"> back </button>
  `
 document.body.innerHTML = htmldocu 

console.log(arrayofDescription[index])
}



