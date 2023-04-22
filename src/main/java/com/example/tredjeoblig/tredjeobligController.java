package com.example.tredjeoblig;

import com.example.tredjeoblig.Billett;
import com.example.tredjeoblig.BilletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class tredjeobligController {
    @Autowired
    private BilletterRepository rep;//oppretter en database for billettene

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett){ //sender data som lagres på serveren
        rep.lagreBillett(innBillett); //legger til billettene i databasen
    }

    @GetMapping("/hentBillettene")
    public List<Billett> hentBilletter(){ //henter inputverdiene fra klienten
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettBilletter")
    public void slettBillett(){//når "slett alle billettene" blir trykket, nullstilles labelene og vi gir beskjed til sereveren at billettene skal slettes
        rep.slettAlleBilletter();
    }
}
