import { useCallback, useEffect, useState } from "react";
import banner from "@/assets/outubro-rosa.jpg.asset.json";
import { slides } from "@/lib/slides";

const DURATION = 10000;

/**
 * The slide deck. `tv` turns on the kiosk behaviour used on the health post's
 * screen: it tries to open fullscreen by itself, keeps the screen awake, hides
 * the mouse pointer, and only asks for a tap when the browser refuses to go
 * fullscreen without one.
 */
export function SlideDeck({ tv = false }: { tv?: boolean }) {
  const [step, setStep] = useState(0);
  const [pedirToque, setPedirToque] = useState(false);
  const i = ((step % slides.length) + slides.length) % slides.length;
  const next = useCallback(() => setStep((v) => v + 1), []);
  const prev = useCallback(() => setStep((v) => v - 1), []);
  const setI = (n: number) => setStep((v) => v - i + n);

  useEffect(() => {
    const t = setTimeout(() => setStep((v) => v + 1), DURATION);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "f") document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [next, prev]);

  useEffect(() => {
    if (!tv) return;
    const el = document.documentElement;
    // A kiosk window already fills the screen, so a tap would only get in the way.
    const jaOcupaTudo =
      window.location.search.includes("auto") ||
      (window.innerWidth >= window.screen.width && window.innerHeight >= window.screen.height);

    let wake: { release?: () => Promise<void> } | null = null;

    const irParaTelaCheia = async () => {
      if (document.fullscreenElement) return true;
      try {
        await el.requestFullscreen();
        return true;
      } catch {
        return false;
      }
    };

    const manterTelaAcesa = async () => {
      try {
        const lock = await (navigator as unknown as { wakeLock?: { request: (t: string) => Promise<{ release?: () => Promise<void> }> } })
          .wakeLock?.request("screen");
        wake = lock ?? null;
      } catch {
        /* not supported here */
      }
    };

    void (async () => {
      const ok = await irParaTelaCheia();
      if (!ok && !jaOcupaTudo) setPedirToque(true);
      void manterTelaAcesa();
    })();

    const aoSairDaTelaCheia = () => {
      if (!document.fullscreenElement && !jaOcupaTudo) setPedirToque(true);
    };
    const aoVoltar = () => {
      if (document.visibilityState === "visible") void manterTelaAcesa();
    };
    document.addEventListener("fullscreenchange", aoSairDaTelaCheia);
    document.addEventListener("visibilitychange", aoVoltar);

    return () => {
      document.removeEventListener("fullscreenchange", aoSairDaTelaCheia);
      document.removeEventListener("visibilitychange", aoVoltar);
      void wake?.release?.().catch(() => undefined);
    };
  }, [tv]);

  const s = slides[i]!;

  return (
    <main
      className={`relative flex h-screen w-screen items-center justify-center overflow-hidden bg-rosa-soft ${tv ? "cursor-none" : ""}`}
      onDoubleClick={() => document.documentElement.requestFullscreen?.()}
      onTouchStart={(e) => ((window as unknown as { __tx?: number }).__tx = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0]!.clientX - ((window as unknown as { __tx?: number }).__tx ?? 0);
        if (dx < -50) next();
        if (dx > 50) prev();
      }}
    >
      <div key={step} className="slide-in flex h-full w-full items-center justify-center p-6 md:p-12">
        {s.kind === "image" ? (
          <img src={banner.url} alt="Outubro Rosa — Seja bem-vindo! Equipe Saúde da Família Simone Flores" className="max-h-full max-w-full rounded-2xl object-contain shadow-rosa" />
        ) : (
          <div className="w-full max-w-5xl rounded-3xl bg-card/80 p-8 text-center shadow-rosa backdrop-blur md:p-14">
            <div className="text-5xl md:text-7xl">{s.emoji}</div>
            <p className="mt-4 font-script text-3xl text-primary md:text-5xl">{s.kicker}</p>
            <h1 className="mt-2 font-display text-3xl font-black uppercase leading-tight text-primary md:text-6xl">{s.title}</h1>
            {s.text && <p className="mx-auto mt-6 max-w-3xl text-xl text-foreground md:text-3xl">{s.text}</p>}
            {s.items && (
              <ul className="mx-auto mt-8 max-w-3xl space-y-4 text-left">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-lg text-foreground md:text-2xl">
                    <span className="mt-1 text-primary">♥</span>
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, n) => (
          <button key={n} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)} className="h-2 w-8 overflow-hidden rounded-full bg-primary/20">
            {n === i && <span key={step} className="progress block h-full bg-primary" />}
            {n < i && <span className="block h-full w-full bg-primary" />}
          </button>
        ))}
      </div>

      {tv && pedirToque && (
        <button
          onClick={async () => {
            if (!document.fullscreenElement) {
              try {
                await document.documentElement.requestFullscreen();
              } catch {
                /* the browser kept the window as it is */
              }
            }
            setPedirToque(false);
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-rosa-soft text-center"
        >
          <span className="text-7xl">💗</span>
          <span className="font-script text-4xl text-primary md:text-6xl">Toque aqui para abrir em tela cheia</span>
          <span className="max-w-md text-lg text-foreground">Depois disso a apresentação roda sozinha, sem parar.</span>
        </button>
      )}
    </main>
  );
}