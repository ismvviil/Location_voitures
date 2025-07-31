import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Mohamed El Amrani",
      location: "Marrakech, Maroc",
      image: assets.user_profile,
      testimonial:
        "Votre service est incroyable ! Nous avons passé un excellent séjour grâce à votre professionnalisme et votre attention à chaque détail. Merci beaucoup !",
    },
    {
      name: "Fatima Zahra",
      location: "Casablanca, Maroc",
      image: assets.testimonial_image_2,
      testimonial:
        "L’équipe était très attentionnée et a répondu à toutes nos questions. Elle a su s’excuser pour tout souci. On vous aime bien !",
    },
    {
      name: "Karim Ouazzani",
      location: "Fès, Maroc",
      image: assets.testimonial_image_1,
      testimonial:
        "Tajroba khasa b Moroccan style ! Men medina Fès l sahara, koulchi tanzim wa makaynch l’khtar. Nreed nrja3 m3akom!",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="Ce que disent nos clients"
        subtitle="Découvrez pourquoi les voyageurs exigeants choisissent StayVenture pour leurs hébergements de luxe à travers le monde."
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-8 mt-18"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1
            transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
