# IP Addressing and Subnetting

IP addressing is a critical component of networking that allows for the identification of devices on a network.

## IPv4 Addressing

IPv4 addresses are 32-bit addresses represented in dotted-decimal notation.

Example: `192.168.1.1`

### Address Classes

| Class | Range | Default Subnet Mask | Use |
|-------|-------|---------------------|-----|
| A | 0.0.0.0 - 127.255.255.255 | 255.0.0.0 | Large networks |
| B | 128.0.0.0 - 191.255.255.255 | 255.255.0.0 | Medium networks |
| C | 192.0.0.0 - 223.255.255.255 | 255.255.255.0 | Small networks |
| D | 224.0.0.0 - 239.255.255.255 | N/A | Multicast |
| E | 240.0.0.0 - 255.255.255.255 | N/A | Experimental |

### Special Addresses

- **Private IP addresses**: 
  - 10.0.0.0/8
  - 172.16.0.0/12
  - 192.168.0.0/16
- **Loopback**: 127.0.0.0/8
- **Link-local**: 169.254.0.0/16

## Subnetting

Subnetting allows you to divide a large network into smaller, more manageable networks.

### CIDR Notation

Classless Inter-Domain Routing (CIDR) uses a suffix indicating the number of bits in the subnet mask.

Example: `192.168.1.0/24` indicates a subnet mask of `255.255.255.0`

### Subnetting Calculation

To create subnets:
1. Determine how many subnets you need
2. Determine how many hosts per subnet
3. Calculate the number of bits needed for subnets
4. Calculate the new subnet mask
5. Calculate the subnet addresses

## Example: Subnetting Calculation in Python

```python
import ipaddress

def subnet_calculator(network_address, prefix_length, new_prefix_length):
    # Create the original network
    network = ipaddress.IPv4Network(f'{network_address}/{prefix_length}', strict=False)
    
    # Create subnets
    subnets = list(network.subnets(new_prefix=new_prefix_length))
    
    print(f"Original Network: {network}")
    print(f"Number of subnets: {len(subnets)}")
    print(f"Hosts per subnet: {subnets[0].num_addresses - 2}")  # -2 for network and broadcast addresses
    
    # Print the first 5 subnets
    for i, subnet in enumerate(subnets[:5]):
        print(f"Subnet {i+1}: {subnet}")
        print(f"  Network Address: {subnet.network_address}")
        print(f"  Broadcast Address: {subnet.broadcast_address}")
        print(f"  First Usable: {subnet.network_address + 1}")
        print(f"  Last Usable: {subnet.broadcast_address - 1}")
        print(f"  Subnet Mask: {subnet.netmask}")
        print()

# Example: Divide 192.168.1.0/24 into subnets with /26 prefix
subnet_calculator('192.168.1.0', 24, 26)
