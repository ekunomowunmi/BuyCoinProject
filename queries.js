

const repoQuery =
`query {
  user(login:"ekunomowunmi"){
    name
    login
    bio
    avatarUrl
    repositories{
      totalCount
    }
    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}){
      nodes{
        description
        createdAt
        updatedAt
        primaryLanguage{
        name
        color
        }
        issues(states: OPEN){
          totalCount
        }
      }
    }
  }
}`

export default repoQuery;