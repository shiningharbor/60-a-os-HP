"use client"

import FormComponet from "@/components/Form"
import Image from "next/image"
import { useState } from "react"

function Home() {
  const [enviado, setEnviado] = useState<boolean>(false)

  return (
    <>
      {!enviado ? (
        <main
          className="
            min-h-screen
            w-full
            flex
            flex-col
            lg:flex-row
            bg-white
          "
        >
          {/* Imagen */}
          <section
            className="
              relative
              w-full
              h-[220px]
              sm:h-[300px]
              md:h-[360px]
              lg:h-screen
              lg:w-1/3
              xl:w-[38%]
              shrink-0
              overflow-hidden
            "
          >
            <Image
              src="/BG.png"
              alt="HP background"
              fill
              priority
              sizes="
                (max-width: 1024px) 100vw,
                38vw
              "
              className="
                object-cover
                object-center
              "
            />
          </section>

          {/* Formulario */}
          <section
            className="
              w-full
              lg:w-2/3
              xl:w-[62%]
              flex
              justify-center
            "
          >
            <FormComponet setEnviado={setEnviado} />
          </section>
        </main>
      ) : (
        <main
          className="
            min-h-screen
            flex
            flex-col
            justify-center
            px-6
            sm:px-10
            md:px-16
            lg:px-20
            xl:px-28
            py-10
            font-formaMicro
          "
          style={{
            backgroundImage: `
              linear-gradient(
                110deg,
                #ffffff 0%,
                #ffffff 72%,
                #1e49cf 72%,
                #1e49cf 80%,
                #ffffff 80%,
                #ffffff 88%,
                #1e49cf 88%,
                #1e49cf 96%,
                #ffffff 96%,
                #ffffff 100%
              )
            `,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Logo */}
          <div className="mb-8 md:mb-10">
            <Image
              src="/Logo.png"
              alt="ACF Logo"
              width={400}
              height={200}
              className="
                w-40
                sm:w-52
                md:w-64
                lg:w-72
                xl:w-80
                h-auto
              "
              priority
            />
          </div>

          {/* Texto */}
          <div className="w-full max-w-5xl">
            <h1
              className="
                font-formaDisplay
                text-3xl
                sm:text-4xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                text-black
                leading-[1.05]
                mb-5
              "
            >
              60 AÑOS
              <br />
              Innovando para el futuro en México
            </h1>


            <h2
              className="
                font-formaDisplay
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                text-black
                leading-[1.05]
              "
            >
              ¡Tu registro
              <br className="hidden sm:block" />
              está completo!
            </h2>
          </div>
        </main>
      )}
    </>
  )
}

export default Home