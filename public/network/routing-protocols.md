# Routing Protocols

Routing protocols are used by routers to dynamically share routing information and determine the best path for forwarding packets.

## Classification of Routing Protocols

### Interior Gateway Protocols (IGP)
Used within an autonomous system (AS)

#### Distance Vector Protocols
- **RIP (Routing Information Protocol)**
  - Uses hop count as metric
  - Maximum 15 hops
  - Updates every 30 seconds
  - Simple, but less efficient

- **EIGRP (Enhanced Interior Gateway Routing Protocol)**
  - Cisco proprietary
  - Uses bandwidth, delay, reliability as metrics
  - Fast convergence
  - Supports VLSM and CIDR

#### Link State Protocols
- **OSPF (Open Shortest Path First)**
  - Open standard
  - Uses cost (based on bandwidth) as metric
  - Creates a topological database
  - Faster convergence than RIP
  - More complex configuration

- **IS-IS (Intermediate System to Intermediate System)**
  - Similar to OSPF
  - Used in large service provider networks

### Exterior Gateway Protocols (EGP)
Used between autonomous systems

- **BGP (Border Gateway Protocol)**
  - Path vector protocol
  - Uses multiple attributes for path selection
  - Policies and filtering
  - Slow convergence
  - Used throughout the Internet

## Routing Metrics

Metrics used to determine the best path:
- Hop count
- Bandwidth
- Delay
- Reliability
- Load
- Cost

## Routing Tables

A routing table consists of:
- Network destination
- Subnet mask
- Gateway
- Interface
- Metric

## Example: RIP Configuration on Cisco Router

