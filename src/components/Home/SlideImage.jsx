/* eslint-disable react/prop-types */
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SlideImage = ({ images }) => {
    return (
        images &&
        images.length > 0 && (
            <Slide>
                {images?.map((image, index) => (
                    <div key={index} className="each-slide-effect items-center">
                        <img src={image?.eventBanner} className=" bg-black" />
                    </div>
                ))}
            </Slide>
        )
    );
};

export default SlideImage;
