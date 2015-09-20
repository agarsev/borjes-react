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
var disj = B.Disjunct(B.Lattice.element(L, 'nom'), B.Lattice.element(L, 'acc'));
var W = B.World();
var Agr = B.Variable(W, B.FStruct({ gender: B.Literal('masc'), person: B.Literal('3sg') }));
var list = B.List(B.Literal('John'), B.List(B.Literal('loves'), B.List(B.Literal('Mary'))));
var John = B.TFS(noun, { phon: list, cat: disj, head: B.Literal('John'), agr: Agr });
var loves = B.TFS(verb, { cat: 'VP', head: B.Literal('loves') });
var list2 = B.List(B.Literal('John'), B.Variable(W, B.List(B.Literal('loves'), B.List(B.Literal('Mary')))));
var sentence = B.TFS(phrase, { phon: list2, cat: 'S', head: 'loves', agr: Agr, agr2: Agr });

var tree = Bjs.Tree(sentence, [Bjs.Tree(John, [B.copy(John), loves, B.copy(John)]), Bjs.Tree(B.copy(loves), Bjs.Tree(B.copy(loves)))]);
B.World.bind(W, tree);

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
    React.render(<BorjesProtoLattice name={L.name} x={proto} update={updateSig} cpbuffer={cpbuffer} opts={{editable}} />, document.getElementById('latt'));
}

render();

var editB = document.getElementById('toggleEdit');
editB.onclick = function () {
    editable = !editable;
    render();
}
