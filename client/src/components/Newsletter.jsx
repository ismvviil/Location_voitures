import React from "react";
import { motion } from "motion/react";

function Newsletter() {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center text-center space-y-2
  max-md:px-4 my-10 mb-40"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="md:text-4xl text-2xl font-semibold"
      >
        Ne manquez jamais une bonne affaire!
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="md:text-lg text-gray-500/70 pb-8"
      >
        Abonnez-vous pour recevoir les dernières offres, nouveautés et
        réductions exclusives
      </motion.p>
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Entrez votre adresse e‑mail"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          S’abonner
        </button>
      </motion.form>
    </motion.div>
  );
}

export default Newsletter;
