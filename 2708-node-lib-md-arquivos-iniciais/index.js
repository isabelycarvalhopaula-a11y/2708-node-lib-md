import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, '- não há arquivo no diretório'));
}

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    
  
    const resultados = capturas.map(captura => ({
        [captura[1]]: captura[2]
    }));
    
    return resultados.length === 0 ? 'Não foram encontrados links.' : resultados;
}

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        
        const linksExtraidos = extraiLinks(texto);
        console.log(chalk.green('Links extraídos com sucesso:'));
        console.log(linksExtraidos);
        
    } catch (erro) {
        trataErro(erro);
    }
}

pegaArquivo('./arquivos/texto.md');
