/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Menu, X, Package2 } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#', active: true },
  { name: 'Features', href: '#' },
  { name: 'Community', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] },
    },
  };

  const wordByWord = (text: string, isAccent?: boolean) => {
    return text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        variants={itemVariants}
        className={`inline-block mr-[0.25em] ${isAccent ? 'font-display italic text-[1.2em]' : ''}`}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled ? 'bg-background/80 backdrop-blur-xl border-white/10 h-16' : 'bg-transparent border-white/5 h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          <div className="font-display text-2xl tracking-[0.2em] text-on-surface">Retext</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  link.active ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-on-surface"
            onClick={() => setIsMenuOpen(true)}
            id="menu-toggle"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[60] bg-background/90 flex flex-col items-center justify-center p-12 md:hidden"
          >
            <button 
              className="absolute top-6 right-6 text-on-surface"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="font-display text-4xl text-on-surface hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex flex-col justify-end pb-12 md:pb-24">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://cdn.sceneai.art/Hero%20Section%20Video/e622115a-4d8e-4b55-9fdc-554dac89c23f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-background/20" />
        </div>

        {/* Hero Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
        >
          <div className="max-w-3xl mb-12">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-on-surface leading-[1.1] mb-8">
              <span className="block mb-2">
                {wordByWord("Join The Club Before")}
              </span>
              <span className="block">
                {wordByWord("Everyone Else Does.")}
                <span className="ml-2">{wordByWord("Re-text.", true)}</span>
              </span>
            </h1>

            <p className="text-on-surface-variant text-base md:text-lg max-w-xl leading-relaxed">
              {wordByWord("Want To Be The Cool Kid Of Trading? Join GUC Club And Get Access To The Secret Sauce Before Everyone Else. Because Let's Face It, Being Average Is So 2025.")}
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            {/* CTA Glass Pill */}
            <motion.div 
              variants={itemVariants}
              className="glass-pill rounded-full p-1 pl-6 flex items-center w-full max-w-lg h-16 shadow-2xl"
            >
              <Mail className="text-on-surface-variant mr-3 shrink-0" size={20} />
              <input 
                type="email" 
                placeholder="Your Fav Email here..."
                className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 flex-grow text-sm md:text-base outline-none"
              />
              <button className="bg-white text-on-primary-container h-14 px-6 md:px-8 rounded-full font-bold text-sm whitespace-nowrap hover:scale-[1.02] active:scale-95 transition-all duration-300">
                Join the GUC Club
              </button>
            </motion.div>

            {/* Sponsored By */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-start md:items-end gap-5"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">SPONSORED BY</span>
              <div className="flex items-center gap-8 grayscale opacity-50 hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tighter">Forbes</span>
                </div>
                <div className="flex items-center">
                  <span className="font-extrabold text-xl">TNW</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 border border-white/10 rounded-md">
                  <Package2 size={18} />
                  <span className="font-bold text-xs tracking-widest uppercase">BRUGIS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Grid Pattern Background Overlay */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}
