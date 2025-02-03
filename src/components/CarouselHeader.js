import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselHeader = () => {
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="oferta1.jpg"
                alt="Primeira Oferta"
                style={{ height: "300px", objectFit: "cover"}}
                />
                <Carousel.Caption>
                    <h3>Ofertas da TV</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                className="d-block w-100"
                src="oferta2.jpg"
                alt="Segunda Oferta"
                style={{ height: "300px", objectFit: "cover"}}
                />
                <Carousel.Caption>
                    <h3>Promoções Imperdíveis</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselHeader;