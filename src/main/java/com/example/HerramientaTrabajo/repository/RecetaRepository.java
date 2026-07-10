package com.example.HerramientaTrabajo.repository;

import com.example.HerramientaTrabajo.model.Receta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecetaRepository extends JpaRepository<Receta, Long> {
}