// takes design and position
// renders tshirt with draggable design
import React from "react";
import Image from "next/image"


type PreviewProps = {};

const Preview: React.FC<PreviewProps> = ({ designImageLocation, productImageLocation }) => {
    return <div className="relative mx-auto p-1">
        {designImageLocation &&
            <Image
                // todo: fix so not hard coded to localhost 9000
                src={`${designImageLocation}`}
                width="150"
                height="150"
                alt="Generated Design"
                className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 mt-4 max-w-full h-auto shadow-md opacity-75"
            />
        }
        <Image
            // todo: fix so not hard coded to localhost 9000
            src={`${productImageLocation}`}
            width="800"
            height="800"
            alt="t-shirt"
            className="mt-4 max-w-full h-auto rounded-lg shadow-md"
        />
    </div>

};

export default Preview;