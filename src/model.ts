
type Node = {
  id: string;
  parent?: string | undefined;
  name: string;
  type: "OUTPOST" | "MACHINE"
}

type Link = {
  source: string;
  target: string;
}

export function parseModel(model: any) {

  const nodes: Node[] = [];
  const nodesById: Record<string, Node> = {};
  const links: Link[] = []

  let idNumber = -1;
  for(const machine of model.Data) {
    idNumber++;
    const id = String(idNumber);

    const node: Node = {
      id,
      parent: machine.Parent ? ""+machine.Parent : undefined,
      name: (machine.Title ?? machine.Name) + ' Id: ' + idNumber,
      type: machine.InteriorInputs !== undefined ? "OUTPOST" : "MACHINE"
    };
    nodes.push(node);
    nodesById[id] = node;

    for(const inputType in (machine.Inputs ?? {})) {
      for(let link of machine.Inputs[inputType]) {
        if(!Array.isArray(link)) {
          link = [link];
        }
        links.push({
          source: ""+link[0],
          target: id,
        });
      }
    }
  }

  return {
    nodesById,
    nodes,
    links
  }
}

