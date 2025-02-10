import { FiAward, FiUsers, FiTruck, FiHeadphones } from 'react-icons/fi';

const AboutUs = () => {
  const features = [
    {
      icon: <FiAward size={24} />,
      title: 'Quality Products',
      description: 'We partner with leading brands to offer only the best tech products.'
    },
    {
      icon: <FiUsers size={24} />,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do.'
    },
    {
      icon: <FiTruck size={24} />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep.'
    },
    {
      icon: <FiHeadphones size={24} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 pt-10 text-gray-100">About TechMart</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted destination for premium tech products since 2020. We're committed to bringing you the latest and greatest in technology.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-dark-greenish-gray py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-black p-6 rounded-lg text-center">
                <div className="text-green-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Our Story</h2>
            <p className="text-gray-300 mb-6">
              Founded in 2020, TechMart emerged from a simple vision: to make premium technology accessible to everyone. What started as a small online store has grown into a trusted marketplace for tech enthusiasts and everyday consumers alike.
            </p>
            <p className="text-gray-300">
              Today, we serve thousands of customers worldwide, offering a carefully curated selection of products from the most innovative brands in technology. Our commitment to quality, customer service, and technical expertise remains at the core of everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-dark-greenish-gray py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-400"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-100">{member.name}</h3>
                <p className="text-green-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;