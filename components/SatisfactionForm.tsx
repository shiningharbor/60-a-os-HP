
"use client"

import db from "../db/firebase"
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"

import {
  Field,
  Form,
  Formik,
} from "formik"

import type {
  Dispatch,
  SetStateAction,
} from "react"

import * as Yup from "yup"

// ====================================
// CONFIGURACIÓN
// ====================================

const COLLECTION_NAME = "HP-60-Satisfaccion"

type SatisfactionFormProps = {
  setEnviado: Dispatch<SetStateAction<boolean>>
}

// ====================================
// OPCIONES DE RESPUESTA
// ====================================

const opciones = [
  {
    valor: "muy_satisfecho",
    texto: "Muy satisfecho(a)",
  },
  {
    valor: "algo_satisfecho",
    texto: "Algo satisfecho(a)",
  },
  {
    valor: "algo_insatisfecho",
    texto: "Algo insatisfecho(a)",
  },
  {
    valor: "muy_insatisfecho",
    texto: "Muy insatisfecho(a)",
  },
] as const

// ====================================
// SECCIONES Y PREGUNTAS
// ====================================

const secciones = [
  {
    titulo: "Recepción y Bienvenida",
    preguntas: [
      {
        id: "agilidad_acceso",
        texto:
          "Agilidad y organización en el acceso al evento",
      },
      {
        id: "atencion_recepcion",
        texto:
          "Atención y cortesía del personal de recepción",
      },
      {
        id: "asignacion_mesas",
        texto:
          "Asignación de mesas y claridad en las indicaciones de bienvenida",
      },
    ],
  },
  {
    titulo: "Sede, Ambientación y Limpieza",
    preguntas: [
      {
        id: "ambientacion_recinto",
        texto:
          "Ambientación general del recinto",
      },
      {
        id: "comodidad_espacio",
        texto:
          "Comodidad de las mesas y distribución del espacio",
      },
      {
        id: "produccion_audiovisual",
        texto:
          "Calidad de la producción audiovisual (iluminación, acústica, proyección)",
      },
    ],
  },
  {
    titulo: "Banquete y Servicio",
    preguntas: [
      {
        id: "calidad_cena",
        texto:
          "Sabor, presentación y calidad de la cena",
      },
      {
        id: "atencion_meseros",
        texto:
          "Atención, profesionalismo y amabilidad de los meseros",
      },
      {
        id: "cocteleria_bebidas",
        texto:
          "Calidad y variedad de la coctelería y bebidas",
      },
    ],
  },
  {
    titulo: "Experiencia Global",
    preguntas: [
      {
        id: "satisfaccion_general",
        texto:
          "¿Qué tan satisfecho(a) estás con el evento en general?",
      },
    ],
  },
] as const

// ====================================
// VALORES INICIALES
// ====================================

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

// ====================================
// VALIDACIONES
// ====================================

const requiredResponse = Yup.string().required(
  "Selecciona una respuesta"
)

const validationSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .required("Ingresa tu nombre"),

  empresa: Yup.string()
    .trim()
    .required("Ingresa tu empresa"),

  agilidad_acceso: requiredResponse,
  atencion_recepcion: requiredResponse,
  asignacion_mesas: requiredResponse,

  ambientacion_recinto: requiredResponse,
  comodidad_espacio: requiredResponse,
  produccion_audiovisual: requiredResponse,

  calidad_cena: requiredResponse,
  atencion_meseros: requiredResponse,
  cocteleria_bebidas: requiredResponse,

  satisfaccion_general: requiredResponse,
})

// ====================================
// COMPONENTE PRINCIPAL
// ====================================

export default function SatisfactionForm({
  setEnviado,
}: SatisfactionFormProps) {
  return (
    <section className="w-full md:w-2/3 md:h-screen overflow-y-auto bg-white px-6 py-10 sm:px-10 lg:px-16 font-formaMicro">
      <div className="w-full max-w-4xl mx-auto">

        {/* ENCABEZADO */}

        <div className="mb-10">
          <p className="text-[#1e49cf] font-bold text-sm sm:text-base tracking-widest uppercase mb-3">
            HP | 60 Años
          </p>

          <h1 className="font-formaDisplay text-4xl sm:text-5xl lg:text-6xl text-[#1e49cf] leading-tight mb-4">
            Encuesta de satisfacción
          </h1>

          <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
            Innovando para el futuro de México
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Gracias por acompañarnos en esta celebración.
            Tu opinión es muy importante para nosotros.
            Te invitamos a evaluar tu experiencia durante
            el evento.
          </p>
        </div>

        {/* FORMULARIO */}

        <Formik<SatisfactionValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (
            values,
            { setSubmitting, setStatus }
          ) => {
            setStatus(undefined)

            try {
              // Guardar respuestas en Firebase
              await addDoc(
                collection(db, COLLECTION_NAME),
                {
                  ...values,
                  fechaEnvio: serverTimestamp(),
                }
              )

              // Mostrar pantalla de agradecimiento
              setEnviado(true)

            } catch (error) {
              console.error(
                "Error al enviar encuesta:",
                error
              )

              setStatus(
                "No fue posible enviar tus respuestas. Verifica tu conexión e inténtalo nuevamente."
              )

            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            status,
            submitCount,
          }) => (
            <Form noValidate>

              {/* DATOS DEL ASISTENTE */}

              <div className="mb-10">
                <h3 className="font-formaDisplay text-2xl sm:text-3xl text-[#1e49cf] mb-5">
                  Datos del asistente
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* NOMBRE */}

                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-semibold text-black mb-2"
                    >
                      Nombre completo
                    </label>

                    <Field
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Escribe tu nombre"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black bg-white outline-none focus:border-[#1e49cf] focus:ring-2 focus:ring-blue-100 transition"
                    />

                    {touched.nombre && errors.nombre && (
                      <p className="text-red-600 text-xs mt-2">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* EMPRESA */}

                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-semibold text-black mb-2"
                    >
                      Empresa
                    </label>

                    <Field
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Escribe tu empresa"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-black bg-white outline-none focus:border-[#1e49cf] focus:ring-2 focus:ring-blue-100 transition"
                    />

                    {touched.empresa && errors.empresa && (
                      <p className="text-red-600 text-xs mt-2">
                        {errors.empresa}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECCIONES DE SATISFACCIÓN */}

              <div className="space-y-10">

                {secciones.map((seccion, sectionIndex) => (
                  <div
                    key={seccion.titulo}
                    className="border-t border-neutral-200 pt-7"
                  >
                    {/* TÍTULO DE SECCIÓN */}

                    <div className="flex items-start gap-3 mb-6">
                      <span className="bg-[#1e49cf] text-white rounded-md px-3 py-2 text-sm font-bold">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>

                      <h3 className="font-formaDisplay text-2xl sm:text-3xl text-[#1e49cf]">
                        {seccion.titulo}
                      </h3>
                    </div>

                    {/* PREGUNTAS */}

                    <div className="space-y-8">

                      {seccion.preguntas.map((pregunta, questionIndex) => (
                        <div key={pregunta.id}>

                          <p className="text-sm sm:text-base font-semibold text-black mb-4 leading-relaxed">
                            {questionIndex + 1}. {pregunta.texto}
                          </p>

                          {/* OPCIONES RADIO */}

                          <div
                            role="group"
                            aria-label={pregunta.texto}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                          >
                            {opciones.map((opcion) => (
                              <label
                                key={opcion.valor}
                                className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 cursor-pointer hover:border-[#1e49cf] hover:bg-blue-50 transition-colors"
                              >
                                <Field
                                  type="radio"
                                  name={pregunta.id}
                                  value={opcion.valor}
                                  className="h-4 w-4 shrink-0 accent-[#1e49cf] cursor-pointer"
                                />

                                <span className="text-sm text-neutral-700">
                                  {opcion.texto}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* ERRORES */}

                          {(touched[pregunta.id] || submitCount > 0) &&
                            errors[pregunta.id] && (
                              <p className="text-red-600 text-xs mt-2">
                                {errors[pregunta.id]}
                              </p>
                            )}

                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* MENSAJE DE ERROR FIREBASE */}

              {status && (
                <div
                  role="alert"
                  className="mt-8 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
                >
                  {status}
                </div>
              )}

              {/* BOTÓN DE ENVÍO */}

              <div className="mt-12 pt-6 border-t border-neutral-200">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[220px] bg-[#1e49cf] text-white font-bold text-base px-10 py-4 rounded-lg hover:bg-[#15389f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting
                    ? "Enviando respuestas..."
                    : "Enviar encuesta"}
                </button>

                <p className="text-xs text-neutral-500 mt-4">
                  Verifica tus respuestas antes de enviar
                  la encuesta.
                </p>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}
