'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: 'Yoga',
    description: 'Enjoy flexibility and mindfulness with our yoga classes. Relaxing those stressed muscles and finding your inner peace.',
    image: '/gifs/namaste.gif',

  },
  {
    id: 2,
    title: 'Muscles',
    description: 'Build strength and endurance with our muscle training programs. From scrawny to strong, we help you transform, giving you that confidence you deserve.',
    image: '/gifs/muscles.gif',

  },
  {
    id: 3,
    title: 'Treadmill',
    description: 'Get your heart pumping and burn calories with our treadmill workouts. Perfect for all fitness levels. Get those legs moving and feel the burn!',
    image: '/gifs/treadmill.gif',

  },
  {
    id: 4,
    title: 'Bench Press',
    description: 'Build upper body strength with our bench press workouts. Perfect your form and increase your max lift with our expert guidance.',
    image: '/gifs/bench-press.gif',

  },
  {
    id: 5,
    title: 'Boxing',
    description: 'Unleash your inner fighter with our boxing workouts. Improve your strength, speed, and agility while having fun. Upgrade your self defense skills. And remember, it’s not just about the punches, it’s about the passion!',
    image: '/gifs/boxing.gif',

  },
  {
    id: 6,
    title: 'Jogging',
    description: 'Stay active and improve your stamina with our jogging workouts. Strengthen those leg muscles and enjoy the fresh air while you run.',
    image: '/gifs/jogging.gif',

  },
  {
    id: 7,
    title: 'Swimming',
    description: 'Improve your cardiovascular fitness and build endurance with our swimming workouts. Dive in and make a splash!',
    image: '/gifs/swimming.gif',

  },
  {
    id: 8,
    title: 'Medical Checks',
    description: 'Stay on top of your health with regular medical check-ups. Prevention is better than cure! We care about your well-being, so we offer medical checks to ensure you’re always in top shape.',
    image: '/gifs/medical-checks.gif',

  },
  {
    id: 9,
    title: 'Couple Training',
    description: 'Get fit together with our couple training sessions. Strengthen your bond while achieving your fitness goals. Energize your relationship with our couple training sessions. Because fitness is better when shared!',
    image: '/gifs/couple.gif',

  },
];

export default function ReversibleScrollCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [cardsPerGroup, setCardsPerGroup] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateCardsPerGroup = () => {
      setCardsPerGroup(window.innerWidth < 640 ? 1 : 3);
    };

    updateCardsPerGroup();
    window.addEventListener('resize', updateCardsPerGroup);
    return () => window.removeEventListener('resize', updateCardsPerGroup);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / cards.length;
    const scrollAmount = i * cardWidth;

    el.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };


  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        let nextIndex =
          direction === 'right' ? prevIndex + cardsPerGroup : prevIndex - cardsPerGroup;

        if (nextIndex >= cards.length - cardsPerGroup) {
          nextIndex = cards.length - cardsPerGroup;
          setDirection('left');
        } else if (nextIndex <= 0) {
          nextIndex = 0;
          setDirection('right');
        }

        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 4000);
  }, [cardsPerGroup, direction]);

  const stopAutoScrollTemporarily = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    pauseTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 3000);
  }, [startAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [cardsPerGroup, direction, startAutoScroll]);

  const manualScroll = (dir: 'left' | 'right') => {
    stopAutoScrollTemporarily();

    let newIndex = index + (dir === 'right' ? cardsPerGroup : -cardsPerGroup);
    if (newIndex < 0) newIndex = 0;
    if (newIndex > cards.length - cardsPerGroup)
      newIndex = cards.length - cardsPerGroup;

    setIndex(newIndex);
    setDirection(dir);
    scrollToIndex(newIndex);
  };

  // Detect manual scroll (e.g., swiping)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleUserScroll = () => {
      stopAutoScrollTemporarily();
    };

    el.addEventListener('scroll', handleUserScroll);
    return () => el.removeEventListener('scroll', handleUserScroll);
  }, [stopAutoScrollTemporarily]);

  return (
    <div className="w-full  py-10">
      {/* Desktop Buttons */}
      <div className="hidden sm:flex justify-end gap-4 mb-4">
        <button
          onClick={() => manualScroll('left')}
          className="bg-orange-700 hover:bg-gray-300 p-2 rounded"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => manualScroll('right')}
          className="bg-green-700 hover:bg-gray-300 p-2 rounded"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="
          flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-[21.5px] lg:gap-[21.5px] md:gap-[27px]
          scrollbar-hide touch-pan-x
        "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="
              snap-start flex-shrink-0
              w-full md:w-[31.5%] lg:w-[32.333%]
              bg-[#000000ee] hover:bg-orange-800 shadow-md sm:rounded-lg p-6 text-center border-black border cursor-pointer 
            "
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-20 h-20 object-cover  mb-4 rounded-full mx-auto"
            />
            <h3 className="text-lg font-bold text-white">{card.title}</h3>
            <p className="text-sm text-[#ffffff70] mt-2">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}