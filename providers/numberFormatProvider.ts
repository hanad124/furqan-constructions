// format cards numbers like if its 1000 then it will be 1k and if its 1000000 then it will be 1m
const formatNumber = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "m"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

// deformate the number to its original form
export const deformatNumber = (num: string) => {
  if (num.includes("k")) {
    return parseFloat(num.replace("k", "")) * 1000;
  } else if (num.includes("m")) {
    return parseFloat(num.replace("m", "")) * 1000000;
  } else {
    return parseFloat(num);
  }
};

export default formatNumber;
