Vi tänkte göra ett spel där man slåss mot varandra men bara 2D-format för att det inte ska bli överkomplicerat.

Vi tänker då använda oss av sprites och kod för att få dem att röra sig höger, vänster upp och kanske ner. Med ner så är det bara så det går snabbare att komma ner om man är uppe i luften.

T.ex så ska vi använda oss av “draw” vilket används för att med fps rita en sprite på en canvas och kan därför skapa rörliga gubbar. Gubbarna ska troligen vara objekt eller en klass som blir objekt med hp, dx, dy och sådana saker.

Sen ska vi också ha en meny då man ska kunna klicka på knappar så kommer andra upp.  Sen får man också välja svårighetsgrader som då i sin tur påverkar hur mycket hp man har och vad för bakgrund det är.

För att göra så, kan vi använda oss av att knapparna som inte skulle synas, ligger under olika ul divar och olika klasser som har display attributen . Sen med Javascript så kan man använda en eventlistener som lyssnar om man klickar på en viss knapp så kommer de andra få display inte medan de andra blir vanliga block igen.
