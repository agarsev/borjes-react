import React from "react";
import Bjs from "borjes";

var B = Bjs.types;

import BorjesComponent from "../dist/BorjesComponent";
import BorjesProtoLattice from "../dist/BorjesProtoLattice";

var proto = {
    symbol: {
        word: {
            noun: null,
            verb: null
        },
        phrase: null
    },
    case: {
        nom: null,
        acc: null,
    },
    case_verb: {
        case: null,
        verb: null
    }
};
var L = B.Lattice.fromProto(proto);
var noun = B.Lattice.element(L, 'noun');
var verb = B.Lattice.element(L, 'verb');
var phrase = B.Lattice.element(L, 'verb');
var W = B.World();
var Agr = B.Variable(W, B.FStruct({ gender: B.Literal('masc'), person: B.Literal('3sg') }));
var John = B.TFS(noun, { cat: 'NP', head: B.Literal('John'), agr: Agr });
var loves = B.TFS(verb, { cat: 'VP', head: B.Literal('loves') });
var sentence = B.TFS(phrase, { cat: 'S', head: 'loves', agr: Agr, agr2: Agr });

B.World.bind(W, sentence);

var tree = Bjs.tree(sentence, [Bjs.tree(John, [B.copy(John), loves, B.copy(John)]), Bjs.tree(B.copy(loves))]);

var editable = false;
var cpbuffer = {};

var current = tree;

function updateSig (p) {
    L = B.Lattice.fromProto(p);
    render();
}

function render (val) {
    if (val!==undefined) {
        current = val;
    }
    React.render(<BorjesComponent x={current} update={render} cpbuffer={cpbuffer} opts={{editable, signature:L, branchHeight: 30}} />, document.getElementById('area'));
    React.render(<BorjesProtoLattice x={proto} update={updateSig} opts={{editable}} />, document.getElementById('latt'));
}

render();

var editB = document.getElementById('toggleEdit');
editB.onclick = function () {
    editable = !editable;
    render();
}
