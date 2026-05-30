package com.example.HerramientaTrabajo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "receta")
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String descripcion;

    @Column(name = "precio_estimado")
    private Double precioEstimado;

    @Column(name = "tipo_comida")
    private String tipoComida;

    public Receta() {
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Double getPrecioEstimado() {
        return precioEstimado;
    }

    public String getTipoComida() {
        return tipoComida;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setPrecioEstimado(Double precioEstimado) {
        this.precioEstimado = precioEstimado;
    }

    public void setTipoComida(String tipoComida) {
        this.tipoComida = tipoComida;
    }
}