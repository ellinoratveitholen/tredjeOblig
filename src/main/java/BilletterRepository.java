import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BilletterRepository {

    @Autowired
    private JdbcTemplate db; //oppretter et db-objekt som gjør det mulig å skrive spørringer til databasen for å hente ut informasjonen vi trenger/akssesere databasen

    public void lagreBillett(Billett innBillett){
        String sql= "INSERT INTO billett (film,antall,fornavn, etternavn,telefonnr, epost) VALUES (?,?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(),innBillett.getAntall(),innBillett.getFornavn(),innBillett.getEtternavn(), innBillett.getTelefonnr(),innBillett.getEpost());
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM billett";
        List<Billett> alleBilletter=db.query(sql,new BeanPropertyRowMapper(Billett.class));

        return alleBilletter;
    }

    public void slettAlleBilletter(){
        String sql = "DELETE FROM billett";
        db.update(sql);
    }

}
