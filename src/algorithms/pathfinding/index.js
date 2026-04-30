function getNeighbors(node, grid, rows, cols) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < rows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < cols - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isWall);
}

export function* bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length) {
    const closestNode = queue.shift();
    if (closestNode.isWall) continue;
    
    visitedNodesInOrder.push(closestNode);
    yield { type: 'visit', node: closestNode };

    if (closestNode === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(closestNode, grid, grid.length, grid[0].length);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = closestNode;
        queue.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

export function* dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [startNode];
  startNode.isVisited = true;

  while (stack.length) {
    const closestNode = stack.pop();
    if (closestNode.isWall) continue;
    
    if (!closestNode.isVisited) {
      closestNode.isVisited = true;
    }
    
    visitedNodesInOrder.push(closestNode);
    yield { type: 'visit', node: closestNode };

    if (closestNode === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(closestNode, grid, grid.length, grid[0].length);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.previousNode = closestNode;
        stack.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

export function* dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvisitedNodes.shift();
    
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    yield { type: 'visit', node: closestNode };

    if (closestNode === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(closestNode, grid, grid.length, grid[0].length);
    for (const neighbor of neighbors) {
      const distance = closestNode.distance + (neighbor.weight || 1);
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.previousNode = closestNode;
      }
    }
  }
}

export function* astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.f = 0;
  
  const unvisitedNodes = [];
  for (const row of grid) {
    for (const node of row) {
      node.f = Infinity;
      unvisitedNodes.push(node);
    }
  }
  startNode.f = heuristic(startNode, finishNode);

  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
    const closestNode = unvisitedNodes.shift();
    
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity && closestNode !== startNode) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    yield { type: 'visit', node: closestNode };

    if (closestNode === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(closestNode, grid, grid.length, grid[0].length);
    for (const neighbor of neighbors) {
      const distance = closestNode.distance + (neighbor.weight || 1);
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.f = distance + heuristic(neighbor, finishNode);
        neighbor.previousNode = closestNode;
      }
    }
  }
}

function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

export function* getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null && currentNode !== undefined) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  for (const node of nodesInShortestPathOrder) {
    yield { type: 'path', node };
  }
  return nodesInShortestPathOrder;
}
