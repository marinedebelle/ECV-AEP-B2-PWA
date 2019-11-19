/* Attendre le chargement du DOM */
document.addEventListener( 'DOMContentLoaded', () => {

    /* Déclarations */
    let myNav = document.querySelector('nav ul');
    let myBurgerMenu = document.querySelector('nav button');

    /* Méthodes / Fonctions */
        // Créer une fonction pour générer la navigation
        const loadNavData = () => {
            //Charger le fichier nav.json
            fetch('./data/nav.json')
            .then(data => {
                //Vérifier si la requête a fonctionné
                if(data.ok){
                    return data.json();
                }
            })
            .then(jsonData => {
                displayNav(jsonData);
            })
            .catch(err => {
                console.error(err);
            });
        };

        //Créer une fonction pour afficher la navigation
        const displayNav = (navCollection) => {
            console.log(navCollection);
            //Faire une boucle sur la collection
            for(let link of navCollection){
                //Ajouter une balise LI avec une balise A dans NAV UL
                myNav.innerHTML += `
                <li><a href="${link.href}">${link.content}</a></li>
                `;
            };

            //Activer la navigation
            toggleNavigation();
            //Capter le clic sur les balises NAV A
            for (let link of document.querySelectorAll('nav a')){
                link.addEventListener('click', (event) => {
                    // Bloquer le comportement naturel de la balise A
                    event.preventDefault();
                    //Afficher la page
                    displayPage(link.getAttribute('href'));
                })
            };
        };

        //Créer une fonction pour ouvrir / fermer la navigation
        const toggleNavigation = () => {
            //Capter le clic sur burgerMenu
            myBurgerMenu.addEventListener('click', () => {
                //Ajouter ou supprimer la classe open sur NAV UL
                myNav.classList.toggle('open');
                myBurgerMenu.classList.toggle('open');
            });
        }

        //Créer une fonction pour charger le contenu des pages
        const displayPage = (page) => {
            //Charger le contenu de la page
            fetch(page)
            .then(data => {
                //Vérifier la requête
                if(data.ok){
                    return data.text();
                }
            })
            .then (text => {
                //Ajouter le contenu dans la balise MAIN
                document.querySelector('main').innerHTML = text;

                //Fermer la navigation
                myNav.classList.remove('open');
                myBurgerMenu.classList.remove('open');
            })
            .catch(err =>{
                console.error(err);
            });
        };

    /* Lancer l'IHM (interface homme - machine) */
        //Charger la navigation
        loadNavData();
});