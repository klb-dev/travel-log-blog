import { useState } from 'react';
import styles from './PostCard.module.css';
import posts from '../../data/posts';
import PostModal from './PostModal';


function PostCard() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };



  return (
    <section className={styles.posts}>
      {posts.map((post) => (
        <div 
          key={post.id} 
          className={styles.post}
          onClick={() => handleOpenModal(post)}
        >
          <img src={post.image} alt={post.title} />
          <div className={styles.content}>
            <h2>{post.title}</h2>
            <p className={styles.date}>{post.date}</p>
            <p>{post.excerpt}</p>
          </div>
        </div>
      ))}
      <PostModal post={selectedPost} onClose={handleCloseModal} />
    </section>
  );
}

export default PostCard;
