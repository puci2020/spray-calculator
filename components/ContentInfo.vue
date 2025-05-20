<template>
    <div class="lg:w-3/4">
    <section class="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 mt-6 space-y-4 text-gray-800 text-sm leading-relaxed">
      <h2 class="text-xl font-semibold text-green-700 mb-2">Dlaczego warto obliczać opryski precyzyjnie?</h2>
<ul class="list-disc pl-6 text-gray-700 space-y-1">
  <li>Pozwala zaoszczędzić środki ochrony roślin i wodę</li>
  <li>Chroni uprawy przed nadmiarem lub niedoborem substancji</li>
  <li>Zmniejsza ryzyko zanieczyszczenia środowiska</li>
  <li>Spełnia wymogi dobrej praktyki rolniczej</li>
</ul>

<h2 class="text-xl font-semibold text-green-700 mt-6 mb-2">Jak korzystać z kalkulatora?</h2>
<ol class="list-decimal pl-6 text-gray-700 space-y-1">
  <li>Wpisz dawkę środka ochrony roślin na hektar</li>
  <li>Podaj powierzchnię pola w hektarach</li>
  <li>Wprowadź zalecaną ilość wody na hektar</li>
  <li>(Opcjonalnie) Wprowadź pojemność opryskiwacza</li>
  <li>Kliknij <strong>Oblicz</strong>, aby zobaczyć wynik</li>
</ol>

<h2 class="text-xl font-semibold text-green-700 mt-6 mb-2">Najczęstsze pytania</h2>
<div class="space-y-4 text-gray-700">
  <div>
    <strong>Jakie jednostki muszę podać?</strong>
    <p>Wszystkie wartości wpisujemy w litrach (l) oraz hektarach (ha).</p>
  </div>
  <div>
    <strong>Czy wynik zawiera podział na napełnienia opryskiwacza?</strong>
    <p>Tak, jeśli podasz pojemność opryskiwacza, zobaczysz podział na każde napełnienie.</p>
  </div>
  <div>
    <strong>Czy aplikacja działa offline?</strong>
    <p>Tak! Aplikacja działa jako PWA i może być używana bez dostępu do internetu po pierwszym załadowaniu.</p>
  </div>
</div>
<h2 class="text-xl font-semibold text-green-700 mt-6 mb-2">Jak obliczać opryski?</h2>
<section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">1. Określ zalecaną dawkę środka [l/ha]</h3>
        <p>
          Każdy środek ochrony roślin ma określoną przez producenta <strong>zalecaną dawkę na 1 hektar</strong>. Informację
          tę znajdziesz na etykiecie środka lub w instrukcji stosowania.
        </p>
        <p><em>Przykład:</em> Jeśli etykieta podaje dawkę 0,5 l/ha, to znaczy, że na każdy hektar należy użyć 0,5 litra środka.</p>
      </section>

      <section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">2. Zmierz powierzchnię pola [ha]</h3>
        <p>
          Powierzchnia działki, na której wykonujesz zabieg, jest podstawą do dalszych obliczeń. Możesz ją odczytać z
          ewidencji gruntów lub zmierzyć np. aplikacją geodezyjną.
        </p>
      </section>

      <section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">3. Sprawdź zalecaną ilość wody [l/ha]</h3>
        <p>
          Ilość wody zależy od rodzaju zabiegu, rodzaju opryskiwacza i warunków pogodowych. Typowe wartości to np.
          200–400 l/ha.
        </p>
        <p>
          Im gęstsza uprawa lub bardziej skomplikowana struktura roślin, tym więcej wody może być wymagane.
        </p>
      </section>

      <section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">4. Oblicz całkowite ilości cieczy</h3>
        <p>Używając naszego kalkulatora:</p>
        <ul class="list-disc list-inside pl-4">
          <li>Całkowita ilość środka = dawka na ha × powierzchnia</li>
          <li>Całkowita ilość wody = ilość wody na ha × powierzchnia</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">5. Oblicz napełnienia opryskiwacza</h3>
        <p>
          Podaj pojemność swojego opryskiwacza (np. 300 litrów), a nasz kalkulator automatycznie wyliczy:
        </p>
        <ul class="list-disc list-inside pl-4">
          <li>liczbę napełnień,</li>
          <li>ilość środka i wody na każde napełnienie.</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">Dlaczego to ważne?</h3>
        <ul class="list-disc list-inside pl-4">
          <li><strong>Oszczędność:</strong> unikasz marnowania środków ochrony i wody.</li>
          <li><strong>Bezpieczeństwo:</strong> właściwe stężenie to mniejsze ryzyko uszkodzenia roślin.</li>
          <li><strong>Skuteczność:</strong> precyzyjne dawki zapewniają lepsze działanie środków.</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h3 class="text-l font-semibold text-green-700">Wskazówki praktyczne</h3>
        <ul class="list-disc list-inside pl-4">
          <li>Przed zabiegiem wykonaj próbę wodną bez środka ochrony, by sprawdzić ciśnienie i rozkład cieczy.</li>
          <li>Pamiętaj o dokładnym wymieszaniu środka z wodą.</li>
          <li>Zawsze stosuj środki ochrony zgodnie z etykietą i obowiązującym prawem.</li>
        </ul>
      </section>

</section>
</div>
</template>