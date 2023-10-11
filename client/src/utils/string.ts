import axios from "axios";
import { ethers, BigNumber } from "ethers";

export const getShortAddress = (address: string) => {
  if (address == undefined) return "-";
  const firstDigits = address?.slice(0, 4);
  const lastDigits = address?.slice(-4);

  const resultAddress = firstDigits + "..." + lastDigits;
  return resultAddress;
};

export const getShortPrice = (price: string) => {
  if (price == undefined) return "-";
  const float = parseFloat(price);

  return float >= 0.00001 ? float : "<0.00001";
};

export const getShortPrice3 = (price: string) => {
  if (price == undefined) return "-";
  const float = parseFloat(price);

  return float >= 0.001 ? float.toFixed(3) : "<0.001";
};

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const convertWeiToEther = (wei: string) => {
  if (wei === undefined || wei === null) return 0;
  return Number(ethers.utils.formatEther(wei));
};

// export const convertEtherToWei = (ether: string) => {
// 	if (ether === undefined || ether === null) return 0;
// 	return Number(ethers.utils.parseEther(ether));
// };
export const convertEtherToWei = (ether: string | number) => {
  if (ether === undefined || ether === null) return "0";

  if (typeof ether === "string" && /e/i.test(ether)) {
    const [coeff, exp] = ether.split("e").map(Number);
    const wei = BigNumber.from(coeff.toFixed(18)).mul(
      BigNumber.from(10).pow(exp + 18)
    );
    return wei.toString();
  }

  return ethers.utils.parseEther(ether.toString()).toString();
};

export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const convertTimestampToTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const options: any = { hour: "2-digit", minute: "2-digit", hour12: true };
  return date.toLocaleTimeString("en-US", options);
};

export function convertDateFormat(dateString: string) {
  const inputDate = new Date(dateString);
  const options: any = { day: "2-digit", month: "2-digit", year: "numeric" };
  return inputDate.toLocaleDateString("en-GB", options);
}

export function convertToMMHH(dateString: string) {
  const inputDate = new Date(dateString);
  const hours = inputDate.getUTCHours().toString().padStart(2, "0");
  const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export const convertETHtoUSD = async (amountInETH: number) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const ethPriceInUSD = response.data.ethereum.usd;
    const amountInUSD = amountInETH * ethPriceInUSD;
    return amountInUSD;
  } catch (error) {
    console.error(error);
  }
};

export const isStrNullOrEmpty = (str: string | null | undefined): boolean => {
  return str === null || str === undefined || str.trim() === "";
};

export const isSameAddress = (address0: string, address1: string): boolean => {
  if (
    address0 === null ||
    address1 === null ||
    address0 === undefined ||
    address1 === undefined
  ) {
    return false;
  }

  // Remove '0x' prefix and leading zeros
  const normalizedAddress0 = address0.replace(/^0x0*/, "0x");
  const normalizedAddress1 = address1.replace(/^0x0*/, "0x");

  return normalizedAddress0 === normalizedAddress1;
};

// export const removeZeros = (inputString: string) => {
// 	return parseFloat(inputString);
// };

export const removeZeros = (inputString: string) => {
  return parseFloat(inputString).toString();
};

export function calculateTimeDifference(targetTime: string): string {
  if (targetTime === null) return "-";

  const currentTime = new Date();
  const targetDateTime = new Date(targetTime);

  const timeDifference = targetDateTime.getTime() - currentTime.getTime();

  if (timeDifference < 0) {
    // Target time is in the past
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  } else if (timeDifference > 0) {
    // Target time is in the future
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  } else {
    // Target time is the same as the current time
    return "Now";
  }
}

export function calculateTimeDifferenceList(targetTime: string): string {
  if (targetTime === null) return "-";

  const currentTime = new Date();
  const targetDateTime = new Date(targetTime);

  const timeDifference = targetDateTime.getTime() - currentTime.getTime();
  const absoluteTimeDifference = Math.abs(timeDifference);

  const seconds = Math.floor(absoluteTimeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
}

export function extractLast5Keywords(hexString: any) {
  // Convert the hexadecimal string to binary representation
  const binaryString = hexString
    .slice(2)
    .match(/.{1,2}/g)
    .map((hex: any) => parseInt(hex, 16).toString(2).padStart(8, "0"))
    .join("");

  // Split the binary representation into individual words (32 bits each)
  const words = binaryString.match(/.{1,32}/g);

  // Convert each word back to its hexadecimal representation
  const hexadecimalWords = words.map((word: any) =>
    parseInt(word, 2).toString(16).padStart(8, "0")
  );

  // Extract the last 5 hexadecimal words
  const last5Keywords = hexadecimalWords.slice(-5);

  return last5Keywords;
}

export function formatDate(dateString: string) {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
}
