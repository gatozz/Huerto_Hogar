/* obtiene a traves de document todos los elementos sliders con nombre de testimony__body (los ... hace que pase de ser un nodo de elemento a un array)*/
(function(){
    const sliders = [...document.querySelectorAll('.testimony__body')];
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    let value;

    buttonNext.addEventListener('click', ()=>{
        changePosition(1);
    });

    buttonBefore.addEventListener('click', ()=>{
        changePosition(-1);
    });

    const changePosition = (add)=>{
        const currentTestimony = document.querySelector('.testimony__body--show').dataset.id;
        value = Number(currentTestimony); // pasamos el valor a numero por que lo esta concatenando, no sumando
        value += add;

        sliders[Number(currentTestimony)-1].classList.remove('testimony__body--show');
        if(value === sliders.length+1 || value === 0){
            value = value === 0 ? sliders.length : 1; // slider.length arroja el numero de elementos actuales de sliders
        }

        sliders[value-1].classList.add('testimony__body--show');
    }

})();
