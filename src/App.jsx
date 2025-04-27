import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import LocationsGrid from './components/location/Location';
import PostCard from './components/postCard/PostCard';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Hero />
      <LocationsGrid />
      <PostCard />
    </div>
  );
}

export default App;
