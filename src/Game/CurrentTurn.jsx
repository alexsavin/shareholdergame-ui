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
  first,
  last,
  previousPrices,
  bank,
  onUpdateTurn,
  roundNumber,
  turnIndex,
  turnsPerRound,
  lastRow = false,
  outstandingCards,
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
            value={first[index]}
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
          <option
            key={outstandingCard.id}
            /* eslint-disable-line react/no-danger */ dangerouslySetInnerHTML={{
              __html: `${outstandingCard.card.cardHTML}${intl.formatMessage(
                outstandingCard.card.color.letter
              )}`
            }}
          />
        ))}
      </select>
    </td>
  );

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
            value={last[index]}
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
      {bank}
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
