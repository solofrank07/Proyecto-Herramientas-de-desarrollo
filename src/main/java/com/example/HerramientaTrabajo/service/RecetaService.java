package com.example.HerramientaTrabajo.service;

import com.example.HerramientaTrabajo.model.Receta;
import com.example.HerramientaTrabajo.repository.RecetaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecetaService {

    private final RecetaRepository repo;

    public RecetaService(RecetaRepository repo) {
        this.repo = repo;
    }

    public List<Receta> recomendar(String nombre, int presupuesto, String momento) {

        List<Receta> recetas = repo.findAll();

        return recetas.stream()
                .filter(r ->
                        (nombre.isEmpty() ||
                                r.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                                &&
                                (presupuesto == 0 ||
                                        r.getPrecioEstimado() <= presupuesto)
                                &&
                                (momento.isEmpty() ||
                                        r.getTipoComida().equalsIgnoreCase(momento))
                )
                .collect(Collectors.toList());
    }

    public List<Receta> listarTodas() {
        return repo.findAll();
    }

    public Receta guardar(Receta receta) {
        return repo.save(receta);
    }

    public Receta buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Receta actualizar(Long id, Receta nuevaReceta) {

        Receta receta = repo.findById(id).orElse(null);

        if (receta == null) {
            return null;
        }

        receta.setNombre(nuevaReceta.getNombre());
        receta.setDescripcion(nuevaReceta.getDescripcion());
        receta.setPrecioEstimado(nuevaReceta.getPrecioEstimado());
        receta.setTipoComida(nuevaReceta.getTipoComida());

        return repo.save(receta);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}