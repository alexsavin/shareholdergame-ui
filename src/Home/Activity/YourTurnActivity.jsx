import React from "react";
import { arrayOf, number, shape, string } from "prop-types";
import { LinkContainer } from "react-router-bootstrap";

import { Button, Glyphicon, Row, Col } from "react-bootstrap";

import { FormattedMessage } from "react-intl";

const YourTurnActivity = props => (
  <tr>
    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
      <Glyphicon style={{ fontSize: "xx-large" }} glyph="log-in" />
    </td>
    <td>
      <Row>
        <Col xs={12} sm={6}>
          <b>{props.game.players.map(player => player.name).join(" vs. ")}</b>
          <p>
            <FormattedMessage
              id="home.activity.yourturn.label"
              description="Turn label text for your turn activity"
              defaultMessage="Turn {round}.{turn}: Your turn"
              values={{
                round: props.game.round,
                turn: props.game.turn
              }}
            />
          </p>
        </Col>
        <Col xs={12} sm={6} className="activity-actions">
          <LinkContainer to={`/game/${props.game.id}`}>
            <Button bsStyle="primary">
              <FormattedMessage
                id="global.yourturn.button"
                description="Button label text for your turn call to action"
                defaultMessage="Make Your Move"
              />{" "}
              <Glyphicon glyph="log-in" />
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </td>
  </tr>
);

YourTurnActivity.propTypes = {
  game: shape({
    id: number.isRequired,
    round: number.isRequired,
    turn: number.isRequired,
    players: arrayOf(
      shape({
        name: string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default YourTurnActivity;