import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [posts, setPost] = useState([]);
  function getPost() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setPost(json))
  }
  useEffect(()=> {
    getPost();
  },[])

  function createPost() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Dung',
      body: 'Dung deptrai',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => setPost(posts => [...posts, json]))
  }
  return (
    <div className="App">
      <button onClick={createPost}>Create Post</button>
     {posts.map((post)=>{
       return(
         <div key={post.id} style={{border: "1px solid red", padding: 5, margin: 20}}>
     <p>userId: {post.userId}</p>
     <p>id: {post.id}</p>
     <p>title: {post.title}</p>
     <p>body: {post.body}</p>
         </div>
       )
     })}
    </div>
  );
}

export default App;
