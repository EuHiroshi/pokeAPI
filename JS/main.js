import {writeFile} from 'fs/promises'
import pokemon from './server.js'

async function main() {
    pokemon.getApi();
}

main();