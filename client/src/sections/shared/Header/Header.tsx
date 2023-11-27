import LogoPNG from "@/assets/png/logo.png";
import "./Header.css";
import { useState, useEffect } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import ModalWallet from "@/components/ModalWallet/ModalWallet";
import useModalWallet from "@/components/ModalWallet/useModalWallet";
import ButtonConnectWallet from "@/components/ButtonWallet/ButtonConnectWallet";
import { Drawer } from "antd";
import { useAccount } from "@starknet-react/core";
import { useNavigate } from "react-router-dom";
import { route } from "@/routes/config";
import useCurrentAccount from "@/hook/useAccount";

const Header = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const { address, status } = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { isShowing, toggle } = useModalWallet();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={`${
        !isAtTop && "bg-header-1"
      } z-20 fixed top-0 left-0 right-0 transition-all`}
    >
      <div className="lg:px-[120px] md:px-[60px] px-[20px] overflow-hidden h-full flex md:flex-row md:justify-around flex-col gap-5 py-4 justify-between items-center">
        <div className="flex items-center justify-between md:w-fit w-full">
          <a href="/" className="w-fit h-fit">
            <img
              src={LogoPNG}
              alt=""
              className="md:h-[70px] md:min-w-[70px] h-[40px]"
            />
          </a>
          <div className="md:hidden">
            <ButtonConnectWallet modalState={{ isShowing, toggle }} />
          </div>
          <div onClick={showDrawer}>
            <AiOutlineMenuUnfold className="text-[36px] md:hidden" />
          </div>
        </div>

        <div className="md:flex hidden lg:gap-[100px] md:gap-[50px] gap-3 mx-auto">
          <a
            href="/"
            className={`md:text-[20px] text-[16px] font-bold ${
              !window.location.pathname.split("/")[1]
                ? "text-white/90"
                : "text-white/50 "
            } `}
          >
            Home
          </a>
          <a
            href="/top_volume"
            className={`md:text-[20px] text-[16px] font-bold ${
              window.location.pathname.split("/")[1] &&
              window.location.pathname.includes(route.topVolume)
                ? "text-white/90"
                : "text-white/50 "
            } `}
          >
            Collections
          </a>
          <a
            href="/activity"
            className={`md:text-[20px] text-[16px] font-bold ${
              window.location.pathname.split("/")[1] &&
              window.location.pathname.includes(route.activity)
                ? "text-white/90"
                : "text-white/50 "
            } `}
          >
            Activity
          </a>
          <a
            href="/events"
            className={`md:text-[20px] text-[16px] font-bold ${
              window.location.pathname.split("/")[1] &&
              window.location.pathname.includes(route.nftEvent)
                ? "text-white/90"
                : "text-white/50 "
            } `}
          >
            Events
          </a>
          {/* <a href="/top_volume" className="md:text-[20px] text-[16px]">
            Top Volumes
          </a> */}
          <a
            onClick={() => {
              navigate(`/account/${address}`);
            }}
            className={`md:text-[20px] text-[16px] font-bold ${
              window.location.pathname.split("/")[1] &&
              window.location.pathname.includes(route.account)
                ? "text-white/90"
                : "text-white/50 "
            } `}
          >
            Profile
          </a>
        </div>

        <div className="md:block hidden">
          <ButtonConnectWallet modalState={{ isShowing, toggle }} />
        </div>
      </div>
      <ModalWallet isShowing={isShowing} hide={toggle} />
      <Drawer
        className="bg-black"
        title="STARKFINANCE"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col gap-10">
          <a href="/" className="text-[20px]">
            Home
          </a>
          <a href="/top_volume" className="text-[20px]">
            Collections
          </a>
          <a href="/activity" className="text-[20px] ">
            Activity
          </a>
          <a href="/events" className="text-[20px]">
            Events
          </a>
          <a
            onClick={() => {
              navigate(`/account/${address}`);
            }}
            className="text-[20px]"
          >
            Profile
          </a>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
