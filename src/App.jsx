import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import PostPage from './components/PostPage';
import Missing from './components/Missing';
import Footer from './components/Footer';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';

import { DataProvider } from './context/DataContext';

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<NewPost />} />

          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
};

export default App;
