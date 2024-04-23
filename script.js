// JavaScript (script.js)

// Objekt zum Speichern der Bildpfade für jeden Bereich und Zustand
var bilderPfade = {
    'Ausgangsansicht': {
        'geöffnet': 'assets/rechts_gesamt_offen.jpg',
        'geschlossen': 'assets/rechts_gesamt_geschlossen.jpg'
    },
    'Dachbox': {
        'geöffnet': 'assets/dachbox_offen.jpg',
        'geschlossen': 'assets/dachbox_geschlossen.jpg'
    },
    'Fahrerraum': {
        'geöffnet': 'assets/fahrerraum.jpg',
        'geschlossen': 'assets/fahrer_mann_offen.jpg'
    },
    'Mannschaftsraum': {
        'geöffnet': 'assets/mannschaft.jpg',
        'geschlossen': 'assets/fahrer_mann_offen.jpg'
    },
    'Geräteraum 1': {
        'geöffnet': 'assets/geräteraum_1_offen.jpg',
        'geschlossen': 'assets/geräteraum_1_geschlossen.jpg'
    },
    'Geräteraum 2': {
        'geöffnet': 'assets/geräteraum_2_offen.jpg',
        'geschlossen': 'assets/geräteraum_2_geschlossen.jpg'
    },
    'Geräteraum 3': {
        'geöffnet': 'assets/geräteraum_3_offen.jpg',
        'geschlossen': 'assets/geräteraum_3_geschlossen.jpg'
    },
    'Geräteraum 4': {
        'geöffnet': 'assets/geräteraum_4_offen.jpg',
        'geschlossen': 'assets/geräteraum_4_geschlossen.jpg'
    },
    'Geräteraum 5': {
        'geöffnet': 'assets/geräteraum_5_offen.jpg',
        'geschlossen': 'assets/geräteraum_5_geschlossen.jpg'
    },
    'Geräteraum 6': {
        'geöffnet': 'assets/geräteraum_6_offen.jpg',
        'geschlossen': 'assets/geräteraum_6_geschlossen.jpg'
    },
    'Geräteraum 7': {
        'geöffnet': 'assets/hinten_offen.jpg',
        'geschlossen': 'assets/geräteraum_7_geschlossen.jpg'
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
        { name: 'Abdeckplane', bild: 'assets/geraete/abdeckplane.jpg' },
        { name: 'Absperrpflöcke', bild: 'assets/geraete/absperrpflöcke.jpg' },
        { name: 'Auffanggurt', bild: 'assets/geraete/auffanggurt.jpg' },
        { name: 'Bandschlinge 100 cm', bild: 'assets/geraete/bandschlinge_100cm.jpg' },
        { name: 'Bandschlinge 40 cm', bild: 'assets/geraete/bandschlinge_40cm.jpg' },
        { name: 'Bandschlinge 50 cm', bild: 'assets/geraete/bandschlinge_50cm.jpg' },
        { name: 'Bandschlinge 60 cm', bild: 'assets/geraete/bandschlinge_60cm.jpg' },
        { name: 'Bandschlinge 80 cm', bild: 'assets/geraete/bandschlinge_80cm.jpg' },
        { name: 'Besen', bild: 'assets/geraete/besen.jpg' },
        { name: 'Deckenstützen', bild: 'assets/geraete/deckenstutzen.jpg' },
        { name: 'Feuerpatsche', bild: 'assets/geraete/feuerpatsche.jpg' },
        { name: 'Karabiner', bild: 'assets/geraete/karabiner.jpg' },
        { name: 'Korbtrage', bild: 'assets/geraete/korbtrage.jpg' },
        { name: 'Lichtmasten', bild: 'assets/geraete/lichtmasten.jpg' },
        { name: 'Rettungstuch - Dreieckig', bild: 'assets/geraete/rettungstuch_dreieckig.jpg' },
        { name: 'Rundschlinge 8 to / 2 m', bild: 'assets/geraete/rundschlinge_8to_2m.jpg' },
        { name: 'Schaufel', bild: 'assets/geraete/schaufel.jpg' },
        { name: 'Schiebeleiter 2-teilig', bild: 'assets/geraete/schiebeleiter_2-teilig.jpg' },
        { name: 'Spaten', bild: 'assets/geraete/spaten.jpg' },
        { name: 'Steckleiter', bild: 'assets/geraete/steckleiter.jpg' },
        { name: 'Umlenkrolle f. Personensicherung', bild: 'assets/geraete/umlenkrolle_personensicherung.jpg' },
        { name: 'Unterbauholz 10x10x100', bild: 'assets/geraete/unterbauholz_10x10x100.jpg' },
        { name: 'Unterbauholz 10x10x250', bild: 'assets/geraete/unterbauholz_10x10x250.jpg' },
        { name: 'Unterbauholz 5x8x100', bild: 'assets/geraete/unterbauholz_5x8x100.jpg' },
        { name: 'Unterbauholz Allgemein', bild: 'assets/geraete/unterbauholz_allgemein.jpg' },
        { name: 'Unterlegplatten 430x1500 mm', bild: 'assets/geraete/unterlegplatten_430x1500mm.jpg' },
        { name: 'Wasserwerfer', bild: 'assets/geraete/wasserwerfer.jpg' }
    ],
    'Fahrerraum': [
        { name: 'LED Handlampe', bild: 'assets/geraete/fahrer_handlampe_handfunk.jpg' },
        { name: 'Fahrerraum Funkgerät', bild: 'assets/geraete/fahrer_handlampe_handfunk.jpg' },
        { name: 'Einsatzleiter Überwurf', bild: 'assets/geraete/el_überwurf.jpg' },
        { name: 'GRKT Überwurf', bild: 'assets/geraete/grk_überwurf.jpg' },
        // Weitere Geräte für den Bereich Fahrerraum hier hinzufügen
    ],
    'Geräteraum 1': [
        { name: 'Abschleppseil', bild: 'assets/geraete/abschleppseil.jpg' },
        { name: 'Airbagsicherung', bild: 'assets/geraete/airbag_sicherung.jpg' },
        { name: 'Akkutrennschleifer groß', bild: 'assets/geraete/trennschleifer_akku.jpg' },
        { name: 'Armaturdruckplatte', bild: 'assets/geraete/amaturdruckplatte.jpg' },
        { name: 'Auffangwannenset', bild: 'assets/geraete/auffangwanne.jpg' },
        { name: 'Beleuchtung', bild: 'assets/geraete/beleuchtung_stativ.jpg' },
        { name: 'Freilandverankerung', bild: 'assets/geraete/freilandverankerung.jpg' },
        { name: 'Glasmanagementkoffer', bild: 'assets/geraete/glasmanagment.jpg' },
        { name: 'Greifzug 16kN', bild: 'assets/geraete/greifzug.jpg' },
        { name: 'Greifzugseil', bild: 'assets/geraete/greifzug_seil.jpg' },
        { name: 'Hooligan-Tool', bild: 'assets/geraete/hooligan_tool.jpg' },
        { name: 'Hydraulikaggregat', bild: 'assets/geraete/hydraulikaggregat.jpg' },
        { name: 'Kettengehänge 1 (einsträngig)', bild: 'assets/geraete/kettengehange_1_einstrangig.jpg' },
        { name: 'Kettengehänge 2 (zweisträngig)', bild: 'assets/geraete/kettengehange_2_zweistrangig.jpg' },
        { name: 'Kettengehänge für Spreitzer', bild: 'assets/geraete/spreizer_kettengehänge.jpg' },
        { name: 'Radkeile', bild: 'assets/geraete/radkeile.jpg' },
        { name: 'Rettungsplattform', bild: 'assets/geraete/rettungsplattform.jpg' },
        { name: 'Rettungszylinder', bild: 'assets/geraete/rettungszylinder.jpg' },
        { name: 'Säbelsäge Akku', bild: 'assets/geraete/säbelsäge_akku.jpg' },
        { name: 'Schere', bild: 'assets/geraete/schere.jpg' },
        { name: 'Schnittschutz Hose', bild: 'assets/geraete/schnittschutzhose.jpg' },
        { name: 'Schutzdeckensett', bild: 'assets/geraete/schutzdeckenset.jpg' },
        { name: 'Schwelleraufsatz', bild: 'assets/geraete/schwelleraufsatz.jpg' },
        { name: 'Seilstropp 10 Meter', bild: 'assets/geraete/seilstropp_10m.jpg' },
        { name: 'Seilstropp 2,5 Meter', bild: 'assets/geraete/seilstropp_2_5m.jpg' },
        { name: 'Seilstropp 5 Meter', bild: 'assets/geraete/seilstropp_5m.jpg' },
        { name: 'Spineboard', bild: 'assets/geraete/spineboard.jpg' },
        { name: 'Spreizer', bild: 'assets/geraete/spreizer.jpg' },
        { name: 'Stabfast', bild: 'assets/geraete/stabfast.jpg' },
        { name: 'Stabfast Zubehör', bild: 'assets/geraete/stabfast_zubehör.jpg' },
        { name: 'Stabpack', bild: 'assets/geraete/stabpack.jpg' },
        { name: 'Trenngerät Akku', bild: 'assets/geraete/trenngerat_akku.jpg' },
        { name: 'Umlenkrollen', bild: 'assets/geraete/umlenkrollen.jpg' },
        { name: 'Unterbauholz 10x10x40 cm', bild: 'assets/geraete/unterbauholz_10x10x40cm.jpg' },
        { name: 'Unterlegplatten 340x440 mm', bild: 'assets/geraete/unterlegplatten_340x440mm.jpg' },
        { name: 'Unterlegskeile', bild: 'assets/geraete/unterlegskeile.jpg' },
        { name: 'Werkzeugkoffer', bild: 'assets/geraete/werkzeugkoffer.jpg' },
        { name: 'Wagenheber', bild: 'assets/geraete/wagenheber.jpg' }
    ],
    'Geräteraum 2': [
        { name: 'Absperrband', bild: 'assets/geraete/absperrband.jpg' },
        { name: 'Arbeitsmesser', bild: 'assets/geraete/arbeitsmesser.jpg' },
        { name: 'Besen', bild: 'assets/geraete/besen.jpg' },
        { name: 'Bolzenscherre', bild: 'assets/geraete/bolzenschere.jpg' },
        { name: 'Brechstange (kurz)', bild: 'assets/geraete/brechstange_kurz.jpg' },
        { name: 'Brechstange (lang)', bild: 'assets/geraete/brechstange_lang.jpg' },
        { name: 'Eckrohrzange', bild: 'assets/geraete/eckrohrzange.jpg' },
        { name: 'Feuerwehraxt', bild: 'assets/geraete/feuerwehraxt.jpg' },
        { name: 'Hammer 2kg', bild: 'assets/geraete/hammer2kg.jpg' },
        { name: 'Hammer 5kg', bild: 'assets/geraete/hammer5kg.jpg' },
        { name: 'Hebekissen Steuerorgan', bild: 'assets/geraete/hebekissen.jpg' },
        { name: 'Hebekissen V 10', bild: 'assets/geraete/hebekissen.jpg' },
        { name: 'Hebekissen V 12', bild: 'assets/geraete/hebekissen.jpg' },
        { name: 'Hebekissen V 20', bild: 'assets/geraete/hebekissen.jpg' },
        { name: 'Hochleistungslüfter', bild: 'assets/geraete/lüfter.jpg' },
        { name: 'Holzaxt groß', bild: 'assets/geraete/holzaxt_groß.jpg' },
        { name: 'Holzaxt klein', bild: 'assets/geraete/holzaxt_klein.jpg' },
        { name: 'Holzsappel', bild: 'assets/geraete/holzsappel.jpg' },
        { name: 'Holzspalthammer', bild: 'assets/geraete/holzspalthammer.jpg' },
        { name: 'Kabeltrommel 16 A', bild: 'assets/geraete/kabeltrommel16a.jpg' },
        { name: 'Kamintürschlüssel', bild: 'assets/geraete/kamintürschlüssel.jpg' },
        { name: 'Krampen', bild: 'assets/geraete/krampen.jpg' },
        { name: 'Lufthaspel', bild: 'assets/geraete/lufthaspel.jpg' },
        { name: 'Ölfass 25 Liter', bild: 'assets/geraete/ölfass.jpg' },
        { name: 'Ölsaugmatte', bild: 'assets/geraete/olsaugmatte.jpg' },
        { name: 'Pneumatisches Zubehör', bild: 'assets/geraete/luftschlauch.jpg' },
        { name: 'Rangierroller', bild: 'assets/geraete/rangierroller.jpg' },
        { name: 'Schachtheber', bild: 'assets/geraete/schachtheber.jpg' },
        { name: 'Hohlschaufel/Randschaufel', bild: 'assets/geraete/hohlschaufel_randschaufel.jpg' },
        { name: 'Signalleuchtenset (Powerflare)', bild: 'assets/geraete/signalleuchten.jpg' },
        { name: 'Tauchpumpe groß', bild: 'assets/geraete/tauchpumpe_Groß.jpg' },
        { name: 'Tauchpumpe', bild: 'assets/geraete/tauchpumpe_klein.jpg' },
        { name: 'Tragbarer Stromerzeuger', bild: 'assets/geraete/stromerzeuger.jpg' },
        { name: 'Triopan', bild: 'assets/geraete/triopan.jpg' },
        { name: 'Unterlegplatten 350x350 mm', bild: 'assets/geraete/unterlegplatten_350x350mm.jpg' },
        { name: 'Verkehrsleitkegel', bild: 'assets/geraete/verkehrsleitkegel.jpg' },
        { name: 'Verlängerungskabel 230 V', bild: 'assets/geraete/verlängerungskabel230v.jpg' }
    ],
    'Geräteraum 3': [
        { name: 'Akkuschrauber', bild: 'assets/geraete/akkuschrauber.jpg' },
        { name: 'Arbeitsleine', bild: 'assets/geraete/arbeitsleine.jpg' },
        { name: 'Bindestränge', bild: 'assets/geraete/bindenstränge.jpg' },
        { name: 'Kleinwerkzeug', bild: 'assets/geraete/kleinwerkzeug.jpg' },
        { name: 'Lichtstativ - RLS 2000', bild: 'assets/geraete/lichtstativ.jpg' },
        { name: 'Rundschlinge 3 to / 2 m', bild: 'assets/geraete/rundschlingen.jpg' },
        { name: 'Rundschlinge 6 to / 6 m', bild: 'assets/geraete/rundschlingen.jpg' },
        { name: 'Schäkel 12 t', bild: 'assets/geraete/schäkel.jpg' },
        { name: 'Schäkel 6,5 t', bild: 'assets/geraete/schäkel.jpg' },
        { name: 'Schlagbohrmaschine', bild: 'assets/geraete/schlagbohrmaschine.jpg' },
        { name: 'Schlagschrauber', bild: 'assets/geraete/schlagschrauber.jpg' },
        { name: 'Spanngurte 8 Meter', bild: 'assets/geraete/spanngurt.jpg' },
        { name: 'Windenkeile', bild: 'assets/geraete/windenkeile.jpg' }
    ],
    'Geräteraum 4': [
        { name: 'Chemieschutzhandschuhe', bild: 'assets/geraete/chemieschutzhandschuhe.jpg' },
        { name: 'Druckschlauch HD', bild: 'assets/geraete/hd_druckschlauch.jpg' },
        { name: 'Druckschläuche B', bild: 'assets/geraete/b_druckschlauch.jpg' },
        { name: 'Druckschläuche C', bild: 'assets/geraete/c_druckschlauch.jpg' },
        { name: 'HD-StrahlrohrRLFA', bild: 'assets/geraete/hd_strahlrohr.jpg' },
        { name: 'Schlauchbrücke', bild: 'assets/geraete/schlauchbrücke.jpg' },
        { name: 'Wathose', bild: 'assets/geraete/wathose.jpg' },
    ],
    'Geräteraum 5': [
        { name: 'Absperrventil', bild: 'assets/geraete/absperrventil_am_schlauchpaket.jpg' },
        { name: 'Druckbegrenzungsventil', bild: 'assets/geraete/druckbegrenzung.jpg' },
        { name: 'Drucksammelstück', bild: 'assets/geraete/drucksammelstück.jpg' },
        { name: 'Druckschläuche B', bild: 'assets/geraete/b_druckschlauch_g5.jpg' },
        { name: 'Flankierschlauch B', bild: 'assets/geraete/flankierschlauch.jpg' },
        { name: 'Hohlstrahlrohr', bild: 'assets/geraete/hohlstrahlrohr.jpg' },
        { name: 'Hohlstrahlrohr Schlauchpaket', bild: 'assets/geraete/schlauchpaket.jpg' },
        { name: 'Hydroschild', bild: 'assets/geraete/hydroschild.jpg' },
        { name: 'Kanalspülgerät', bild: 'assets/geraete/kanalspülgerät.jpg' },
        { name: 'Kupplungsschlüssel ABC', bild: 'assets/geraete/kupplungsschlüssel_abc.jpg' },
        { name: 'Kupplungsschlüssel HD', bild: 'assets/geraete/kupplungsschlüssel_hd.jpg' },
        { name: 'Kupplungsschlüssel A125', bild: 'assets/geraete/kupplungsschlüssel_a125.jpg' },
        { name: 'Mehrzweckstrahlrohr B', bild: 'assets/geraete/strahlrohr_b.jpg' },
        { name: 'Mehrzweckstrahlrohr C', bild: 'assets/geraete/strahlrohr_c.jpg' },
        { name: 'Ölbindemittel', bild: 'assets/geraete/ölbindemittel.jpg' },
        { name: 'Ölsaugmatte', bild: 'assets/geraete/ölsaugmatten.jpg' },
        { name: 'Rauchvorhang', bild: 'assets/geraete/rauchvorhang.jpg' },
        { name: 'Schlauchbindensack', bild: 'assets/geraete/schlauchbinden.jpg' },
        { name: 'Schlauchhalter', bild: 'assets/geraete/schlauchhalter.jpg' },
        { name: 'Schlauchtragekorb 1', bild: 'assets/geraete/schlauchtragkorb.jpg' },
        { name: 'Schlauchtragekorb 2', bild: 'assets/geraete/schlauchtragkorb.jpg' },
        { name: 'Stützkrümmer B', bild: 'assets/geraete/stützkrümmer.jpg' },
        { name: 'Überflurhydrantenschlüssel', bild: 'assets/geraete/hydrantenschlüssel.jpg' },
        { name: 'Übergangsstück A-B', bild: 'assets/geraete/übergang_a_b.jpg' },
        { name: 'Übergangsstück A125-A110', bild: 'assets/geraete/ubergangsstuck_a125_a110.jpg' },
        { name: 'Übergangsstück B-C', bild: 'assets/geraete/übergang_b_c.jpg' },
        { name: 'Verteiler', bild: 'assets/geraete/verteiler.jpg' },
    ],
    'Geräteraum 6': [
        { name: 'Feuerlöscher Co2 5 kg', bild: 'assets/geraete/feuerlöscher_co2.jpg' },
        { name: 'Feuerlöscher Pulver 12 kg', bild: 'assets/geraete/feuerlöscher_pulver.jpg' },
        { name: 'Feuerlöscher Schaum 9 Liter', bild: 'assets/geraete/feuerlöscher_schaum.jpg' },
        { name: 'Flankierschlauch B', bild: 'assets/geraete/g6_flankierschlauch.jpg' },
        { name: 'Hygieneset', bild: 'assets/geraete/hygieneset.jpg' },
        { name: 'Kombischaumrohr S2/M2', bild: 'assets/geraete/kombischaumrohr.jpg' },
        { name: 'Löschdecke', bild: 'assets/geraete/loschdecke.jpg' },
        { name: 'Löscheimer', bild: 'assets/geraete/löscheimer.jpg' },
        { name: 'Saugschlauch HD', bild: 'assets/geraete/saugschlauch_hd.jpg' },
        { name: 'Schaumaufsatz HD', bild: 'assets/geraete/schaumaufsatz_hd.jpg' },
        { name: 'Schaummittel', bild: 'assets/geraete/schaummittel.jpg' },
        { name: 'Übergangsstück B-C', bild: 'assets/geraete/g6_ueber_b_c.jpg' },
        { name: 'Zumischer verbaut', bild: 'assets/geraete/zumischer_verbaut.jpg' },
        { name: 'Zumischer', bild: 'assets/geraete/zumischer_lose.jpg' },
    ],
    
    'Geräteraum 7': [
        { name: 'Abschleppstange', bild: 'assets/geraete/abschleppstange.jpg' },
        { name: 'Feuerwehrgurt', bild: 'assets/geraete/feuerwehrgurt_geraum_7.jpg' },
        { name: 'Haspel f. Hochdruck hinten', bild: 'assets/geraete/hochdruckschlauch_haspel.jpg' },
        { name: 'HD-Strahlrohr', bild: 'assets/geraete/hd-strahlrohr.jpg' },
        { name: 'Hochdruckschlauch auf Haspel hinten', bild: 'assets/geraete/hochdruckschlauch_haspel.jpg' },
    ],
    'Mannschaftsraum': [
        { name: 'Atemschutzüberwachung', bild: 'assets/geraete/atemschutzuberwachung.jpg' },
        { name: 'Erste Hilfe Rucksack', bild: 'assets/geraete/erste_hilfe.jpg' },
        { name: 'Feuerwehrgurt', bild: 'assets/geraete/feuerwehrgurt_mannschaftsraum.jpg' },
        { name: 'Handfunkgerät', bild: 'assets/geraete/handfunkgerät.jpg' },
        { name: 'Kamera', bild: 'assets/geraete/kamera.jpg' },
        { name: 'LED Handlampe', bild: 'assets/geraete/led_lampe.jpg' },
        { name: 'Luftdruckschlauch LKW', bild: 'assets/geraete/luftdruckschlauch_lkw.jpg' },
        { name: 'Pannendreieck', bild: 'assets/geraete/pannendreieck.jpg' },
        { name: 'Rettungsleine', bild: 'assets/geraete/rettungsleine.jpg' },
        { name: 'Tragetuch', bild: 'assets/geraete/tragetuch.jpg' },
        { name: 'Wärmebildkamera', bild: 'assets/geraete/wärmebild.jpg' },
        { name: 'Warnüberwurf AS-Sammelplatz', bild: 'assets/geraete/warnuberwurf_as_sammelplatz.jpg' },
        { name: 'Warnüberwurf Feuerwehr', bild: 'assets/geraete/warnüberwurf_ff.jpg' },
        { name: 'Winkerkelle', bild: 'assets/geraete/winkerkelle.jpg' },
        { name: 'Wolldecken', bild: 'assets/geraete/wolldecken.jpg' },
    ]
}