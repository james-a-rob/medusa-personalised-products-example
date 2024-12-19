import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full relative">
      <Image
        // todo: fix so not hard coded to localhost 9000
        src={`http://localhost:9000/static/hero.png`}
        alt="Generated Design"
        layout="fill"
        objectFit="cover"
        style={{ objectPosition: 'center top' }}
      />
    </div>
  );
};

export default Hero;
