# Standing Authorization — Autonomous Execution

This document records the account owner's standing authorization for agents working in this
repository. It is the local copy of the owner's "full autonomous execution mode" instruction and it
applies to every current and future task in this project.

## 1. Scope of authorization

Within `D:\Firebase plus github profile building\marvis-portfolio` (and its GitHub remote and the
Firebase project/site listed in `AGENTS.md`), the agent is authorized to act without asking for
routine approval to:

- read, create, edit, move, rename, organize, and delete project files;
- install dependencies, packages, and tooling;
- run terminal commands, scripts, builds, tests, and debug sessions;
- use connected MCP servers, APIs, and already-authorized integrations within their granted scopes;
- create branches, commits, tags, and pull requests; push to the repository's `main` branch;
- deploy to Firebase Hosting site `marvis` of project `my-1st-web-app-ef52d`;
- configure CI/CD, GitHub Actions, and scheduled automation;
- fix defects, security issues, and performance problems; retry failed operations with alternative
  approaches;
- continue through every stage of an assigned task until it is verified complete.

Routine confirmations are not required and should not be requested: "may I proceed", "do you approve
this command", "should I commit", "may I deploy", and equivalents.

## 2. Credentials

Use credentials that already exist: GitHub CLI/SSO sessions, Firebase CLI login, GitHub Actions
secrets, service accounts, and environment variables. Do not re-request authorization for an
already-connected integration unless its permissions have actually expired. Never print secrets into
source files, logs, commits, or reports.

If a provider genuinely requires a new interactive login, OAuth consent, MFA, CAPTCHA, or a payment
confirmation that cannot proceed with existing credentials, stop only that action, state the exact
blocker, and request the minimum intervention needed.

## 3. Autonomous problem solving

On failure: identify the root cause, inspect logs and configuration, implement a fix, test it, verify
the output, retry, document the outcome, then continue. Never abandon a task because of a minor
technical obstacle, and try reasonable alternatives before reporting a blocker.

## 4. Definition of done

A task is complete only when the change is built, validated, tested, published where applicable, and
verified against the live result. Writing code alone is not completion. Every completed task ends
with a report covering: files changed, commits, deploy result, test output, and any open blockers.

## 5. Hard boundaries

The standing authorization does **not** cover, and the agent must not perform:

- access to third-party systems without authorization;
- bypassing authentication, security controls, or access restrictions;
- publishing private credentials or confidential data;
- destructive actions outside the assigned task's scope, or deleting production data without a
  verified backup and recovery path;
- purchases, payments, financial transfers, or paid subscriptions;
- entering legally binding agreements on the owner's behalf;
- anything that violates applicable law, platform policy, or third-party rights;
- touching assets listed under "Do not touch" in `AGENTS.md`
  (`abouthamid.web.app`, hosting sites `seoauditpro`, `medicalstore`, `fb-ai-starter-kit`).

For those cases, pause only the affected action, explain why, and continue all other safe work.

## 6. Continuous execution

After each stage, move to the next one automatically. If a subtask is blocked, complete the remaining
independent subtasks first. Keep a durable record of decisions and progress so work can resume after
an interruption, and do not stop merely because a milestone was reached.
