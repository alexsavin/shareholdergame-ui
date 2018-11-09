import React from "react";
import { shape, string, node } from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import Color from "color";

import { CARD_RADIUS } from "./Card";

const MultiplyBy2CardLabel = ({ card, intl }) => (
  <span
    style={{
      borderRadius: CARD_RADIUS,
      margin: "0.2em 0.2em",
      display: "inline-block",
      minWidth: "7.5em"
    }}
  >
    <div
      style={{
        backgroundColor: Color(card.color.style).alpha(0.2),
        borderTopLeftRadius: CARD_RADIUS,
        borderTopRightRadius: CARD_RADIUS,
        border: `1px solid ${Color(card.color.style).darken(0.3)}`,
        fontSize: "1.3em",
        padding: "0.35em 0.2em 0.2em 0.2em",
        textAlign: "center",
        borderBottom: "0"
      }}
    >
      {card.cardString}
      {intl.formatMessage(card.color.letter)}
    </div>
    <div
      style={{
        backgroundColor: "white",
        borderBottomLeftRadius: CARD_RADIUS,
        borderBottomRightRadius: CARD_RADIUS,
        border: "1px solid grey",
        fontSize: "1.3em",
        padding: "0.35em 0.2em 0.2em 0.2em",
        textAlign: "center"
      }}
    >
      :2?
    </div>
  </span>
);

MultiplyBy2CardLabel.propTypes = {
  card: shape({
    color: shape({
      letter: node.isRequired,
      style: string.isRequired
    }).isRequired,
    cardString: string.isRequired
  }).isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(MultiplyBy2CardLabel);
