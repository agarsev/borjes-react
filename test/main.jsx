import React from "react";
import Bjs from "borjes";

var B = Bjs.types;

import BorjesComponent from "../dist/BorjesComponent";

var John = B.FStruct({ cat: 'NP', head: B.Literal('John') });
var loves = B.FStruct({ cat: 'VP', head: B.Literal('loves') });
var sentence = B.TFS('symbol', { cat: 'S', head: 'loves' });

var tree = Bjs.tree(sentence, [Bjs.tree(John), Bjs.tree(loves)]);

React.render(<BorjesComponent x={tree} />, document.body);
