import {ApolloClient, InMemoryCache} from './node_modules/@apollo/client/core';
import {repoQuery} from './src/queries.js';


const url = 'https://api.github.com/graphql';
const query = repoQuery;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: url
});
console.log(query);
console.log(client);

const param = `{query {
    viewer {
      repositories(first: 10, orderBy: {field: CREATED_AT, direction: ASC}) {
        edges {
          node {
            id
            name
            description
            createdAt
          }
        }
      }
    }}`;

const params = `
query {
  user(login:"ekunomowunmi"){
    repositories{
      totalCount
    }
    repositories{
      nodes{
      name
          description
          createdAt
        issues(states: OPEN){
          totalCount
        }
      }
    }
  }
}`
function myFunction() {
    var x = document.getElementById("header");
    if (x.className === "header") {
      x.className += " responsive";
    } else {
      x.className = "header";
    }
  }

async function getRepository(){
  // const response = await fetch('https://developer.github.com/v4/explorer/',params).then(res => {
  //   console.log(res);
  // });
  await client.query({query}).then(response => {
console.log(response);
  })
  // return response;
}

let request = new XMLHttpRequest();

request.open('POST','https://developer.github.com/v4/explorer/')

var opts = {
  description: 'Fetch API Post example',
  public: true,
  files: {
    'test.js': {
      content: 'content for Wunmi'
    }
  }};

fetch('https://reqres.in/api/users')
.then((response)=>{
  return response.json();
})
.then((data) => {console.log(data.data);})
.catch(error => {console.log(error)})

// fetch('https://api.github.com/gists', {
//   method: 'post',
//   body: JSON.stringify(opts)
// }).then(function(response) {
//   return response.json();
// }).then(function(data) {
//   ChromeSamples.log('Created Gist:', data.html_url);
// });

// fetch('https://developer.github.com/v4/explorer/', {
//   method: 'post',
//   mode:'no-cors',
//   headers: {
//     // 'Allow':'*',
//     'Accept':'*/*',
//     'Access-Control-Allow-Origin':'*',
//     // 'Access-Control-Allow-Credentials':true,
//     'Access-Control-Allow-Headers': 'X-requested-With',
//     'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(params)
// })
//   // .then(r => r.json())
//   .then(data => console.log('data returned:', data));

myFunction();
getRepository();

// const repos = async = () => {
//   const response = await fetch('https://developer.github.com/v4/explorer/',params).then(res => {
//     console.log(res);
//   });
//   return response;
//     // const response = await fetch('https://developer.github.com/v4/explorer/',).
// }
