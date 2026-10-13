import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheckCircle, FiAlertCircle, FiPhone } from 'react-icons/fi';
// import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Simple validations
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please complete all form fields before submitting.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMsg('Please supply a valid email address.');
      return;
    }

    try {
      setStatus('submitting');
      
      // Simulate EmailJS delivery or print console message
      console.log("Submitting contact details to EmailJS portal...", formData);
      
      // EmailJS configuration stub
      // To activate, user can replace with their Service/Template IDs:
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      //   from_name: name,
      //   reply_to: email,
      //   message: message
      // }, 'YOUR_PUBLIC_KEY');
      
      // Simulated response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error("Error sending message via EmailJS:", err);
      setStatus('error');
      setErrorMsg(err.message || 'An error occurred during submission. Please try again.');
    }
  };

  const contactCards = [
    {
      name: 'Phone Number',
      value: profileData.socials.phone,
      href: `tel:${profileData.socials.phone}`,
      icon: <FiPhone className="text-emerald-400" />
    },
    {
      name: 'Email Address',
      value: profileData.socials.email,
      href: `mailto:${profileData.socials.email}`,
      icon: <FiMail className="text-cyan-400" />
    },
    {
      name: 'LinkedIn Profile',
      value: 'vineetkush-pali-6209b9338',
      href: profileData.socials.linkedin,
      icon: <FiLinkedin className="text-blue-500" />
    },
    {
      name: 'GitHub Profile',
      value: '@vineetkush57-debug',
      href: profileData.socials.github,
      icon: <FiGithub className="text-slate-200" />
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">08 / CHANNELS</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">Get In Touch</h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-cyan to-brand-blue mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          {/* Channels list (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-mono tracking-wide text-slate-350 uppercase mb-2">
              Connection Points
            </h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-sans">
              I am open to discuss internships, software engineering projects, AI/ML collaborations, or general technical topics. Feel free to shoot a message or find me on socials!
            </p>

            <div className="space-y-4">
              {contactCards.map((card, idx) => (
                <motion.a
                  key={card.name}
                  href={card.href}
                  target={card.href !== '#' ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4, type: 'spring' }}
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-900 bg-slate-900/10 hover:border-cyan-500/20 hover:bg-slate-900/20 transition-all group cursor-pointer shadow-md hover:shadow-cyan-500/5"
                >
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850 group-hover:border-cyan-500/30 transition-all">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{card.name}</div>
                    <div className="text-xs font-mono text-slate-300 group-hover:text-cyan-400 transition-colors mt-0.5">{card.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-xl border border-slate-800"
            >
              <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-6 border-b border-slate-800 pb-2">
                Send Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-center space-x-2 p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-lg text-emerald-400">
                    <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Your message was successfully transmitted! Vineet will respond shortly.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center space-x-2 p-3 bg-red-950/40 border border-red-500/20 rounded-lg text-red-400">
                    <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="font-mono text-slate-500 uppercase tracking-widest text-[9px]">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      disabled={status === 'submitting'}
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-cyan-500/40 rounded-lg px-4 py-2.5 text-slate-200 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-mono text-slate-500 uppercase tracking-widest text-[9px]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. email@example.com"
                      disabled={status === 'submitting'}
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-cyan-500/40 rounded-lg px-4 py-2.5 text-slate-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-slate-500 uppercase tracking-widest text-[9px]">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, question, or proposal details..."
                    disabled={status === 'submitting'}
                    className="w-full bg-[#070b19] border border-slate-800 focus:border-cyan-500/40 rounded-lg px-4 py-2.5 text-slate-200 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center space-x-2 px-5 py-3 w-full sm:w-auto rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:brightness-110 text-slate-950 font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-950/20 border-t-slate-950 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
