import { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import DataContext from '../context/DataContext';
import api from '../api/posts';

const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();

  const post = posts.find((post) => post.id.toString() === id);

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    try {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = {
        id,
        title: editTitle,
        body: editBody,
        datetime,
      };

      const response = await api.put(`/posts/${id}`, updatedPost);

      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditBody('');
      setEditTitle('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="EditPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              type="text"
              id="editTitle"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="editBody">Edit:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Edit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Visit our homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
