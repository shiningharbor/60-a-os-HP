"use client"

import db from "@/db/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Field, Form, Formik } from "formik"
import type { Dispatch, SetStateAction } from "react"
import * as Yup from "yup"

const COLLECTION_NAME = "HP-60-Satisfaccion"

const opciones = [
  { valor: "muy_satisfecho", texto: "Muy satisfecho(a)" },
  { valor: "algo_satisfecho", texto: "Algo satisfecho(a)" },
  { valor: "algo_insatisfecho", texto: "Algo insatisfecho(a)" },
  { valor: "muy_insatisfecho", texto: "Muy insatisfecho(a)" },
] as const

const secciones = [
  {
    titulo: "Recepción y Bienvenida",
    preguntas: [
      {
        id: "agilidad_acceso",
        texto: "Agilidad y organización en el acceso al evento",
      },
      {
        id: "atencion_recepcion",
        texto: "Atención y cortesía del personal de recepción",
      },
      {
        id: "asignacion_mesas",
        texto: "Asignación de mesas y claridad en las indicaciones de bienvenida",
      },
    ],
  },
  {
    titulo: "Sede, Ambientación y Limpieza",
    preguntas: [
      {
        id: "ambientacion_recinto",
        texto: "Ambientación general del recinto",
      },
      {
        id: "comodidad_espacio",
        texto: "Comodidad de las mesas y distribución del espacio",
      },
      {
        id: "produccion_audiovisual",
        texto: "Calidad de la producción audiovisual (iluminación, acústica, proyección)",
      },
    ],
  },
  {
    titulo: "Banquete y Servicio",
    preguntas: [
      {
        id: "calidad_cena",
        texto: "Sabor, presentación y calidad de la cena",
      },
      {
        id: "atencion_meseros",
        texto: "Atención, profesionalismo y amabilidad de los meseros",
      },
      {
        id: "cocteleria_bebidas",
        texto: "Calidad y variedad de la coctelería y bebidas",
      },
    ],
  },
  {
    titulo: "Experiencia Global",
    preguntas: [
      {
        id: "satisfaccion_general",
        texto: "¿Qué tan satisfecho(a) estás con el evento en general?",
      },
    ],
  },
] as const

const initialValues = {
  nombre: "",
  empresa: "",
  agilidad_acceso: "",
  atencion_recepcion: "",
  asignacion_mesas: "",
  ambientacion_recinto: "",
  comodidad_espacio: "",
  produccion_audiovisual: "",
  calidad_cena: "",
  atencion_meseros: "",
  cocteleria_bebidas: "",
  satisfaccion_general: "",
}

type SatisfactionValues = typeof initialValues