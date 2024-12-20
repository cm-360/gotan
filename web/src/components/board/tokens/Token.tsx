import "./Token.css";

const valueWeights: Record<string, number> = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "8": 5,
  "9": 4,
  "10": 3,
  "11": 2,
  "12": 1,
};

const redTokens = [6, 8];

export interface TokenProps {
  value: number;
}

export default function Token({ value }: TokenProps) {
  const isRed = redTokens.findIndex((v) => value === v) !== -1;
  const dots = new Array(valueWeights[value.toString()])
    .fill("\u2022")
    .join("");

  return (
    <div className={"token" + (isRed ? " red" : "")}>
      <div className="value">{value}</div>
      <div className="dots">{dots}</div>
    </div>
  );
}
