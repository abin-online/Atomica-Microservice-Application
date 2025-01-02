'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
  };

  const banners = [
    {
      id: 1,
      image:
        "https://s-media-cache-ak0.pinimg.com/736x/7a/1a/17/7a1a179642a6e8c80dec90a2fc2b4d64.jpg",
      alt: "Explore the Galaxy",
    },
    {
      id: 2,
      image:
        "https://th.bing.com/th/id/R.1a14966f87a74bf98599f2548a3904eb?rik=wj3D%2boxRoJxybw&riu=http%3a%2f%2fwww.trendycovers.com%2fcovers%2fTouching_the_Universe_facebook_cover_1347896929.jpg&ehk=ilLY8KCxSYgWuJxL9imsw7mHso3dLnx4j8adK34ninY%3d&risl=&pid=ImgRaw&r=0",
      alt: "Touch the Universe",
    },
    {
      id: 3,
      image:
        "https://th.bing.com/th/id/R.37d2bff34408a4c22afea23a141026e5?rik=mi3OASizVg%2fXXg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-xnagI9W6xbQ%2fT1XQu_NEzqI%2fAAAAAAAAAxM%2fD0khtPCOrhI%2fs1600%2funiverse-a1.jpg&ehk=p9bGf4TDdWUCtu%2f6ML1XVds5azOUCKXyiZ0LVEnhPJs%3d&risl=&pid=ImgRaw&r=0",
      alt: "Discover Infinite Possibilities",
    },
  ];

  return (


    
      <div className="w-full relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner.id} className="relative">
              {/* Banner Image */}
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
              <div className="absolute bottom-10 left-10 text-white z-10">
                <h2 className="text-3xl font-bold">{banner.alt}</h2>
              </div>
            </div>
          ))}
        </Slider>
        {/* Custom Dots Styling */}
        <style>
          {`
          .slick-dots li button:before {
            font-size: 12px;
            color: #fff;
          }
          .slick-dots li.slick-active button:before {
            color: #00f2fe;
          }
          .slick-prev:before, .slick-next:before {
            font-size: 20px;
            color: #00f2fe;
          }
        `}
        </style>
      </div>
    
  );
};

export default BannerSlider;
