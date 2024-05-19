export function Pentagon () {
    return (
      <div className="relative w-full h-0 pb-full">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 w-full h-full"
        >
          <polygon 
            points="50,100 0,40 20,0 80,0 100,40" 
            className="fill-primary-5 text-green-500"
          />
        </svg>
      </div>
    );
  }