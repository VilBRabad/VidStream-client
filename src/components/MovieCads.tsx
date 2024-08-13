import React, { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import { IMovie } from "../utils";
import CloudinaryImage from "./CloudinaryImage";

interface MovieCardsProps {
    cards?: IMovie[]
}

const MovieCards: React.FC<MovieCardsProps> = ({ cards }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [visibleCards, setVisibleCards] = useState<number>(1);
    const [isLeftScrollLeft, setIsLeftScrollLeft] = useState<boolean>(false);
    const [isRightScrollLeft, setIsRightScrollLeft] = useState<boolean>(true);

    const getCardValues = () => {
        if (cardRef.current) {
            const sliderWidth = cardRef.current.clientWidth;
            const card = cardRef.current.querySelector(".movie-card") as HTMLElement;

            if (card) {
                const cardWt = card.clientWidth;
                setCardWidth(cardWt);
                setVisibleCards(Math.floor(sliderWidth / cardWt));
            }
        }
    };

    useEffect(() => {
        getCardValues();
        window.addEventListener("resize", getCardValues);

        return () => {
            window.removeEventListener("resize", getCardValues);
        };
    }, [cards]); // Depend on cards to recalculate values when cards change

    const handleScroll = () => {
        if (cardRef.current) {
            setIsLeftScrollLeft(cardRef.current.scrollLeft > 0);
            setIsRightScrollLeft(cardRef.current.scrollLeft < cardRef.current.scrollWidth - cardRef.current.clientWidth);
        }
    };

    const slideRightHandle = () => {
        if (cardRef.current) {
            cardRef.current.scrollBy({
                left: cardWidth * visibleCards,
                behavior: 'smooth'
            });
        }
    };

    const slideLeftHandle = () => {
        if (cardRef.current) {
            cardRef.current.scrollBy({
                left: -cardWidth * visibleCards,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div
                ref={cardRef}
                onScroll={handleScroll}
                className={`pop-cards relative z-50 mt-4 flex gap-2 lg:gap-4 h-[17.1rem] xl:h-[24rem] w-screen no-scrollbar overflow-scroll scroll-pl-6 pl-6 lg:scroll-pl-16 lg:pl-12 snap-x`}
            >
                {
                    cards?.map((item, ind) => (
                        <div key={ind} className="span-start h-[24rem] min-w-[13.1rem] xl:min-w-[17.6rem] movie-card">
                            <CloudinaryImage movie={item}/>
                        </div>
                    ))
                }
            </div>
            {
                window.innerWidth > 734 ?
                <>
                    {isLeftScrollLeft && <div onClick={slideLeftHandle} className="left-arrow-div">
                        <MdArrowForwardIos size={30} />
                    </div>}
                    {isRightScrollLeft && <div onClick={slideRightHandle} className="right-arrow-div">
                        <MdArrowForwardIos size={30} />
                    </div>}
                </>
                :
                <>
                    {<div onClick={slideLeftHandle} className={`absolute top-1 right-10 z-[100] ${!isLeftScrollLeft ? "opacity-50" : ""}`}>
                        <IoIosArrowDropleft size={30}/>
                    </div>}
                    {<div onClick={slideRightHandle} className={`absolute top-1 right-2 z-[100] ${!isRightScrollLeft ? "opacity-50" : ""}`}>
                        <IoIosArrowDropleft size={30} className="rotate-180"/>
                    </div>}
                </>
            }
        </>
    );
};

export default MovieCards;
