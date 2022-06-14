/*
====================================
========== PROJECT UNIGE ==========
====================================

Make discussions on Moodle more dynamic by using tree diagrams and mindmaps.
*/

(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
})

// Récupérer l'URL de la page courante :

function getCurrentURL() {
    alert("L'URL de la page courante est : " + window.location.href);
}

// Rediriger vers une autre page URL :

function RedirectionJavascript(){
    window.location.href="https://moodle.unige.ch/mod/forum/post.php?post=&postformat=*"; 
  }

function getID(id) {
    const element = document.getElementById(id);
    return element;
}


// Création d'une classe Node :
  
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Création d'une classe Tree :

class Tree {
    constructor(data) {
      let node = new Node(data);
      this._root = node;
    }
     
  }



