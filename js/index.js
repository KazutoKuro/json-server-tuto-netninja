// javascript for index.html

// 1st: attach an event listener to the window to wait until the dom content is loaded, 2nd: create the function

const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async(term) =>{
    console.log(term);
    let uri = '  http://localhost:3000/posts?_sort=likes&_order=desc';
    if(term){
        uri +=`&q=${term}`;
    }

    const res = await fetch (uri);
    const posts = await res.json();
    // console.log(posts);

    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p><small>${post.likes} likes</small></p>
                <p>${post.body.slice(0,200)}</p>
                <a href="/details.html?id=${post.id}">read more... </a> 
            </div>
        `
    });

    container.innerHTML = template;
}

//serach
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());