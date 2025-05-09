
import React from 'react';

const testimonials = [
  {
    quote: "UniHer has completely transformed how I manage my college life. The study planner synced with my cycle has been a game-changer for my productivity.",
    name: "Priya S.",
    role: "Computer Science Major",
    university: "Delhi University"
  },
  {
    quote: "The safety features give me peace of mind, especially when I'm walking back to my dorm late after study sessions. My parents feel better too!",
    name: "Emma L.",
    role: "Biology Student",
    university: "Boston University"
  },
  {
    quote: "I found my internship through SheWorks, and the mentor matching helped me connect with amazing women in my field. Truly empowering!",
    name: "Zainab K.",
    role: "Business Major",
    university: "University of Toronto"
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Loved by <span className="gradient-text">College Girls</span> Everywhere
          </h2>
          <p className="text-gray-600">
            Hear from students who are using UniHer to transform their college experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 text-uniher-purple">
                <path d="M10.667 12H5.33366C4.96547 12 4.61223 12.1404 4.36218 12.3905C4.11213 12.6405 3.97166 12.9938 3.97166 13.362V18.6953C3.97166 19.0634 4.11213 19.4167 4.36218 19.6667C4.61223 19.9167 4.96547 20.0572 5.33366 20.0572H8.00033C8.00033 21.0572 7.60033 22.7238 5.33366 23.3905C5.49033 23.5238 6.08033 24.0572 6.66699 24.0572C10.667 24.0572 12.0003 20.0572 12.0003 17.3905V13.362C12.0003 12.9938 11.8599 12.6405 11.6098 12.3905C11.3598 12.1404 11.0065 12 10.667 12ZM26.667 12H21.3337C20.9655 12 20.6122 12.1404 20.3622 12.3905C20.1121 12.6405 19.9717 12.9938 19.9717 13.362V18.6953C19.9717 19.0634 20.1121 19.4167 20.3622 19.6667C20.6122 19.9167 20.9655 20.0572 21.3337 20.0572H24.0003C24.0003 21.0572 23.6003 22.7238 21.3337 23.3905C21.4903 23.5238 22.0803 24.0572 22.667 24.0572C26.667 24.0572 28.0003 20.0572 28.0003 17.3905V13.362C28.0003 12.9938 27.8599 12.6405 27.6098 12.3905C27.3598 12.1404 27.0065 12 26.667 12Z" fill="currentColor"/>
              </svg>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-uniher-gray flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
