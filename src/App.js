import React from "react";
import logo from "./logo.svg";
import "./App.css";

function UserList() {
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [activeUserId, setActiveUserId] = React.useState(null);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
        setActiveUserId(users[0].id);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "error";
  }
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            onClick={() => setActiveUserId(user.id)}
            key={user.id}
            className={activeUserId == user.id ? "activeUser" : "users"}
          >
            {user.name}
          </li>
        ))}
      </ul>
      <UserPost userId={activeUserId} />
    </>
  );
}

function UserPost({ userId }) {
  const [posts, setPosts] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(userId);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [userId]);

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "error";
  }

  return (
    <>
      <h2>Посты</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <>
      <UserList />
    </>
  );
}

export default App;
