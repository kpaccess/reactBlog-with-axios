import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import Post from './components/NewPost';
import About from './components/About';
import PostPage from './components/PostPage';
import Missing from './components/Missing';
import Footer from './components/Footer';
import NewPost from './components/NewPost';

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet, consectetur',
    },
    {
      id: 2,
      title: 'My Second Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet, consectetur',
    },
    {
      id: 3,
      title: 'My Third Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet, consectetur',
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] =
    useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState();

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const postsList = posts.filter(
      (post) => post.id !== id
    );
    setPosts(postsList);
    navigate('/');
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/post"
          element={<NewPost />}
        />
        <Route
          path="/post/:id"
          element={
            <PostPage
              posts={posts}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
