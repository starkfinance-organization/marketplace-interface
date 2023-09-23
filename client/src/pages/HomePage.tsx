import Banner from "@/sections/HomePage/Banner";
import PopularCollection from "@/sections/HomePage/PopularCollection";
import Trending from "@/sections/HomePage/Trending";
import HowTo from "@/sections/HomePage/HowTo";
import EmailSend from "@/sections/HomePage/EmailSend";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Trending />
      <PopularCollection />
      <HowTo />
      <EmailSend />
    </div>
  );
};

export default HomePage;
