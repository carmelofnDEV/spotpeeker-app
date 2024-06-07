
export const ProfileLoader = ({onHide}) => {
    const loaderStyle = {
      width: '80px',
      aspectRatio: '0.75',
      background: 'no-repeat linear-gradient(#000 0 0) 0% 50%, no-repeat linear-gradient(#000 0 0) 50% 50%, no-repeat linear-gradient(#000 0 0) 100% 50%',
      animation: 'l7 1s infinite linear alternate',
    };
  
    const keyframes = `
      @keyframes l7 {
        0%  {background-size: 20% 50% ,20% 50% ,20% 50% }
        20% {background-size: 20% 20% ,20% 50% ,20% 50% }
        40% {background-size: 20% 100%,20% 20% ,20% 50% }
        60% {background-size: 20% 50% ,20% 100%,20% 20% }
        80% {background-size: 20% 50% ,20% 50% ,20% 100%}
        100%{background-size: 20% 50% ,20% 50% ,20% 50% }
      }
    `;
  
    return (
      <>
        <style>
          {keyframes}
        </style>
        <div className={"cursor-wait w-full h-[100vh] flex justify-center items-center"+(!onHide ? "  hidden" : "")}>
          <div className="loader" style={loaderStyle}></div> 
        </div>
      </>
    );
  };