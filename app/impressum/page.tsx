import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-5xl tracking-wide text-text-primary mb-12">
          Impressum<span className="text-crimson">.</span>
        </h1>

        <div className="space-y-8 font-sans text-base text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>
              [Vorname Nachname]<br />
              [Stra&szlig;e Hausnummer]<br />
              [PLZ Ort]<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Kontakt</h2>
            <p>
              E-Mail: contact@apextell.net<br />
              Telefon: [Telefonnummer]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27a Umsatzsteuergesetz:<br />
              [USt-IdNr.]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV
            </h2>
            <p>
              [Vorname Nachname]<br />
              [Stra&szlig;e Hausnummer]<br />
              [PLZ Ort]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Streitschlichtung</h2>
            <p>
              Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Haftung f&uuml;r Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu
              forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
