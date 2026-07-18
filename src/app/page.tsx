// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Heart, ChevronRight, Star, Mail, Users, Building2, MapPin as MapPinIcon,  Dog, Cat, Bird, Rabbit, Plus } from 'lucide-react';

export default function HomePage() {
  const featuredPets = [
    { id: 1, name: 'Buddy', breed: 'Beagle', age: '2 Years', image: 'https://loremflickr.com/600/450/dog?lock=130', status: 'Available' },
    { id: 2, name: 'Luna', breed: 'Shorthair', age: '4 Years', image: 'https://loremflickr.com/600/450/dog?lock=40', status: 'Available' },
    { id: 3, name: 'Snowy', breed: 'Lop Rabbit', age: '1 Year', image: 'https://loremflickr.com/600/450/cat?lock=102', status: 'Available' },
    { id: 4, name: 'Max', breed: 'Husky', age: '3 Years', image: 'https://loremflickr.com/600/450/dog?lock=121', status: 'Available' },
  ];

  const categories = [
    { name: 'Dog', icon: Dog, color: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Cat', icon: Cat, color: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Rabbit', icon: Rabbit, color: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Bird', icon: Bird, color: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { name: 'Other', icon: Plus, color: 'bg-gray-100 dark:bg-gray-800' },
  ];

  const testimonials = [
    {
      name: 'Sarah & Jasper',
      image: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
      quote: 'Jasper has changed our lives. The process through Forever Paws was so transparent and supportive. We found our soulmate!',
      rating: 5,
    },
    {
      name: 'The Miller Family',
      image: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
      quote: 'We were nervous about adopting for the first time, but the shelter staff were amazing. Forever Paws made searching so easy.',
      rating: 5,
    },
    {
      name: 'David & Bear',
      image: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
      quote: 'Adopting a senior pet was the best decision. Bear is the calm companion I needed. Thank you Forever Paws.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold font-poppins leading-tight">
                  <span className="text-[#3B7A99] dark:text-[#3B7A99]">Every paw deserves a</span>
                  <br />
                  <span className="text-[#F2A65A] dark:text-[#F2A65A]">forever home.</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                  Connecting compassionate hearts with loving companions from verified shelters. Start your adoption journey today.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white dark:bg-def-dark-bg p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Search size={20} className="text-gray-400" />
                    <select className="bg-transparent flex-1 outline-none text-gray-700 dark:text-gray-300">
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Rabbit</option>
                      <option>Bird</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <MapPin size={20} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="City or Zip"
                      className="bg-transparent flex-1 outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
                    />
                  </div>
                  <button className="px-8 py-3 bg-[#F2A65A] hover:bg-[#F2A65A]/90 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95">
                    Find a Pet
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#6FA287]/10 dark:bg-[#6FA287]/20 rounded-full">
                  <Heart size={16} className="text-[#6FA287]" />
                  <span className="text-sm font-medium text-[#6FA287]">1,200+ Pets Adopted</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F2A65A]/10 dark:bg-[#F2A65A]/20 rounded-full">
                  <Building2 size={16} className="text-[#F2A65A]" />
                  <span className="text-sm font-medium text-[#F2A65A]">80+ Partner Shelters</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#3B7A99]/10 dark:bg-[#3B7A99]/20 rounded-full">
                  <MapPinIcon size={16} className="text-[#3B7A99]" />
                  <span className="text-sm font-medium text-[#3B7A99]">15+ Cities</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://loremflickr.com/600/450/dog?lock=20"
                  alt="Happy family with their adopted dog"
                  width={600}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F2A65A]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#6FA287]/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Friends Section */}
      <section className="py-16 bg-white dark:bg-def-dark-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#3B7A99] dark:text-[#3B7A99] font-poppins mb-2">
                Featured Friends
              </h2>
              <p className="text-gray-600 dark:text-gray-400">They are waiting to meet you!</p>
            </div>
            <Link href="/pets" className="flex items-center gap-1 text-[#3B7A99] hover:text-[#3B7A99]/80 font-medium transition-colors">
              View all pets
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet) => (
              <div key={pet.id} className="group bg-[#FFF9F2] dark:bg-def-dark-bg rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    width={300}
                    height={225}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#6FA287] text-white text-xs font-semibold rounded-full">
                      {pet.status}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{pet.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pet.breed} • {pet.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Friend Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3B7A99] dark:text-[#3B7A99] font-poppins mb-2">
              Browse by Friend
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/pets?species=${category.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-def-dark-bg rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <category.icon size={32} className="text-gray-700 dark:text-gray-300" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-def-dark-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3B7A99] dark:text-[#3B7A99] font-poppins mb-2">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Three simple steps to meeting your new best friend.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#3B7A99]/10 dark:bg-[#3B7A99]/20 rounded-2xl flex items-center justify-center">
                <Search size={32} className="text-[#3B7A99]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Browse</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Filter by species, age, and location to find compatible pets near you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#6FA287]/10 dark:bg-[#6FA287]/20 rounded-2xl flex items-center justify-center">
                <Mail size={32} className="text-[#6FA287]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Apply</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect directly with shelters through our secure application process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F2A65A]/10 dark:bg-[#F2A65A]/20 rounded-2xl flex items-center justify-center">
                <Users size={32} className="text-[#F2A65A]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Bring Home</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Finalize the adoption and start your lives together as a new family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#6FA287] dark:bg-[#6FA287]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-1">1,200+</div>
              <div className="text-sm opacity-90">Pets Adopted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">80+</div>
              <div className="text-sm opacity-90">Partner Shelters</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">15+</div>
              <div className="text-sm opacity-90">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">12</div>
              <div className="text-sm opacity-90">Avg Days to Adopt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3B7A99] dark:text-[#3B7A99] font-poppins mb-2">
              Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-def-dark-bg p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-[#F2A65A] fill-[#F2A65A]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#3B7A99] dark:bg-[#3B7A99]/90 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Decorative paw print */}
            <div className="absolute top-6 right-6 opacity-10">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="7" cy="9" r="2"/>
                <circle cx="17" cy="9" r="2"/>
                <circle cx="9" cy="16" r="2"/>
                <circle cx="15" cy="16" r="2"/>
              </svg>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4 relative z-10">
              Help more pets find their people.
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto relative z-10">
              Are you a shelter or rescue organization? Join our network to reach thousands of potential adopters every day.
            </p>
            <button className="px-8 py-3 bg-white text-[#3B7A99] hover:bg-gray-100 font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95 relative z-10">
              Register Your Shelter
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Get new pets in your city
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              We&apos;ll send you a weekly update of the newest arrivals matching your preferences.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white dark:bg-def-dark-bg border border-gray-200 dark:border-gray-700 rounded-full outline-none focus:ring-2 focus:ring-[#3B7A99]/50 text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-[#F2A65A] hover:bg-[#F2A65A]/90 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}