import React from "react";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { arrayOf, number, shape, string, bool } from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const GameDoneActivity = props => {
  const gameURL = `/game/${props.game.id}/${props.game.gameLetter}`;

  return (
    <tr>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        <Glyphicon
          style={{
            fontSize: "xx-large",
            color: props.winner ? "green" : "red"
          }}
          glyph={props.winner ? "ok-circle" : "remove-circle"}
        />
      </td>
      <td>
        <Row>
          <Col xs={12} sm={6}>
            <div>
              <b>
                {props.game.players.reduce((players, player) => {
                  players.push(
                    <Link key={player.id} to={`/players/${player.name}`}>
                      {player.name}
                    </Link>
                  );

                  if (props.game.players.length * 2 - 1 > players.length) {
                    players.push(
                      <span key={`${player.id}_separator`}>
                        <FormattedMessage
                          id="global.vs"
                          description="Versus separator between player names"
                          defaultMessage=" vs. "
                        />
                      </span>
                    );
                  }

                  return players;
                }, [])}
              </b>
            </div>
            <div>
              {props.winner ? (
                <FormattedMessage
                  id="home.activity.gameover.won"
                  description="Won game message for game over activity"
                  defaultMessage="Game is over. Congratulations, you won!"
                />
              ) : (
                <FormattedMessage
                  id="home.activity.gameover.lost"
                  description="Lost game message for game over activity"
                  defaultMessage="Game is over. You lost."
                />
              )}
            </div>
            <div>
              <small>
                <Link to={gameURL}>
                  <FormattedMessage
                    id="global.numbersign"
                    description="Number sign"
                    defaultMessage="#"
                  />
                  {props.game.id}-{props.game.gameLetter}
                </Link>
              </small>
            </div>
          </Col>
          <Col xs={12} sm={6} className="activity-actions">
            <LinkContainer to={gameURL}>
              <Button>
                <Glyphicon glyph="eye-open" />{" "}
                <FormattedMessage
                  id="global.viewgame.button"
                  description="View game button label"
                  defaultMessage="View Game"
                />
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

GameDoneActivity.propTypes = {
  winner: bool,
  game: shape({
    id: number.isRequired,
    players: arrayOf(
      shape({
        name: string.isRequired
      })
    ).isRequired
  }).isRequired
};

GameDoneActivity.defaultProps = {
  winner: false
};

export default GameDoneActivity;
