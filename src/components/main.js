import { motion, useTransform, useScroll} from "framer-motion";
import { useState, useRef, useEffect} from "react";
import * as React from 'react';
import  vid from './media/video/1/vid'

const Main = () => {

  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center"
        style={{
          height: `100vh`,
        }}
      >
        <span style={{fontFamily: 'WindSong', color: "#a67c00", fontSize: "8vw"}} className="text-neutral-500">
          Custom Mannequin
        </span>
        <br/>
        <span style={{fontFamily: 'Dancing Script', color: "#a67c00", fontSize: "4.5vw"}} className="text-neutral-500">
          any body - any shape - any where
        </span>
      </div>
      <VideoScroller video={vid()}/>
      <div className="flex h-48 items-center justify-center"
        style={{
          height: `100vh`,
        }}
      >
        <span className="font-semibold uppercase text-neutral-500">
          Middle
        </span>
      </div>
      <VideoScroller video={vid()}/>
      <div className="flex h-48 items-center justify-center"
        style={{
          height: `100vh`,
        }}
      >
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

function useParallax(value, distance) {
  return useTransform(value, [0, 5], [-distance, distance]);
}

function Image({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
      </div>
      <motion.h1 style={{ y }}>{`#00${id}`}</motion.h1>
    </section>
  );
}

const TextScroller = () => {
  return (
    <> 
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((image) => (
      <Image id={image} />
    ))}
    </>
  );
}


const VideoScroller = ({ video }) => {

  // console.log(video)

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const inputRef = useRef();

  const [background, setBackground] = useState(video[0].url);
  const handleScroll = () => {
  const position = window.pageYOffset;
    //console.log(Math.round(position/100) - (Math.floor((position/100) / (video.length-1))*(video.length-1))) 

    if (inputRef.current.getBoundingClientRect().y > -window.innerHeight && inputRef.current.getBoundingClientRect().y < window.innerHeight){
      //console.log((inputRef.current.getBoundingClientRect().y + window.innerHeight) /100)
      setBackground(video[(Math.round(position/100) - (Math.floor((position/100) / (video.length-1))*(video.length-1)))].url)
    } 
    //console.log(inputRef.current.getBoundingClientRect())
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const classNameVar = "relative bg-neutral-900"

  return (
    <section ref={targetRef} className={classNameVar}
      style={{
        height: `${(((video.length-1)*(100))-window.innerHeight)}px`,
      }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
      < div ref={inputRef} className="group relative h-[100vh] w-[100vw] overflow-hidden bg-neutral-200"       
            
          style={{            
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        > </div>
        
        <div className="hedden tiles"
          style={{            
            visibility: "hidden",
            position: "absolute"
          }}
        >
          <motion.div style={{ x }} className="flex gap-4" >
            {vid().map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </div>
      <TextScroller />
    </section>
  );
};

const Card = ({ card , name }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${vid()[card.id - 1].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Main;
