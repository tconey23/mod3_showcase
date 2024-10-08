import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function PropFidget({size}) {
    const ref = useRef(null);
    const [constraints, setConstraints] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
    const controls = useAnimation(); // useAnimation hook for more control over animations

    useEffect(() =>  {
        const updateConstraints = () =>  {
            if (ref.current) {
                const element = ref.current.getBoundingClientRect();
                setConstraints({
                    top: (window.innerHeight * 0.20) - (element.top),
                    left: (window.innerWidth * 0.30) - (element.left),
                    right: (window.innerWidth) - element.right,
                    bottom: (window.innerHeight) - element.bottom
                });
            }
        };

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () =>  window.removeEventListener('resize', updateConstraints);
    }, []);

    const handleSpin = () =>  {
        // Initiates a spin with deceleration
        controls.start({
            rotate: [0, 360], // Spin from 0 to 360 degrees
            transition: {
                type: 'inertia',
                velocity: 300, // Initial velocity of the spin
                power: 50, // Deceleration power, lower values stop quicker
                timeConstant: 10000, // Time taken to decelerate
                restDelta: 0.5 // When to stop the animation, small values stop closer to the final value
            }
        });
    };

    return (
        <motion.svg
            ref={ref}
            drag
            style={{ cursor: 'grab', scale: size }}
            dragConstraints={constraints}
            animate={controls}
            onClick={handleSpin}
            filter="drop-shadow(0px 0px 20px rgb(1, 1, 1))"
            width="250px"
            height="250px"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <radialGradient id="SVGID_1_" cx="285.09" cy="55.562" r="45.388" gradientUnits="userSpaceOnUse">
   <stop stopColor="#DCDCDC" offset="0"/>
   <stop stopColor="#BCBCBC" offset="1"/>
  </radialGradient>
  <radialGradient id="SVGID_00000014617433579444252100000016682609991205847444_" cx="275.64" cy="64.725" r="28.191" gradientUnits="userSpaceOnUse">
   <stop stopColor="#DCDCDC" offset="0"/>
   <stop stopColor="#BCBCBC" offset="1"/>
  </radialGradient>
  <radialGradient id="SVGID_00000034801822705864011120000005159923192977660852_" cx="281.56" cy="58.996" r="13.27" gradientUnits="userSpaceOnUse">
   <stop stopColor="#D6C165" offset="0"/>
   <stop stopColor="#D6BD65" offset=".4712"/>
   <stop stopColor="#D6B165" offset=".9491"/>
   <stop stopColor="#D6AF65" offset="1"/>
  </radialGradient>
  <radialGradient id="SVGID_00000102537809265456526320000012449633128851295640_" cx="281.76" cy="59.13" r="12.912" gradientUnits="userSpaceOnUse">
   <stop stopColor="#D6C165" offset="0"/>
   <stop stopColor="#D6BD65" offset=".4712"/>
   <stop stopColor="#D6B165" offset=".9491"/>
   <stop stopColor="#D6AF65" offset="1"/>
  </radialGradient>
 </defs>
 <g transform="translate(-122.77 -125.15)">
  <g transform="matrix(.26458 0 0 .26458 59.344 122.46)">
   <path d="m330.36 53.242c-1.215-23.981-20.987-43.067-45.27-43.067s-44.055 19.086-45.27 43.067c-0.039 0.774-0.117 1.537-0.117 2.32 0 0.784 0.078 1.547 0.117 2.32 1.216 23.982 20.987 43.067 45.27 43.067s44.055-19.086 45.27-43.067c0.039-0.774 0.117-1.537 0.117-2.32 1e-3 -0.783-0.077-1.546-0.117-2.32z" fill="url(#SVGID_1_)"/>
   <path d="m306.72 72.312c-11.943 0-21.625-16.75-21.625-16.75 0-11.943-9.682-26.079-21.625-26.079-11.197 0-20.406 12.964-21.514 23.868-0.037 0.737-0.112 1.465-0.112 2.211 0 0.747 0.074 1.474 0.112 2.211 1.158 22.853 19.999 41.039 43.139 41.039s41.98-18.187 43.139-41.039c-1.108 10.905-10.317 14.539-21.514 14.539z" fill="#3a3438"/>
   <path d="m328.23 53.351c-1.158-22.852-19.999-41.039-43.139-41.039s-41.98 18.187-43.139 41.039c1.108-10.905 10.317-19.414 21.514-19.414 11.943 0 20.683 9.719 21.625 21.625 0.997 12.607 9.682 21.625 21.625 21.625 11.197 0 20.406-8.509 21.514-19.414 0.038-0.737 0.112-1.465 0.112-2.211s-0.075-1.474-0.112-2.211z" fill="#e8eae9"/>
   <g fill="#e8eae9">
    <path d="m285.99 41.72c0.351 0.051 0.686 0.152 1.011 0.28-3.043-8.72-10.597-15.07-20.249-15.07-8.047 0-15.048 4.407-18.773 10.927 3.923-3.989 9.368-6.477 15.405-6.477 8.017 0 14.577 4.39 18.317 10.871 1.375-0.504 2.766-0.754 4.289-0.531z"/>
    <path d="m310 70.181c-5.766 0-10.767-2.105-14.51-5.701-0.774 1.027-1.717 1.931-2.743 2.642-0.485 0.336-0.994 0.624-1.517 0.884 3.829 4.148 9.164 6.625 15.402 6.625 8.047 0 15.048-4.407 18.773-10.927-3.923 3.989-9.368 6.477-15.405 6.477z"/>
   </g>
   <path d="m284.1 69.981c-0.351-0.051-0.686-0.152-1.011-0.28 3.043 8.719 10.597 15.07 20.249 15.07 8.047 0 15.048-4.407 18.773-10.927-3.923 3.989-9.368 6.477-15.405 6.477-8.017 0-14.577-4.39-18.318-10.871-1.374 0.504-2.765 0.754-4.288 0.531z" fill="#3a3438"/>
   <path d="m275.24 45.302c0.931-0.886 1.964-1.59 3.101-2.106-3.788-3.835-8.918-6.125-14.893-6.125-8.047 0-15.048 4.407-18.773 10.927 3.923-3.989 9.368-6.477 15.405-6.477 5.465 0 10.229 1.909 13.9 5.168 0.401-0.482 0.808-0.956 1.26-1.387z" fill="#3a3438"/>
   <path d="m292.97 94.974c-25.545 0-46.507-19.356-49.174-44.193-0.109 0.916-0.203 1.836-0.25 2.77-0.036 0.705-0.107 1.4-0.107 2.113s0.071 1.408 0.107 2.113c1.107 21.837 19.111 39.217 41.223 39.217 4.809 0 9.411-0.847 13.699-2.359-1.81 0.2-3.636 0.339-5.498 0.339z" fill="#3f3f3f" opacity=".75"/>
   <path d="m277.36 15.984c25.545 0 46.507 19.356 49.174 44.193 0.109-0.916 0.203-1.836 0.25-2.77 0.036-0.705 0.107-1.4 0.107-2.113s-0.071-1.408-0.107-2.113c-1.107-21.837-19.111-39.217-41.223-39.217-4.809 0-9.411 0.847-13.699 2.359 1.81-0.201 3.636-0.339 5.498-0.339z" fill="#e8eae9"/>
   <circle transform="matrix(.7071 -.7071 .7071 .7071 37.392 200.98)" cx="261.3" cy="55.352" r="8.03" fill="#3f3f3f" opacity=".75"/>
   <circle cx="261.3" cy="55.352" r="6.691" fill="#e8eae9"/>
   <circle cx="262.88" cy="53.764" r="2.76" fill="#e8eae9"/>
   <circle transform="matrix(.0463 -.9989 .9989 .0463 239.92 362)" cx="309.54" cy="55.352" r="8.03" fill="#161616"/>
   <circle cx="309.54" cy="55.352" r="6.691" fill="#3a3438"/>
   <path d="m313.89 53.764c0 1.524-1.236 2.76-2.76 2.76s-2.76-1.236-2.76-2.76 1.236-2.76 2.76-2.76 2.76 1.236 2.76 2.76z" fill="#f6f6f6" opacity=".75"/>
   <circle transform="matrix(.7071 -.7071 .7071 .7071 44.362 217.8)" cx="285.09" cy="55.352" r="14.662" fill="#3f3f3f" opacity=".75"/>
   <circle cx="285.09" cy="55.352" r="13.369" fill="url(#SVGID_00000014617433579444252100000016682609991205847444_)"/>
   <circle transform="matrix(.7071 -.7071 .7071 .7071 44.362 217.8)" cx="285.09" cy="55.352" r="10.762" fill="#3a3438"/>
   <circle cx="285.09" cy="55.352" r="8.688" fill="url(#SVGID_00000034801822705864011120000005159923192977660852_)"/>
   <path d="m293.78 55.352c0-3.139-1.665-5.89-4.16-7.416l-4.568 7.391-8.363 2.309c0.766 2.823 2.939 5.192 5.953 6.072l2.44-8.357h8.698z" fill="url(#SVGID_00000102537809265456526320000012449633128851295640_)" opacity=".55"/>
   <g fill="#3a3438">
    <path d="m285.09 42.367c-0.498 0-0.902 0.404-0.902 0.902s0.404 0.902 0.902 0.902 0.902-0.404 0.902-0.902-0.404-0.902-0.902-0.902z"/>
    <path d="m285.09 66.543c-0.498 0-0.902 0.404-0.902 0.902s0.404 0.902 0.902 0.902 0.902-0.404 0.902-0.902-0.404-0.902-0.902-0.902z"/>
    <path d="m280.12 43.356c-0.46 0.191-0.679 0.718-0.488 1.179 0.191 0.46 0.718 0.679 1.179 0.488 0.46-0.191 0.679-0.718 0.488-1.179s-0.719-0.679-1.179-0.488z"/>
    <path d="m289.38 65.692c-0.46 0.191-0.679 0.718-0.488 1.179 0.191 0.46 0.718 0.679 1.179 0.488 0.46-0.191 0.679-0.718 0.488-1.179-0.191-0.46-0.719-0.679-1.179-0.488z"/>
    <path d="m275.91 46.172c-0.352 0.352-0.352 0.923 0 1.276 0.352 0.352 0.924 0.352 1.276 0s0.352-0.923 0-1.276c-0.353-0.352-0.924-0.352-1.276 0z"/>
    <path d="m293 63.267c-0.352 0.352-0.352 0.924 0 1.276s0.923 0.352 1.276 0c0.352-0.352 0.352-0.923 0-1.276-0.353-0.352-0.924-0.352-1.276 0z"/>
    <path d="m274.27 49.898c-0.46-0.191-0.988 0.028-1.179 0.488s0.028 0.988 0.488 1.179 0.988-0.028 1.179-0.488c0.19-0.461-0.028-0.988-0.488-1.179z"/>
    <path d="m296.61 59.15c-0.46-0.191-0.988 0.028-1.179 0.488s0.028 0.988 0.488 1.179 0.988-0.028 1.179-0.488c0.191-0.461-0.027-0.989-0.488-1.179z"/>
    <circle cx="273.01" cy="55.357" r=".902"/>
    <circle cx="297.18" cy="55.357" r=".902"/>
    <path d="m273.58 59.15c-0.46 0.191-0.679 0.718-0.488 1.179 0.191 0.46 0.718 0.679 1.179 0.488 0.46-0.191 0.679-0.718 0.488-1.179-0.191-0.46-0.718-0.679-1.179-0.488z"/>
    <path d="m296.61 51.565c0.46-0.191 0.679-0.718 0.488-1.179-0.191-0.46-0.718-0.679-1.179-0.488-0.46 0.191-0.679 0.718-0.488 1.179 0.191 0.46 0.719 0.678 1.179 0.488z"/>
    <path d="m275.91 63.267c-0.352 0.352-0.352 0.924 0 1.276s0.924 0.352 1.276 0 0.352-0.924 0-1.276c-0.353-0.352-0.924-0.352-1.276 0z"/>
    <path d="m293 46.172c-0.352 0.352-0.352 0.923 0 1.276 0.352 0.352 0.923 0.352 1.276 0 0.352-0.352 0.352-0.924 0-1.276-0.353-0.352-0.924-0.353-1.276 0z"/>
    <path d="m280.81 65.692c-0.46-0.191-0.988 0.028-1.179 0.488s0.028 0.988 0.488 1.179 0.988-0.028 1.179-0.488c0.19-0.461-0.028-0.989-0.488-1.179z"/>
    <path d="m290.06 43.356c-0.46-0.191-0.988 0.028-1.179 0.488s0.028 0.988 0.488 1.179 0.988-0.028 1.179-0.488c0.191-0.461-0.028-0.988-0.488-1.179z"/>
   </g>
  </g>
 </g>
</motion.svg >

  )
}
     