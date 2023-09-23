// ** Icons **

//** Libs */
import { useAccount, useConnectors } from "@starknet-react/core";
import { FC } from "react";

//** Hooks */
import { useMatch, useNavigate } from "react-router-dom";
import { ModalWalletProps } from "../ModalWallet/useModalWallet";
import { Dropdown } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
// import { useGetStarknetIDDomain } from "@/queries/starknet/useGetStarknetIDDomain";

type ButtonConnectWalletProps = {
  modalState: ModalWalletProps;
};

const ButtonConnectWallet: FC<ButtonConnectWalletProps> = ({ modalState }) => {
  const { address, status } = useAccount();
  const { disconnect } = useConnectors();
  const isProfilePage = useMatch("/account/:address");

  // const { data: domainName } = useGetStarknetIDDomain(addressStr || "");

  const navigate = useNavigate();

  const handleLogout = () => {
    if (status == "connected") disconnect();
    if (isProfilePage) navigate("/");
  };

  return (
    <>
      {status == "connected" ? (
        <div className="flex items-center gap-5 border rounded-md">
          <Dropdown
            label={
              <div className="flex items-center">
                {/* <div className="h-6 w-6 bg-gray-500 rounded-full"></div> */}
                <CgProfile className="text-lg" />
                <p className="text-white ml-3 font-bold">
                  {address?.slice(-5) || ""}
                </p>
              </div>
            }
          >
            {/* <Dropdown.Item
              onClick={() => {
                navigate(`/account/${address}`);
              }}
            >
              Profile
            </Dropdown.Item> */}
            <Dropdown.Item
              onClick={() => {
                handleLogout();
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <button
          onClick={modalState.toggle}
          className="cursor-pointer border px-3 py-2 rounded-md hover:bg-blue-800"
        >
          <p>Connect Wallet</p>
        </button>
      )}
    </>
  );
};

export default ButtonConnectWallet;
