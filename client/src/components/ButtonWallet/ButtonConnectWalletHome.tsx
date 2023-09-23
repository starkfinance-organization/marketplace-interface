// ** Icons **

//** Libs */
import { FC } from "react";

//** Hooks */

import { ModalWalletProps } from "../ModalWallet/useModalWallet";

// import { useGetStarknetIDDomain } from "@/queries/starknet/useGetStarknetIDDomain";

type ButtonConnectWalletProps = {
  modalState: ModalWalletProps;
};

const ButtonConnectWalletHome: FC<ButtonConnectWalletProps> = ({
  modalState,
}) => {
  // const { data: domainName } = useGetStarknetIDDomain(addressStr || "");

  return (
    <>
      <button
        onClick={modalState.toggle}
        className="py-2 px-8  shadow-button-wallet bg-[#24C3BC] mt-[45px] rounded-md gird place-items-center w-fit"
      >
        <p className="text-[20px] uppercase font-bold">Mint now</p>
      </button>
    </>
  );
};

export default ButtonConnectWalletHome;
