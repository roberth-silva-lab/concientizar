<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the app a slides-only presentation with no forms or text inputs; the deck lives in `src/components/SlideDeck.tsx` and is rendered by `/` and by `/tv` (kiosk mode for the health post's TV, which tries to go fullscreen and keeps the screen awake) so both views stay in sync and keep auto-advancing and looping.