function registrerKjop(){
    const billett= { //henter inputverdiene og det lages en billett
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };


    let errorCount = 0;
    //oppretter feilmelding hvis input mangler tekst:

    if (billett.film===""){
        $("#filmError").text("Må velge en film")
        errorCount++
    }
    else {
        $("#antallError").text("")
    }

    if (billett.antall === ""){
        $("#antallError").text("Må skrive inn et antall")
        errorCount++
    }
    else {
        $("#antallError").text("")
    }

    if (billett.fornavn === ""){
        $("#fornavnError").text("Må skrive inn et fornavn")
        errorCount++
    }
    else {
        $("#fornavnError").text("")
    }

    if (billett.etternavn === ""){
        $("#etternavnError").text("Må skrive inn et etternavn")
        errorCount++
    }
    else {
        $("#etternavnError").text("")
    }

    var bokstaver=/^[A-Za-z]+$/; //hvis bokstaver blir fylt inn i telefonnr så kommer det feilmelding
    if (billett.telefonnr === ""||billett.telefonnr.match(bokstaver)){
        $("#telefonnrError").text("Må skrive inn et telefonnummer")
        errorCount++
    }
    else {
        $("#telefonnrError").text("")
    }

    if (billett.epost === ""){
        $("#epostError").text("Må skrive inn epost")
        errorCount++
    }
    else {
        $("#epostError").text("")
    }

    if(errorCount === 0){ //hvis alle felter er fylt ut blir billetten kjøpt, hvis noen inputfelt mangler tekst må de fylles ut for å kunne kjøpe billetten


        $.post("/lagre",billett,function (){// hvis all input er fylt ut så legges billettene inn i databasen
            hentBillettene();
        });

        //nullstiller billetkjøpet slik at feltene blir tomme:
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

function hentBillettene(){ //kaller på visBillett funksjonen og henter data fra inputen
    $.get("/hentBillettene", function (data){
        visBillett(data)
    })
}


function visBillett(billettKjop) {
    //skriver ut billettene og lager ett oppsett som legges under "Alle billetter", styler med boostrap for å få billetene i tabeller og la til "hover" element

    let ut = "<table class='table table-striped table-bordered'><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (let b of billettKjop) {
        ut += "<tr>";
        ut += "<td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn + "</td><td>" + b.etternavn + "</td><td>" + b.telefonnr + "</td><td>" + b.epost + "</td></td>";
        ut += "</tr>";
    }
    ut+="</table>";
    $("#billettKjop").html(ut);//henter ut info fra input-feltene
}


function slettBillett(){
    //når knappen " slett billetter" blir trykket på, slettes alle billetter inne i arrayelisten og arrayet tømmes.
    $.get("/slettBilletter", function (){
        hentBillettene();
    });
}