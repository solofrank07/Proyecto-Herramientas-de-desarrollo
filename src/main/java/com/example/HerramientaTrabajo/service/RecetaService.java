package com.example.HerramientaTrabajo.service;

import com.example.HerramientaTrabajo.model.Receta;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecetaService {

    private List<Receta> data = List.of(
            new Receta("Arroz con Pollo", "Económico y fácil", 12, "almuerzo"),
            new Receta("Lomo Saltado", "Clásico peruano", 20, "almuerzo"),
            new Receta("Ceviche", "Fresco y delicioso", 25, "almuerzo"),
            new Receta("Arroz Chaufa", "Rápido y barato", 10, "cena"),
            new Receta("Ají de Gallina", "Cremoso y sabroso", 15, "almuerzo"),
            new Receta("Tallarines Verdes", "Ligero y casero", 11, "cena")
    );

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
}