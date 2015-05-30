import React from "react";
import Bjs from "borjes";

import BorjesComponent from "../dist/BorjesComponent";

var John = Bjs.types.FStruct({ symbol: 'NP', 0: 'John' });
var loves = Bjs.types.FStruct({ symbol: 'VP', 0: 'loves' });
var sentence = Bjs.types.FStruct({ symbol: 'S', 0: 'loves' });

var tree = Bjs.tree(sentence, [Bjs.tree(John), Bjs.tree(loves)]);

React.render(<BorjesComponent x={tree} />, document.body);
