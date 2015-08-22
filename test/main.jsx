import React from "react";
import Bjs from "borjes";

var B = Bjs.types;

import BorjesComponent from "../dist/BorjesComponent";

var L = B.Lattice(10);
var noun = B.Lattice.add(L, 'noun');
var verb = B.Lattice.add(L, 'verb');
var phrase = B.Lattice.add(L, 'phrase', [ noun, verb ]);
var W = B.World();
var Agr = B.Variable(W, B.FStruct({ gender: B.Literal('masc'), person: B.Literal('3sg') }));
var John = B.TFS(noun, { cat: 'NP', head: B.Literal('John'), agr: Agr });
var loves = B.TFS(verb, { cat: 'VP', head: B.Literal('loves') });
var sentence = B.TFS(phrase, { cat: 'S', head: 'loves', agr: Agr });

B.World.bind(W, sentence);

var tree = Bjs.tree(sentence, [Bjs.tree(John), Bjs.tree(loves)]);

function render (x) {
    React.render(<BorjesComponent x={x} update={render} opts={{editable:true}} />, document.body);
}

render(sentence);
