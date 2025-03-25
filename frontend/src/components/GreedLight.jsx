import React from "react";

const GreedLight = ({top, left, rotate}) => {
  return (
    
    <div className={`mt-7 mb-7 group ${top} ${left} fixed flex ${rotate} items-center`}>
      {/* Torch Handle */}
      <div className="w-24 h-7 bg-black text-white rounded-l-full flex items-center px-3 relative z-10">
        <span className="text-purple-500 font-bold">greed</span><span className="text-yellow-500 font-bold">Light</span>
      </div>

      {/* Trapezium Light Emitter - Intersected */}
      <div className="bg-black w-12 h-7 flex items-center justify-center clip-trapezium rounded-b-full border-b-4 border-b-yellow-500 -rotate-90 -ml-2.5 relative z-20">
      </div>
      <div className="bg-gradient-to-b from-yellow-400 to-fuchsia-400 opacity-30 ml-38 w-18 h-100 flex items-center justify-center clip-trapezium rounded-b-full border-b-4 border-b-yellow-500 -rotate-90 relative z-20">
      </div>
      


      <style jsx>{`
        .clip-trapezium {
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default GreedLight;
