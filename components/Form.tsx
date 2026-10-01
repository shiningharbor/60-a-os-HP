import db from "@/db/firebase"
import { addDoc, collection } from "firebase/firestore"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import * as Yup from "yup"

export default function FormComponet({
  setEnviado,
}: {
  setEnviado: Dispatch<SetStateAction<boolean>>
}) {
  const registerSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, "Escribe un nombre más largo")
      .required("Este campo es requerido"),

    apellidos: Yup.string()
      .min(2, "Escribe un apellido más largo")
      .required("Este campo es requerido"),

    correo: Yup.string()
      .email("Correo inválido")
      .required("Este campo es requerido"),

    telefono: Yup.string()
      .matches(/^\d{10}$/, "Debe contener 10 dígitos")
      .required("Este campo es requerido"),

    pais: Yup.string().required("Este campo es requerido"),
    empresa: Yup.string().required("Este campo es requerido"),
    cargo: Yup.string().required("Este campo es requerido"),

    restricciones_alimenticias: Yup.string(),
  })

  return (
    <Formik
      initialValues={{
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        empresa: "",
        cargo: "",
        pais: "",
        restricciones_alimenticias: "",
        email_contact: false,
        phone_contact: false,
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addDoc(collection(db, "HP-60"), {
            fecha: Date.now(),
            ...values,
          })

          try {
            await fetch("/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: values.correo,
                subject: "Registro exitoso. Te esperamos.",
                text: "HP",
              }),
            })
          } catch (error) {
            console.log(error)
          }

          resetForm()
          setEnviado(true)
        } catch (error) {
          console.log(error)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ errors, isSubmitting }) => (
        <Form
          className="
            w-full
            md:w-2/3

            md:h-screen
            md:overflow-y-auto

            flex
            flex-col

            pt-5
            pb-5

            px-4
            sm:px-6
            md:px-8
            lg:px-10

            font-formaMicro

            overflow-x-hidden
          "
        >
          {/* Campos */}
          <div
            className="
              w-full
              flex
              flex-col
              gap-3
              md:gap-4
              flex-grow
            "
          >
            {[
              {
                name: "nombre",
                placeholder: "Nombre",
                type: "text",
              },
              {
                name: "apellidos",
                placeholder: "Apellidos",
                type: "text",
              },
              {
                name: "correo",
                placeholder: "Correo",
                type: "email",
              },
              {
                name: "telefono",
                placeholder: "Teléfono",
                type: "tel",
                inputMode: "numeric",
              },
              {
                name: "empresa",
                placeholder: "Organización",
                type: "text",
              },
              {
                name: "cargo",
                placeholder: "Cargo",
                type: "text",
              },
              {
                name: "pais",
                placeholder: "País",
                type: "text",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="
                  w-full
                  flex
                  flex-col
                "
              >
                <Field
                  name={field.name}
                  type={field.type}
                  inputMode={(field as any).inputMode}
                  placeholder={field.placeholder}
                  className="
                    w-full
                    min-w-0

                    border-y-2
                    bg-white

                    text-lg
                    sm:text-xl
                    md:text-2xl
                    xl:text-3xl

                    py-2
                    px-3

                    outline-none
                  "
                />

                <p
                  className="
                    min-h-[18px]
                    px-3
                    text-red-600
                    text-xs
                    md:text-sm
                  "
                >
                  {(errors as any)[field.name]}
                </p>
              </div>
            ))}

            {/* Restricciones alimenticias */}
            <div
              className="
                w-full
                flex
                flex-col
              "
            >
              <Field
                as="textarea"
                name="restricciones_alimenticias"
                placeholder="Restricciones alimenticias"
                rows={2}
                className="
                  w-full
                  min-w-0

                  border-y-2
                  bg-white

                  text-lg
                  sm:text-xl
                  md:text-2xl
                  xl:text-3xl

                  py-2
                  px-3

                  resize-none
                  outline-none
                "
              />

              <p
                className="
                  min-h-[18px]
                  px-3
                  text-red-600
                  text-xs
                  md:text-sm
                "
              >
                {errors.restricciones_alimenticias}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              w-full

              mt-4
              pt-4

              flex
              flex-col
              md:flex-row

              gap-5

              md:items-center

              font-formaMicro
            "
          >
            {/* Privacidad */}
            <div
              className="
                w-full
                md:flex-1

                text-[10px]
                sm:text-xs
                lg:text-sm

                leading-snug

                flex
                flex-col
                gap-2
              "
            >
              <p>
                HP respeta su privacidad. Visite la{" "}
                <a
                  href="https://www.hp.com/mx-es/privacy/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-black"
                >
                  Declaración de privacidad de HP
                </a>{" "}
                para conocer cómo HP consigue y hace uso de sus datos personales.
              </p>

              <label className="flex items-start gap-2">
                <Field
                  type="checkbox"
                  name="email_contact"
                  className="
                    mt-[2px]
                    shrink-0
                  "
                />

                <span>
                  HP me puede contactar para enviarme ofertas personalizadas,
                  información de soporte y noticias de eventos por correo
                  electrónico.
                </span>
              </label>

              <label className="flex items-start gap-2">
                <Field
                  type="checkbox"
                  name="phone_contact"
                  className="
                    mt-[2px]
                    shrink-0
                  "
                />

                <span>
                  HP me puede contactar para enviarme ofertas personalizadas,
                  información de soporte y noticias de eventos por teléfono.
                </span>
              </label>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full
                sm:w-1/2
                md:w-auto

                md:min-w-[130px]

                mx-auto
                md:mx-0

                px-6
                py-3

                text-base
                md:text-lg

                rounded

                shrink-0

                ${
                  isSubmitting
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-black text-white"
                }
              `}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}