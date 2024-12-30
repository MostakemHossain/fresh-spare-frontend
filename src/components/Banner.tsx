import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../assets/images/banner1.jpg";
import banner3 from "../assets/images/banner3.jpg";
import banner2 from "../assets/images/banner3.webp";

const Banner = () => {
  const slides = [
    {
      image: banner1,
      title: "Specialist in the grocery Store ",
      subtitle: "Only this week dont miss",
      button1: "Learn More",
      button2: "Get Started",
    },
    {
      image: banner2,
      title: "Feed your family the best",
      subtitle: "Join us on a journey of discovery",
      button1: "Explore",
      button2: "Join Now",
    },
    {
      image: banner3,
      title: "Grocery full of inspiration",
      subtitle: "Start your adventure today",
      button1: "Search",
      button2: "Sign Up",
    },
  ];

  return (
    <div style={{ width: "100%", height: "600px", overflow: "hidden" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        style={{ height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10%",
                  transform: "translateY(-50%)",
                  color: "white",

                  maxWidth: "400px",
                }}
              >
                <h1
                  style={{
                    fontSize: "2.5rem",
                    color: "rgb(14, 1, 1)",
                    marginBottom: "1rem",
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "rgb(14, 1, 1)",
                    marginBottom: "2rem",
                  }}
                >
                  {slide.subtitle}
                </p>
                <div>
                  <button
                    style={{
                      padding: "10px 20px",
                      marginRight: "10px",
                      backgroundColor: "#007BFF",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    {slide.button1}
                  </button>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#166434",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    {slide.button2}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
