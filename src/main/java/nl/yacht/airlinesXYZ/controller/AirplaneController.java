package nl.yacht.airlinesXYZ.controller;

import nl.yacht.airlinesXYZ.model.Airplane;
import nl.yacht.airlinesXYZ.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/airplane")
public class AirplaneController {

    @Autowired
    private AirplaneRepository airplaneRepository;


    @RequestMapping(value = "",method = RequestMethod.GET)
    public Iterable<Airplane> getAll(){
        Iterable<Airplane> airplanes = this.airplaneRepository.findAll();
        return airplanes;
    }

    @RequestMapping(value = "",method = RequestMethod.POST)
    public Airplane creat(@RequestBody Airplane airplane){
        return this.airplaneRepository.save(airplane);
    }
}
