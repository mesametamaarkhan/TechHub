import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import SpecialDeals from '../components/SpecialDeals';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <BestSellers />
        <SpecialDeals />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;