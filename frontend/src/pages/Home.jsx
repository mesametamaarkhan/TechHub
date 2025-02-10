import Hero from '../components/Hero.jsx';
import BestSellers from '../components/BestSellers.jsx';
import SpecialDeals from '../components/SpecialDeals.jsx';
import Testimonials from '../components/Testimonials';
import DisclaimerModal from '../components/DisclaimerModal.jsx';

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