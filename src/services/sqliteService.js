import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('conectaOficios.db');

// dentro de este archivo iran las sentencias y queries sql

const init = () => {
    //Lógica para arrancar la base de datos.

}

const actualizarGasolina = () => {
    const result = db.runSync(
        //Consulta SQL para actualizar el precio de la gasolina
    )
}

export default {
    init
};
