import React from "react";
import Slider from "react-slick";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true, // Enables continuous looping of slides
    speed: 1000, // Set transition duration to 1000ms (1 second)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay to prevent automatic sliding
    arrows: true, // Show navigation arrows
  };

  const banners = [
    {
      id: 1,
      image:
        "https://s-media-cache-ak0.pinimg.com/736x/7a/1a/17/7a1a179642a6e8c80dec90a2fc2b4d64.jpg",
      alt: "Banner 1",
    },
    {
      id: 2,
      image:
        "https://th.bing.com/th/id/R.1a14966f87a74bf98599f2548a3904eb?rik=wj3D%2boxRoJxybw&riu=http%3a%2f%2fwww.trendycovers.com%2fcovers%2fTouching_the_Universe_facebook_cover_1347896929.jpg&ehk=ilLY8KCxSYgWuJxL9imsw7mHso3dLnx4j8adK34ninY%3d&risl=&pid=ImgRaw&r=0",
      alt: "Banner 2",
    },
    {
      id: 3,
      image:
        "https://th.bing.com/th/id/R.37d2bff34408a4c22afea23a141026e5?rik=mi3OASizVg%2fXXg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-xnagI9W6xbQ%2fT1XQu_NEzqI%2fAAAAAAAAAxM%2fD0khtPCOrhI%2fs1600%2funiverse-a1.jpg&ehk=p9bGf4TDdWUCtu%2f6ML1XVds5azOUCKXyiZ0LVEnhPJs%3d&risl=&pid=ImgRaw&r=0",
      alt: "Banner 3",
    },
  ];

  return (
    <div className="w-full mt-16 overflow-hidden"> {/* Tailwind classes */}
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-auto" // Ensure the image adapts to the container
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
