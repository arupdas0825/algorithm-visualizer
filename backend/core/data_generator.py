import random
import math

def generate_random_array(size=30, min_val=5, max_val=100):
    return [random.randint(min_val, max_val) for _ in range(size)]

def generate_grid(rows=20, cols=30):
    return [[0 for _ in range(cols)] for _ in range(rows)]

def generate_binary_tree(depth=4):
    def build_tree(current_depth, max_depth):
        if current_depth > max_depth or (current_depth > 1 and random.random() < 0.2):
            return None
            
        return {
            "value": random.randint(1, 99),
            "left": build_tree(current_depth + 1, max_depth),
            "right": build_tree(current_depth + 1, max_depth)
        }
        
    return build_tree(1, depth)
    
def generate_graph(num_nodes=6, edge_probability=0.4):
    nodes = [{"id": str(i), "label": f"Node {i}"} for i in range(num_nodes)]
    edges = []
    
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            if random.random() < edge_probability:
                edges.append({
                    "source": str(i),
                    "target": str(j),
                    "weight": random.randint(1, 10)
                })
                
    # Ensure graph is mostly connected
    if not edges and num_nodes > 1:
        edges.append({"source": "0", "target": "1", "weight": random.randint(1, 10)})
        
    return {"nodes": nodes, "edges": edges}
