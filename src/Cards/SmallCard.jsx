import React from "react";

import SmallCardLabel from "./SmallCardLabel";
import Card from "./Card";

class SmallCard extends Card {
  constructor({ color, value }) {
    super({ color });

    this.value = value;
    this.cardHTML = this.value > 0 ? `+${this.value}` : `${this.value}`;

    this.oppositeValue = this.value > 0 ? this.value - 70 : 70 + this.value;
    this.oppositeHTML =
      this.oppositeValue > 0
        ? `+${this.oppositeValue}`
        : `${this.oppositeValue}`;
  }

  getCardLabel = operationIds => (
    <SmallCardLabel card={this} operationIds={operationIds} />
  );

  getSortOrder() {
    return super.getSortOrder() + this.value / 10 + 6;
  }
}

export default SmallCard;
