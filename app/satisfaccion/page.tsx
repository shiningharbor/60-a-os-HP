"use client";

import db from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import * as XLSX from "xlsx";

interface register {
    id: string;
    nombre: string;
    apellidos: string;
    empresa: string;
    cargo: string;
    correo: string;
    telefono: number;
    fecha?: number | string;
    restricciones_alimenticias?: string;
}

export default function Registers() {

    const [registers, setRegisters] = useState<register[]>([]);

    const getRegisters = async (collectionName: string) => {
        try {
            const userCollection = collection(db, collectionName);
            const userDocs = await getDocs(userCollection);

            const registerList = userDocs.docs.map((doc) => {
                const {
                    nombre,
                    apellidos,
                    empresa,
                    cargo,
                    correo,
                    telefono,
                    fecha,
                    restricciones_alimenticias
                } = doc.data();

                const fechaMod = fecha
                    ? new Date(fecha).toISOString().split("T")[0]
                    : "";

                return {
                    id: doc.id,
                    nombre,
                    apellidos,
                    empresa,
                    cargo,
                    correo,
                    telefono,
                    fecha: fechaMod,
                    restricciones_alimenticias: restricciones_alimenticias ?? ""
                };
            }) as register[];

            console.log(registerList);
            setRegisters(registerList);

        } catch (error) {
            console.error("Error al obtener los registros:", error);
        }
    };

    const getExcel = () => {
        // Convertir los registros a una hoja de Excel
        const ws = XLSX.utils.json_to_sheet(registers);

        // Crear libro de Excel
        const wb = XLSX.utils.book_new();

        // Agregar hoja al libro
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        // Descargar archivo Excel
        XLSX.writeFile(wb, "Reporte.xlsx");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl text-left text-sm my-3">

                {registers.length > 0 ? (
                    <div className="w-full overflow-x-auto">
                        <table className="table-auto border-collapse border border-black bg-white shadow-lg w-full">
                            <thead className="text-lg text-center bg-gray-200">
                                <tr>
                                    <th className="border border-black p-2">
                                        ID
                                    </th>
                                    <th className="border border-black p-2">
                                        Nombre
                                    </th>
                                    <th className="border border-black p-2">
                                        Apellido
                                    </th>
                                    <th className="border border-black p-2">
                                        Organización
                                    </th>
                                    <th className="border border-black p-2">
                                        Cargo
                                    </th>
                                    <th className="border border-black p-2">
                                        Correo
                                    </th>
                                    <th className="border border-black p-2">
                                        Teléfono
                                    </th>
                                    <th className="border border-black p-2">
                                        Fecha
                                    </th>
                                    <th className="border border-black p-2">
                                        Restricciones alimenticias
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {registers.map((reg) => (
                                    <tr
                                        key={reg.id}
                                        className="text-center hover:bg-gray-50"
                                    >
                                        <td className="border border-black p-2">
                                            {reg.id}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.nombre}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.apellidos}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.empresa}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.cargo}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.correo}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.telefono}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.fecha}
                                        </td>
                                        <td className="border border-black p-2">
                                            {reg.restricciones_alimenticias || "Ninguna"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-3xl text-center m-10">
                        Aún no hay registros
                    </p>
                )}

                <div className="flex justify-center my-5 gap-5">
                    <button
                        className="h-10 px-5 bg-yellow-200 rounded-xl text-black text-xl hover:bg-yellow-300"
                        onClick={() => getRegisters("HP-60")}
                    >
                        Registros
                    </button>

                    {registers.length > 0 && (
                        <button
                            className="h-10 px-5 bg-yellow-200 rounded-xl text-black text-xl hover:bg-yellow-300"
                            onClick={getExcel}
                        >
                            Exportar a Excel
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
