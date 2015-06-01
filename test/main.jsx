import React from "react";
import Bjs from "borjes";

var B = Bjs.types;

import BorjesComponent from "../dist/BorjesComponent";

var W = B.World();
var Agr = B.Variable(W, B.FStruct({ gender: B.Literal('masc'), person: B.Literal('3sg') }));
var John = B.FStruct({ cat: 'NP', head: B.Literal('John'), agr: Agr });
var loves = B.FStruct({ cat: 'VP', head: B.Literal('loves') });
var sentence = B.TFS('symbol', { cat: 'S', head: 'loves', agr: Agr });

B.World.bind(W, sentence);

var tree = Bjs.tree(sentence, [Bjs.tree(John), Bjs.tree(loves)]);

React.render(<BorjesComponent x={tree} />, document.body);
