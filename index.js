let month = '';
const url = 'https://api.github.com/graphql';
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${atob("YmNjNGNjMDQwZDdhNDAyNmM0YjBlYTQwZDQxMzgxMmNiYmMzZTE0Nw==")} `
}

function getMonth(monthValue){

  switch(monthValue){
    case 1: 
    month ='January ';
    break;
    case 2:
    month = 'February ';
    break;
    case 3:
      month = 'March ';
    break;
    case 4: 
    month ='April ';
    break;
    case 5: 
    month ='May ';
    break;
    case 6:
      month = 'June ';
    break;
    case 7: 
    month ='July ';
    break;
    case 8:
      month = 'August ';
    break;
    case 9: 
    month ='September ';
    break;
    case 10:
      month = 'October ';
    break;
    case 11:
      month = 'November ';
    break;
    case 12:
      month =  'December ';
    break;
    default: 
    month = 'Invalid';
    break;
  }
}

function getWeekDayHours(dayValue, currentDate, hour){
if((currentDate.getDate() - dayValue) > 7){
let plural;
plural = Math.floor((currentDate.getDate() - dayValue)/7 > 1) ? true: false;
let value;
value = Math.ceil(currentDate.getDate() / dayValue);
return `${value} week${plural?'s':''} ago`;
} 
else{
  if(currentDate.getDate() == dayValue){
    let plural;
    plural = currentDate.getHours() - hour > 1 ? true:false;
    return `${currentDate.getHours() - hour} hour${plural?'s':''} ago`;
  }
  else if ((currentDate.getDate() - dayValue) < 7) {
    let plural;
    plural = (currentDate.getDate() - dayValue) > 1 ? true: false;
    return `${currentDate.getDate() - dayValue} day${plural?'s':''} ago`;
    }
}

}

let header = document.querySelector('.tab-header');
window.addEventListener("scroll",function() {
  var a = document.querySelector('.tab-header');
  let scrollPos = window.scrollY;
  if (scrollPos >=20){
    header.className = "tab-header tab-header-scroll";
  }
  else {
    header.className = "tab-header";
  }
});
document.getElementById('responsiveMobile').addEventListener("click", function(){
  var x = document.getElementById("header");
  if (x.className === "header") {
    x.className += " responsive";
  } else {
    x.className = "header";
  }
  // let x = document.getElementById("trans");
  // if(x.className === "dropDownTransitionDefault"){
  //   x.className = "dropdownTransisted"
  // } else {
  //   x.className = "dropDownTransitionDefault";
  // }
});

document.getElementById('loadProfile').addEventListener("click", function (){
  // $event.preventDefault();
  let id = document.getElementById('nav2');
  if(id.className === 'nav2hidden'){
    id.className = 'nav2visible';
  } else {
    id.className = 'nav2hidden'
  }
}) ;


async function getRepository(){
  let loader = `<div class="loader"></div>`;
document.querySelector('.repolist').innerHTML = loader;
  const response = await fetch(url,{
    method: "POST",
    headers: headers,
    mode: "cors",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({query: 
      `{
        viewer {
          name
          login
          bio
          url
          avatarUrl
          repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            edges {
              node {
                id
                name
                description
                createdAt
                updatedAt
                primaryLanguage {
                  name
                  color
                }
                forkCount
                issues(states: OPEN) {
                  totalCount
                }
              }
            }
          }
          url
          followers {
            totalCount
          }
          following {
            totalCount
          }
          starredRepositories {
            totalCount
          }
        }
      }
      `})
  })
  .then(res => res.json())
  .then(res =>{
     let image = res.data.viewer.avatarUrl;
     let fullName = res.data.viewer.name;
     let username = res.data.viewer.login;
     let description = res.data.viewer.bio;
     let noOfFollowers = res.data.viewer.followers.totalCount;
     let noOfFollowing = res.data.viewer.following.totalCount;
     let noOfStarredRepositories = res.data.viewer.starredRepositories.totalCount;
     let repositories = res.data.viewer.repositories.edges;
     var avatarusers = document.querySelectorAll('.avatar-user');
     avatarusers.forEach(eachAvatar => {
       eachAvatar.src = image;
     })
    //  document.querySelector('.avatar-user').src = image;
     document.querySelector('.fullname').textContent = fullName;
     document.querySelector('.no-of-followers').textContent = noOfFollowers;
     document.querySelector('.no-of-following').textContent = noOfFollowing;
     document.querySelector('.no-of-star-repo').textContent = noOfStarredRepositories

     var usernames = document.querySelectorAll('.username');
     usernames.forEach(eachUsername => {
       eachUsername.textContent = username;
     })
    //  document.querySelector('.username').textContent = username;
     document.querySelector('.bio').textContent = description;
     document.querySelector('.repolist').innerHTML = '';
     repositories.reverse().map(repo => {
       let date = new Date(repo.node.updatedAt);
       let currentDate = new Date(Date.now());
       let currentDay = '';
       let thisMonth = false;
        let day = date.getDate();
        let monthValue = date.getMonth() + 1;
        let hour = date.getHours();
        let year = '';
        if(date.getFullYear() !== currentDate.getFullYear()){
          day += ', ';
          year = date.getFullYear();
        }
        if(monthValue !== (currentDate.getMonth() + 1)){
          getMonth(monthValue);
          currentDay = month+ day+year;
        } else {
          thisMonth = true;
           currentDay = getWeekDayHours(day, currentDate, hour);
        }


       let element = `<div class="repoitem">
       <div class="row border-bottom">
         <div class="col-10 col-s-10 d-inline-block">
           <div class="d-block">
             <h3 class="repoitemname">
               <a href="${res.data.viewer.url}">${repo.node.name}</a></h3>
           </div>
           <div class="d-inline-block">
           ${repo.node.description ? `<p class="repoitemdesc text-gray">${repo.node.description}</p>`:''}
             
           </div>
           <div class="text-gray mt-2">
             <span>
             ${repo.node.primaryLanguage ? `<span class="repo-language-color" style="background-color: ${repo.node.primaryLanguage?.color};"></span>`:''}
               ${repo.node.primaryLanguage ? `<span>${repo.node.primaryLanguage.name} </span>`:''} 
               <span class="font-12"> Updated <span>${!thisMonth ? 'on ':''} ${currentDay}</span></span>

             </span>
           </div>
           
         </div>
         <div class="col-2 col-s-2 d-inline-block">
           <div class="text-right">
               <button id="starClick" class="starrepo">
                 <svg class="octicon text-gray" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                   <path fill-rule = "evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path> </svg> Star</button>
           </div>
         </div>
       </div>
     </div>`;
        document.querySelector('.repolist').insertAdjacentHTML('afterend',element);
     })

    })
  .catch(err => console.log(err))
}

getRepository();
