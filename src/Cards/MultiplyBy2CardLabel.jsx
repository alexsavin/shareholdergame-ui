import React from "react";
import { shape, string } from "prop-types";
import CardLabel from "./CardLabel";

const MultiplyBy2CardLabel = ({ card }) => (
  <CardLabel color={card.color.style}>x2{card.color.letter}</CardLabel>
);

MultiplyBy2CardLabel.propTypes = {
  card: shape({
    color: shape({
      letter: string.isRequired,
      style: string.isRequired
    }).isRequired
  }).isRequired
};

export default MultiplyBy2CardLabel;
