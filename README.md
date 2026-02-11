# Elastic Observability Demo

This project demonstrates how Elastic Observability collects and visualizes logs, metrics, and traces from an AWS EC2 instance to detect and diagnose system issues in real time.

---

## Architecture

AWS EC2 → Elastic Agent → Elastic Cloud → Kibana Observability

## Architecture Diagram

```mermaid
flowchart LR

    User[User / Demo App] --> EC2[AWS EC2 Instance]

    EC2 --> Agent[Elastic Agent]
    Agent --> Fleet[Elastic Fleet]

    Fleet --> ES[Elasticsearch (Elastic Cloud)]
    ES --> Kibana[Kibana Observability]

    Kibana --> Logs[Logs]
    Kibana --> Metrics[Metrics]
    Kibana --> Traces[APM / Tracing]

    Logs --> Insight[Root Cause Analysis]
    Metrics --> Insight
    Traces --> Insight


---

## Demo Objectives

- Monitor infrastructure health
- Detect system issues in real time
- Diagnose root cause using logs and metrics
- Demonstrate observability for production systems

---

## Setup Steps

### 1. Create AWS EC2 Instance
- Amazon Linux
- Open ports: 22 (SSH), 3000 (demo app)

### 2. Install Elastic Agent
- Enroll EC2 into Elastic Fleet
- Enable System integration (logs + metrics)

### 3. Generate Demo Logs
Run log generator to simulate application activity

### 4. Visualize in Kibana
- Observability → Infrastructure → Hosts
- Logs → Stream
- Metrics → CPU / Memory / Load

---

## Demo Walkthrough

1. Show infrastructure monitoring
2. Show log ingestion
3. Simulate load / errors
4. Observe metrics spike
5. Correlate logs and metrics

---

## Author

Jenli Chen  

