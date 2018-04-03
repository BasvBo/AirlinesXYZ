package nl.yacht.airlinesXYZ.repository;

import nl.yacht.airlinesXYZ.model.Airplane;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


//standard CRUD
@Repository
public interface AirplaneRepository extends CrudRepository<Airplane, Long> {
}
