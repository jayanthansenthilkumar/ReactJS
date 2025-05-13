
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About PriSona Mart</h1>
              <p className="text-lg md:text-xl mb-6">
                Connecting local farmers and grocers with customers since 2020.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  PriSona Mart was founded in 2020 with a simple mission: to make fresh, 
                  local groceries accessible to everyone while supporting small-scale farmers 
                  and grocery shop owners.
                </p>
                <p className="text-gray-600 mb-4">
                  What started as a small marketplace connecting just five local shops with their 
                  neighborhood has now grown into a thriving platform with hundreds of vendors 
                  serving customers across multiple regions.
                </p>
                <p className="text-gray-600">
                  Our focus remains on quality, community, and sustainability. We carefully vet each 
                  vendor to ensure they meet our standards for product quality, ethical business 
                  practices, and commitment to environmental responsibility.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-2">Our Values</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Quality above all</li>
                    <li>Supporting local communities</li>
                    <li>Environmental sustainability</li>
                    <li>Fair pricing for customers and vendors</li>
                    <li>Transparent business practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">PriSona Mart at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                <div className="text-gray-600">Verified Vendors</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
                <div className="text-gray-600">Products Available</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-indigo-600 mb-2">50k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-indigo-600 mb-2">20+</div>
                <div className="text-gray-600">Cities Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-indigo-600 mb-4">CEO & Founder</p>
                <p className="text-gray-600">
                  Former agricultural economist with a passion for connecting local producers with customers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Michael Chen</h3>
                <p className="text-indigo-600 mb-4">CTO</p>
                <p className="text-gray-600">
                  Tech innovator focused on creating seamless marketplace experiences for vendors and customers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Elena Rodriguez</h3>
                <p className="text-indigo-600 mb-4">COO</p>
                <p className="text-gray-600">
                  Supply chain expert dedicated to ensuring efficient and sustainable operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the PriSona Family</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you're a customer looking for fresh produce or a vendor wanting to expand your reach,
              PriSona Mart welcomes you to our growing community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/register">Sign Up Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
