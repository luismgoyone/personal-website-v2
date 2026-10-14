---
title: "Two native apps in a month, mostly from the terminal"
date: 2026-10-15
summary: "How I built Chief's iOS and Android apps with Claude Code, from the first plan to the store forms, and the bugs that only showed up on a real phone."
draft: false
---

In mid-September I got the ticket for Chief's mobile app. Chief already had a desktop app that records a meeting and transcribes it live. The ask was the same thing on a phone: sign in, pick a project, record, watch the transcript come in.

Four weeks later the iOS build was in App Review, and five days after that the Android build went to Google. Claude Code wrote nearly all of the Swift and Kotlin.

## "Should we do this in phases? Or what?"

I started by handing Claude the transcript of the team sync where we'd discussed the app, plus the existing mobile spec, and asking it to fold the two together. Then I asked the question above.

Its answer was to phase by risk, not by feature. Phase 1 was to prove that a native app could start a live session and get a transcript back, and nothing else. Phase 2 was the main flow. Phase 3 was nice-to-haves. Android would come after iOS had a shared foundation to copy from. I said "Okay go".

Two research subagents mapped how the desktop app starts a session, and they found the spec was wrong about where capture and transcription happen. Both run on the phone.

Some calls were mine. Sign-in had to be in the MVP: "ideally someone who will use this will not be hardcoded, the user has to login, select the project…, name the session." I also added joining a session someone else is hosting on desktop. When Claude found that each session is recorded from one host machine, I cut it down: "since we'lre all in a single call, there's no point in doing so cause your voice is already transcribed on their end. Okay then let's make them just watchers."

## Setup, which was mostly waiting

Xcode 26 doesn't ship a simulator runtime anymore, so the first hour was a 7 GB download. I had to accept the Xcode license myself because Claude's shell can't type my password. Anything behind `sudo`, a password or an account page stayed mine for the rest of the month.

The project is generated with XcodeGen from a `project.yml`, so the `.xcodeproj` never goes in git, and Claude built everything with `xcodebuild` and `xcrun simctl` from the terminal. About 45 minutes after the first line of Swift, a Node script was streaming a generated speech clip through the transcription service and Claude was checking the session row in my local database. Phase 1 was done the same day.

## Design: tokens first, then Stitch

Before any screens, Claude pulled the real theme tokens out of the web app's Tailwind config and wrote a `DESIGN.md` for the iOS app: colors, type, spacing, motion, accessibility, and a checklist for adding a screen. Then I ran a critique on what we had. Two reviewer subagents scored it 27 and 28 out of 40.

For the redesign I used Stitch (stitch.withgoogle.com). I asked Claude for the desktop app's tokens and a prompt I could paste in, attached desktop screenshots, and generated four screens in dark and light.

Then I asked Claude to open the Stitch project with Claude in Chrome. It loaded a blank page. Stitch draws on a canvas, and the tab it controlled might not have been my signed-in profile anyway. So I exported the HTML and pasted it with screenshots instead.

Claude ported the screens to SwiftUI with our real tokens, and it cut the things Stitch had made up: trust badges, a "48kHz spatial capture" label, settings that don't exist. A Stitch MCP got connected later, and we never ended up using it.

After that the design work was me pointing at the desktop app and saying "I think we should copy this". The transcript view ended up 1:1 with desktop, down to the speaker colors. The live session screen went through a bottom tab bar, a hidden bar that slides up ("hmm what if initiallt the bottom navbar is hiddeen…"), and finally no bottom bar at all.

Some of those rounds were slow. "bro it's still like that wdym" is a real message. So is "There! Better."

## Testing on a simulator, then on my phone

Claude tested on the simulator with computer use. It asked for access each time with a reason ("verify the Phase-3 screens render with real data"), then clicked through the app and read its own screenshots back: about 150 computer-use calls over the month. It seeded fake sessions through the API so the screens had real data in them, and attached light and dark screenshots to each PR.

The bugs that mattered all came from my phone.

Backgrounding the app ended the session. The transcript didn't sync. A phone call, Siri or another app's audio could leave the recording stuck, because iOS doesn't always tell you an interruption has ended. I sent screenshots and screen recordings (about 90 of my messages had images in them) and numbered lists of what was wrong, and Claude fixed them one by one: background audio mode, a liveness ping on the websocket, a network monitor, recovery when an interruption never ends.

In October I tried to get Claude to reproduce one of these itself. I asked, "So if use phone mirroring will you be able to try that out?" It drove iPhone Mirroring with computer use, but iOS blocks the phone's mic while mirroring, so it couldn't. It pulled frames out of my screen recording and lined them up with the session transcript instead.

One limit I didn't want to accept: iOS won't let an app capture system or call audio. I pushed back more than once, with "Maybe there's a workaround for this? Like let's think outside the box instead of focusing on what we cannot control." There wasn't one. The app shows a notice on first run instead.

## Builds, Slack and CI

I archived and uploaded each TestFlight build from Xcode myself. Claude walked me through the Apple Developer portal one screen at a time: registering the device, the App ID, the agreement banner, the export-compliance key.

Version bumps got their own skill. `/update-version` changes the version and build number in `project.yml`. I've rewritten its rules twice since: it bumps on the open mobile PR if there is one, never on main, and it now takes a written instruction for anything else.

I wanted builds and tester feedback to show up in Slack. App Store Connect has no outgoing webhooks, so Claude designed a scheduled GitHub Actions job instead: a Node script with no dependencies that calls the App Store Connect API and posts Block Kit cards to Slack through incoming webhooks. I created the Slack app, the webhooks and the API key, and got the repo secrets added through our admin.

A teammate reviewed it for cost, so feedback now gets checked once a day, and build notices are triggered from Xcode itself: an archive post-action in `project.yml` starts the workflow with `gh`. That needed `env -i`, because Xcode's environment broke `gh`. Then the Actions cache got evicted and the poller lost track of what it had posted, so now the Slack channel itself is the record it checks before posting.

There's also an `ios-build` CI job on a macOS runner that only runs when something under `mobile/ios/` changes. The runner's default Xcode couldn't open our project format, so the job picks Xcode 16.

## Getting into the App Store

Claude in Chrome filled in most of App Store Connect while I watched: subtitle, categories, age rating, the privacy questionnaire, review notes. The header image was HTML and CSS rendered in headless Chrome. For the screenshots, Claude wrote a two-and-a-half-minute fictional meeting and replayed it through the desktop pipeline, so the transcript and summary on screen look real without being anyone's real meeting.

Setting the price is what exposed a gap. The app never checked whether the account had credits left. My reaction was "Gosh and that should be part of the mvp right. Damn and we missed that." It was fixed and merged the same day. Version 1.0.0, build 12, went to App Review on October 9.

## Android

The Android session started with "before starting the android ticket, what do I need to know". The answer was a long list of prerequisites, including the fact that the iOS code wasn't on main yet. So I branched off the iOS branch and kept the Swift app next to the new code as the reference.

I asked whether I needed Android Studio. I didn't. Claude installed JDK 21, the SDK, the emulator and an Android 16 system image through Homebrew in about eleven minutes, and builds everything with the Gradle wrapper.

Then it ran my normal ticket flow. A planner wrote a phased plan, coder subagents built Gradle, theme, networking, screens and capture in about forty minutes, and four rounds of high-effort code review found around 44 problems. The emulator then found four that the reviews hadn't: an empty sessions list, OkHttp refusing `wss://` URLs, a server event that sent an array where the app expected an object, and an 18-second freeze after a cancelled start.

The first version looked bad next to iOS, and I said so: "it looks bad compared to the iOS counterpart". Claude read the SwiftUI source and rebuilt the Compose screens to match. Later I went the other way and asked to "keep it android native feels", so the stock Android dialogs came back.

Claude was confidently wrong at least once here. It told me to fix a bug iOS had already fixed, because the stacked branch was stale. I caught it with "Wait really? wasn't it already fixed in 086e344?"

I also started asking to do some steps myself: "commit and push the UI fixes to the PR, I want to learn how to do it manually", and later, about release builds, "I'd want to learn how to do it just so when I run out of credits I could still do a build". The release steps are in the Android README now because of that.

## Keeping two apps the same

iOS kept changing while Android was in progress, so every new iOS PR got read as a diff and ported: pagination, reliability fixes, diagnostics, credits. I also removed an Android-only feature so the two apps behave the same.

Before the release I decided we would only rebuild once our AI reviewer gave the PR an LGTM. It didn't. It found three iOS features Android was still missing, even though Claude's own parity check had said it was done. Claude ported them, the test count went to 73, and it merged.

The Play Console was the most browser-heavy part of the whole project, around 200 Claude in Chrome calls. Claude filled in the ads, data safety, content rating and target audience forms, made the store graphics and set up internal testing. It stopped at anything that needed a login, a file picker, or accepting legal terms on my behalf.

Google needs a video showing why the app records audio in the background. Claude recorded it over adb, and it waited until the home screen had scrolled out of view before starting, so real session names wouldn't end up in a video sent to Google.

Android 1.0.0, build 4, went in for review on October 14.

## What I did, and what didn't work

Claude wrote the code, the build tooling, the tests, the PR descriptions, the tickets, the Slack poller, the CI job and the store copy. I made the product and scope calls, judged every screen by eye, tested on my phone, and did every step behind a password: the Apple and Google consoles, Xcode uploads, Slack and API keys, secrets, the demo accounts.

The things that went wrong were mostly about checking. Claude said a few bugs were fixed before they were. When I asked for an end-to-end test before 1.0.0, it tested the Slack pipeline instead of the app, and later admitted "Nothing in this session has tested the iOS app itself." It used the wrong Chrome profile twice ("Wrong browser again bro"). Android was only tested on the emulator in that session, every Android build ran on my Mac with no CI, and the real iOS bugs only came out on a real phone and from testers. One session even lost track of the `/update-version` skill another session had built and told me "we didn't create one".
