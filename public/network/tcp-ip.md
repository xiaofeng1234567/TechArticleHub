# TCP/IP Protocol Suite

The TCP/IP protocol suite is the foundation of the Internet and modern computer networking. It consists of four layers, each containing specific protocols.

## Protocol Layers

### 1. Application Layer
Provides network services directly to end-users

**Protocols include:**
- HTTP/HTTPS (Web)
- FTP (File Transfer)
- SMTP/POP3/IMAP (Email)
- DNS (Domain Name System)
- SSH (Secure Shell)

### 2. Transport Layer
Provides end-to-end communication

**Protocols include:**
- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)

### 3. Internet Layer
Handles routing of packets between networks

**Protocols include:**
- IP (Internet Protocol)
- ICMP (Internet Control Message Protocol)
- ARP (Address Resolution Protocol)

### 4. Link Layer
Interface to the physical network

**Protocols include:**
- Ethernet
- Wi-Fi
- PPP (Point-to-Point Protocol)

## TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable | Unreliable |
| Ordering | Preserves order | No guaranteed order |
| Speed | Slower | Faster |
| Header Size | 20-60 bytes | 8 bytes |
| Use Cases | Web, Email, File Transfer | Streaming, DNS, VoIP |

## Example: Simple TCP Client-Server in Python

### Server Code
```python
import socket

# Create a TCP/IP socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the address and port
server_address = ('localhost', 8000)
server_socket.bind(server_address)

# Listen for incoming connections
server_socket.listen(1)
print('Server is waiting for connections...')

while True:
    # Wait for a connection
    connection, client_address = server_socket.accept()
    try:
        print(f'Connection from {client_address}')
        
        # Receive the data
        while True:
            data = connection.recv(1024)
            if data:
                print(f'Received: {data.decode()}')
                # Send acknowledgment
                connection.sendall(b'Data received successfully')
            else:
                print(f'No more data from {client_address}')
                break
            
    finally:
        # Clean up the connection
        connection.close()
