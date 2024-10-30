import Image from "../../assets/img5.jpg";
import Gradient from "../../assets/bg.png";
import DiscoverButton from "../shared/DiscoverButton";
import OurOfferings from "./OurOfferings";

const Services = () => {
  return (
    <div className="pt-24 pl-4 w-full">
        <img src={Gradient} className="w-full mx-auto absolute -right-[50rem] -z-10 opacity-50 hidden md:block" />
      <div className="">
        <div className="w-20 -ml-8 rotate-90 text-p1">0.0.3</div>
      </div>
      <div className="md:flex mt-12">
        <div className="md:w-1/3">
          <div className="rounded-br-[12rem] h-[28rem] w-[22rem] overflow-hidden">
            <img src={Image} className="" />
          </div>
        </div>
        <div className="md:w-1/3 md:pr-20 flex align-middle">
          <div className="my-auto">
            <h1 className="text-4xl my-8">AI CAN</h1>
            <p className="font-inter my-4 leading-[3rem]">
              In the MEME NFT space, we are creating a new way for creators to sell their memes and make money.
            </p>
            <div className="my-8">
              <DiscoverButton />
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <OurOfferings />
        </div>
      </div>
    </div>
  );
};

export default Services;
