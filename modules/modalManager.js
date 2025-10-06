// modules/modalManager.js
import { ToRial } from '../modules/utils.js';
import { getFardList , getFacGroupList ,getAnbarList,getKalaInfo,InsertIntoFacHeder } from '../modules/api.js';
import { showKalaModal } from '../modules/createkalaManager.js';
import { showProductModal } from '../modules/productManager.js';
import { data } from 'browserslist';

let ConfigConnection=[];
let radifkala=[];

/**
 * نمایش مدال اصلی نسخه با اطلاعات دریافتی
 * @param {Object} versionData - اطلاعات نسخه شامل بیمار، پزشک، سازمان و ردیف‌ها
 */
export async function showMainModal(versionData) {

            const fbutton = document.getElementById('floating-button');
            fbutton.disabled = true;    

            //console.log(versionData);
           
            


  ConfigConnection= {
                        Server : versionData.Server,
                        DataBase : versionData.DataBase,
                        username : versionData.username,
                        pass : versionData.pass,
                        API_URL : versionData.APIURL,
                    }

  const overlay = document.createElement("div");
  overlay.id = "mainModalOverlay";
  overlay.style = `
                position:fixed;
                top:0; left:0;
                width:100%; height:100vh;
                background:rgba(0, 0, 0, 0.6);
                backdrop-filter:blur(4px);
                z-index:9998;`;

  const modal = document.createElement("div");
  modal.id = "mainModalBox";
  modal.style = `
            position: fixed;
            top: 2%;
            left: 10%;
            transform: translateX(-8%);
            max-height: 100vh; /* محدود کردن ارتفاع مدال */
            overflow-y: auto; /* فعال‌سازی اسکرول داخل مدال */
            width: 95vw;
            background: linear-gradient(135deg, #ffffff, #f2f2f2);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            font-family: 'Vazirmatn', sans-serif;
            `;

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "❌";
  closeBtn.setAttribute('id','closeBtnManager');
  closeBtn.classList.add("btn", "btn-sm", "btn-light");
  closeBtn.style = `position:absolute;
            top:15px; right:15px;
            background:#eee;
            border-radius:20%;
            width:32px;
            display:flex; align-items:center; justify-content:center;
            font-size:18px;
            cursor:pointer;
            transition:background 0.3s;`;
  closeBtn.addEventListener("click", () => {
    fbutton.disabled = false; 
    overlay.remove();
    modal.remove();
  });

  const content = document.createElement("div");
  content.innerHTML = buildModalHTML(versionData);

  modal.appendChild(closeBtn);
  modal.appendChild(content);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

    document.getElementById('lblTasvieh').addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        });
    document.getElementById('lblShfacmoshtari').addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        });

        radifkala = await getKalaInfo(ConfigConnection,versionData.radifs);
      
    const tbody = document.getElementById('RdfKala');
        tbody.innerHTML = '';
        radifkala.data.forEach((datas,index) => {
        const tr = document.createElement('tr');
            tr.setAttribute('id','rdf'+index)            
        tr.innerHTML = `
          <td class="text-center" id="datasjam${index}">${ToRial(((datas.tedbastehTTAC*datas.tedDarBasteh)*datas.buy)+( (((datas.tedbastehTTAC*datas.tedDarBasteh)*datas.buy)*datas.maliat)/100 ) )}</td>
          <td class="text-center" id="datasMaliat${index}"><input id="inputdatasMaliat${index}" style="width:80px" id="inputdatasMaliat${index}" type="text" value="${datas.maliat}"></td>
          <td class="text-center" id="datastakhfif${index}"><input style="width:80px" id="inputdatastakhfif${index}" type="text" value=0></td>
          <td class="text-center" id="datasexpTTAC${index}">${datas.expTTAC}</td>
          <td class="text-center" id="datasbachTTAC${index}">${datas.bachTTAC}</td>
          <td class="text-center" id="datasircTTAC${index}">${datas.ircTTAC}</td>
          <td class="text-center" id="datasjamTTAC${index}">${ToRial((datas.tedbastehTTAC*datas.tedDarBasteh)*datas.buy)}</td>
          <td class="text-center" id="dataspriceTTAC${index}"><input style="width:80px" id="inputdataspriceTTAC${index}" type="text" value="${ToRial(datas.price)}"></td>
          <td class="text-center" id="datasbuyTTAC${index}"><input style="width:80px" id="inputdatasbuyTTAC${index}" type="text" value="${ToRial(datas.buy)}"></td>
          <td class="text-center" id="datasjamTed${index}">${datas.tedbastehTTAC*datas.tedDarBasteh}</td>
          <td class="text-center" id="datastedDarBastehTTAC${index}"><input style="width:40px" id="inputdatastedDarBastehTTAC${index}" type="text" value="${datas.tedDarBasteh}"></td>
          <td class="text-center" id="datastedbastehTTAC${index}">${datas.tedbastehTTAC}</td>
          <td class="text-center" id="datasgencodeTTAC${index}">${datas.gencodeTTAC}</td>
          <td class="text-right" id="datasennameTTAc${index}" style="width:200px"> <span style="white-space: normal; line-height: 1.4; max-height: 2.8em; overflow: hidden;">${datas.ennameTTAc}</span></td>
          <td class="text-left" id="datasfanameTTAC${index}" style="width:200px"> <span style="white-space: normal; line-height: 1.4; max-height: 2.8em; overflow: hidden;">${datas.fanameTTAC}</span></td>
          <td class="text-center" id="dataspriceAria${index}">${ToRial(datas.priceAria)}</td>
          <td class="text-center" id="datasgencodeAria${index}">${datas.gencodeAria}</td>
          <td class="text-center" id="datasfanameAria${index}" style="width:150px"><span style="white-space: normal; line-height: 1.4; max-height: 2.8em; overflow: hidden;">${datas.fanameAria}</span></td>
          <td class="text-center" id="datascodeKalaAria${index}">${datas.codeKalaAria}</td>
          <td class="text-center" id="datasrdf${index}">${datas.rdf}</td>          
          <td class="text-center" id="datasbtnEdit${index}"><div><div><button id="inputbtnEditKala${index}" type="button" title="میتوانید کالایی از لیست آریا را به این محصول متصل کنید">اتصال کالا ✏️</button></div><div><hr></div>
          <div><button id="inputbtnAddKala${index}" type="button" style="background:rgb(151, 230, 173);border-radius:2px;border:1px solid gray" title="میتوانید کالا را در آریا تعریف کنید">ایجاد کـالا ➕</button></div></div></td>
          <td class="text-center" id="datascheckUpdatePrice${index}"><input id="inputdatascheckUpdatePrice${index}" type="checkbox"></td>
          <td class="text-center" id="datascheckSabt${index}"><input id="inputdatascheckSabt${index}" type="checkbox" checked></td>
          `          
         
     
          tbody.appendChild(tr);

            document.getElementById(`inputdatastedDarBastehTTAC${index}`).addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {event.preventDefault();}});
            document.getElementById(`inputdatasbuyTTAC${index}`).addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {event.preventDefault();}});
            document.getElementById(`inputdataspriceTTAC${index}`).addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {event.preventDefault();}});
            document.getElementById(`inputdatastakhfif${index}`).addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {event.preventDefault();}});
            document.getElementById(`inputdatasMaliat${index}`).addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {event.preventDefault();}});

            const pttac = document.getElementById(`inputdataspriceTTAC${index}`)
            const paria = document.getElementById(`dataspriceAria${index}`)
            const cupdate = document.getElementById(`inputdatascheckUpdatePrice${index}`)
            const rcl = document.getElementById(`rdf${index}`)
            rcl.style.background = parseInt(pttac.value.toString().replace(/,/g, ''))>parseInt(paria.innerText.toString().replace(/,/g, '')) ? "rgba(173, 240, 215, .5)"  : parseInt(paria.innerText.toString().replace(/,/g, '')) > parseInt(pttac.value.toString().replace(/,/g, '')) ? "rgba(252, 249, 207, 1)" : "transparent";
            cupdate.checked = parseInt(pttac.value.toString().replace(/,/g, ''))>parseInt(paria.innerText.toString().replace(/,/g, '')) ? true : false;
                    
            
            const intedttac = document.getElementById(`datastedbastehTTAC${index}`);
            const inted = document.getElementById(`inputdatastedDarBastehTTAC${index}`);
            const intedjam = document.getElementById(`datasjamTed${index}`);
            const jamTTAC = document.getElementById(`datasjamTTAC${index}`);
            const buyTTAC = document.getElementById(`inputdatasbuyTTAC${index}`);
            const priceTTAC = document.getElementById(`inputdataspriceTTAC${index}`);
            const tkhfif = document.getElementById(`inputdatastakhfif${index}`);
            const maliat = document.getElementById(`inputdatasMaliat${index}`);
            const jamkol = document.getElementById(`datasjam${index}`);

            // تغییر تعداد در بسته
             inted.addEventListener('input', (event) => {
                let currentValue = event.target.value;
                currentValue = currentValue === "" ? 0 : currentValue;
                intedjam.innerHTML = currentValue * intedttac.innerHTML ;
                jamTTAC.innerHTML = ToRial((currentValue * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) ;
                jamkol.innerHTML =ToRial( ( (currentValue * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) -
                (
                parseInt(tkhfif.value.toString().replace(/,/g, '')) > 100 ? parseInt(tkhfif.value.toString().replace(/,/g, '')) : ( ( (currentValue * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) * parseInt(tkhfif.value.toString().replace(/,/g, '')) ) / 100
                )
                +
                (
                parseInt(maliat.value.toString().replace(/,/g, '')) > 100 ? parseInt(maliat.value.toString().replace(/,/g, '')) :
                parseInt(tkhfif.value.toString().replace(/,/g, '')) > 100 ? ( ( ((currentValue * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) - parseInt(tkhfif.value.toString().replace(/,/g, '')) ) * parseInt(maliat.value.toString().replace(/,/g, ''))) /100 :
                ( ( ((currentValue * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) - (( ( (currentValue * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) * parseInt(tkhfif.value.toString().replace(/,/g, '')) ) / 100) ) * parseInt(maliat.value.toString().replace(/,/g, '')) )/100
                )
                )
                updatejam();
            });

            document.getElementById(`inputdatastedDarBastehTTAC${index}`).addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                const buy =  document.getElementById(`inputdatasbuyTTAC${index}`)
                buy.focus();
                const valueLength = buy.value.length;
                buy.setSelectionRange(valueLength, valueLength);
                event.preventDefault();
                }
            });

            // تغییر قیمت خرید
            buyTTAC.addEventListener('input', (event) => {
                let currentValue = event.target.value.toString().replace(/,/g, '');
                currentValue = currentValue === "" ? 0 : currentValue;
                jamTTAC.innerHTML = ToRial((inted.value * intedttac.innerHTML) * currentValue) ;
                jamkol.innerHTML =ToRial( ( (inted.value * intedttac.innerHTML) * currentValue ) -
                (
                parseInt(tkhfif.value.toString().replace(/,/g, '')) > 100 ? parseInt(tkhfif.value.toString().replace(/,/g, '')) : ( ( (inted.value * intedttac.innerHTML) * currentValue ) * parseInt(tkhfif.value.toString().replace(/,/g, '')) ) / 100
                )
                +
                (
                parseInt(maliat.value.toString().replace(/,/g, '')) > 100 ? parseInt(maliat.value.toString().replace(/,/g, '')) :
                parseInt(tkhfif.value.toString().replace(/,/g, '')) > 100 ? ( ( ((inted.value * intedttac.innerHTML) * currentValue) - parseInt(tkhfif.value.toString().replace(/,/g, '')) ) * parseInt(maliat.value.toString().replace(/,/g, ''))) /100 :
                ( ( ((inted.value * intedttac.innerHTML) * currentValue) - (( ( (inted.value * intedttac.innerHTML) * currentValue ) * parseInt(tkhfif.value.toString().replace(/,/g, '')) ) / 100) ) * parseInt(maliat.value.toString().replace(/,/g, '')) )/100
                )
                )
                buyTTAC.value=ToRial(currentValue);
                updatejam();
            });

            buyTTAC.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const nextinput =  document.getElementById(`inputdataspriceTTAC${index}`)
                nextinput.focus();
                const valueLength = nextinput.value.length;
                nextinput.setSelectionRange(valueLength, valueLength);
                event.preventDefault();
                }
                
            });
            //تغییر قیمت فروش
            priceTTAC.addEventListener('input', (event) => {
            let currentValue = event.target.value.toString().replace(/,/g, '');
            currentValue = currentValue === "" ? 0 : currentValue;
            priceTTAC.value=ToRial(currentValue);
            });
            priceTTAC.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const nextinput =  document.getElementById(`inputdatastakhfif${index}`)
                nextinput.focus();
                const valueLength = nextinput.value.length;
                nextinput.setSelectionRange(valueLength, valueLength);
                event.preventDefault();
                }
            });
            //تغییر تخفیف            
            tkhfif.addEventListener('input', (event) => {
                let currentValue = event.target.value.toString().replace(/,/g, '');
                const test = parseFloat(currentValue) > parseFloat(jamTTAC.innerHTML.toString().replace(/,/g, '')) ? jamTTAC.innerHTML.toString().replace(/,/g, '')  : currentValue;              
                currentValue = test ;
                currentValue = currentValue === "" ? 0 : currentValue ;
                jamkol.innerHTML =ToRial( ( (inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) -
                (
                parseInt(currentValue) > 100 ? currentValue : ( ( (inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) * parseInt(currentValue) ) / 100
                )
                +
                (
                parseInt(maliat.value.toString().replace(/,/g, '')) > 100 ? parseInt(maliat.value.toString().replace(/,/g, '')) :
                parseInt(currentValue) > 100 ? ( ( ((inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) - parseInt(currentValue) ) * parseInt(maliat.value.toString().replace(/,/g, ''))) /100 :
                ( ( ((inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) - (( ( (inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) * parseInt(currentValue) ) / 100) ) * parseInt(maliat.value.toString().replace(/,/g, '')) )/100
                )
                )
                tkhfif.value=ToRial(parseInt(currentValue));
                updatejam();
            });
            tkhfif.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const nextinput =  document.getElementById(`inputdatasMaliat${index}`)
                nextinput.focus();
                const valueLength = nextinput.value.length;
                nextinput.setSelectionRange(valueLength, valueLength);
                event.preventDefault();
                }
            });
            // تغییر مالیات
             maliat.addEventListener('input', (event) => {
                let currentValue = event.target.value.replace(/,/g, '');   
                currentValue = currentValue === "" ? 0 : currentValue ; 
                            
                jamkol.innerHTML =ToRial( jamTTAC.textContent.replace(/,/g, '') -
                    (
                       parseInt(tkhfif.value.replace(/,/g, '')) > 100 ?
                       parseInt(tkhfif.value.replace(/,/g, '')) :
                       (jamTTAC.textContent.replace(/,/g, '') * parseInt(tkhfif.value.replace(/,/g, ''))) /100 

                    )
                    +
                    (
                        parseInt(currentValue) > 100 ? parseInt(currentValue) :
                        parseInt(tkhfif.value.replace(/,/g, '')) > 100 ?
                        ( ( jamTTAC.textContent.replace(/,/g, '') - parseInt(tkhfif.value.replace(/,/g, '')) ) * parseInt(currentValue) ) /100 :
                        ( ( jamTTAC.textContent.replace(/,/g, '') -  
                         ( (jamTTAC.textContent.replace(/,/g, '') * parseInt(tkhfif.value.replace(/,/g, ''))) /100 ) ) 
                         * parseInt(currentValue) ) /100 
                    ) 
                );

                // ToRial( ( (inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) -
                // (
                // parseInt(tkhfif.value.toString().replace(/,/g, '')) > 100 ? parseInt(tkhfif.value.toString().replace(/,/g, '')) : ( ( (inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) * parseInt(tkhfif.value.toString().replace(/,/g, '')) ) / 100
                // )
                // +
                // (
                // parseInt(currentValue) > 100 ? parseInt(currentValue) :
                // parseInt(tkhfif.value.toString().replace(/,/g, '')) > 100 ? ( ( ((inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) - parseInt(tkhfif.value.toString().replace(/,/g, '')) ) * parseInt(currentValue)) /100 :
                // ( ( ((inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, ''))) - (( ( (inted.value * intedttac.innerHTML) * parseInt(buyTTAC.value.toString().replace(/,/g, '')) ) * parseInt(tkhfif.value.toString().replace(/,/g, '')) ) / 100) ) * parseInt(currentValue) )/100
                // )
                // )
                maliat.value=ToRial(parseInt(currentValue));
                updatejam();

            });

            maliat.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const nextinput =  document.getElementById(`inputdatastedDarBastehTTAC${index+1}`)
                nextinput.focus();
                const valueLength = nextinput.value.length;
                nextinput.setSelectionRange(valueLength, valueLength);
                event.preventDefault();
                }
            });

            const button = document.getElementById('inputbtnEditKala'+index);
            if (button) {
              button.addEventListener('click', function () {
                      showProductModal(ConfigConnection,datas.codeKalaAria > 0 ? datas.codeKalaAria : datas.gencodeTTAC,datas.fanameTTAC,55,index,datas.ircTTAC);                  
              });
            }
            else{
                console.log('دکمه پیدا نشد');
            }       

            const buttonadd = document.getElementById('inputbtnAddKala'+index);
            if (buttonadd) {
              buttonadd.addEventListener('click', function () {
                        const buy=document.getElementById('inputdatasbuyTTAC'+index);
                        const price=document.getElementById('inputdataspriceTTAC'+index);
                      showKalaModal(ConfigConnection,datas.fanameTTAC,datas.ennameTTAc,datas.gencodeTTAC,buy.value,price.value,datas.ircTTAC,versionData.Hname,index);                  
              });
            }
            else{
                console.log('دکمه پیدا نشد');
            }        

          });

           document.getElementById(`inputHBarbary`).addEventListener('keypress', function(event) {
           if (!/[0-9]/.test(event.key)) {event.preventDefault();}});
           document.getElementById(`inputHother`).addEventListener('keypress', function(event) {
           if (!/[0-9]/.test(event.key)) {event.preventDefault();}});

           const Hbarbary = document.getElementById('inputHBarbary');
           // تغییر هزینه باربری
             Hbarbary.addEventListener('input', (event) => {
                let currentValue = event.target.value.replace(/,/g, '');
                currentValue = currentValue === "" ? 0 : currentValue ;
                Hbarbary.value = ToRial(currentValue);
                updatejam();
            });

            const Hother = document.getElementById('inputHother');            
           // تغییر هزینه متفرقه
            Hother.addEventListener('input', (event) => {
                let currentValue = event.target.value.replace(/,/g, '');
                currentValue = currentValue === "" ? 0 : currentValue ;
                Hother.value = ToRial(currentValue);
                updatejam();
            });

            // ثبت فاکتور
            document.getElementById('btnSabtFactor').addEventListener('click', () => {
                const fard= document.getElementById('searchFard');
                const inputValue = fard.value;
                if(inputValue === ""){
                    alert("⚠️ مشتری را انتخاب کنید ⚠️");
                }
                else{
                        const selectElement = document.getElementById("ListAnbar"); // Assuming 'mySelect' is the ID of your <select> element
                        const selectedValue = selectElement.value;
                        if(selectedValue === "0" || !selectedValue || selectedValue === "")
                        {
                            alert("⚠️ انبار را انتخاب کنید ⚠️");
                        }
                        else{
                            insertNewFactor(ConfigConnection);
                        }                        
                        //     alert(optionText);
                }

            });
          
            let valheadSabt=1;
            const headSabt = document.getElementById('headSabt');
            headSabt.addEventListener('dblclick', function() {
              valheadSabt =  changeValSabtORUpdate("sabt" , valheadSabt);
            });

            let valheadupdate=1;
            const headupdate = document.getElementById('headupdate');
            headupdate.addEventListener('dblclick', function() {
              valheadupdate =  changeValSabtORUpdate("update" , valheadupdate);
            });

            headSabt.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer'; // Changes to hand pointer
            });

            headSabt.addEventListener('mouseout', function() {
            this.style.cursor = 'default'; // Changes back to default arrow
            });

            headupdate.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer'; // Changes to hand pointer
            });

            headupdate.addEventListener('mouseout', function() {
            this.style.cursor = 'default'; // Changes back to default arrow
            });


            updatejam();

            // var select = document.getElementById("ListGroupFac");
            // var length = select.options.length;
            // for (let i = length-1; i >= 0; i--) {
            // select.options[i] = null;
            // }
            

            getFard(ConfigConnection);
            const searchInput = document.getElementById('inputxtsearch'); // Assuming an input with id 'mySearchInput'
            searchInput.addEventListener('keyup', filterTable);
            
}


async function getFard(ConfigConnection){
let Fardinfo=[];
      // لیست  برای نمایش در مدال
      const getsazeman = await getFardList(ConfigConnection); // می‌تونه در مدال فراخوانی شود
       let Lfard=[];
                                                getsazeman.data.forEach(datas=>{
                                                            Lfard= {
                                                                id : datas.id,
                                                                name : datas.name
                                                            }
                                                            Fardinfo.push(Lfard);
                                        });                                                                                           
                                        Fardinfo.forEach(item=>{
                                                    const selectElement  = document.getElementById('ListFard');
                                                    const newOption = document.createElement('option');
                                                    newOption.textContent = item.id; // The text displayed to the user
                                                    newOption.value = item.name;
                                                    selectElement.appendChild(newOption);
                                        });  


      let FacGroupinfo=[];
      const facgroup = await getFacGroupList(ConfigConnection); // می‌تونه در مدال فراخوانی شود
       let Lgroup=[];
                                                facgroup.data.forEach(datas=>{
                                                            Lgroup= {
                                                                id : datas.id,
                                                                name : datas.name
                                                            }
                                                            FacGroupinfo.push(Lgroup);
                                        });                                                                                       
                                        FacGroupinfo.forEach(item=>{
                                                    const selectElement  = document.getElementById('ListGroupFac');
                                                    const newOption = document.createElement('option');
                                                    newOption.textContent = item.name; // The text displayed to the user
                                                    newOption.value = item.id;
                                                    selectElement.appendChild(newOption);
                                        });         
    let Anbarinfo=[];                           
    const anbgroup = await getAnbarList(ConfigConnection); // می‌تونه در مدال فراخوانی شود
       let lanb=[];
                                                anbgroup.data.forEach(datas=>{
                                                            lanb= {
                                                                id : datas.id,
                                                                name : datas.name
                                                            }
                                                            Anbarinfo.push(lanb);
                                        });                                                                                           
                                        Anbarinfo.forEach(item=>{
                                                    const selectElement  = document.getElementById('ListAnbar');
                                                    const newOption = document.createElement('option');
                                                    newOption.textContent = item.name; // The text displayed to the user
                                                    newOption.value = item.id;
                                                    selectElement.appendChild(newOption);
                                        });  
}



/**
 * تولید HTML مدال با اطلاعات نسخه
 * @param {Object} data
 * @returns {string} - کد HTML مدال
 */
function buildModalHTML(data) {
            const fbutton = document.getElementById('floating-button');
            fbutton.textContent = '📤 ارسال اطلاعات به نرم‌افزار آریا';
            fbutton.style.backgroundColor =  '#4dc473';
            fbutton.style.color =  'white';

 const content = document.createElement("div");

let rowsHtml =`<div class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--dense q-table--no-wrap q-pa-xs system-table" style="max-height: 50vh;" dir="ltr">
	<div class="q-table__top relative-position row items-center" dir="rtl">
                <div class="col-1" style="padding:5px">
                    <span class="q-table__bottom-item">جستجو </span>
                </div>
                <div class="col-4" style="padding:5px">
                    <input  style="width:100%" type="text" id="inputxtsearch" placeholder="برای جستجو تایپ کنید...">
                </div>
	</div>
	<div class="q-table__middle q-virtual-scroll q-virtual-scroll--vertical scroll scroll-container"><table id="TableListKala" class="q-table">
        <thead style='text-align: center;'><tr><th scope='col' colspan='3'>---</th><th scope='col' colspan='12' style='background:rgb(209, 207, 207)'>اطلاعات سایت</th><th scope='col' colspan='4' style='background-color:rgb(213, 227, 242)'>اطلاعات نرم افزار آریا</th><th scope='col' colspan='4'>---</th></tr><tr style='border:1px solid black'>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>جمع کل پس از تخفیف و مالیات</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>مالیات</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>تخفیف</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>انقضا</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>سری ساخت</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>کد فرآورده</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>جمع</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>قیمت فروش</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>قیمت خرید</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>جمع تعداد</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>تعداد در بسته</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>تعداد بسته</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>کدژنریک</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>نام لاتین فرآورده</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>نام فارسی فرآورده</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>قیمت فروش</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>کدژنریک</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>نام کالا</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>کد کالا</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>#</th>
        <th class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>انتخاب</th>
        <th id="headupdate" title="تغییر وضعیت همه اقلام به عدم آپدیت" class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>آپدیت</th>
        <th id="headSabt" title="تغییر وضعیت همه اقلام به عدم ثبت" class='q-td text-center text-center' style='font-weight:300;border:1px solid black'>ثبت</th>
        </tr>
        </thead>
	<tbody class="q-virtual-scroll__padding"><tr><td colspan="13" style="height: 0px; --q-virtual-scroll-item-height: 28px;"></td></tr></tbody>
	<tbody class="q-virtual-scroll__content" tabindex="-1" id='RdfKala'>
	
	</tbody>
	<tbody class="q-virtual-scroll__padding"><tr><td colspan="13" style="height: 0px; --q-virtual-scroll-item-height: 28px;"></td></tr></tbody>
	</table>
	</div>
	<div class="q-table__bottom row items-center justify-end">
	<div class="q-table__separator col">
	</div>
	<div class="q-table__control"><span class="q-table__bottom-item"></span>
	</div>
		<div class="q-table__control">
		<div class="row full-width">
		</div></div>
	</div>
</div>
`;

        return  `
        <div Class="form-group" style="font-family: Vazir FD, sans-serif;">
        <div style="text-align: center;">
        <span class="q-px-sm">نرم افزار اتوماسیون داروخانه آریا</span>
        </div>
        <div Class="form-control">
                            <table style="
                            width:100%;
                            top=10px;
                            border-collapse:separate;
                            border-spacing:0;
                            margin-bottom:20px;
                            background:#fafafa;
                            box-shadow:0 2px 6px rgba(0,0,0,0.05);
                            border-radius:8px;
                            overflow:hidden;" dir=\"rtl\">
                            <tbody id="tbodyFacheder">
                            <tr style="background:#05f7ab;">
                            <td colspan="2" style="padding:10px; font-weight:bold;width:450px;">${data.CoName}</td>
                            <td style="padding:10px;font-weight:bold;width:100px;">سرور :</td>
                            <td style="padding:10px;font-weight:bold;">${data.Hname}</td>
                            <td style="padding:10px;font-weight:bold; witdh:50px;">کاربر :</td>
                            <td style="padding:10px;font-weight:bold;">${data.Lname}</td>
                            <td style="padding:10px;font-weight:bold;width:100px;">انبار :</td>
                            <td style="padding:1px;width:100px;"><select name="ListAnbar" id="ListAnbar" class="form-select full-width" aria-label="Default select example"><option value="0"></option></select></td>
                            </tr>                            
                            </tr>
                            <tr style="background:#f2f2f2;">
                            <td style="padding:10px;font-weight:bold;width:150px;">نام مشتری :</td>
                            <td style="padding:10px;width:300px;">${data.fardname}</td>                                        
                            <td style="padding:10px; font-weight:bold;width:100px;">مشتری :</td>
                            <td style="padding:10px;"><input type="search" list="ListFard" id="searchFard" name="searchFard" class="form-select full-width" aria-label="Default select example"><datalist id="ListFard"></datalist></td>
                            <td style="padding:10px; font-weight:bold; witdh:50px;">تاریخ فاکتور:</td>
                            <td style="padding:10px;"  id="lbldatefac">${data.datefactor}</td>
                            <td style="padding:10px;font-weight:bold;width:100px;">گروه فاکتور :</td>
                            <td style="padding:1px;width:100px;"><select name="ListGroupFac" id="ListGroupFac" class="form-select full-width" aria-label="Default select example"><option value="0"></option></select></td>
                            </tr>
                            <tr">
                            <td style="padding:10px;font-weight:bold;width:150px;">ش ف مشتری :</td>
                            <td style="padding:10px;width:300px;">
                            <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input" style="border:1px solid;border-radius:5px">
                            <div class="q-field__inner relative-position col self-stretch">
                            <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                                <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                                <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="lblShfacmoshtari" type="text" style="text-align: right;">
                                </div>
                            </div>
                            </div>
                            </label>
                            </td>                                                                    
                            <td style="padding:10px;font-weight:bold;width:100px;">شرح :</td>
                            <td style="padding:10px;" colspan="3">
                            <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input" style="border:1px solid;border-radius:5px">
                            <div class="q-field__inner relative-position col self-stretch">
                            <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                                <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                                <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="lblSharh" type="text" style="text-align: right;">
                                </div>
                            </div>
                            </div>
                            </label>
                            </td>
                            <td style="padding:10px;font-weight:bold;width:100px;">مدت تسویه :</td>
                            <td style="padding:1px;width:100px;">
                            <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input" style="border:1px solid;border-radius:5px">
                            <div class="q-field__inner relative-position col self-stretch">
                            <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                                <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                                <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="lblTasvieh" type="text" style="text-align: right;">
                                </div>
                            </div>
                            </div>
                            </label>
                            </td>
                            </tr>
                        </tbody>
                        </table>
        </div>                
                        <span class="text-muted" dir=\"rtl\">ردیف‌ها:</span>   
                         ${rowsHtml}                                  
                        
        </div>
        <footer>          
        <div class="main"> 
            <hr>
            <div class="row" style="padding:5px">
                <div class="col-md-1 col-sm-2 col-1" style="padding-right:5px"><span>هزینه باربری</span></div> 
                <div class="col-md-2 col-sm-2 col-2"><input id="inputHBarbary" type="text" value="0" style="width:100%"></div>      
                <div class="col-md-1 col-sm-2 col-1" style="padding-right:5px"><span>جمع کل فاکتور</span></div> 
                <div class="col-md-2 col-sm-2 col-2"><input id="inputjamkol" type="text" readonly style="width:100%"></div>
                <div class="col-md-6 col-sm-4 col-6" dir="ltr">
                    <div style=" display:absolute;padding-left:20px;">
                        <button id="btnSabtFactor" class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-secondary text-white q-btn--actionable q-focusable q-hoverable custom-round-borders" tabindex="0" type="button">
                            <span class="q-focus-helper" tabindex="-1"></span>
                            <span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">ثبت فاکتور</span>
                        </button>
                    </div>
                </div>                               
            </div>                             
            <div class="row" style="padding:5px">
                <div class="col-md-1 col-sm-2 col-1" style="padding-right:5px"><span>هزینه متفرقه</span></div> 
                <div class="col-md-2 col-sm-2 col-2"><input id="inputHother" type="text" value="0" style="width:100%"></div>      
                <div class="col-md-1 col-sm-2 col-1" style="padding-right:5px"><span>تخفیفات</span></div> 
                <div class="col-md-2 col-sm-2 col-2"><input id="inputtakhfif" type="text" readonly style="width:100%"></div>             
                <div class="col-md-6 col-sm-4 col-6" dir="ltr">
                    <div style=" display:absolute;padding-left:20px;">
                        <span id="resultmessage"></span>
                    </div>
                </div>                  
            </div>
            <div class="row" style="padding:5px">
                <div class="col-md-1 col-sm-2 col-1" style="padding-right:5px"><span>ارزش افزوده</span></div> 
                <div class="col-md-2 col-sm-2 col-2"><input id="inputHMaliat" type="text" readonly style="width:100%"></div>      
                <div class="col-md-1 col-sm-2 col-1" style="padding-right:5px"><span>جمع خاص فاکتور</span></div> 
                <div class="col-md-2 col-sm-2 col-2"><input id="inputjamKhales" type="text" readonly style="width:100%"></div>                               
            </div>
        </div>                                               
        </footer>        
        `;
        

       
 
}


async function insertNewFactor(ConfigConnection){

   const InsertAria = document.getElementById('btnSabtFactor');
   const closeBtn = document.getElementById('closeBtnManager');
    InsertAria.disabled = true ;
    closeBtn.disabled = true;   

    let CheckKala = 1;
    let CheckTed = 1;
    const tb = document.getElementById('RdfKala');
    const rows = tb.querySelectorAll('tr');

    /**
    * اگر موجودی منفی غیرفعال بود چک کنیم کالایی با وضعیت منفی داخل لیست نباشد
    */

      
    rows.forEach((row,index)=>{
        const codeKalaAria = document.getElementById('datascodeKalaAria'+index);
        if( parseInt(codeKalaAria.innerHTML) === 0 || !codeKalaAria.innerHTML)
        {                         
          if( CheckKala === 1)
            {
              CheckKala = 0;                                                                     
            }
        }                                     
    });        

    rows.forEach((row,index)=>{
        const tedKala = document.getElementById('inputdatastedDarBastehTTAC'+index);
        if( parseInt(tedKala.value) === 0 || !tedKala.value || tedKala.value === "")
        {                         
          if( CheckTed === 1)
            {
              CheckTed = 0;                                                                     
            }
        }                                     
    });   
      
    if(parseInt(CheckKala) === 1 && parseInt(CheckTed) === 1 )
    {
      const facradif = [];
      rows.forEach( (row,index) =>{
      const cells = row.querySelectorAll('td');                                          
          facradif.push({
              maliat: document.getElementById('inputdatasMaliat'+index).value.replace(/,/g, ''),
              tkhfif: document.getElementById('inputdatastakhfif'+index).value.replace(/,/g, ''),
              ex : cells[3].innerText.replace(/-/g,'').trim(),
              serial: cells[4].innerText.trim(),
              ghmasraf: document.getElementById('inputdataspriceTTAC'+index).value.replace(/,/g, ''),
              ghjoje: document.getElementById('inputdatasbuyTTAC'+index).value.replace(/,/g, ''),
              ted: cells[9].innerText.trim(),
              tedDarBasteh: document.getElementById('inputdatastedDarBastehTTAC'+index).value.replace(/,/g, ''),
              tedbasteh: cells[11].innerText.trim(),
              code : cells[18].innerText.trim(),
              update : document.getElementById('inputdatascheckUpdatePrice'+index).checked,
              sabt : document.getElementById('inputdatascheckSabt'+index).checked,
          });
        });
        



        const fard= document.getElementById('searchFard');
        const inputValue = fard.value;
        const datalistElement = document.getElementById('ListFard'); // Replace 'yourDatalistId' with the actual ID of your datalist
        let optionText = '';
        for (const option of datalistElement.options) {
            if (option.value === inputValue) {
                optionText = option.textContent;
                break;
            }
        }

        const selectElement = document.getElementById("ListAnbar"); 
        const selectedValueanbcode = selectElement.value;
        const selectElementg = document.getElementById("ListGroupFac"); 
        const selectedValuefacgroup = selectElementg.value;
                    
      const fachederInsert = {
      codem : optionText,
      anbcode : selectedValueanbcode,
      facgroup : selectedValuefacgroup,
      datefac : document.getElementById("lbldatefac").innerHTML.replace(/\//g, ''),
      Shfacmoshtari : document.getElementById('lblShfacmoshtari').value,
      sharh : document.getElementById('lblSharh').value,
      datetasvieh : document.getElementById('lblTasvieh').value,
      jamkol : document.getElementById('inputjamkol').value.replace(/,/g, ''),
      Hbarbary : document.getElementById('inputHBarbary').value.replace(/,/g, ''),
      Hother : document.getElementById('inputHother').value.replace(/,/g, ''),
      takhfif : document.getElementById('inputtakhfif').value.replace(/,/g, ''),
      Hmaliat : document.getElementById('inputHMaliat').value.replace(/,/g, ''),
      jamkhales : document.getElementById('inputjamKhales').value.replace(/,/g, ''),
      Radifs : facradif
      } 

      //console.log(fachederInsert);

             const result = await InsertIntoFacHeder(ConfigConnection,fachederInsert)
    //         console.log(result);
             if(result.data.code > 0)
            {
                document.getElementById("resultmessage").innerHTML="✅ فاکتور شما با موفقیت در نرم افزار ثبت شد ✅  شماره فاکتور : "+ result.data.code ;
                //alert("✅ فاکتور شما با موفقیت در نرم افزار ثبت شد ✅ \n شماره فاکتور : "+ result.data.code );
                closeBtn.disabled = false;
                console.log("%c  developer by : %cdamavandiarmin@gmail.com  ",'color: red; font-weight: bold; background-color: #f5e8c4','color: green;background-color: #f5e8c4');
            }
            else if(result.data.code === 0){
                document.getElementById("resultmessage").innerHTML="✅ بروزرسانی قیمتها با موفقیت انجام شد ✅ " ;
                //alert("✅ بروزرسانی قیمتها با موفقیت انجام شد ✅ ");
                closeBtn.disabled = false;
                console.log("%c  developer by : %cdamavandiarmin@gmail.com  ",'color: red; font-weight: bold; background-color: #f5e8c4','color: green;background-color: #f5e8c4');
            }
            else
            {
                alert("⚠️ خطا ناشناخته : " + result.statusmessage);
                console.log("%c  developer by : %cdamavandiarmin@gmail.com  ",'color: red; font-weight: bold; background-color: #f5e8c4','color: green;background-color: #f5e8c4');
                InsertAria.disabled = false ;  
                closeBtn.disabled = false;
            }                                
                            
    }
    else
    {
       if(parseInt(CheckKala) === 0)
      {
        alert("❌ برخی از اقلام هنوز  به کالا آریا متصل نشده اند ❌");
      }
      else if(parseInt(CheckTed) === 0)
      {
        alert("❌ تعداد در بسته برخی اقلام اشتباه میباشد ❌");
      }

        InsertAria.disabled = false ;  
        closeBtn.disabled = false;
    }      
}


/**
 * استخراج اطلاعات دارو از جدول
 * @returns {Array<Object>}
 */
export async function parseDrugTable(versionData,minpage) {
  const data = [];  
  const table = versionData.inputsabt.children[0].children[2].children[0].children[0].children[0].children[1].children[0].children[2];
  const rows = table.getElementsByTagName('tr')||[];
  Array.from(rows).forEach( (element ,index) => {
        const cells = element.getElementsByTagName('td');
        if (cells.length >= 12) {
                 data.push({
                rdf: (index+1)+ ((minpage-1)*50),
                fanameTTAC: cells[2].innerText.trim(),
                ennameTTAc: cells[3].innerText.trim(),
                ircTTAC: cells[4].innerText.trim(),
                bachTTAC: cells[5].innerText.trim(),
                gencodeTTAC: cells[7].innerText.trim(),
                tedbastehTTAC: cells[9].innerText.trim(),
                expTTAC: cells[12].innerText.trim(),
              });
        };
        
    });

  return data;
}


/**
 * جستجو در جدول
 */
 function filterTable() {

        const searchInput = document.getElementById('inputxtsearch'); // Assuming an input with id 'mySearchInput'
        const table = document.getElementById('RdfKala'); // Assuming a table with id 'myTable'
        const tr = table.getElementsByTagName('tr');

        const filter = searchInput.value.toUpperCase();

        for (let i = 0; i < tr.length; i++) {
            // Assuming you want to search all cells in the row
            const rowContent = tr[i].innerText.toUpperCase(); 

            // Or, if you want to search a specific column (e.g., the first column)
            // const firstCell = tr[i].getElementsByTagName('td')[0];
            // const rowContent = firstCell ? firstCell.innerText.toUpperCase() : '';

            if (rowContent.indexOf(filter) > -1) {
                tr[i].style.display = ''; // Show the row
            } else {
                tr[i].style.display = 'none'; // Hide the row
            }
        }
    }
/**
 * آپدیت جمع ها
 */
function updatejam(){
        const inputjamkol = document.getElementById('inputjamkol'); 
        const inputjamKhales = document.getElementById('inputjamKhales'); 
        const inputHMaliat = document.getElementById('inputHMaliat'); 
        const inputtakhfif = document.getElementById('inputtakhfif'); 
        const inputHBarbary = document.getElementById('inputHBarbary'); 
        const inputHother = document.getElementById('inputHother'); 
        const table = document.getElementById('RdfKala'); 
        let jamkol=0;
        let jamKhales=0;
        let takhfif=0;
        let maliat=0;

        for (let i = 0; i < table.rows.length; i++) {
            const cell = table.rows[i].cells[6];
            const cellKhales = table.rows[i].cells[0];
            const cellmaliat = table.rows[i].cells[1];
            const celltakhfif = table.rows[i].cells[2];
            if (cell) { 
                const value = parseFloat(cell.textContent.replace(/,/g, ''));
                if (!isNaN(value)) { // Ensure the value is a valid number
                    jamkol += value;
                }
            }
            if (cellKhales) { 
                const value = parseFloat(cellKhales.textContent.replace(/,/g, ''));
                if (!isNaN(value)) { // Ensure the value is a valid number
                    jamKhales += value;
                }
            }

            if (celltakhfif) { 
                const cells = document.getElementById('inputdatastakhfif'+i);                
                const value = parseFloat(cells.value.replace(/,/g, '')) > 100 ? parseFloat(cells.value.replace(/,/g, '')) : parseFloat((cell.textContent.replace(/,/g, '')*(cells.value.replace(/,/g, ''))/100));
                if (!isNaN(value)) { // Ensure the value is a valid number
                    takhfif += value;
                }
            }

            if (cellmaliat) { 
                const cells = document.getElementById('inputdatasMaliat'+i);
                const ctakh = document.getElementById('inputdatastakhfif'+i);
                const value = parseFloat(cells.value.replace(/,/g, '')) > 100 ? parseFloat(cells.value.replace(/,/g, '')) : 
                              parseFloat(ctakh.value.replace(/,/g, '')) > 100 ?  (parseFloat(cell.textContent.replace(/,/g, '')-ctakh.value.replace(/,/g, ''))*parseFloat(cells.value.replace(/,/g, '')))/100 :
                              ((
                                parseFloat(cell.textContent.replace(/,/g, '')) - 
                                parseFloat((cell.textContent.replace(/,/g, '')*(ctakh.value.replace(/,/g, ''))/100)))*parseFloat(cells.value.replace(/,/g, '')))/100 ;
                if (!isNaN(value)) { // Ensure the value is a valid number
                    maliat += value;
                }
            }
        }
    inputjamkol.value=ToRial(jamkol);
    inputjamKhales.value=ToRial(jamKhales + parseFloat(inputHBarbary.value.replace(/,/g, '')) + parseFloat(inputHother.value.replace(/,/g, '')));
    inputtakhfif.value=ToRial(takhfif);
    inputHMaliat.value=ToRial(maliat);
}


function changeValSabtORUpdate(noe , update){
    const tb = document.getElementById('RdfKala');
    const rows = tb.querySelectorAll('tr');
    rows.forEach((row,index)=>{
            if(noe === "sabt"){       
                        const sabt = document.getElementById(`headSabt`);
                        const inputsabt = document.getElementById(`inputdatascheckSabt${index}`);
                        if(update === 1){
                        inputsabt.checked =false;  
                        sabt.title = "تغییر وضعیت همه اقلام به ثبت"; 
                        }

                        if(update === 0)  
                        {
                        inputsabt.checked =true;
                        sabt.title = "تغییر وضعیت همه اقلام به عدم ثبت";
                        }
                                                    
            }

            if(noe === "update"){       
                        const sabt = document.getElementById(`headupdate`);
                        const inputsabt = document.getElementById(`inputdatascheckUpdatePrice${index}`);
                        if(update === 1){                            
                        inputsabt.checked =false;  
                        sabt.title = "تغییر وضعیت همه اقلام به آپدیت"; 
                        }

                        if(update === 0)  
                        {
                        const pttac = document.getElementById(`inputdataspriceTTAC${index}`)
                        const paria = document.getElementById(`dataspriceAria${index}`)

                        inputsabt.checked = parseInt(pttac.value.toString().replace(/,/g, ''))>parseInt(paria.innerText.toString().replace(/,/g, '')) ? true : false;
                        sabt.title = "تغییر وضعیت همه اقلام به عدم آپدیت";
                        }
                                                    
            }
    });
     
    return update ===1 ? 0 : 1;

}