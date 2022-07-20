import  { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'


const GET_ALL_USERS = gql`

        query GetAllUser {
            users {
                name
                username
                age

            }
        }

`
// const GET_ALL_MOVIES = gql`
        
//             query Get_Movies{
//                 movies {
//                     name
//                     yearOfPublication
//                 }
//             }

// `

// const GET_MOVIE_BY_NAME = gql`

//             query GetMovieByName($name: String!) {
//                 movie(name: $name) {
//                     yearOfPublication
//                 }
//             }
// `


//mutations
const CREATE_USER = gql`

        mutation CreateUser($input: CreateUserInput!){
            createUser(input: $input) {
                name
                username
                age
                nationality
            }
        }
`


const DisplayData = () => {
    // const [movie, setMovie] = useState('')

    const [name,setName] = useState('')
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState('')



    const {data, loading, refetch} = useQuery(GET_ALL_USERS)
    // const [getMovie, {data: movieData,  error: movieError}] = useLazyQuery(GET_MOVIE_BY_NAME)

    const [createUser] = useMutation(CREATE_USER)
    if(loading){
        return <p>Data Loading...</p>
    }
  
    return (
        <div>

            <div>
                <input type="text" placeholder="Name..." onChange={(event) => {setName(event.target.value)}}/>
                <input type="text" placeholder="UserName..." onChange={(event) => {setUsername(event.target.value)}}/>
                <input type="number" placeholder="Age..." onChange={(event) => {setAge(Number(event.target.value))}} />
                <input type="text" placeholder="Nationality..." onChange={(event) => {setNationality(event.target.value.toUpperCase())}}/>
                <button onClick={() => {
                    createUser({variables : {
                        input: {name , username, age , nationality}
                    }})

                    refetch()
                }}>Create User</button>
            </div>


            {data && data.users.map((user) => {
                return <div>
                    <h1>Name: {user.name}</h1>
                    <h1>Username: {user.username}</h1>
                    <h1>Age: {user.age}</h1>

                </div> 
            })}

            {/* {data && data.movies.map((movie) => {
                return <div>
                    <h1>Name:{movie.name}</h1>
                    <h1>YearOfPublication:{movie.yearOfPublication}</h1>

                </div>
            })} */}

            {/* <div>
                <input type="text" placeholder="Interstellar..." onChange={(event) => {
                    setMovie(event.target.value)
                }}/>
                <button onClick={()=>{
                    getMovie({variables: {name: movie}})
                }}>Fetch Data</button>
                <div>
                    {movieData && <h1>Year Of Publication:{movieData.movie.yearOfPublication}</h1>}
                </div>
            </div> */}
        </div>

    )
}

export default DisplayData