# todizzle

An app for playing around with instantdb, shadcn, and stripe

## Retrospective Sep 2026

Since last update, tried Tanstack Start (elsewhere) and found it works great.

## Notes 2/19/2025

After some challenges with Nextjs/T3app, the initial goal here has been to 
bootstrap a todo app going heavy in the SPA direction. Up front the plan was to
leverage ShadCn and InstantDb. 

Both have been great. ShadCN gives great starting points for common UI 
components.

InstantDB is giving me 'flow' benefits that remind me of Tailwind. I don't have
to mess around with db connection strings, ORM particularities, a 
data-access layer, an api-layer, figuring out how to approach authorization, 
etc... Some of those concepts are still needed, but so far most of them have 
been streamlined. For example auth can be basically a one-liner in your db 
permissions and you're done. So overall it feels like much less task-switching.
Leaving much more focus for building the app.

Prototyping with this tech quickly felt very productive. Scope was expanded to
include Stripe integration. This necessitated some server-side code so the next
learning opportunity was deno + hono.

Deno experience was generally positive. I just don't know it's worth it to have
another set of 'things' to learn and remember.

Hono was also positive.

After a bit of learning curve with Stripe setup and webhooks, scope was
expanded again to add e2e testing with playwright. Hit a few more bumps, mainly
getting env vars working in Github Actions but was able to get a 'hello world'
test running in CI on day one of playing with playwright.

It is starting to get to the point where I need a better mindset for all the 
moving pieces and env var management. Other than that, the main concern may be
around the two-repo vs one-repo decision. Maybe T3 was the wrong approach for
getting started with NextJs. There were too many interacting pieces that I
didn't understand. Client-side vs server-side auth and context never really
clicked. But having one repo and one deployment solution was very nice.

The next goal may be seeing how to gain one repo and one deployment solution
without using nextjs, or using nextjs in a way that dodges the frustrations.

Leads so far include nitro / vinxi.
