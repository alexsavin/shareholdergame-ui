import React from "react";

import { injectIntl, intlShape } from "react-intl";

import {
  CurrentTurnPropTypes,
  CurrentTurnDefaultProps
} from "./CurrentTurnPropTypes";
import { allColors } from "../Cards/CardColor";
import ShareCell from "./ShareCell";

const THICK_BORDER = "2px solid grey";

const CurrentTurn = ({
  previousTurns,
  roundNumber,
  turnIndex,
  turnsPerRound,
  lastRow = false,
  outstandingCards,
  onUpdateTurn,
  intl
}) => {
  let tableCells = [];

  if (turnIndex === 0) {
    tableCells.push(
      <th
        key="roundNumber"
        rowSpan={turnsPerRound}
        style={{
          width: "2em",
          fontSize: "large",
          textAlign: "center",
          verticalAlign: "middle",
          border: THICK_BORDER
        }}
      >
        {roundNumber}
      </th>
    );
  }

  const selectedRowStyle = {
    backgroundColor: "#efefef"
  };

  const myPreviousTurn = previousTurns[0];
  const myPreviousSellStep = myPreviousTurn.steps.find(
    step => step.stepType === "LAST_BUY_SELL_STEP"
  );
  const myPreviousStocks = myPreviousSellStep.shares.map(share => share.amount);

  if (lastRow) {
    tableCells.push(<td colSpan={4} style={selectedRowStyle} />);
  } else {
    tableCells = tableCells.concat(
      allColors.map((color, index) => (
        <ShareCell
          key={`first_${intl.formatMessage(color.letter)}`}
          color={color}
          current
        >
          <input
            onChange={event => onUpdateTurn(true, index, event.target.value)}
            type="number"
            min={0}
            step={1}
            className="input"
            style={{ width: "100%", textAlign: "center" }}
            value={myPreviousStocks[index]}
          />
        </ShareCell>
      ))
    );
  }

  tableCells.push(
    <td key="card" style={{ ...selectedRowStyle, border: THICK_BORDER }}>
      <select>
        <option />
        {outstandingCards.map(outstandingCard => (
          <option key={outstandingCard.id}>
            {outstandingCard.card.cardString}
            {intl.formatMessage(outstandingCard.card.color.letter)}
          </option>
        ))}
      </select>
    </td>
  );

  const immediatelyPreviousTurn = previousTurns[previousTurns.length - 1];
  const previousPrices = immediatelyPreviousTurn.steps
    .find(step => step.stepType === "PRICE_CHANGE_STEP")
    .sharePrices.map(price => price.price);

  tableCells = tableCells.concat(
    allColors.map((color, index) => (
      <ShareCell
        key={`price_${intl.formatMessage(color.letter)}`}
        color={color}
        current
      >
        {previousPrices[index]}
      </ShareCell>
    ))
  );

  if (lastRow) {
    tableCells.push(
      <td
        colSpan={4}
        style={{
          borderLeft: THICK_BORDER,
          ...selectedRowStyle
        }}
      />
    );
  } else {
    tableCells = tableCells.concat(
      allColors.map((color, index) => (
        <ShareCell
          key={`last_${intl.formatMessage(color.letter)}`}
          color={color}
          current
          style={index ? {} : { borderLeft: THICK_BORDER }}
        >
          <input
            onChange={event => onUpdateTurn(false, index, event.target.value)}
            type="number"
            min={0}
            step={1}
            className="input"
            style={{ width: "100%", textAlign: "center" }}
            value={myPreviousStocks[index]}
          />
        </ShareCell>
      ))
    );
  }

  tableCells.push(
    <td
      key="bank"
      style={{
        ...selectedRowStyle,
        textAlign: "left",
        border: THICK_BORDER
      }}
    >
      {myPreviousTurn.bank}
    </td>
  );

  return (
    <tr
      style={{
        borderTop: THICK_BORDER,
        borderBottom: THICK_BORDER,
        verticalAlign: "middle"
      }}
    >
      {tableCells}
    </tr>
  );
};

CurrentTurn.propTypes = {
  ...CurrentTurnPropTypes,
  intl: intlShape.isRequired
};

CurrentTurn.defaultProps = CurrentTurnDefaultProps;

export default injectIntl(CurrentTurn);
