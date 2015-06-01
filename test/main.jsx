import React from "react";
import Bjs from "borjes";

import BorjesComponent from "../dist/BorjesComponent";

var John = Bjs.types.FStruct({ cat: 'NP', head: 'John' });
var loves = Bjs.types.FStruct({ cat: 'VP', head: 'loves' });
var sentence = Bjs.types.TFS('symbol', { cat: 'S', head: 'loves' });

var tree = Bjs.tree(sentence, [Bjs.tree(John), Bjs.tree(loves)]);

React.render(<BorjesComponent x={tree} />, document.body);
