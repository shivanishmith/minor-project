import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-[#EAF8F3] via-[#DFF3EB] to-[#CDEFE2] px-10 py-12"
      style={{
        marginLeft: "320px", // Reserved space for sidebar
        maxWidth: "calc(100% - 320px)", // Ensure no clipping on the right
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-[#008080] text-4xl font-extrabold mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Bidbuddy, the ultimate destination for online auctions
            and bidding excitement. Founded in 2024, we are dedicated to
            providing a dynamic and user-friendly platform for buyers and
            sellers to connect, explore, and transact in a secure and seamless
            environment.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-10">
          <h2 className="text-[#006666] text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Bidbuddy, our mission is to revolutionize the way people buy and
            sell items online. We strive to create an engaging and trustworthy
            marketplace that empowers individuals and businesses to discover
            unique products, make informed decisions, and enjoy the thrill of
            competitive bidding.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-10">
          <h2 className="text-[#006666] text-2xl font-bold mb-6">Our Values</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {values.map((value) => (
              <li
                key={value.id}
                className="bg-white shadow-md rounded-lg p-6 border-l-4 border-[#008080] hover:shadow-lg transition duration-300"
              >
                <h3 className="text-[#008080] text-xl font-bold mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-base">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Story Section */}
        <div className="mb-10">
          <h2 className="text-[#006666] text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bidbuddy began with a vision to transform the auction experience
            into a simple, enjoyable, and secure process for everyone. Through
            our dedication and innovation, we've created a platform that
            connects millions of users in their quest to buy, sell, and discover
            incredible items.
          </p>
        </div>

        {/* Join Us Section */}
        <div className="mb-10">
          <h2 className="text-[#006666] text-2xl font-bold mb-4">Join Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're looking to buy, sell, or simply explore, Bidbuddy
            invites you to join our growing community of auction enthusiasts.
            Discover new opportunities, uncover hidden gems, and experience the
            thrill of winning your next great find.
          </p>
        </div>

        {/* Thank You Section */}
        <div className="text-center">
          <p className="text-[#008080] text-lg font-bold">
            Thank you for choosing Bidbuddy. We look forward to being a part of
            your auction journey!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
