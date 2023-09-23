import {  useState } from "react";

export type ModalWalletProps = {
  isShowing: boolean;
  toggle: () => void;
};

const useModalWallet = (): ModalWalletProps => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModalWallet;
