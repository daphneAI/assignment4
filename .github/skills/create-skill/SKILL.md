---
name: create-skill
description: "Use when: turning a repeated multi-step process, debugging workflow, review checklist, or implementation pattern into a reusable SKILL.md for VS Code agents. Helps extract the workflow, clarify missing details, draft the skill, refine weak sections, and save it in the correct workspace or user profile location."
---

# Create a Reusable Skill

Use this workflow to convert a proven process from a conversation or project into a durable skill that can be reused later by the agent.

## Goal

Create a `SKILL.md` that captures:
- the step-by-step process being followed
- the decision points and branching logic
- the quality checks or completion criteria
- the expected output of the workflow

## Workflow

### 1. Review the conversation for a repeatable workflow
Look for a sequence the user is following repeatedly, such as:
- debugging and root cause investigation
- review or QA checklists
- implementation patterns
- research and synthesis steps
- validation and verification loops

Extract:
- the actual sequence of actions
- the key decisions that change the path
- any constraints or guardrails
- the success conditions used to know the task is done

### 2. Generalize the workflow into reusable instructions
Turn the conversation into a generalized process instead of a one-off task.

Package the workflow around:
- the purpose of the skill
- the triggers for when it should be used
- the steps to perform
- the outputs it should produce
- the checks that confirm quality

### 3. Clarify missing details when the workflow is incomplete
If the conversation does not provide enough structure, ask targeted questions about:
- the outcome the skill should produce
- whether it is workspace-scoped or personal
- whether the process is a short checklist or a full multi-step workflow
- any important edge cases or quality thresholds

### 4. Draft the skill
Create the skill file in the correct location:
- Workspace-shared customizations: `.github/skills/<name>/SKILL.md`
- User-level customizations: `{{VSCODE_USER_PROMPTS_FOLDER}}/` for prompts and instructions, not skills

The skill should include:
- frontmatter with a clear `name` and meaningful `description`
- a concise purpose statement
- numbered workflow steps
- decision points and branching logic
- validation or completion criteria

### 5. Save and validate the result
After drafting, verify:
- the file is in the correct folder
- the YAML frontmatter is valid
- the `description` clearly signals when the skill should be used
- the workflow is specific enough to be actionable but general enough to apply beyond one case

### 6. Refine weak or ambiguous sections
Identify the weakest parts of the skill and improve them by tightening:
- vague instructions
- missing completion checks
- unclear branching criteria
- over-broad or under-specified triggers

Once the skill is coherent, summarize what it produces and how it should be used.

## Quality Criteria

A good skill should:
- capture a real, repeatable workflow rather than a single anecdote
- include explicit decision points and branching logic
- state the intended outcome clearly
- help the agent determine when to use it
- define how success is measured
- remain compact, practical, and easy to follow

## Example prompts to use this skill
- "Turn this debugging workflow into a reusable skill for the team."
- "Generalize my review checklist into a SKILL.md that captures the key decision points."
- "Create a skill from this implementation pattern so it can be reused in future work."
- "Package this validation workflow into a reusable skill with clear completion criteria."

## Related customizations to create next
- a focused prompt for a single repeatable task
- a project instruction for standards that apply across most files
- a custom agent for a multi-stage workflow that needs separate tool restrictions
- a hook for enforcing deterministic checks at lifecycle points
