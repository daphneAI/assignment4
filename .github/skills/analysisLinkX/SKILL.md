---
name: analysisLinkX
description: "Use when: investigating a bug, requirement, architecture, system flow, or cross-file dependency chain where links between components, APIs, services, or documents matter; when a likely issue spans multiple connected parts and needs evidence-based tracing before a fix or recommendation."
---

# Analysis LinkX

Use this skill when the answer depends on understanding how multiple parts of a system connect and influence one another.

## Goal

Map the relevant links between components and explain:
- how the system flows from one part to another
- where the break, mismatch, or bottleneck occurs
- which connected elements are relevant to the current issue
- what the best next action is based on that evidence

## Workflow

### 1. Define the link chain to investigate
Identify the path under review.

Examples:
- API request -> controller -> service -> repository -> database
- UI action -> state update -> reducer -> request -> response
- feature requirement -> contract -> implementation -> validation points
- issue report -> reproduction -> failing function -> root cause

If the chain is unclear, start from the symptom and work backward to the origin.

### 2. Find the critical connection points
Search for the exact link or boundary where parts meet.

Check:
- interfaces and contracts
- API routes and handlers
- service calls and dependencies
- state or config propagation
- messages, payloads, and shared models

The goal is not to read everything, only the connections that explain the behavior.

### 3. Trace the actual flow
Follow the linked path step by step.

Ask:
- What initiates this action?
- Which function or service is called next?
- What data is transformed or validated in between?
- Where does it diverge from the expected behavior?

This step is the core of a link-based analysis: verify the path, not just the names of the components.

### 4. Compare expected vs actual behavior
At each connection point, compare:
- expected contract
- actual data or response
- observed failure or symptom
- relevant assumptions or config

This often reveals the real issue: a contract mismatch, missing validation, incorrect routing, or an unexpected dependency.

### 5. Test a hypothesis against the chain
Before recommending a fix, form one hypothesis tied to the chain.

Valid questions:
- Does the failing link align with the observed symptom?
- Is there a contract mismatch between adjacent components?
- Is the data lost, transformed, or blocked at a specific boundary?

If the chain does not support the hypothesis, revise the hypothesis rather than guessing.

### 6. Summarize the connected findings
Produce a short structured summary:
- issue or question
- relevant components and links
- evidence from the chain
- root cause or key constraint
- recommended next step

Keep the final answer fact-based and focused on the actual connection points.

## Decision Rules

- If the issue spans multiple files or layers, follow the call chain or dependency chain instead of inspecting isolated files.
- If evidence is missing at a boundary, inspect the contract or handoff between adjacent components.
- If multiple components appear involved, prioritize the path that directly explains the observed behavior.
- If a fix is proposed, tie it to the specific broken link or mismatch in the system.

## Completion Criteria

The analysis is complete when:
- the relevant flow or link chain is identified
- the critical connection points are examined
- the root cause is supported by evidence
- the main impact is explained
- the recommended next step is precise and actionable

## Output format

Use a concise structure such as:
- Summary
- Relevant link chain
- Evidence from the connection points
- Root cause
- Recommended action

## Example prompts
- "Trace the API flow and identify where the data breaks between services."
- "Analyze the linked components in this feature and explain the root cause."
- "Map the dependency chain for this failure and show the critical handoff point."
- "Compare the expected contract with the actual behavior across the linked system."
- "Explain how these connected modules interact and where the mismatch occurs."
