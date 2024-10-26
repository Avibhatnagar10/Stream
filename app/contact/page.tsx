// "use client";
// import { useState } from 'react';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Handle form submission (e.g., send to backend or email service)
//   };

//   return (
//     <section className="py-12 hsl(240 5.9% 10%) text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-extrabold text-center mb-8">
//           Contact Us
//         </h2>

//         <div className="flex justify-center items-center">
//           <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none text-white"
//                 placeholder="Your Name"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-400 outline-none text-white"
//                 placeholder="Your Email"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium" htmlFor="message">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full p-4 h-32 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none text-white"
//                 placeholder="Your Message"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 text-white font-bold text-lg transition duration-300 ease-in-out"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;


import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center h-screen hsl(240 5.9% 10%)">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex">
          {/* Form Section */}
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              This is your direct line to reach out to us with any questions, concerns, feedback, or inquiries you might have.
            </p>
            <form className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Message"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Image Section */}
          {/* <div className="w-1/2 flex justify-center items-center">
            <img
              src="/images/contact-illustration.svg"
              alt="Contact Us Illustration"
              className="w-64"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
