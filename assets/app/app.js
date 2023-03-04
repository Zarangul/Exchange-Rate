const select = document.getElementById('select');
const plusIcon = document.querySelector('.add-box-icon');
const select_box = document.querySelector('.select-box');
const container = document.querySelector('.container');
const close_button = document.querySelector('.close-btn');
const currency_box = document.getElementsByClassName('currency-box');
const currency_main = document.querySelector('.currency-main');
const to_target_currency = document.getElementsByClassName('to-target-currency');
const input_value = document.getElementsByClassName('input-value');
const current_currency_name = document.getElementsByClassName('current-currency-name');
const currency_name = document.getElementsByClassName('currency-name');
const current_currency_value = document.getElementsByClassName('current-currency-value');

const API_URL = "https://api.exchangerate.host/latest";

function getTodayDate(){
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
}
async function currency(){
    const res = await fetch(API_URL);
    const data = await res.json();
    const array = Object.entries(data.rates);
    array.forEach((item)=>{
       select.innerHTML += `<option value='${item[0]}${item[1]}'>${item[0]}</option>`
    })
    select.addEventListener('change', (e)=>{
        let targetValue = e.target.value;
        let currencyName = targetValue.substring(0,3);
        let currencyValue = targetValue.substring(3);
        if(document.getElementById('op-first') !== null){
            document.getElementById('op-first').remove();  
        }   
            currency_main.innerHTML += `
            <div id='${targetValue}' class="currency-box">
                <p class="close">
                    <span class="material-symbols-outlined close-btn" onclick="closeCurrencyBox('${targetValue}')">close</span>
                </p>
                <p  class='currency-name'>${currencyName}</p>
                <p class="to-target-currency">${currencyValue}</p>
                <input type="number" class='input-value to-input-value' value="0" min="0">
                <div class="today-date-currency f-size-16">
                    <div class="today-date f-size-16">${getTodayDate()}</div>
                    <div>
                        <p>1 <span class='current-currency-name f-size-16'>EUR</span> = <span class='current-currency-value f-size-16'>${currencyValue}</span> ${currencyName}</p>
                    </div>
                </div>
            </div>
            `;            

        Array.from(input_value).forEach((intValue, intIndex)=>{
            intValue.addEventListener('keyup',(el)=>{
                if(el.target.value !== ""){
                    Array.from(input_value).forEach((e,index)=>{
                        if(el.target.value !== e.value){
                            e.value = `${((+to_target_currency[index].textContent)*(+el.target.value)/(+to_target_currency[intIndex].textContent)).toFixed(5)}`;
                        }
                    })

                    Array.from(current_currency_name).forEach(current=>{
                        current.textContent = `${currency_name[intIndex].textContent}`;
                    })

                    let reserve = +current_currency_value[intIndex].textContent;
                    Array.from(current_currency_value).forEach(current=>{
                        
                        console.log(reserve);
                        current.textContent = (current.textContent/reserve).toFixed(5);
                        if((+current.textContent) === 1.00000){
                            console.log('heli');
                            current.textContent = (+current.textContent).toFixed();
                        }
                    })
                }
            })
        })

    })
}
currency();
function closeCurrencyBox(id){
    document.getElementById(`${id}`).remove();
}
plusIcon.addEventListener('click',()=>{
    if(select_box.clientWidth > plusIcon.clientWidth){
        select_box.style.width = `${plusIcon.clientWidth}px`;
        plusIcon.style.width = '100%';
        select.style.display = 'none';
    }else {
        setSelectBoxWidth();
        plusIcon.style.width = '20%';
        select.style.display = 'block';
    }
})
function setSelectBoxWidth(){
    let containerWidth = container.clientWidth;
    if(containerWidth <= 575){
        select_box.style.width = '80%';
    }else if(containerWidth <= 768){
        select_box.style.width = '50%';
    }else if(containerWidth <= 981){
        select_box.style.width = '40%';
    }else {
        select_box.style.width = '30%';
    }
}