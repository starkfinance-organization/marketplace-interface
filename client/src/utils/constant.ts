export const STATUS_VALUE = {
  RECENTLY: 1,
  PRICE_LOW_TO_HIGH: 2,
  PRICE_HIGH_TO_LOW: 3,
};

export const statusList = [
  { value: STATUS_VALUE.RECENTLY, label: "Recently Listed" },
  { value: STATUS_VALUE.PRICE_HIGH_TO_LOW, label: "Price: High to Low" },
  { value: STATUS_VALUE.PRICE_LOW_TO_HIGH, label: "Price: Low to High" },
];

export const CurrencyValues = [
  {
    label: "ETH",
    value: "ETH",
  },
  // {
  //   label: "USBC",
  //   value: "USBC",
  // },
  // {
  //   label: "STRK",
  //   value: "STRK",
  // },
];

export const DurationValues = [
  {
    label: "1 day",
    value: 1,
  },
  {
    label: "3 days",
    value: 3
  },
  {
    label: "7 days",
    value: 7,
  },
  {
    label: "1 month",
    value: 30,
  },
  {
    label: "3 months",
    value: 90,
  },
];

export const statusFilterType = [
  { label: "Recently Listed", value: STATUS_VALUE.RECENTLY },
  { label: "Price Low To High", value: STATUS_VALUE.PRICE_LOW_TO_HIGH },
  { label: "Price High To Low", value: STATUS_VALUE.PRICE_HIGH_TO_LOW },
];
export const eventFilterType = ["Listing", "Sale", "Offer"];
