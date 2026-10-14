---
title: "My Claude Code pipeline, four months in"
date: 2026-10-15
summary: "How a Linear ticket becomes a pull request at Chief: the commands, the agents, and the parts that keep going wrong."
draft: false
---

I joined Chief (formerly Storytell) part-time in June. Chief is an AI meeting assistant, and the codebase is wide: a web app, a native desktop app, shared TypeScript libraries and a Go backend. A single ticket can touch two of those.

Part-time hours on a codebase that size meant I could either pick small tickets or change how I work. I changed how I work. Since June 23 I've merged 194 pull requests there, and most of them started as a Linear ticket I handed to a set of Claude Code commands and agents I wrote myself.

This is what that setup looks like now and how it got that way. Mostly it got that way because something broke.

## The whole thing

<!-- pipeline -->

The planner, coder and tester are agents. Everything with a slash is a command or a skill: a markdown file in `~/.claude` that tells Claude Code what to do, in what order, and what counts as done. The agents do narrow jobs. The commands decide when they run.

A typical ticket goes from `/loop /ticket` to a draft PR in about half an hour. The median across 67 runs is 28 minutes. The longest took sixteen hours, which I'll get to.

## It started as five agents

The first version, in late June, was five subagents: planner, coder, tester, qa and reviewer. Each one had a short file saying what it does and, more usefully, what it doesn't. The coder doesn't re-plan. The tester doesn't touch production code. QA drove the real app in Playwright.

The reviewer was the first to go. By July it was spending ten minutes on multi-agent review for one-line copy changes, while the complicated tickets deserved a deeper look than it gave them. Now the planner rates every ticket from T0 to T3, and that rating decides how hard `/code-review` looks. Anything touching auth, billing or migrations gets the deepest pass no matter what.

## The screenshot is the ticket

In July I got a ticket that said, roughly, "download all files as a zip." The planner read the title, found the files page and built the feature there. Clean diff, tests passing.

The screenshot on the ticket had an arrow pointing at a card inside a chat answer. Completely different place. I reverted it.

So now `/ticket` pulls every screenshot and recording before the planner writes a word, and the file has a rule in it: if the media and the text disagree, the media wins. Bug reports usually put the real repro in the attachment, not the title.

That rule got tested again in September. A ticket had only a screen recording, and the agent could read the audio transcript but not the video. It fixed the web app and drafted a PR. The bug was in the desktop app.

A week later, on a different ticket, I asked whether it had actually checked the recording at the 21:50 mark, because the bug only happened on Windows. It admitted it had skimmed the transcript. It went back, pulled about 34 frames from that stretch of the video and looked at each one. That's in the command now too.

## Proof on every PR

Unit tests tell you the code does what the code says. They can't tell you a person can click through the feature. Every UI change goes through `/gate`, which drives the actual app in a browser, and then `/record`, which records the flow and attaches the video to the PR.

`/record` used to be something the agent could skip. In September it did, "on my own judgment", for a change to a native dialog. My reply was "why didn't you run /record?" The rule is strict now: the PR gets a video, or terminal output for backend changes, or a loud MISSING banner. It doesn't get to skip and say nothing.

Even with a video, someone has to watch it. In October I got one for a bug fix that proved nothing. There was no before clip, the wrong user was on screen, and the trigger was faked instead of happening for real. I told it "the video screen recorded does not provide evidence of our fix" and had it rerun with a real host and a guest joining late, which was the actual bug.

For live meeting flows, `/record` replays a premade transcript through the real pipeline. Nobody has to talk into a microphone, so the recording runs while I work on something else.

## Asking before building

`/scope` came out of a mistake.

In August I picked up a ticket with no owner and a one-line description, and built a minimal version. It stored data that nothing used yet. A senior engineer closed it unmerged and made it a team rule: don't build until the outcome is clear. Fair enough.

`/scope` reads the ticket and the code, then posts its questions on the ticket for whoever owns it. Those are product decisions and they aren't mine to make. When the answers come back, it writes a context brief onto the ticket for the planner to read.

In October I closed one of my own draft PRs for the same reason. It worked. It just wasn't the thing anyone needed yet.

## Letting it run

Until August I typed "continue" a lot. The workflow stopped between phases and waited for me. Then I started wrapping it in `/loop`, as in `/loop /ticket ENG-XXXX branch-name`. Each run picks up from whatever state the worktree is in and keeps going until there's a draft PR.

Worktrees are what make that work. Each ticket gets its own git worktree, so tickets don't step on each other and I can run several at once. Twice in mid-September I started three loops within the same minute.

Worktrees also caused some of my dumbest problems. Changes for one ticket showed up in another ticket's folder. A worktree made from a stale main undid a teammate's merged fix, and nobody noticed until later. And for months I copied the workflow files into every new worktree, which froze them on the day it was made. By late September there were 198 stale copies, some still on the July version, so fixes I made never reached tickets already in progress. Now there's one copy in `~/.claude/commands` and every worktree reads that.

In October I added a check that compares the ticket number with the branch name before anything else happens. I'd typed one ticket's ID with another ticket's branch. I caught it myself that time, but I'd rather not have to.

## Sixteen hours

The longest run was a desktop feature in late September. `/code-review` found nine or ten problems, the coder fixed them, and the next review found nine or ten more. A lot of them were bugs the previous fixes had introduced. Six rounds of that.

At some point I asked it, "what's happening here?" Its answer was that patching wasn't going to converge and the design needed redoing. It gave me options. I picked the bigger rewrite and told it I had time. The draft PR was there the next morning.

Most tickets need one review round. About one in six needs three or more. That one needed a different plan, and the agent was right to stop and say so instead of trying a seventh patch.

## After the PR

A teammate and an AI reviewer both leave comments on my PRs. `/resolve-comments` goes through each open thread, fixes the ones it agrees with, replies with a reason on the ones it doesn't, and re-requests review. I've run it 153 times, more than anything else.

`/learn` reads my merged PRs for review comments that keep coming back. If the same comment shows up in at least two PRs, it becomes a one-line rule the coder reads before it writes anything. The first run found five. The point is that reviewers shouldn't have to tell me the same thing twice.

`/land` takes a stuck PR (conflicts, a red check, a stale branch) and gets it to merged. I've used it three times. Merging is still something I do myself.

## What I still do

Agents draft the code. I own the scope, the review, and what ships.

In practice that means I read the plan before the coder starts, I read every diff before it goes to the team, and I decide when something merges. My name is on the PR. If I can't explain a line, it doesn't go out.

It also means more babysitting than I expected. Around thirty of my messages are just "resolve conflicts" or "fix failed ci". I keep a separate long-running session whose only job is finding which session belongs to which branch, because I lose track. "Wrong session" and "wrong tab" show up in my history more than I'd like.

Some work never goes through the pipeline at all. I built the iOS and Android versions of the desktop app mostly by hand, testing on my own phone. The pipeline is tuned for the web and desktop code, and mobile needed me in the loop. Changes to the desktop app's audio capture still need me there to click through a macOS permission prompt. I write my own replies to people.

And I think about cost more than this post probably suggests. At one point I asked it straight out whether a new approach was "still worth it", because it might just burn more tokens and time than what was already working.

The `/ticket` file is about 20KB again, after I cut it down in August. Every fix wants to become a new rule. I wrote `/curate` so each rule has exactly one home instead of being pasted into three files, and it helps, but the file keeps growing.

## If you're building one

Start with what each agent isn't allowed to do. Mine got better every time a job got narrower and every time the proof got easier for a person to check. A plan I can read in a minute. A diff that only does what the ticket asked. A video I can actually watch.

Almost every change in this post came from something going wrong on a real ticket and me writing down what should have happened instead. I haven't found a shortcut for that part.
