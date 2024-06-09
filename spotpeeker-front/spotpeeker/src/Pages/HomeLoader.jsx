import { env } from "../env";

export const HomeLoader = () => {



    return (
        <>
                <div 
                    className={`absolute top-0 left-0 z-50 bg-[url('${env.SERVER_URL}/static/home-loader.jpg')] bg-cover bg-center w-full h-[100vh]  slide-up-and-fade-out`}>
                </div>
            <style jsx="true">{`
                @keyframes slideUpAndFadeOut {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-100%);
                    }
                }
                .slide-up-and-fade-out {
                    animation: slideUpAndFadeOut 1.5s ease-in-out forwards;
                }
            `}</style>
        </>
    );
};
