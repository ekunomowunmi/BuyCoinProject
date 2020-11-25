let month = '';
const url = 'https://api.github.com/graphql';
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token} `
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
     console.log(res);
     let image = res.data.viewer.avatarUrl;
     let fullName = res.data.viewer.name;
     let username = res.data.viewer.login;
     let description = res.data.viewer.bio;
     let noOfFollowers = res.data.viewer.followers.totalCount;
     let noOfFollowing = res.data.viewer.following.totalCount;
     let noOfStarredRepositories = res.data.viewer.starredRepositories.totalCount;
     let repositories = res.data.viewer.repositories.edges;
     document.querySelector('.avatar-user').src = image;
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
             <form method="POST">
               <button id="starClick" class="starrepo">Star</button>
             </form>
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
