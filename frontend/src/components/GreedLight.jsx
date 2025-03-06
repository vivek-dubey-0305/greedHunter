import React from "react";

const GreedLight = () => {
  return (
    
    <div className="mt-7 mb-7 group top-20 left-0 fixed rotate-30 flex items-center">
      {/* Torch Handle */}
      <div className="w-24 h-7 bg-black text-white rounded-l-full flex items-center px-3 relative z-10">
        <span className="text-green-500">greed</span>Light
      </div>

      {/* Trapezium Light Emitter - Intersected */}
      <div className="bg-black w-12 h-7 flex items-center justify-center clip-trapezium rounded-b-full border-b-4 border-b-yellow-500 -rotate-90 -ml-2.5 relative z-20"></div>

      <style jsx>{`
        .clip-trapezium {
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default GreedLight;
