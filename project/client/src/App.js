import PostCreate from "./PostCreate";
import PostsList from "./PostsList";

function App() {
  return (
    <div className="container">
    <PostCreate />
    <hr />
    <h1>Posts</h1>
    <PostsList />
    </div>
  );
}

export default App;
