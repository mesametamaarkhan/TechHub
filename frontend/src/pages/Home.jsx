import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import SpecialDeals from '../components/SpecialDeals';
import Testimonials from '../components/Testimonials';
import DisclaimerModal from '../components/DisclaimerModal';

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <BestSellers />
        <SpecialDeals />
        <Testimonials />
        <DisclaimerModal />
      </main>
    </div>
  );
};

export default Home;