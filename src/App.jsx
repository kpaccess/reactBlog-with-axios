import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import PostPage from './components/PostPage';
import Missing from './components/Missing';
import Footer from './components/Footer';
import NewPost from './components/NewPost';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts?.filter(
      (post) =>
        post?.body?.toLowerCase().includes(search.toLowerCase()) ||
        post?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');

        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? [posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id,
      title: postTitle,
      body: postBody,
      datetime,
    };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostBody('');
      setPostTitle('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/post"
          element={
            <NewPost
              postTitle={postTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              setPostTitle={setPostTitle}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer length={posts.length} />
    </div>
  );
};

export default App;
