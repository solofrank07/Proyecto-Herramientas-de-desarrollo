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

    public List<Receta> recomendar(String query, String difficulty, String category) {
        return data.stream()
                .filter(receta -> {
                    // El backend debe ser robusto y manejar valores nulos o vacíos
                    boolean matchCategory = category == null || category.isEmpty() || category.equalsIgnoreCase("Todas") ||
                            (receta.getTipoComida() != null && receta.getTipoComida().equalsIgnoreCase(category));

                    boolean matchDifficulty = difficulty == null || difficulty.isEmpty() || difficulty.equalsIgnoreCase("all") ||
                            (receta.getDificultad() != null && receta.getDificultad().equalsIgnoreCase(difficulty));

                    boolean matchQuery = query == null || query.isEmpty() ||
                            (receta.getNombre() != null && receta.getNombre().toLowerCase().contains(query.toLowerCase())) ||
                            (receta.getIngredientes() != null && receta.getIngredientes().stream()
                                    .anyMatch(ing -> ing.toLowerCase().contains(query.toLowerCase())));

                    return matchCategory && matchDifficulty && matchQuery;
                })
                .collect(Collectors.toList());
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