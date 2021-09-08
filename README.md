# Webb III - Moment 2: NodeJs and Automation with Gulp


## Vad automatiserings-processens syfte är.
Syftet med automatiserings-processen är att repetativa uppgifter, som att minifiera, konvertera, kompilera osv kan göras med en kodsnutt, vilket i längden blir mer effektivt än att behöva göra detta manuellt varje gång projektet ska testas, vid utveckling görs detta konstant.

## anger om vilka paket och verktyg du använt, och varför du valt just dessa.
Jag har använt mig av följande:

### gulp
Jag har använt mig av Gulp som automatiseringsverktyg för att kunna nyttja enkla och smidiga plugins till Gulp som ger ytterligare funktioner.

### gulp-concat
Jag har använt mig av gulp-concat för att konkatenera JS och CSS för att samla samtliga js filer tillsammans och samtliga css filer tillsammans för publikation/test.

### gulp-terser
Jag har använt gulp-terser för att ta bort kommentarer och blank-space i javascript-filer i syfte med att förminska filstorlek.

### gulp-postcss
Jag har använt postcss i syfte om att få tillgång till cssnano och autoprefixer.

### cssnano
Jag har använt cssnano i syfte om att ta bort kommentarer samt blank-space från CSS-filen inför publicering.

### autoprefixer
Jag har använt autoprefixer för att automatiskt skapa vendor-prefixes för CSS för att skapa stöd för alla webbläsare.

### gulp-htmlmin
Jag har använt gulp-htmlmin för att minifiera html-kod för att ta bort kommentarer och blank-space vilket minskar filstorlek.


### browser-sync
Jag har använt browser-sync i syfte om att starta en lokal server som kan auto-refresha webbläsarfönstret vid ändringar i projektfilerna.

### gulp-sourcemaps
Jag använder gulp-sourcemaps för att vid felsökning lättare kunna hitta i vilken src-fil felet ligger i, efter publicering.

### gulp-imagemin
Jag använder gulp-imagemin för att automatisera bildoptimering och minska fil-storlek.

## beskriv systemet du skapat, hur man startar upp det och de tasks som ingår.
Systemet jag skapat lagrar gulp och de olika pluginsen i variabler för att kunna användas. 

En variabel, files, innehåller ett objekt med path till de olika filerna i respektive path där html, css, js och bilder ligger.

HTML, CSS, JS och IMG har alla varsin task. I dessa funktioner returneras först samtliga filer som stämmer överens med dess path och fil-ändelse, vad som angets i path-objektet. Därefter med hjälp av gulps asynkrona .pipe() funktion utförs automatisering för att exempelvis initiera en sourcemap, konkatenera filer av samma typ till en, ta bort kommentarer och white space, skapa en sourcemap, skriva filen i pub-katalogen. imgTask använder ett plugin för att optimera bilderna. Det

Det finns dessutom en "watchTask" som initierar browserSync som vilket är ett plugin för att känna av när filerna har ändrats och göra en uppdatering automatiskt i webbläsaren, för att kunna jobba i en enkel testmiljö. En watch-funktion skivs för varje task som beordrar en refresh när respektiva filtyp ändras eller om det läggs till eller tas bort. Att ha det separat istället för allt i en watch-funktion verkade hjälpa med hastigheten, att endast filerna av samma filtyp som den som ändrades behöver kollas upp vid ändring.

## Ta även med om du lagt till något extra.
