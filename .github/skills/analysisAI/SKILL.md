---
name: analysisAI
description: "Use when: analyzing a bug, feature request, architecture, codebase, dataset, or requirement; narrowing a root cause; comparing options; or producing evidence-based findings before making a change. Helps gather only the relevant facts, validate assumptions, and summarize conclusions with clear next steps."
---

# Analysis AI

Use this skill to perform structured analysis in a codebase or problem area before deciding on a fix, implementation, or recommendation.

## Goal

Produce a concise, evidence-based analysis that answers:
- what the issue or requirement is
- where the relevant facts live
- what the root cause or key constraint is
- what tradeoffs or recommended next steps are

## Workflow

### 1. Define the analysis question
Start by clarifying the exact question to answer.

Examples:
- Why is this failing?
- What does this feature require?
- Which implementation path is preferable?
- Where is the bug triggered in the code?
- What is the current behavior and what should it be?

If the question is broad, narrow it before reading more code.

### 2. Gather only the relevant evidence
Use the smallest possible search and read scope needed to answer the question.

Prefer:
- targeted symbol searches
- exact file and function reads
- stack traces, logs, tests, or issue details
- the smallest number of files that can validate the hypothesis

Avoid broad exploration unless the evidence suggests the issue spans multiple areas.

### 3. Trace the actual data flow
Follow the path of execution or the decision path relevant to the question.

Examples:
- input -> validation -> transformation -> output
- request -> handler -> service -> repository -> response
- requirement -> API contract -> UI behavior -> state update

Look for the boundary where the actual behavior diverges from the expected behavior.

### 4. Form one hypothesis at a time
Before changing code or recommending a fix, state a single working hypothesis.

Test it against the evidence:
- Does the code path match the failing behavior?
- Are there logs or tests that confirm it?
- Can the code be explained by the observed symptoms?

If the evidence does not support the hypothesis, revise it instead of stacking guesses.

### 5. Validate assumptions with real evidence
Use direct verification whenever possible.

Check:
- tests or reproductions
- runtime behavior
- error messages and stack traces
- configuration or environment assumptions
- specific code paths or branch conditions

Do not rely on assumptions or naming alone when the behavior can be verified.

### 6. Synthesize findings clearly
When the analysis is complete, summarize:
- the problem or requirement
- the evidence reviewed
- the root cause or key insight
- the likely implications
- the next best action or recommended fix

Keep the conclusion grounded in what was actually observed.

## Decision Rules

- If the problem is unclear, narrow the scope before exploring deeper.
- If evidence is missing, ask for the missing fact rather than guessing.
- If there are multiple likely causes, compare them using the code path and observed behavior.
- If a fix is suggested, tie it directly to the evidence and the root cause.

## Completion Criteria

The analysis is complete when:
- the question is clearly defined and scoped
- the relevant evidence has been checked
- the underlying cause or constraint is explained
- the conclusion is supported by facts
- the next step is actionable and specific

## Output Style

Prefer a concise, structured response such as:
- Summary
- Evidence reviewed
- Root cause
- Impact
- Recommended next step

## Example prompts
- "Analyze this bug and explain the root cause from the code path."
- "Review this feature request and identify the key requirements and constraints."
- "Trace why this behavior differs from the expected output."
- "Compare the likely implementation options and recommend the safer path."
- "Inspect this code and summarize the architecture and risk areas."
