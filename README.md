DietTracker

Aplikacja DietTracker została stworzona przez Przemysława Naja w ramach projektu realizowanego w technologii Java + Angular + Spring Boot.

###########################################################################################################################################

UŻYTE TECHNOLOGIE I WERSJE

Java: 17
Node.js: 18.19.1
npm: 10.2.4
Maven: 3.9.9
Angular CLI: npm install -g @angular/cli

###########################################################################################################################################

URUCHAMIANIE APLIKACJI 

Aby uruchomić aplikację lokalnie, należy:

W backendzie:

1. Otworzyć projekt DietTrackerBackend w IntelliJ IDEA. 

2. W pliku DietTrackerApplication.java kliknąć zielony przycisk Run.

W frontendzie:

4. Otworzyć projekt DietTrackerFrontend w VS Code.

5. W pliku package.json kliknąć opcję Start przy skrypcie ng serve lub uruchomić frontend komendą ng serve albo npm run start w terminalu.

Aplikacja będzie działała pod adresem: http://localhost:4200

###########################################################################################################################################

DZIAŁANE APLIKACJI

Logowanie i rejestracja: Użytkownik może się zarejestrować, a następnie zalogować, aby uzyskać dostęp do funkcjonalności aplikacji.

Tryb jasny/ciemny: Na stronie głównej użytkownik ma możliwość zmiany motywu aplikacji (ciemny/jasny).

Moduły żywności i napojów: Użytkownik może przeglądać bazę produktów i napojów.
			   Każdy wpis można edytować, usunąć lub dodać nowy.

Kalkulator zapotrzebowania kalorycznego: Po wpisaniu podstawowych danych aplikacja oblicza BMI oraz dzienne zapotrzebowanie kaloryczne.

Dziennik spożycia: Można dodawać wpisy dzienne składąjące się z żywności i napojów.
		   Wpisy można edytować lub usuwać.
		   Aplikacja pokazuje całkowitą liczbę spożytych kalorii w danym dniu i porównuje ją z obliczonym celem z kalkulatora.
		   Możliwe jest uzupełnianie danych również dla dni wcześniejszych.

Konta użytkowników: Każdy użytkownik ma swój indywidualny dziennik.
		    Po przelogowaniu się na inne konto dziennik będzie pusty, ponieważ dane są przypisane do konkretnego konta.
		    Na stronie głównej jest możliwość wylogowania się.

Po uruchomieniu backendu dostępna jest dokumentacja API stworzona z wykorzystaniem Swaggera: http://localhost:8080/swagger-ui/index.html

