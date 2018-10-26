import React from "react";

import BigCard from "./BigCard";

import MultiplyBy2CardLabel from "./MultiplyBy2CardLabel";

class MultiplyBy2Card extends BigCard {
  constructor(color) {
    super(color);

    this.cardLabel = <MultiplyBy2CardLabel card={this} />;
  }
}

export default MultiplyBy2Card;
