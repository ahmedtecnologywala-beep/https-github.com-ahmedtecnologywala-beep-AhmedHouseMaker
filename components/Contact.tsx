import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="bg-black py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-brand-gray rounded-lg shadow-lg p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Name</label>
                <input type="text" className="mt-1 block w-full rounded-md bg-brand-surface border-gray-700 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm p-3 border" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md bg-brand-surface border-gray-700 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm p-3 border" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Subject</label>
                <select className="mt-1 block w-full rounded-md bg-brand-surface border-gray-700 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm p-3 border">
                  <option>General Inquiry</option>
                  <option>Custom Design Request</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Message</label>
                <textarea rows={4} className="mt-1 block w-full rounded-md bg-brand-surface border-gray-700 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm p-3 border" placeholder="How can we help?"></textarea>
              </div>
              <button type="button" className="w-full bg-brand-accent text-black py-3 px-4 rounded-md hover:bg-white transition-colors font-bold">
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "How do I measure my plot accurately?", a: "Use a laser measure or measuring tape to get the length and width. Ensure you account for any irregularities or boundary walls." },
                { q: "Can I edit the plans after generation?", a: "Yes, you can request modifications or use the provided layout as a base for your contractor." },
                { q: "Is it really free?", a: "Yes! Ahmed House Maker is currently completely free for all users to help people design their dream homes." },
                { q: "Are these plans structurally sound?", a: "Our AI follows standard building codes, but we strictly recommend consulting a licensed structural engineer before breaking ground." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-800 pb-4">
                  <h3 className="text-lg font-medium text-brand-accent">{faq.q}</h3>
                  <p className="mt-2 text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-brand-accent/10 p-6 rounded-lg border border-brand-accent/20">
               <h3 className="font-bold text-white">Need Custom Architect Support?</h3>
               <p className="text-sm text-gray-400 mt-2">Our network of verified professionals can take your AI plan to the next level.</p>
               <button className="mt-3 text-brand-accent font-semibold text-sm underline hover:text-white">Find an Architect near you</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;