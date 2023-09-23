import Button from "@/components/Button/Button";

const EmailSend = () => {
  return (
    <div className="py-32 relative">
      {/* <img src={BG} alt="" className="absolute inset-0 h-full w-full -z-10" /> */}
      <div className="lg:mx-[120px] md:mx-[60px] mx-5">
        <div className="w-full h-full bg-white/10 py-20 flex flex-col items-center rounded-2xl border border-white">
          <p className="md:text-[20px] text-[16px] mt-5 text-white/70 text-center">
            Sign up your Email Address and never miss anything.
            <br className="sm:block hidden" /> We will update you once per week!
          </p>
          <div className="flex md:flex-row flex-col mt-10 items-center justify-center gap-7 ">
            <div className="w-full h-[48px] bg-white/10 border border-white flex flex-col items-center rounded-md">
              <input
                type="text"
                className="h-full w-full px-5 bg-transparent rounded-md font-light placeholder:text-white"
                placeholder="Email Address"
              />
            </div>
            <div className="cursor-pointer py-2 px-7 shadow-button-wallet bg-[#24C3BC] rounded-md gird place-items-center w-[225px]">
              <p className="text-[20px] uppercase font-bold text-center">
                Send
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <p className="text-[38px] font-bold mt-[160px] text-center">
        We work with top companies around the world
      </p> */}

      {/* <div>
        <div className="flex gap-4 overflow-auto">
          {[1, 2, 3, 4, 5, 5, 1, 2, 3, 4, 5, 5].map((item) => (
            <div className="flex py-5 px-10 bg-blur rounded-md">
              <img src={Rerra} alt="" className="h-[50px] w-[50px]" />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default EmailSend;
