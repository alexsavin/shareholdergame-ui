import React from "react";
import { Panel, Glyphicon, FormControl, Well } from "react-bootstrap";

const GlobalChat = () => (
  <Panel>
    <Panel.Heading>
      Global Chat <Glyphicon glyph="envelope" />
    </Panel.Heading>
    <Panel.Body style={{ padding: 0 }}>
      <Well style={{ marginBottom: 0 }}>
        <p>
          <span style={{ color: "blue" }}>Зырянов:</span> Bacon ipsum dolor amet
          ribeye corned beef chuck, shoulder cow frankfurter landjaeger
          prosciutto kielbasa burgdoggen chicken alcatra flank. Sirloin strip
          steak pork pork loin, ground round biltong ham hock short loin rump
          venison pastrami flank jerky beef ribs cow. Kielbasa burgdoggen
          andouille boudin, turkey t-bone alcatra. Short ribs jerky venison tail
          hamburger ground round. Meatball turducken ball tip, pork loin chuck
          drumstick chicken.
        </p>
        <p>
          <span style={{ color: "blue" }}>Sergey Chernyshev:</span> Ribeye
          tongue shoulder prosciutto picanha strip steak brisket turducken pork
          belly corned beef. Strip steak swine tongue turkey alcatra t-bone
          fatback pork belly. Turkey sausage cupim rump boudin. Cupim ham
          drumstick rump, turkey boudin pastrami tongue ball tip. Tail beef ribs
          picanha, filet mignon kielbasa turkey ribeye porchetta pork chop
          t-bone cupim meatball capicola fatback. Landjaeger rump spare ribs
          shankle frankfurter doner flank kielbasa venison cupim ham tongue
          jerky.
        </p>
      </Well>
      <FormControl
        style={{ height: "5em" }}
        componentClass="textarea"
        placeholder="type your message here ..."
      />
    </Panel.Body>
  </Panel>
);

export default GlobalChat;
