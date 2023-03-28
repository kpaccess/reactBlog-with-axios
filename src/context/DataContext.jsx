import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';

import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState();

  const navigate = useNavigate();

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts?.filter(
      (post) =>
        post?.body?.toLowerCase().includes(search.toLowerCase()) ||
        post?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  useEffect(() => {}, []);

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
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        editTitle,
        editBody,
        setEditBody,
        setEditTitle,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
