package com.example.HerramientaTrabajo.service;

import com.example.HerramientaTrabajo.model.Receta;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecetaService {

    private List<Receta> data = new ArrayList<>();

    @PostConstruct
    public void init() {
        data.add(new Receta("Arroz con Pollo", "Económico y fácil", 12, "almuerzo"));
        data.add(new Receta("Lomo Saltado", "Clásico peruano", 20, "almuerzo"));
        data.add(new Receta("Ceviche", "Fresco y delicioso", 25, "almuerzo"));
    }

    public List<Receta> recomendar(String nombre, int presupuesto, String momento) {

        List<Receta> resultado = new ArrayList<>();

        for (Receta r : data) {

            int puntos = 0;

            if (r.getNombre().toLowerCase().contains(nombre.toLowerCase())) {
                puntos++;
            }

            if (presupuesto == 0 || r.getPrecio() <= presupuesto) {
                puntos++;
            }

            if (momento.isEmpty() || r.getMomento().equalsIgnoreCase(momento)) {
                puntos++;
            }

            if (puntos >= 2) {
                resultado.add(r);
            }
        }

        return resultado;
    }

    public List<Receta> getAllRecetas() {
        return data;
    }

    public Receta saveReceta(Receta receta) {
        // Lógica para nuevo o edición
        if (receta.getId() == null || receta.getId() == 0) {
            receta.setId(System.currentTimeMillis()); // ID simple para el ejemplo
            data.add(receta);
        } else {
            data = data.stream().map(r -> r.getId().equals(receta.getId()) ? receta : r).collect(Collectors.toList());
        }
        return receta;
    }

    public void deleteReceta(Long id) {
        data.removeIf(r -> r.getId().equals(id));
    }
}