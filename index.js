
let arrayofNews= []
async function getNews(){
    let data = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-12-03&sortBy=publishedAt&apiKey=4648b16c1c2e4f258894c57786439837')
    let res= await data.json()

    for(let i=0; i<res.articles.length;i++){
        arrayofNews.push(res.articles[i].title)
    }
    console.log(res.articles)
    console.log("list of titles")
    let loading= document.querySelector('.loading')
    loading.remove()
    for(let i=0; i<arrayofNews.length;i++){
        let div= document.createElement('p')
        let button= document.createElement('button')
button.textContent="Read More.."
        div.textContent = arrayofNews[i]?arrayofNews[i]:"loading"
    div.append(button)
      document.querySelector('div').append(div)
     

    }
}

getNews()

setTimeout(()=>console.log(arrayofNews))

