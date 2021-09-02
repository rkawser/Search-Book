// spinner add
const spinner = document.getElementById('spiner');
window.addEventListener('load',()=>spinner.style.display='none');

// searchResult function
const loadData=()=>{
    const searchResult = document.getElementById('search-result')
    const searchText =searchResult.value;
    searchResult.value=''; 
    const posted = document.getElementById('post')
    posted.textContent='';
    spinner.style.display='block'
    if (searchText==='') {
      totalResultShow('result not found, pleage write book name')
      totalResultFound('','none')
      spinner.style.display='none'
    }
    else{
      const url=`https://openlibrary.org/search.json?q=${searchText}`
      fetch(url)
      .then(res=>res.json())
      .then(data=>displayData(data))
 }
   
}

const displayData=(data)=>{
const totalFound = data.numFound
totalResultFound(totalFound,'block')
const bookList =data.docs
if (bookList.length ===0){
  totalResultShow('Book not Found')
  totalResultFound(totalFound,'none')
  spinner.style.display='none'
}
 else {
   const serachOutput =`Total Displayed Result:${bookList.length}`
  totalResultShow(serachOutput)

const posted = document.getElementById('post')

posted.classList.add('col')
 bookList.forEach(detail =>{
    console.log(detail);
    const div =document.createElement('div')
    let imgURL;
            detail.cover_i?  imgURL=`https://covers.openlibrary.org/b/id/${detail.cover_i}-M.jpg` :imgURL=`book-cover.jpg`;
    div.innerHTML=` 
                  <div class="card h-100">
                 <img height=250px src="${imgURL}" class="card-img-top" alt="...">
            
                <div class="card-body">
                  <h5 class="card-title"><i class="fas fa-book-open"></i>${detail.title}</h5>
                  <h6 class="card-text">Author name:${(detail.author_name!==undefined)? detail.author_name[0] :'ShAnTo'}</h6>
                  <h6 class="card-text">Publisher: ${( detail.publisher!==undefined)? detail.publisher[0] :'ShAnTo'}</h6>
                  <h6 class="card-text">published on: ${(detail.first_publish_year!==undefined)? detail.first_publish_year : 'N/A'}</h6>
                </div>              
              </div>
    `
   
    posted.appendChild(div)  
});
spinner.style.display='none'
}
}
// ResultFound
const totalResultFound=(found,isback)=>{
const addfound =document.getElementById('search-found')
addfound.innerText=`Total Found Result:${found}`
addfound.style.display=isback;
}
// TotalResult-show
const totalResultShow=(showData)=>{
  console.log(showData);
  const result= document.getElementById('total-result')
result.innerText=showData
}