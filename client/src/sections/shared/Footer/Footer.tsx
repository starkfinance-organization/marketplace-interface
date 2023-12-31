// ** Icons **

// import ArrowRightSVG from "@/assets/svg/ic_arrow_right.svg";
import { BsDiscord, BsMedium } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import TwitterIcon from "@/assets/svg/twitter_icon.svg";
import { route } from "@/routes/config";
import { Tooltip } from "antd";
const Footer = () => {
  const contactData = {
    telegram: "https://t.me/starksportofficial",
    telegramChannel: "https://t.me/starksportchanel",
    twitter: "https://twitter.com/starkfinance",
    discord: "https://discord.gg/vm7DJJn54Y",
    medium: "https://starkfinance.medium.com",
  };

  const openInNewTab = (url: any) => {
    let win: any = window.open(url, "_blank");
    win.focus();
  };

  return (
    <div className="relative flex flex-col pt-[68px] justify-end bg-black/[0.5] border-t border-[#24C3BC]">
      <div className="flex mx-auto  flex-col lg:flex-row gap-10 items-start h-fit w-full  justify-between lg:px-[120px] md:px-[60px] px-[20px] px-5 ">
        <div className="flex-1 w-fit  lg:min-w-[600px]">
          <p className="uppercase text-[32px] font-paytone text-[#24C3BC]">
            STARKFINANCE NFT marketplace
          </p>
          <p className="text-[20px] mt-5 text-white/75">
            The best marketplace for crypto collectibles and non-fungible tokens
            (NFTs). Trade, lend and borrow unique digital items and make it
            valuable.
          </p>
        </div>

        <div className=" lg:text-lg text-sm flex lg:justify-end justify-between lg:gap-[70px] gap-4  w-full">
          <div className=" w-fit">
            <p className="font-bold lg:text-xl text-base">MARKETPLACE</p>
            <a href={route.topVolume}>
              <p className="mt-4 text-white/50 ">Trending </p>
            </a>
            <a href={route.collection}>
              <p className="mt-4 text-white/50 ">Collections </p>
            </a>

            <a href={route.activity}>
              <p className="mt-4 text-white/50 ">Activity </p>
            </a>

            <a href={route.nftEvent}>
              <p className="mt-4 text-white/50 ">Events</p>
            </a>
          </div>
          <div className=" w-fit">
            <p className="font-bold lg:text-xl text-base cursor-pointer">
              SUPPORT
            </p>
            <p
              className="mt-4 text-white/50 cursor-pointer"
              onClick={() =>
                openInNewTab("https://starkfinance.gitbook.io/starkfinance/")
              }
            >
              FAQ
            </p>
            <p
              className="mt-4 text-white/50 cursor-pointer"
              onClick={() =>
                openInNewTab(
                  "https://starkfinance.gitbook.io/starkfinance/sfn-token/sfn-tokenomics"
                )
              }
            >
              Tokenomics
            </p>
            <p
              className="mt-4 text-white/50 cursor-pointer"
              onClick={() =>
                openInNewTab("https://skynet.certik.com/projects/Starkfinance")
              }
            >
              Audits
            </p>
            <p
              className="mt-4 text-white/50 cursor-pointer"
              onClick={() =>
                openInNewTab("https://marketplace.starksport.finance/events")
              }
            >
              Starkfinance NFT
            </p>
          </div>
          <div className=" w-fit">
            <p className="font-bold lg:text-xl text-base">ACCESS</p>
            <p
              className="mt-4 text-white/50 cursor-pointer"
              onClick={() => openInNewTab("https://exchange.starkfinance.co/")}
            >
              Exchange
            </p>
            <Tooltip title="Coming Soon" placement="bottom" arrow={true}>
              <p className="mt-4 text-white/50 cursor-pointer">Launchpad</p>
            </Tooltip>
            <Tooltip title="Coming Soon" placement="bottom" arrow={true}>
              <p className="mt-4 text-white/50 cursor-pointer">Earnings</p>
            </Tooltip>
            <p
              className="mt-4 text-white/50 cursor-pointer"
              onClick={() =>
                openInNewTab("https://starkfinance.gitbook.io/starkfinance/")
              }
            >
              Docs
            </p>
          </div>
        </div>
      </div>
      <div className="border-[0.5px] border-white/50 lg:mx-[120px] md:mx-[60px] mx-[20px] my-[51px]"></div>

      <div className=" flex justify-center items-center gap-[12px]">
        <button className="rounded p-[1px] bg-gradient-to-br from-white/[0.3]  to-white/5">
          <div className="w-full h-full  bg-[#151125] rounded">
            <div className="rounded p-2 bg-gradient-to-br from-white/[0.2]  to-white/[0.05]">
              <SiTelegram
                className="text-[24px]"
                onClick={() => {
                  openInNewTab(contactData.telegram);
                }}
              />
            </div>
          </div>
        </button>
        <button className="rounded p-[1px] bg-gradient-to-br from-white/[0.3]  to-white/5">
          <div className="w-full h-full  bg-[#151125] rounded">
            <div className="rounded p-2 bg-gradient-to-br from-white/[0.2]  to-white/[0.05]">
              <SiTelegram
                className="text-[24px]"
                onClick={() => {
                  openInNewTab(contactData.telegramChannel);
                }}
              />
            </div>
          </div>
        </button>
        <button className="rounded p-[1px] bg-gradient-to-br from-white/[0.3]  to-white/5">
          <div className="w-full h-full  bg-[#151125] rounded">
            <div className="rounded p-2 bg-gradient-to-br from-white/[0.2]  to-white/[0.05]">
              <BsDiscord
                className="text-[24px]"
                onClick={() => {
                  openInNewTab(contactData.discord);
                }}
              />
            </div>
          </div>
        </button>
        <button className="rounded p-[1px] bg-gradient-to-br from-white/[0.3]  to-white/5">
          <div className="w-full h-full  bg-[#151125] rounded">
            <div
              onClick={() => {
                openInNewTab(contactData.twitter);
              }}
              className="rounded p-2 bg-gradient-to-br from-white/[0.2]  to-white/[0.05]"
            >
              <img src={TwitterIcon} className="h-[24px] w-[24px]" />
            </div>
          </div>
        </button>
        <button className="rounded p-[1px] bg-gradient-to-br from-white/[0.3]  to-white/5">
          <div className="w-full h-full  bg-[#151125] rounded">
            <div className="rounded p-2 bg-gradient-to-br from-white/[0.2]  to-white/[0.05]">
              <BsMedium
                className="text-[24px]"
                onClick={() => {
                  openInNewTab(contactData.medium);
                }}
              />
            </div>
          </div>
        </button>
      </div>
      <div className="grid place-items-center pb-7 pt-2 lg:mx-[120px] md:mx-[60px] mx-[20px] ">
        <p className="text-white text-[20px]">
          Contact: business@starksport.finance
        </p>
        <p className="text-white text-[20px]">
          2023 © Copyright STARKFINANCE. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
