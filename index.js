window.onload = ()=>{
    
    
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (entries) =>{
        if (xhr.readyState === 4){
            if(xhr.status===200){
                handleResponse(JSON.parse(xhr.response));
                document.getElementById("kefalida").innerHTML = "<h2>Διαλέξτε γράμμα!</h2>";
            }else{
                document.getElementById("kefalida").innerHTML = "<h2>Δεν υπάρχουν λέξεις!</h2>";
            }
        } 
            
        
    }
    //console.log("btn clicked: " + e.target.innerHTML);
    xhr.open("GET", '/entries/entries.JSON', true);
    xhr.send();
};

function handleResponse(data){
    let letterButtons = document.getElementsByTagName("button");
    data.lexicon.forEach((element, index) => {
        if(element.count == 0){
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
    let container = document.getElementById('entries-container');
    container.textContent = '';
    const kefalida = document.getElementById('kefalida');
    kefalida.innerHTML = words.letter;
    let sortedData = words.entries.sort(function(first, second){
            return first.lemma.localeCompare(second.lemma);
        });

    for (var i=0; i<words.count; i++){
        const lemma = document.createElement('p');
        const definition = document.createElement('p');
        const pic = document.createElement('img');
        const entry = document.createElement('div');
        const imglink = document.createElement('a');
        lemma.classList.add("lemma");
        definition.classList.add('definition');
        entry.classList.add('entry-container');
        //lemma.innerHTML = words.entries[i].lemma;
        //definition.innerHTML = words.entries[i].definition;
        lemma.innerHTML = sortedData[i].lemma;
        definition.innerHTML = sortedData[i].definition;
        container.appendChild(lemma);
        entry.appendChild(definition); 
        entry.appendChild(imglink);
        container.appendChild(entry);
        pic.src = "/img/" + (sortedData[i].image === "" ? "logo.png" : sortedData[i].image);
        imglink.setAttribute('target', "_blank");
        imglink.setAttribute('href', pic.src);
        imglink.id = "img-link";
        imglink.appendChild(pic);
        console.log("booh" + pic.src);    
    };
}


