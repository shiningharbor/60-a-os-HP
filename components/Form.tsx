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
          await addDoc(collection(db, "HP-SMB"), {
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
          console.error("Error al guardar registro:", error)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form
          className="
            w-full
            lg:w-2/3
            min-h-screen
            flex
            flex-col
            justify-between
            font-formaMicro
            px-5
            sm:px-8
            md:px-10
            lg:px-12
            xl:px-16
            py-6
            sm:py-8
            lg:py-10
          "
        >
          {/* Campos */}
          <div
            className="
              w-full
              max-w-4xl
              mx-auto
              flex
              flex-col
              gap-3
              sm:gap-4
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
              <div key={field.name} className="flex flex-col">
                <Field
                  name={field.name}
                  type={field.type}
                  inputMode={(field as any).inputMode}
                  placeholder={field.placeholder}
                  className="
                    w-full
                    border-y-2
                    border-black
                    bg-white
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    lg:text-3xl
                    py-2.5
                    sm:py-3
                    px-3
                    outline-none
                    focus:bg-gray-50
                    transition
                  "
                />

                {touched[field.name as keyof typeof touched] &&
                  errors[field.name as keyof typeof errors] && (
                    <p className="px-3 pt-1 text-red-600 text-xs sm:text-sm">
                      {(errors as any)[field.name]}
                    </p>
                  )}
              </div>
            ))}

            {/* Restricciones alimenticias */}
            <div className="flex flex-col">
              <Field
                as="textarea"
                name="restricciones_alimenticias"
                placeholder="Restricciones alimenticias"
                rows={3}
                className="
                  w-full
                  border-y-2
                  border-black
                  bg-white
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  lg:text-3xl
                  py-2.5
                  sm:py-3
                  px-3
                  outline-none
                  resize-none
                  focus:bg-gray-50
                  transition
                "
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              w-full
              max-w-4xl
              mx-auto
              mt-8
              sm:mt-10
              lg:mt-12
              flex
              flex-col
              lg:flex-row
              lg:items-end
              gap-6
              lg:gap-10
              pb-4
            "
          >
            {/* Privacidad */}
            <div
              className="
                flex-1
                text-[11px]
                sm:text-xs
                md:text-sm
                leading-relaxed
                flex
                flex-col
                gap-3
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

              <label className="flex items-start gap-2 cursor-pointer">
                <Field
                  type="checkbox"
                  name="email_contact"
                  className="
                    mt-1
                    shrink-0
                    w-4
                    h-4
                  "
                />

                <span>
                  HP me puede contactar para enviarme ofertas personalizadas,
                  información de soporte y noticias de eventos por correo
                  electrónico.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <Field
                  type="checkbox"
                  name="phone_contact"
                  className="
                    mt-1
                    shrink-0
                    w-4
                    h-4
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
                sm:w-auto
                lg:min-w-[150px]
                px-8
                py-4
                text-base
                sm:text-lg
                lg:text-xl
                rounded
                transition
                ${
                  isSubmitting
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
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