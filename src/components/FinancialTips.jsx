import React, { useEffect, useState } from "react";
const financialTips = [
  {
    tip: "Start Investing Early",
    advice:
      "The earlier you start investing, the more time your money has to grow due to compound interest.",
    quote:
      "The earlier you start saving and investing, the easier it will be to achieve your financial goals.",
    expert: "Suze Orman",
  },
  {
    tip: "Diversify Your Investments",
    advice:
      "Don’t put all your money in one type of investment; diversify to reduce risk.",
    quote:
      "The only investors who shouldn’t diversify are those who are right 100% of the time.",
    expert: "John Templeton",
  },
  {
    tip: "Create an Emergency Fund",
    advice:
      "Set aside 3-6 months’ worth of living expenses in a liquid, easily accessible account.",
    quote:
      "You have to have an emergency fund in place before you even think about investing.",
    expert: "Dave Ramsey",
  },
  {
    tip: "Live Below Your Means",
    advice: "Always spend less than you earn and avoid lifestyle inflation.",
    quote:
      "If you buy things you do not need, soon you will have to sell things you need.",
    expert: "Warren Buffett",
  },
  {
    tip: "Automate Your Savings",
    advice:
      "Set up automatic transfers to savings or investment accounts to ensure you save consistently.",
    quote:
      "Do not save what is left after spending, but spend what is left after saving.",
    expert: "Warren Buffett",
  },
  {
    tip: "Limit Debt and Use Credit Wisely",
    advice: "Avoid high-interest debt and use credit cards responsibly.",
    quote: "Debt is not a tool; it is a method to make banks wealthy, not you.",
    expert: "Dave Ramsey",
  },
  {
    tip: "Focus on Long-Term Investing",
    advice:
      "Avoid trying to time the market or trade frequently. Long-term investments tend to perform better.",
    quote:
      "The stock market is a device for transferring money from the impatient to the patient.",
    expert: "Warren Buffett",
  },
  {
    tip: "Keep Investment Costs Low",
    advice:
      "Pay attention to fees, as they can significantly reduce your returns over time.",
    quote: "Performance comes and goes, but costs roll on forever.",
    expert: "Jack Bogle",
  },
  {
    tip: "Stay Informed and Educate Yourself",
    advice:
      "Continuously improve your financial literacy through reading, courses, and expert advice.",
    quote: "An investment in knowledge pays the best interest.",
    expert: "Benjamin Franklin",
  },
  {
    tip: "Have a Clear Financial Plan",
    advice:
      "Set financial goals and regularly review your progress toward them.",
    quote: "A goal without a plan is just a wish.",
    expert: "Antoine de Saint-Exupéry",
  },
];
export const FinancialTips = () => {
  const [showquote, Setshowquote] = useState(financialTips[0]);

  useEffect(() => {
    setInterval(() => {
      Setshowquote(
        financialTips[Math.floor(Math.random() * financialTips.length)]
      );
    }, 3000);
  }, []);
  const { tip, advice, expert } = showquote;

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        height: "100%",
      }}
    >
      <h4>{tip}</h4>
      <div className="fw-bolder">
        "{advice}"-{expert}{" "}
      </div>
      {/* <p>-</p> */}
    </div>
  );
};
