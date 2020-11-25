// import {ApolloClient, InMemoryCache} from './node_modules/@apollo/client/core';
// import {repoQuery} from './queries.js';

let month = '';
const url = 'https://api.github.com/graphql';
// const queryRepo = repoQuery;
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer 9d456482e88313d9c2954045dec8c578347405b3",
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

async function getRepository(){
  const response = await fetch(url,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify({query: 
      `{
        viewer {
          name
          login
          bio
          url
          avatarUrl
          repositories(first: 20, orderBy: {field: CREATED_AT, direction: ASC}) {
            totalCount
            edges {
              node {
                id
                  name
                description
                createdAt
                updatedAt
              primaryLanguage{
                name
                color
              }
              stargazerCount
              forkCount
              issues(states: OPEN){
                totalCount
              }
              }
              
            }
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
     let repositories = res.data.viewer.repositories.edges;
     document.querySelector('.avatar-user').src = image;
     document.querySelector('.fullname').textContent = fullName;
     document.querySelector('.username').textContent = username;
     document.querySelector('.bio').textContent = description;
     repositories.reverse().map(repo => {
       let date = new Date(repo.node.updatedAt);
       let currentDate = new Date(Date.now());
       let currentDay = '';
        let day = date.getDay();
        let monthValue = date.getMonth();
        let year = '';
        if(date.getFullYear !== currentDate.getFullYear){
          day += ', ';
          year = date.getFullYear();
        }
        getMonth(monthValue);

        currentDay = month+ day+year;

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
               <span class="font-12"> Updated <span>on ${currentDay}</span></span>

             </span>
           </div>
           
         </div>
         <div class="col-2 col-s-2 d-inline-block">
           <div class="text-right">
             <form method="POST">
               <button type="submit" class="starrepo">Star</button>
             </form>
           </div>
         </div>
       </div>
     </div>`;
        document.querySelector('.repolist').insertAdjacentHTML('afterend',element);
     })

    })
  .catch(err => console.log(err))
  // const response = await fetch('https://developer.github.com/v4/explorer/',params).then(res => {
  //   console.log(res);
  // });
//   await client.query({queryRepo}).then(response => {
// console.log(response);
//   })
  // return response;
}


getRepository();
