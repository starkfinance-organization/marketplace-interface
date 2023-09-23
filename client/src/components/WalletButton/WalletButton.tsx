import { Connector, useAccount, useConnectors } from "@starknet-react/core";
import { useEffect } from "react";

// Handle short address type
const shortAddress = (address: string | any[]) => {
  if (address) {
    const firstDigits = address.slice(0, 6);
    const lastDigits = address.slice(-4);

    const resultAddress = firstDigits + "..." + lastDigits;
    return resultAddress;
  }
};

const WalletButton = () => {
  const { available, connectors, connect, refresh } = useConnectors();
  const { address, status } = useAccount();

  // Refresh to check for available connectors every 5 seconds.
  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  // Handle connect wallet, alert if user haven't installed that wallet
  const handleConnect = (connector: Connector<any>) => {
    const isWalletConnected = available.find(
      (availableConnector) => availableConnector.id() === connector.id()
    );
    isWalletConnected
      ? connect(connector)
      : alert(`Please install ${connector.id()} wallet!`);
  };

  return (
    <div className="flex justify-between">
      {status != "connected" ? (
        <>
          <div
            className="border-[2px] rounded-md border-[#7ABDF7] py-1 px-2 grid place-items-center cursor-pointer"
            onClick={() => handleConnect(connectors[1])}
          >
            <p className="text-[20px] font-bold">Connect ArgentX</p>
          </div>
          <div
            className="border-[2px] rounded-md border-[#7ABDF7] py-1 px-2 grid place-items-center cursor-pointer"
            onClick={() => handleConnect(connectors[0])}
          >
            <p className="text-[20px] font-bold">Connect Braavos</p>
          </div>
        </>
      ) : (
        <div
          className="border-[2px] rounded-md border-[#7ABDF7] py-1 px-2 grid place-items-center cursor-pointer"
          onClick={() => handleConnect(connectors[0])}
        >
          <p className="text-[20px] font-bold">{shortAddress(address!)}</p>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
