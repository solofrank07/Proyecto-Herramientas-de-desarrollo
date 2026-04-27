package com.example.HerramientaTrabajo.model;

public class Receta {

    private String nombre;
    private String descripcion;
    private int precio;
    private String momento;

    public Receta(String nombre, String descripcion, int precio, String momento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.momento = momento;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public int getPrecio() {
        return precio;
    }

    public String getMomento() {
        return momento;
    }
}