import './style.css'

import cytoscape, {type EdgeDefinition, type ElementDefinition, type NodeDefinition} from 'cytoscape';
import klay from 'cytoscape-klay';
cytoscape.use(klay);

import { parseModel } from './model.ts';

const response = await fetch('./model.sfmd');
const rawModel = await response.json();

const model = parseModel(rawModel);

const nodes: NodeDefinition[] = model.nodes
  .map(n => ({ group: 'nodes', data: { id: n.id, name: n.name, type: n.type } }));

const edges: EdgeDefinition[] = model.links.map(l => ({
  group: 'edges',
  data: { id: l.source + l.target, source: l.source, target: l.target }
}));

const elements: ElementDefinition[] = (nodes as ElementDefinition[]).concat(edges);


cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'klay',
  },
  style: [
    {
      selector: 'node[type = "OUTPOST"]',
      style: {
        'background-color': '#0000FF',
        'label': 'data(name)'
      }
    },
    {
      selector: 'node[type = "MACHINE"]',
      style: {
        'background-color': '#dd4de2',
        'label': 'data(name)'
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'line-color': '#dd4de2',
        'target-arrow-color': '#dd4de2',
        'opacity': 0.5
      }
    }
  ],
  elements
});


