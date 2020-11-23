
const url = 'https://api.github.com/graphql';
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
  const response = await fetch('https://developer.github.com/v4/explorer/',params).then(res => {
    console.log(res);
  });
  return response;
}



fetch('https://developer.github.com/v4/explorer/', {
  method: 'POST',
  mode:'no-cors',
  headers: {
    // 'Allow':'*',
    'Access-Control-Allow-Origin':'*',
    // 'Access-Control-Allow-Credentials':true,
    'Access-Control-Allow-Headers': 'X-requested-With',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params)
})
  // .then(r => r.json())
  .then(data => console.log('data returned:', data));

myFunction();
// getRepository();

// const repos = async = () => {
//   const response = await fetch('https://developer.github.com/v4/explorer/',params).then(res => {
//     console.log(res);
//   });
//   return response;
//     // const response = await fetch('https://developer.github.com/v4/explorer/',).
// }
