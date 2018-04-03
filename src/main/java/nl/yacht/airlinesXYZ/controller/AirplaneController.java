package nl.yacht.airlinesXYZ.controller;

import nl.yacht.airlinesXYZ.model.Airplane;
import nl.yacht.airlinesXYZ.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/airplane")
public class AirplaneController {

    @Autowired
    private AirplaneRepository airplaneRepository;


    //get al airplanes
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Airplane> getAll() {
        Iterable<Airplane> airplanes = this.airplaneRepository.findAll();
        return airplanes;
    }

    //save airplane
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Airplane creat(@RequestBody Airplane airplane) {
        return this.airplaneRepository.save(airplane);
    }

    //change existing airplane
    @PutMapping(value = "{id}")
    public Airplane update(@PathVariable Long id, @RequestBody Airplane input) {
        return this.airplaneRepository.save(input);
    }

    //delete airplane
    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable Long id) {
        this.airplaneRepository.deleteById(id);
    }

}

