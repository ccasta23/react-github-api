import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios";

function GithubForm (props)
{
    const [nickname, setNickname] = useState('')

    function handleOnChange (e) {
        setNickname(e.target.value)
    }

    async function handleOnSubmit (e) {
        e.preventDefault()
        /*Aquí se debe hacer el llamado HTTP a la API de Github*/
        const response = await axios.get(`https://api.github.com/users/${nickname}`)
        props.handleSubmit(response.data)
        setNickname('')
    }

  return (
    <section className="row shadow pb-4">
      <form className="row g-4 align-items-center mt-0" onSubmit={handleOnSubmit}>
        <div className="col-auto">
          <label htmlFor="inputGithubUserNickname" className="col-form-label">Github User Nickname: </label>
        </div>
        <div className="col-auto">
          <input
              type="text"
              id="inputGithubUserNickname"
              className="form-control"
              aria-describedby="githubUserNicknameHelpInline"
              value={nickname}
              onChange={handleOnChange}
          />
        </div>
        <div className="col-auto">
            <span id="githubUserNicknameHelpInline" className="form-text">
              Introduce the github user nickname.
            </span>
        </div>
        <div className="col-auto">
          <button className="btn btn-success">Add user</button>
        </div>
      </form>
    </section>
  )
}

function UserCards(props)
{
  return (
    <section className="row mt-4">
        {props.profiles.map(
            (profile) => <UserCard profile={profile}/>
        )}
    </section>
  )
}

function UserCard (props)
{
  return (
      <div className="col-12 col-md-6 col-lg-4 my-2">
        <div className="card shadow" >
          <img src={props.profile.avatar_url} className="card-img-top" alt={props.profile.login} />
          <div className="card-body">
            <h5 className="card-title">{props.profile.name} ({props.profile.login})</h5>
            <p className="card-text">Company: {props.profile.company}</p>
            <a href={props.profile.html_url} target="_blank" className="btn btn-primary">Visit {props.profile.login} profile</a>
          </div>
        </div>
      </div>
  )
}

function App() {

    const [profiles, setProfiles] = useState([
        /*{
            "login": "ccasta23",
            "id": 37912542,
            "node_id": "MDQ6VXNlcjM3OTEyNTQy",
            "avatar_url": "https://avatars.githubusercontent.com/u/37912542?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/ccasta23",
            "html_url": "https://github.com/ccasta23",
            "followers_url": "https://api.github.com/users/ccasta23/followers",
            "following_url": "https://api.github.com/users/ccasta23/following{/other_user}",
            "gists_url": "https://api.github.com/users/ccasta23/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/ccasta23/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/ccasta23/subscriptions",
            "organizations_url": "https://api.github.com/users/ccasta23/orgs",
            "repos_url": "https://api.github.com/users/ccasta23/repos",
            "events_url": "https://api.github.com/users/ccasta23/events{/privacy}",
            "received_events_url": "https://api.github.com/users/ccasta23/received_events",
            "type": "User",
            "site_admin": false,
            "name": "Carlos Castañeda",
            "company": "@quickticketsas",
            "blog": "",
            "location": "Manizales",
            "email": null,
            "hireable": null,
            "bio": null,
            "twitter_username": null,
            "public_repos": 18,
            "public_gists": 0,
            "followers": 2,
            "following": 4,
            "created_at": "2018-03-29T18:58:25Z",
            "updated_at": "2022-06-16T19:43:15Z"
        },
        {
            "login": "acdlite",
            "id": 3624098,
            "node_id": "MDQ6VXNlcjM2MjQwOTg=",
            "avatar_url": "https://avatars.githubusercontent.com/u/3624098?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/acdlite",
            "html_url": "https://github.com/acdlite",
            "followers_url": "https://api.github.com/users/acdlite/followers",
            "following_url": "https://api.github.com/users/acdlite/following{/other_user}",
            "gists_url": "https://api.github.com/users/acdlite/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/acdlite/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/acdlite/subscriptions",
            "organizations_url": "https://api.github.com/users/acdlite/orgs",
            "repos_url": "https://api.github.com/users/acdlite/repos",
            "events_url": "https://api.github.com/users/acdlite/events{/privacy}",
            "received_events_url": "https://api.github.com/users/acdlite/received_events",
            "type": "User",
            "site_admin": false,
            "name": "Andrew Clark",
            "company": "@facebook",
            "bio": "React core at Facebook. Hi!",
            "twitter_username": "acdlite",
            "public_repos": 71,
            "public_gists": 20,
            "followers": 9873,
            "following": 0,
            "created_at": "2013-02-18T08:08:56Z",
            "updated_at": "2022-02-21T05:55:21Z"
        },
        {
            "login": "gaearon",
            "id": 810438,
            "node_id": "MDQ6VXNlcjgxMDQzOA==",
            "avatar_url": "https://avatars.githubusercontent.com/u/810438?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/gaearon",
            "html_url": "https://github.com/gaearon",
            "followers_url": "https://api.github.com/users/gaearon/followers",
            "following_url": "https://api.github.com/users/gaearon/following{/other_user}",
            "gists_url": "https://api.github.com/users/gaearon/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/gaearon/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/gaearon/subscriptions",
            "organizations_url": "https://api.github.com/users/gaearon/orgs",
            "repos_url": "https://api.github.com/users/gaearon/repos",
            "events_url": "https://api.github.com/users/gaearon/events{/privacy}",
            "received_events_url": "https://api.github.com/users/gaearon/received_events",
            "type": "User",
            "site_admin": false,
            "name": "dan",
            "company": "@facebook ",
            "twitter_username": "dan_abramov",
            "public_repos": 262,
            "public_gists": 77,
            "followers": 74983,
            "following": 172,
            "created_at": "2011-05-25T18:18:31Z",
            "updated_at": "2022-05-12T18:52:17Z"
        } */
    ])

    function addProfile(profile)
    {
        setProfiles([
            ...profiles,
            profile
        ])
    }

  return (
    <main className="container">
      {/* App Title */}
      <section className="row">
        <h1 className="col alert alert-success text-center">Github API - React JS</h1>
      </section>
      {/* Form for new users */}
      <GithubForm handleSubmit={addProfile}/>
      {/* Users Cards */}
      <UserCards profiles={profiles} />
    </main>
  );
}

export default App;
