export const currencies = ["USD", "EUR", "TOMAN", "CAD", "GBP", "JPY", "RUB"];
export const defaultEditorState = {
  doEdit: false,
  item: {
    _id: "",
    tag: "",
    category: "",
    valuePerShare: "",
    totalShareAmount: "",
  },
};
export const supportedCoins = [
  { id: "bitcoin" },
  { id: "monero" },
  { id: "ethereum" },
  { id: "tether" },
  { id: "zcash" },
  { id: "bitcoin-cash" },
  { id: "tron" },
  { id: "pepe" },
  { id: "ripple" },
  { id: "stellar" },
  { id: "cardano" },
  { id: "polkadot" },
  { id: "chainlink" },
  { id: "filecoin" },
  { id: "algorand" },
];

export const timeRanges = [
  { value: "price_change_percentage_24h", label: "Last 24 Hours" },
  { value: "price_change_percentage_7d", label: "Last 7 Days" },
  { value: "price_change_percentage_14d", label: "Last 2 Weeks" },
  { value: "price_change_percentage_30d", label: "Last Month" },
];
