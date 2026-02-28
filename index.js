window.onload = ()=>{
    
    
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (entries) =>{
        if (xhr.readyState === 4 && xhr.status===200){
            //console.log(xhr.response);
             handleResponse(JSON.parse(xhr.response));
        }
        else{
            console.log("boil them, Harry!");
        }
    }
    //console.log("btn clicked: " + e.target.innerHTML);
    xhr.open("GET", '/entries/entries.JSON', true);
    xhr.send();



    /* let buttons = document.getElementsByTagName("button");
    for(let i=0; i<buttons.length; i++){
        buttons[i].addEventListener('click', (e)=>{
            let url = i;
            console.log('url ' + url);
            
        });
    }
 */


        
};

function handleResponse(data){

    let letterButtons = document.getElementsByTagName("button");
    data.lexicon.forEach((element, index) => {
        if(element.count == 0){
            //console.log(element.letter + " has no entries");
            letterButtons[index].setAttribute('disabled', "true");
        }
    });    
    for(let i=0; i<letterButtons.length; i++){
        letterButtons[i].addEventListener('click', (e)=>{
            populatePage(data.lexicon[i]);
        });
    }            
       
}

function populatePage(words){
    //console.log(data.lexicon[0].letter);
    let container = document.getElementById('entries-container');
    container.textContent = '';
    //const kefalida = document.getElementById('kefalida');
    //kefalida.innerHTML = data.letter;
    for (var i=0; i<words.count; i++){
        const lemma = document.createElement('p');
        const definition = document.createElement('p');
        const pic = document.createElement('img');
        const entry = document.createElement('div');
        const imglink = document.createElement('a');
        lemma.classList.add("lemma");
        definition.classList.add('definition');
        entry.classList.add('entry-container');
        lemma.innerHTML = words.entries[i].lemma;
        definition.innerHTML = words.entries[i].definition;
        container.appendChild(lemma);
        entry.appendChild(definition); 
        entry.appendChild(imglink);
        container.appendChild(entry);
        pic.src = "/img/" + (element.image === "" ? "logo.png" : element.image);
        imglink.setAttribute('target', "_blank");
        imglink.setAttribute('href', pic.src);
        imglink.id = "img-link";
        imglink.appendChild(pic);
        console.log("booh" + pic.src);    


    };


        
}

