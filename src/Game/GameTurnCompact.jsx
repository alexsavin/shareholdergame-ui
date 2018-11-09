import React from "react";

import Color from "color";

import { bool, number, shape } from "prop-types";

import { allColors } from "../Cards/CardColor";

import ShareCell from "./ShareCell";

const THICK_BORDER = "2px solid grey";

const GameTurnCompact = ({ lastRound, turn, turnIndex, turnsPerRound }) => {
  const rowsPerTurn = lastRound ? 1 : 3;

  const prefixCells = [];

  const cardCellStyle = {
    border: THICK_BORDER,
    verticalAlign: "middle"
  };

  if (turnIndex === 0) {
    prefixCells.push(
      <th
        key="roundNumber"
        rowSpan={turnsPerRound * rowsPerTurn}
        style={{
          borderTopLeftRadius: "1em 1em",
          borderBottomLeftRadius: "1em 1em",
          width: "1.5em",
          fontSize: "large",
          textAlign: "center",
          verticalAlign: "middle",
          border: THICK_BORDER
        }}
      >
        {turn.round}
      </th>
    );
  }

  prefixCells.push(
    <td style={cardCellStyle} rowSpan={rowsPerTurn} key="card">
      {turn.appliedCard.card.cardLabel}
    </td>
  );

  const firstStepCells = turn.steps.reduce((cells, step) => {
    if (step.stepType === "FIRST_BUY_SELL_STEP") {
      step.shares.sort((a, b) => a.id - b.id).forEach((share, index) =>
        cells.push(
          <ShareCell
            key={`first_${share.id}`}
            share={share}
            color={allColors[index]}
          >
            <span
              style={{
                color: share.amount
                  ? "black"
                  : Color(allColors[index].style)
                      .darken(0.5)
                      .alpha(0.2)
              }}
            >
              {share.amount}
            </span>
          </ShareCell>
        )
      );
    }

    return cells;
  }, []);

  const priceCells = turn.steps.reduce((cells, step) => {
    if (step.stepType === "PRICE_CHANGE_STEP") {
      step.sharePrices.sort((a, b) => a.id - b.id).forEach((share, index) => {
        const priceIncrease =
          (share.priceOperationId && share.priceOperationId < 6) ||
          share.priceOperationId === 12;

        const priceDecrease =
          share.priceOperationId &&
          share.priceOperationId >= 6 &&
          share.priceOperationId !== 12;

        const priceCellStyle = {
          color:
            priceIncrease || priceDecrease
              ? "black"
              : Color(allColors[index].style)
                  .darken(0.5)
                  .alpha(0.2),
          backgroundColor: Color(allColors[index].style).alpha(0.1)
        };

        if (index === allColors.length - 1) {
          priceCellStyle.borderRight = THICK_BORDER;
        }

        cells.push(
          <td key={`price_${share.id}`} style={priceCellStyle}>
            {share.price}
          </td>
        );
      });
    }

    return cells;
  }, []);

  const lastStepCells = turn.steps.reduce((cells, step) => {
    if (step.stepType === "LAST_BUY_SELL_STEP") {
      step.shares.sort((a, b) => a.id - b.id).forEach((share, index) =>
        cells.push(
          <ShareCell
            key={`last_${share.id}`}
            share={share}
            color={allColors[index]}
          >
            <span
              style={{
                color: share.amount
                  ? "black"
                  : Color(allColors[index].style)
                      .darken(0.5)
                      .alpha(0.2)
              }}
            >
              {share.amount}
            </span>
          </ShareCell>
        )
      );
    }

    return cells;
  }, []);

  const bankCell = (
    <td
      key="bank"
      style={{
        border: THICK_BORDER,
        textAlign: "left",
        verticalAlign: "middle"
      }}
      rowSpan={rowsPerTurn}
    >
      {turn.bank}
    </td>
  );

  return lastRound ? (
    <tr
      key={`round_${turn.round}_${turn.turn}`}
      style={{ border: THICK_BORDER, verticalAlign: "middle" }}
    >
      {prefixCells}
      {priceCells}
      {bankCell}
    </tr>
  ) : (
    [
      <tr
        key={`first_${turn.round}_${turn.turn}`}
        style={{ borderTop: THICK_BORDER, verticalAlign: "middle" }}
      >
        {prefixCells}
        {firstStepCells}
        {bankCell}
      </tr>,
      <tr key={`price_${turn.round}_${turn.turn}`}>{priceCells}</tr>,
      <tr
        key={`last_${turn.round}_${turn.turn}`}
        style={{ borderBottom: THICK_BORDER }}
      >
        {lastStepCells}
      </tr>
    ]
  );
};

GameTurnCompact.propTypes = {
  lastRound: bool,
  turnIndex: number.isRequired,
  turnsPerRound: number.isRequired,
  turn: shape({ turn: number.isRequired, round: number.isRequired }).isRequired
};

GameTurnCompact.defaultProps = {
  lastRound: false
};

export default GameTurnCompact;
