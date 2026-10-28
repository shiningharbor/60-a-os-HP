
"use client"

import { useState } from "react"
import Image from "next/image"
import SatisfactionForm from "../../components/SatisfactionForm"

export default function SatisfaccionPage() {
  const [enviado, setEnviado] = useState(false)

  if (enviado) {
    return (
      <main
        className="min-h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-10 md:px-20 py-10 font-formaMicro"
        style={{
          backgroundImage: `linear-gradient(
            110deg,
            #ffffff 0%, #ffffff 72%,
            #1e49cf 72%, #1e49cf 80%,
            #ffffff 80%, #ffffff 88%,
            #1e49cf 88%, #1e49cf 96%,
            #ffffff 96%, #ffffff 100%
          )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="mb-8 md:mb-10">
          <Image
            src="/Logo.png"
            alt="Logo del evento"
            width={200}
            height={100}
            className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto"
            priority
          />
        </div>

        <div className="w-full max-w-4xl">
          <h1 className="font-formaDisplay text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#1e49cf] leading-tight mb-4">
            60 Años
          </h1>

          <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-black mb-5 leading-relaxed">
            Innovando para el futuro de México
          </h2>

          <h2 className="font-formaDisplay text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black leading-tight">
            ¡Gracias por compartir tu experiencia!
          </h2>

          <p className="mt-6 max-w-xl text-lg md:text-xl text-neutral-700">
            Tus respuestas se enviaron correctamente.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full min-h-screen md:h-screen flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden">
      <section className="w-full md:w-1/3 md:h-screen shrink-0 overflow-hidden flex items-center justify-center">
        <img
          src="/BG.png"
          alt="HP 60 años"
          className="w-full h-48 object-cover md:w-full md:h-full md:object-cover block"
        />
      </section>

      <SatisfactionForm setEnviado={setEnviado} />
    </main>
  )
}
