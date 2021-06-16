import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function DemoCarousel() {
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      autoPlay={true}
      showStatus={false}
      showArrows={false}
      emulateTouch={true}
    >
      <div>
        <img src="/junior-soccer.svg" />
        <p className="legend">Descubre oportunidades en los clubes!</p>
      </div>
      <div>
        <img src="/goal.svg" />
        <p className="legend">Contruye tu carrera futbolitica!</p>
      </div>
      <div>
        <img src="/soccer.svg" />
        <p className="legend">Alcanza la meta!</p>
      </div>
    </Carousel>
  );
}
