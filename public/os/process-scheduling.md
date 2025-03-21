# Process Scheduling

Process scheduling is an essential part of a Multiprogramming operating system. The objective of multiprogramming is to maximize CPU utilization by having some process running at all times.

## Scheduling Algorithms

### 1. First-Come, First-Served (FCFS)
The simplest scheduling algorithm. Processes are executed in the order they arrive.

**Advantages:**
- Simple to implement
- Fair for long processes

**Disadvantages:**
- Short processes may wait behind long ones (convoy effect)
- Not optimal for interactive systems

### 2. Shortest Job First (SJF)
Executes the process with the shortest burst time first.

### 3. Priority Scheduling
Each process is assigned a priority. Process with highest priority is executed first.

### 4. Round Robin (RR)
Each process is assigned a fixed time slot called a quantum.

### 5. Multilevel Queue Scheduling
Processes are classified into different groups.

## Performance Metrics

- **Throughput**: Number of processes completed per unit time
- **Turnaround Time**: Time from submission to completion
- **Waiting Time**: Time spent waiting in the ready queue
- **Response Time**: Time from submission until the first response

## Example: SJF Implementation in Python

```python
def sjf_scheduling(processes):
    # Sort processes based on burst time
    processes.sort(key=lambda x: x[1])
    
    n = len(processes)
    waiting_time = [0] * n
    turnaround_time = [0] * n
    
    # Calculate waiting time for all processes
    for i in range(1, n):
        waiting_time[i] = waiting_time[i-1] + processes[i-1][1]
    
    # Calculate turnaround time for all processes
    for i in range(n):
        turnaround_time[i] = waiting_time[i] + processes[i][1]
    
    # Calculate average waiting and turnaround time
    avg_waiting_time = sum(waiting_time) / n
    avg_turnaround_time = sum(turnaround_time) / n
    
    return avg_waiting_time, avg_turnaround_time

# Example usage
processes = [
    ("P1", 6), # (process_id, burst_time)
    ("P2", 8),
    ("P3", 7),
    ("P4", 3)
]

avg_waiting, avg_turnaround = sjf_scheduling(processes)
print(f"Average Waiting Time: {avg_waiting}")
print(f"Average Turnaround Time: {avg_turnaround}")
