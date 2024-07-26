const apikey = '7959e3fda5db4003b4c7b8b7e5143a7e'

const blogcontainer = document.getElementById("container");

const input = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");


fetchRandom = async() => {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?q=rain&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error Fetching News" , error);
        return ;
    }
}

fetchNews = async(query) => {
    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error Fetching News" , error);
        return ;
    }
}

searchbutton.addEventListener("click" , async() => {
    const query = input.value.trim();
    if(query !== "")
        {
            try{
                const articles = await fetchNews(query);
                displayBlogs(articles);
            }catch(error) {
                console.error("Error Fetching query" , error);
            }
        }
})

function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("card");
        const img = document.createElement("img")
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const lineTitle = article.title.length > 40 ? article.title.slice(0, 40) + "..." : article.title;
        title.textContent = lineTitle;
        const description = document.createElement("p");
        // const linedescription = article.description.length > 10 ? article.description.slice(0, 120) + "..." : article.description;
        description.textContent = article.description;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener("click" , () => {
            window.open(article.url , "_blank");
        });
        blogcontainer.appendChild(blogcard);


    });
}

(async()=>{
    try{
        const articles = await fetchRandom();
        displayBlogs(articles);
    } catch(error) {
        console.error("Error Fetching News" , error);
    }
})();