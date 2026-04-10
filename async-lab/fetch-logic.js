// on utilise async/awiat pour gerer l'asynchronisme

const fetchUserData = async () => {
    console.log("Requete lancee...");

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

//verification de la reponse HTTP 
        if (!response.okay) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }

        //response.json () retourne une promesse car la lecture du corps est asynchrone
        const user = await response.json();
        console.log(`
            DONNEES UTILISATEUR RECUPEREES:
            Nom: ${user.name}
            Entreprise: ${user.company.name}
            Email: ${user.email}`);
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `ERREUR: ${error.message}`);
}

console.log("Requete terminee.");

};
fetchUserData();

//recuperation simultanement un utilisateur et  affiche un message

const getFastData = async () => {
    console.log("\ Lancement des requetes paralleles...");

    try {
        const[user, post] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users/1').the(r => r.json()),
             fetch('https://jsonplaceholder.typicode.com/users/1').the(r => r.json())
        ]);

        console.log(`LES REQUETES SONT (PARALLELES):
            UTILISATEUR: ${user.name}
            Post: "${post.title}"`);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `ERREUR PARALLELE: ${error.messsage}`);
    }
};


// 1. le code de depart n'a pas reussi a s'afficher 
// le code  original etait synchrone mais fetch() est asynchrone, sur la ligne var response = fetch() retourne immediatement une promesse, pas la reponse. ligne 6 : var user = response .json()sur une promesse, pas sur une reponse. cela genere une erreur car  promise n'a pas de methode .json(). 

// 2. ce que await fait : await met en pause l'execution de la fonction async mais ne  bloque pas le navigateur entier, ainsi le moteur js peut excute d'autres lignes, une fois la promise resolue la fonction reprend la ou elle s'etait arretee

//3. pourquoi verifier response.okay meme avec  try/catch? : c'est une distinction cruciale entre l'erreur reseau et l'erreur HTTP. c'est pourquoi on fait if (!response.okay) throw new error().

