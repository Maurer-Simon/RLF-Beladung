// JavaScript (script.js)
const GERAETERAEUME = "assets/geraeteraeume/"
const GERAETE = "assets/geraete/"

// Objekt zum Speichern der Bildpfade für jeden Bereich und Zustand
var bilderPfade = {
    'Ausgangsansicht': {
        'geöffnet': GERAETERAEUME + 'rechts_gesamt_offen.jpg',
        'geschlossen': GERAETERAEUME + 'rechts_gesamt_geschlossen.jpg'
    },
    'Dachbox': {
        'geöffnet': GERAETERAEUME + 'dachbox_rechts.jpg',
        'geschlossen': GERAETERAEUME + 'dachbox_links.jpg'
    },
    'Fahrerraum': {
        'geöffnet': GERAETERAEUME + 'fahrerraum.jpg',
        'geschlossen': GERAETERAEUME + 'fahrer_mann_offen.jpg'
    },
    'Mannschaftsraum': {
        'geöffnet': GERAETERAEUME + 'mannschaft.jpg',
        'geschlossen': GERAETERAEUME + 'fahrer_mann_offen.jpg'
    },
    'Geräteraum 1': {
        'geöffnet': GERAETERAEUME + 'geräteraum_1_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_1_geschlossen.jpg'
    },
    'Geräteraum 2': {
        'geöffnet': GERAETERAEUME + 'geräteraum_2_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_2_geschlossen.jpg'
    },
    'Geräteraum 3': {
        'geöffnet': GERAETERAEUME + 'geräteraum_3_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_3_geschlossen.jpg'
    },
    'Geräteraum 4': {
        'geöffnet': GERAETERAEUME + 'geräteraum_4_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_4_geschlossen.jpg'
    },
    'Geräteraum 5': {
        'geöffnet': GERAETERAEUME + 'geräteraum_5_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_5_geschlossen.jpg'
    },
    'Geräteraum 6': {
        'geöffnet': GERAETERAEUME + 'geräteraum_6_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_6_geschlossen.jpg'
    },
    'Geräteraum 7': {
        'geöffnet': GERAETERAEUME + 'hinten_offen.jpg',
        'geschlossen': GERAETERAEUME + 'geräteraum_7_geschlossen.jpg'
    },
};

// Funktion zum Anzeigen des ausgewählten Bereichs und der Geräte für diesen Bereich
function zeigeBereich(checkbox) {
    var checkboxes = document.getElementsByName("bereich");
    
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkbox) {
            checkboxes[i].checked = false;
        }
    }
    
    if (checkbox.checked) {
        var bild = document.getElementById("bereich-bild");
        var bereich = checkbox.value;
        var zustand = bild.src.includes('_geöffnet') ? 'geöffnet' : 'geschlossen';
        var neuerBildPfad = bilderPfade[bereich][zustand];
        bild.src = neuerBildPfad;
        anpassenAnBildschirm();

        zeigeGerat(bereich);
    }
}

// Funktion zum Anzeigen der Geräte für den ausgewählten Bereich
function zeigeGerat(bereich) {
    var geratBereich = document.getElementById("gerat-bereich");
    geratBereich.innerHTML = ""; // Vorhandene Elemente löschen

    // Überprüfen, ob der ausgewählte Bereich in der Liste vorhanden ist
    if (bereich in geratListen) {
        var geratListe = geratListen[bereich];
        var anzahlGerate = geratListe.length;

        // Erstellen von Spalten und Hinzufügen von Geräten in jede Spalte
        for (var i = 0; i < anzahlGerate; i++) {
            var spalte = document.createElement("div");
            spalte.classList.add("gerat-spalte");

            var gerat = document.createElement("button"); // Ändern zu einem Button-Element
            gerat.textContent = geratListe[i].name; // Name des Geräts
            gerat.classList.add("gerat");

            // Hinzufügen von Event-Listenern für Mausereignisse
            gerat.addEventListener('mousedown', function () {
                var bild = document.getElementById("bereich-bild");
                bild.src = this.getAttribute('data-bild'); // Setze das Bild des ausgewählten Geräts als Quelle für das Hauptbild
                anpassenAnBildschirm();
            });

            gerat.addEventListener('mouseup', function () {
                // Entferne das Bild des ausgewählten Geräts, wenn die Maustaste losgelassen wird
                var bild = document.getElementById("bereich-bild");
                bild.src = bilderPfade[document.querySelector('input[name="bereich"]:checked').value][bild.src.includes('_geöffnet') ? 'geöffnet' : 'geschlossen'];
                anpassenAnBildschirm();
            });

            // Setze das Datenattribut mit dem Bildpfad des Geräts
            gerat.setAttribute('data-bild', geratListe[i].bild);

            // Hinzufügen von Gerät zur Spalte
            spalte.appendChild(gerat);

            // Hinzufügen der Spalte zum Gerätebereich
            geratBereich.appendChild(spalte);
        }
    } else if (bereich == "Ausgangsansicht") {
        // Falls der ausgewählte Bereich nicht vorhanden ist
        geratBereich.textContent = "Keine Geräte für diesen Bereich vorhanden.";
    }
}

// Funktion zum Anpassen des Bildlayouts an die Bildschirmgröße
function anpassenAnBildschirm() {
    var bild = document.getElementById("bereich-bild");
    var hoehe = window.innerHeight * 0.6;
    bild.style.height = hoehe + "px";
}

// Funktion zum Ändern des Zustands (geöffnet oder geschlossen)
function setzeZustand(zustand) {
    var bild = document.getElementById("bereich-bild");
    var bereich = document.querySelector('input[name="bereich"]:checked').value;
    var neuerBildPfad = bilderPfade[bereich][zustand];
    bild.src = neuerBildPfad;
    anpassenAnBildschirm();
}


// Objekt zum Speichern der Geräte für jeden Geräteraum
var geratListen = {
    'Dachbox': [
        { name: 'Abdeckplane', bild: GERAETE + 'abdeckplane.jpg' },
        { name: 'Absperrpflöcke', bild: GERAETE + 'absperrpfloecke.jpg' },
        { name: 'Auffanggurt', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Bandschlinge 100 cm', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Bandschlinge 40 cm', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Bandschlinge 50 cm', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Bandschlinge 60 cm', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Bandschlinge 80 cm', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Besen', bild: GERAETE + 'besen_dach.jpg' },
        { name: 'Deckenstützen', bild: GERAETE + 'deckenstuetzen.jpg' },
        { name: 'Einreißhaken', bild: GERAETE + 'einreisshaken.jpg' },
        { name: 'Feuerpatsche', bild: GERAETE + 'feuerpatsche.jpg' },
        { name: 'Karabiner', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Korbtrage', bild: GERAETE + 'korbtrage.jpg' },
        { name: 'Lichtmasten', bild: GERAETE + 'lichtmasten.jpg' },
        { name: 'Rettungstuch - Dreieckig', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Rundschlinge 8 to / 2 m', bild: GERAETE + 'rundschlingen_dach.jpg' },
        { name: 'Schaufel', bild: GERAETE + 'schaufel_dach.jpg' },
        { name: 'Schiebeleiter 2-teilig', bild: GERAETE + 'schiebeleiter.jpg' },
        { name: 'Spaten', bild: GERAETE + 'spaten.jpg' },
        { name: 'Spatenhake', bild: GERAETE + 'spatenhake.jpg' },
        { name: 'Steckleiter Aufsatz', bild: GERAETE + 'steckleiter_aufsatz.jpg' },
        { name: 'Steckleiter', bild: GERAETE + 'steckleiter.jpg' },
        { name: 'Umlenkrolle f. Personensicherung', bild: GERAETE + 'dachbox_mitte.jpg' },
        { name: 'Unterbauholz 10x10x100', bild: GERAETE + 'unterlegholz_dach.jpg' },
        { name: 'Unterbauholz 10x10x250', bild: GERAETE + 'unterlegholz_dach.jpg' },
        { name: 'Unterbauholz 5x8x100', bild: GERAETE + 'unterlegholz_dach.jpg' },
        { name: 'Unterbauholz Allgemein', bild: GERAETE + 'unterlegholz_dach.jpg' },
        { name: 'Unterlegplatten 430x1500 mm', bild: GERAETE + 'unterlegholz_dach.jpg' },
        { name: 'Wasserwerfer', bild: GERAETE + 'wasserwerfer.jpg' }
    ],
    'Fahrerraum': [
        { name: 'LED Handlampe', bild: GERAETE + 'fahrer_handlampe_handfunk.jpg' },
        { name: 'Fahrerraum Funkgerät', bild: GERAETE + 'fahrer_handlampe_handfunk.jpg' },
        { name: 'Einsatzleiter Überwurf', bild: GERAETE + 'el_überwurf.jpg' },
        { name: 'GRKT Überwurf', bild: GERAETE + 'grk_überwurf.jpg' },
        // Weitere Geräte für den Bereich Fahrerraum hier hinzufügen
    ],
    'Geräteraum 1': [
        { name: 'Abschleppseil', bild: GERAETE + 'abschleppseil.jpg' },
        { name: 'Airbagsicherung', bild: GERAETE + 'airbag_sicherung.jpg' },
        { name: 'Akkutrennschleifer groß', bild: GERAETE + 'trennschleifer_akku.jpg' },
        { name: 'Armaturdruckplatte', bild: GERAETE + 'amaturdruckplatte.jpg' },
        { name: 'Auffangwannenset', bild: GERAETE + 'auffangwanne.jpg' },
        { name: 'Baumschoner', bild: GERAETE + 'baumschoner.jpg' },
        { name: 'Beleuchtung', bild: GERAETE + 'beleuchtung_stativ.jpg' },
        { name: 'Freilandverankerung', bild: GERAETE + 'freilandverankerung.jpg' },
        { name: 'Glasmanagementkoffer', bild: GERAETE + 'glasmanagment.jpg' },
        { name: 'Greifzug 16kN', bild: GERAETE + 'greifzug.jpg' },
        { name: 'Greifzugseil', bild: GERAETE + 'greifzug_seil.jpg' },
        { name: 'Hooligan-Tool', bild: GERAETE + 'hooligan_tool.jpg' },
        { name: 'Hydraulikaggregat', bild: GERAETE + 'hydraulikaggregat.jpg' },
        { name: 'Kettengehänge 1 (einsträngig)', bild: GERAETE + 'kettengehaenge1_2.jpg' },
        { name: 'Kettengehänge 2 (zweisträngig)', bild: GERAETE + 'kettengehaenge1_2.jpg' },
        { name: 'Kettengehänge für Spreitzer', bild: GERAETE + 'spreizer_kettengehänge.jpg' },
        { name: 'Radkeile', bild: GERAETE + 'radkeile.jpg' },
        { name: 'Rettungsbrett', bild: GERAETE + 'rettungsbrett.jpg' },
        { name: 'Rettungsplattform', bild: GERAETE + 'rettungsplattform.jpg' },
        { name: 'Rettungszylinder', bild: GERAETE + 'rettungszylinder.jpg' },
        { name: 'Säbelsäge Akku', bild: GERAETE + 'säbelsäge_akku.jpg' },
        { name: 'Schere', bild: GERAETE + 'schere.jpg' },
        { name: 'Schnittschutz Hose', bild: GERAETE + 'schnittschutzhose.jpg' },
        { name: 'Schutzdeckensett', bild: GERAETE + 'schutzdeckenset.jpg' },
        { name: 'Schwelleraufsatz', bild: GERAETE + 'schwelleraufsatz.jpg' },
        { name: 'Seilstropp 10 Meter', bild: GERAETE + 'seilstropp_10.jpg' },
        { name: 'Seilstropp 2,5 Meter', bild: GERAETE + 'seilstropp_2_5.jpg' },
        { name: 'Seilstropp 5 Meter', bild: GERAETE + 'seilstropp_5.jpg' },
        { name: 'Spineboard', bild: GERAETE + 'spineboard.jpg' },
        { name: 'Spreizer', bild: GERAETE + 'spreizer.jpg' },
        { name: 'Stabfast', bild: GERAETE + 'stabfast.jpg' },
        { name: 'Stabfast Zubehör', bild: GERAETE + 'stabfast_zubehör.jpg' },
        { name: 'Stabpack', bild: GERAETE + 'stabpack.jpg' },
        { name: 'Trenngerät Akku', bild: GERAETE + 'trenngerat_akku.jpg' },
        { name: 'Umlenkrollen', bild: GERAETE + 'umlenkrollen.jpg' },
        { name: 'Unterbauholz 10x10x40 cm', bild: GERAETE + 'unterlegholz_g1_10_10_40.jpg' },
        { name: 'Unterlegplatten 340x440 mm', bild: GERAETE + 'unterlegholz_g1_platten.jpg' },
        { name: 'Unterlegskeile', bild: GERAETE + 'unterlegholz_g1_schraeg.jpg' },
        { name: 'Werkzeugkoffer', bild: GERAETE + 'werkzeugkoffer.jpg' },
        { name: 'Wagenheber', bild: GERAETE + 'wagenheber.jpg' }
    ],
    'Geräteraum 2': [
        { name: 'Absperrband', bild: GERAETE + 'absperrband.jpg' },
        { name: 'Arbeitsmesser', bild: GERAETE + 'arbeitsmesser.jpg' },
        { name: 'Besen', bild: GERAETE + 'besen.jpg' },
        { name: 'Bolzenscherre', bild: GERAETE + 'bolzenschere.jpg' },
        { name: 'Brechstange (kurz)', bild: GERAETE + 'brechstange_kurz.jpg' },
        { name: 'Brechstange (lang)', bild: GERAETE + 'brechstange_lang.jpg' },
        { name: 'Eckrohrzange', bild: GERAETE + 'eckrohrzange.jpg' },
        { name: 'Feuerwehraxt', bild: GERAETE + 'feuerwehraxt.jpg' },
        { name: 'Hammer 2kg', bild: GERAETE + 'hammer2kg.jpg' },
        { name: 'Hammer 5kg', bild: GERAETE + 'hammer5kg.jpg' },
        { name: 'Hebekissen Steuerorgan', bild: GERAETE + 'hebekissen.jpg' },
        { name: 'Hebekissen V 10', bild: GERAETE + 'hebekissen.jpg' },
        { name: 'Hebekissen V 12', bild: GERAETE + 'hebekissen.jpg' },
        { name: 'Hebekissen V 20', bild: GERAETE + 'hebekissen.jpg' },
        { name: 'Hochleistungslüfter', bild: GERAETE + 'lüfter.jpg' },
        { name: 'Holzaxt groß', bild: GERAETE + 'holzaxt_groß.jpg' },
        { name: 'Holzaxt klein', bild: GERAETE + 'holzaxt_klein.jpg' },
        { name: 'Holzsappel', bild: GERAETE + 'holzsappel.jpg' },
        { name: 'Holzspalthammer', bild: GERAETE + 'holzspalthammer.jpg' },
        { name: 'Kabeltrommel 16 A', bild: GERAETE + 'kabeltrommel16a.jpg' },
        { name: 'Kamintürschlüssel', bild: GERAETE + 'kamintürschlüssel.jpg' },
        { name: 'Krampen', bild: GERAETE + 'krampen.jpg' },
        { name: 'Lufthaspel', bild: GERAETE + 'lufthaspel.jpg' },
        { name: 'Ölfass 25 Liter', bild: GERAETE + 'ölfass.jpg' },
        { name: 'Ölsaugmatte', bild: GERAETE + 'oelsaugmatte.jpg' },
        { name: 'Pneumatisches Zubehör', bild: GERAETE + 'luftschlauch.jpg' },
        { name: 'Rangierroller', bild: GERAETE + 'rangierroller.jpg' },
        { name: 'Schachtheber', bild: GERAETE + 'schachtheber.jpg' },
        { name: 'Hohlschaufel/Randschaufel', bild: GERAETE + 'hohlschaufel_randschaufel.jpg' },
        { name: 'Signalleuchtenset (Powerflare)', bild: GERAETE + 'signalleuchten.jpg' },
        { name: 'Tauchpumpe groß', bild: GERAETE + 'tauchpumpe_Groß.jpg' },
        { name: 'Tauchpumpe', bild: GERAETE + 'tauchpumpe_klein.jpg' },
        { name: 'Tragbarer Stromerzeuger', bild: GERAETE + 'stromerzeuger.jpg' },
        { name: 'Treibstoff', bild: GERAETE + 'treibstoff.jpg' },
        { name: 'Triopan', bild: GERAETE + 'triopan.jpg' },
        { name: 'Unterlegplatten 350x350 mm', bild: GERAETE + 'unterlegholz_g2.jpg' },
        { name: 'Verkehrsleitkegel', bild: GERAETE + 'verkehrsleitkegel.jpg' },
        { name: 'Verlängerungskabel 230 V', bild: GERAETE + 'verlängerungskabel230v.jpg' }
    ],
    'Geräteraum 3': [
        { name: 'Akkuschrauber', bild: GERAETE + 'akkuschrauber.jpg' },
        { name: 'Arbeitsleine', bild: GERAETE + 'arbeitsleine.jpg' },
        { name: 'Bindestränge', bild: GERAETE + 'bindenstränge.jpg' },
        { name: 'Kleinwerkzeug', bild: GERAETE + 'kleinwerkzeug.jpg' },
        { name: 'Lichtstativ - RLS 2000', bild: GERAETE + 'lichtstativ.jpg' },
        { name: 'Rundschlinge 3 to / 2 m', bild: GERAETE + 'rundschlingen.jpg' },
        { name: 'Rundschlinge 6 to / 6 m', bild: GERAETE + 'rundschlingen.jpg' },
        { name: 'Schäkel 12 t', bild: GERAETE + 'schäkel.jpg' },
        { name: 'Schäkel 6,5 t', bild: GERAETE + 'schäkel.jpg' },
        { name: 'Schlagbohrmaschine', bild: GERAETE + 'schlagbohrmaschine.jpg' },
        { name: 'Schlagschrauber', bild: GERAETE + 'schlagschrauber.jpg' },
        { name: 'Spanngurte 8 Meter', bild: GERAETE + 'spanngurt.jpg' },
        { name: 'Windenkeile', bild: GERAETE + 'windenkeile.jpg' }
    ],
    'Geräteraum 4': [
        { name: 'Chemieschutzhandschuhe', bild: GERAETE + 'chemieschutzhandschuhe.jpg' },
        { name: 'Druckschlauch HD', bild: GERAETE + 'hd_druckschlauch.jpg' },
        { name: 'Druckschläuche B', bild: GERAETE + 'b_druckschlauch.jpg' },
        { name: 'Druckschläuche C', bild: GERAETE + 'c_druckschlauch.jpg' },
        { name: 'HD-Strahlrohr', bild: GERAETE + 'hd_strahlrohr.jpg' },
        { name: 'Schlauchbrücke', bild: GERAETE + 'schlauchbrücke.jpg' },
        { name: 'Wathose', bild: GERAETE + 'wathose.jpg' },
    ],
    'Geräteraum 5': [
        { name: 'Absperrventil', bild: GERAETE + 'absperrventil_am_schlauchpaket.jpg' },
        { name: 'Druckbegrenzungsventil', bild: GERAETE + 'druckbegrenzung.jpg' },
        { name: 'Drucksammelstück', bild: GERAETE + 'drucksammelstück.jpg' },
        { name: 'Druckschläuche B', bild: GERAETE + 'b_druckschlauch_g5.jpg' },
        { name: 'Flankierschlauch B', bild: GERAETE + 'flankierschlauch.jpg' },
        { name: 'Hohlstrahlrohr', bild: GERAETE + 'hohlstrahlrohr.jpg' },
        { name: 'Hohlstrahlrohr Schlauchpaket', bild: GERAETE + 'schlauchpaket.jpg' },
        { name: 'Hydroschild', bild: GERAETE + 'hydroschild.jpg' },
        { name: 'Kanalspülgerät', bild: GERAETE + 'kanalspülgerät.jpg' },
        { name: 'Kupplungsschlüssel ABC', bild: GERAETE + 'kupplungsschlüssel_abc.jpg' },
        { name: 'Kupplungsschlüssel HD', bild: GERAETE + 'kupplungsschlüssel_hd.jpg' },
        { name: 'Kupplungsschlüssel A125', bild: GERAETE + 'kupplungsschlüssel_a125.jpg' },
        { name: 'Mehrzweckstrahlrohr B', bild: GERAETE + 'strahlrohr_b.jpg' },
        { name: 'Mehrzweckstrahlrohr C', bild: GERAETE + 'strahlrohr_c.jpg' },
        { name: 'Ölbindemittel', bild: GERAETE + 'ölbindemittel.jpg' },
        { name: 'Ölsaugmatte', bild: GERAETE + 'ölsaugmatten.jpg' },
        { name: 'Rauchvorhang', bild: GERAETE + 'rauchvorhang.jpg' },
        { name: 'Schlauchbindensack', bild: GERAETE + 'schlauchbinden.jpg' },
        { name: 'Schlauchhalter', bild: GERAETE + 'schlauchhalter.jpg' },
        { name: 'Schlauchtragekorb 1', bild: GERAETE + 'schlauchtragkorb.jpg' },
        { name: 'Schlauchtragekorb 2', bild: GERAETE + 'schlauchtragkorb.jpg' },
        { name: 'Stützkrümmer B', bild: GERAETE + 'stützkrümmer.jpg' },
        { name: 'Überflurhydrantenschlüssel', bild: GERAETE + 'hydrantenschlüssel.jpg' },
        { name: 'Übergangsstück A-B', bild: GERAETE + 'übergang_a_b.jpg' },
        { name: 'Übergangsstück A125-A110', bild: GERAETE + 'ubergangsstuck_a125_a110.jpg' },
        { name: 'Übergangsstück B-C', bild: GERAETE + 'übergang_b_c.jpg' },
        { name: 'Verteiler', bild: GERAETE + 'verteiler.jpg' },
    ],
    'Geräteraum 6': [
        { name: 'Feuerlöscher Co2 5 kg', bild: GERAETE + 'feuerlöscher_co2.jpg' },
        { name: 'Feuerlöscher Pulver 12 kg', bild: GERAETE + 'feuerlöscher_pulver.jpg' },
        { name: 'Feuerlöscher Schaum 9 Liter', bild: GERAETE + 'feuerlöscher_schaum.jpg' },
        { name: 'Flankierschlauch B', bild: GERAETE + 'g6_flankierschlauch.jpg' },
        { name: 'Hygieneset', bild: GERAETE + 'hygieneset.jpg' },
        { name: 'Kombischaumrohr S2/M2', bild: GERAETE + 'kombischaumrohr.jpg' },
        { name: 'Löschdecke', bild: GERAETE + 'loschdecke.jpg' },
        { name: 'Löscheimer', bild: GERAETE + 'löscheimer.jpg' },
        { name: 'Saugschlauch HD', bild: GERAETE + 'saugschlauch_hd.jpg' },
        { name: 'Schaumaufsatz HD', bild: GERAETE + 'schaumaufsatz_hd.jpg' },
        { name: 'Schaummittel', bild: GERAETE + 'schaummittel.jpg' },
        { name: 'Übergangsstück B-C', bild: GERAETE + 'g6_ueber_b_c.jpg' },
        { name: 'Zumischer verbaut', bild: GERAETE + 'zumischer_verbaut.jpg' },
        { name: 'Zumischer', bild: GERAETE + 'zumischer_lose.jpg' },
    ],
    
    'Geräteraum 7': [
        { name: 'Abschleppstange', bild: GERAETE + 'abschleppstange.jpg' },
        { name: 'HD-Strahlrohr', bild: GERAETE + 'hd-strahlrohr.jpg' },
        { name: 'Hochdruckschlauch auf Haspel hinten', bild: GERAETE + 'hochdruckschlauch_haspel.jpg' },
    ],
    'Mannschaftsraum': [
        { name: 'Atemschutzüberwachung', bild: GERAETE + 'atemschutzuberwachung.jpg' },
        { name: 'Erste Hilfe Rucksack', bild: GERAETE + 'erste_hilfe.jpg' },
        { name: 'Feuerwehrgurt', bild: GERAETE + 'wolldecken.jpg' },
        { name: 'Handfunkgerät', bild: GERAETE + 'handfunkgerät.jpg' },
        { name: 'Kamera', bild: GERAETE + 'kamera.jpg' },
        { name: 'LED Handlampe', bild: GERAETE + 'led_lampe.jpg' },
        { name: 'Luftdruckschlauch LKW', bild: GERAETE + 'wolldecken.jpg' },
        { name: 'Pannendreieck', bild: GERAETE + 'wolldecken.jpg' },
        { name: 'Rettungsleine', bild: GERAETE + 'rettungsleine.jpg' },
        { name: 'Tragetuch', bild: GERAETE + 'tragetuch.jpg' },
        { name: 'Wärmebildkamera', bild: GERAETE + 'wärmebild.jpg' },
        { name: 'Warnüberwurf AS-Sammelplatz', bild: GERAETE + 'warnuberwurf_as_sammelplatz.jpg' },
        { name: 'Warnüberwurf Feuerwehr', bild: GERAETE + 'warnüberwurf_ff.jpg' },
        { name: 'Winkerkelle', bild: GERAETE + 'winkerkelle.jpg' },
        { name: 'Wolldecken', bild: GERAETE + 'wolldecken.jpg' },
    ]
}