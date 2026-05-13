import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';
import SectionHeading from '../ui/SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { HiStar } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    name: 'Priya & Rahul Sharma',
    review: 'Shubham and his team made our wedding day truly magical! The photos and videos captured every emotion perfectly. We couldn\'t have asked for a better team.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    event: 'Wedding Photography',
  },
  {
    name: 'Ananya & Vikram Singh',
    review: 'The pre-wedding shoot was an incredible experience! They found the most stunning locations and made us feel so comfortable. The results were breathtaking.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    event: 'Pre-Wedding Shoot',
  },
  {
    name: 'Sneha & Amit Kumar',
    review: 'Our cinematic wedding film brings tears to our eyes every time we watch it. Shubham truly knows how to tell a love story through his lens.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    event: 'Cinematic Film',
  },
  {
    name: 'Kavita & Rajan Verma',
    review: 'Professional, creative, and incredibly talented! They captured moments we didn\'t even know happened. Worth every penny and more!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    event: 'Wedding Coverage',
  },
  {
    name: 'Meera & Saurav Das',
    review: 'From Haldi to Vidaai, they covered everything beautifully. The drone shots added a cinematic feel that we absolutely love!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    event: 'Full Wedding',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative section-padding bg-dark-300 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Real stories from the beautiful couples we've had the privilege to work with."
        />

        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1}
            spaceBetween={30}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={i}>
                <div className="glass rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group hover:border-gold/30 transition-colors duration-500">
                  {/* Quote mark */}
                  <div className="absolute top-4 right-6 font-heading text-6xl text-gold/10 leading-none select-none">
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <HiStar key={j} className="text-gold text-lg" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-soft/70 text-sm leading-relaxed flex-1 mb-6 relative">
                    "{testimonial.review}"
                  </p>

                  {/* Client */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gold/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-heading font-semibold text-cream text-sm">{testimonial.name}</p>
                      <p className="text-gold/60 text-xs">{testimonial.event}</p>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-700" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
