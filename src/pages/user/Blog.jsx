import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'Top 5 Printing Tips for Small Businesses',
    snippet: 'Discover simple printing strategies that can save you money and boost your brand presence...',
    date: 'August 1, 2025',
  },
  {
    id: 2,
    title: 'How to Design the Perfect Business Card',
    snippet: 'Business cards still matter in 2025. Here’s how to make yours unforgettable...',
    date: 'August 3, 2025',
  },
  {
    id: 3,
    title: 'Choosing the Right Paper for Your Flyers',
    snippet: 'Matte or gloss? Thin or thick? Let’s help you pick the right flyer paper...',
    date: 'August 5, 2025',
  },
];

const Blog = () => {
  return (
  <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
     <div style={{ width: '90%', margin: '0 auto' }}>
           <Header/>
        <h2>📚 Blue Link Blog</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          Get tips, inspiration, and updates about printing and promotions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {blogPosts.map((post) => (
            <div key={post.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
              <h3>{post.title}</h3>
              <p style={{ color: '#888' }}>{post.date}</p>
              <p>{post.snippet}</p>
              <Link to={`/blog/${post.id}`} style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>
                Read More →
              </Link>
            </div>
          ))}
        </div>
      <Footer />
      </div>
    </div>
  );
};

export default Blog;
