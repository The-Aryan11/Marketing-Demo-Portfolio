import { useEffect } from "react";
import { initLenis, ScrollTrigger } from "./lib/scroll";
import { Chrome } from "./components/Chrome";
import { Cursor } from "./components/Cursor";
import Cover from "./sections/Cover";
import Prologue from "./sections/Prologue";
import Ledger from "./sections/Ledger";
import Road from "./sections/Road";
import Campaigns from "./sections/Campaigns";
import Playbook from "./sections/Playbook";
import Stage from "./sections/Stage";
import Voices from "./sections/Voices";
import Epilogue from "./sections/Epilogue";

export default function App() {
  useEffect(() => {
    const destroy = initLenis();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Chrome />
      <main>
        <Cover />
        <Prologue />
        <Ledger />
        <Road />
        <Campaigns />
        <Playbook />
        <Stage />
        <Voices />
        <Epilogue />
      </main>
    </>
  );
}
