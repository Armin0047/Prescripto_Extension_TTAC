// modules/createkalaManager.js

import {  CreateKala ,GetSettingCreateKala,CheckCodeKala,getKalaGroup,GetLastCodeKala,GetCodeKalaWithCodeGroup} from './api.js';
import { ToRial } from '../modules/utils.js';
/**
 * نمایش مدال ثبت پزشک با لیست تخصص‌ها
 * @param {string} docID - کد نظام پزشک
 */
export async function showKalaModal(ConfigConnection,fanameTTAC,ennameTTAc,gencodeTTAC,buy,price,ircTTAC,Hname,index) {



  const backdrop = document.createElement('div');
  backdrop.id = 'modalBackdropDr';
  
  backdrop.style = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    direction: rtl;
    z-index: 9999;`
  ;

  const modal = document.createElement('div');
  modal.id = 'InsertKala';
  modal.classList.add('status-yellow','column','justify-end','container');  
  modal.style = `
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 50vw;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);`
  ;

  const content = document.createElement('div');
  content.classList.add('q-header','q-layout__section--marginal','system-header');
  content.style.padding="20px";
  content.innerHTML = `
    <div>
		<span style="color:black;font-weight:1000;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">تعریف کالا</span>
	</div>
    <div>
	<span style="color:black">${fanameTTAC}</span>
	</div>
	<div id="CodeKala0" class="row">
        <div>
		    <div id="lastCodeKala" class="q-checkbox cursor-pointer no-outline row inline no-wrap items-center" role="checkbox" aria-checked="false">
			    <div id="ClastCodeKala" class="q-checkbox__inner relative-position non-selectable q-checkbox__inner--falsy">
				<input class="hidden q-checkbox__native absolute q-ma-none q-pa-none" type="checkbox">
					<div class="q-checkbox__bg absolute">
						<svg class="q-checkbox__svg fit absolute-full" viewBox="0 0 24 24" aria-hidden="true">
						<path class="q-checkbox__truthy" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
						<path class="q-checkbox__indet" d="M4,14H20V10H4"></path>
						</svg>
					</div>			
			    </div>
			    <div class="q-checkbox__label q-anchor--skip" style="color:black">آخرین کد کالا
			    </div>
		    </div>
        </div>        
	</div>
    <div class="row">
            <div class="col-3" style="padding:5px;" dir="ltr">            
	        <span style="color:black" dir="rtl">کدکالا:</span>   
	        </div>
        	<div class="col-6">
                <input id="inputtxtCodeKala" type="text" style="width:100%" autocomplete=off>
	        </div>
        	<div style="padding:5px;" class="col-3">
	        <spam id="lblCoderepeat" style="color:red;font-weight:800" hidden>کد کالا تکراری</spam>
        	</div>
    </div>
	<div>
		<div class="row" id="CodeKala1" style="padding:5px">
			<div class="col-3" dir="ltr" style="padding:5px">
			<label style="color:black" dir="rtl">دسته دارویی:</label>
        	</div>
			<div class="col-6">
			<select id="selectdastedaroo" style="width:100%">			
			</select>
		    </div>
		</div>    
		<div class="row" style="padding:5px">
			<div class="col-3" dir="ltr" style="padding:5px">
			<label style="color:black" dir="rtl">گروه کالا:</label>
			</div>
			<div class="col-6">
			<select id="selectDruggroup" style="width:100%">
			</select>
			</div>     
            <div style="padding:5px;" class="col-3">
	        <spam id="lblDrugCode" style="color:red;font-weight:800" hidden>تعریف با گروه کالا</spam>
        	</div>      
		</div>
		<div class="row" id="CodeKala1" style="padding:5px">
			<div class="col-3" style="padding:5px" dir="ltr">
			<label style="color:black" dir="rtl">زیرگروه کالا:</label>
	        </div>
			<div class="col-6">
			<select style="width:100%" id="selectnoekala">
			</select>
	        </div>
		</div>
	</div>
    <div><hr></div>
	<div class="row">
		<div>
			<div id="fani" class="q-checkbox cursor-pointer no-outline row inline no-wrap items-center" tabindex="0" role="checkbox" aria-checked="false">
				<div id="Cfani" class="q-checkbox__inner relative-position non-selectable q-checkbox__inner--falsy">
					<input class="hidden q-checkbox__native absolute q-ma-none q-pa-none" type="checkbox">
						<div class="q-checkbox__bg absolute">
							<svg class="q-checkbox__svg fit absolute-full" viewBox="0 0 24 24" aria-hidden="true">
								<path class="q-checkbox__truthy" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
								<path class="q-checkbox__indet" d="M4,14H20V10H4"></path>
							</svg>
						</div>
				</div>
				<div class="q-checkbox__label q-anchor--skip" style="color:black">شامل حق فنی در نسخه
				</div>
			</div>
		</div>
    		<div>
			<div id="otc" class="q-checkbox cursor-pointer no-outline row inline no-wrap items-center" tabindex="0" role="checkbox" aria-checked="false">
				<div id="Cotc" class="q-checkbox__inner relative-position non-selectable q-checkbox__inner--falsy">
					<input class="hidden q-checkbox__native absolute q-ma-none q-pa-none" type="checkbox">
						<div class="q-checkbox__bg absolute">
							<svg class="q-checkbox__svg fit absolute-full" viewBox="0 0 24 24" aria-hidden="true">
								<path class="q-checkbox__truthy" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
								<path class="q-checkbox__indet" d="M4,14H20V10H4"></path>
							</svg>
						</div>
				</div>
				<div class="q-checkbox__label q-anchor--skip" style="color:black">شامل حق فنی در OTC 
				</div>
			</div>
		</div>
	</div>
	<div class="q-table__bottom row items-center justify-end">
    		<div class="q-table__separator col" style="padding-top:10px">
      			<button id="btnInsideModalKala" class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-secondary text-white q-btn--actionable q-focusable q-hoverable custom-round-borders" tabindex="0" type="button">
			<span class="q-focus-helper" tabindex="-1"></span>
			<span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><span class="block">ثبت / ذخیره</span>
			</button>
		</div>
    		<div style="padding-top:10px">
			<button id="btnCloseModalKala" class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-system-negative text-white q-btn--actionable q-focusable q-hoverable custom-round-borders" tabindex="0" type="button">
			<span class="q-focus-helper" tabindex="-1"></span>
			<span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">بستن / انصراف</span>
			</button>
        	</div>`
  ;

  modal.appendChild(content);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
    await GetSettingKala(ConfigConnection,Hname);
  // بستن مدال
  document.getElementById('btnCloseModalKala').addEventListener('click', () => {
    backdrop.remove();
  });



    const fani=document.getElementById('fani');
    fani.addEventListener('click', () => {
    const v = fani.getAttribute('aria-checked');
    const Cfani=document.getElementById('Cfani');
    if( v === 'true'){
        fani.setAttribute('aria-checked', 'false');        
        Cfani.classList.remove('q-checkbox__inner--truthy');
        Cfani.classList.add('q-checkbox__inner--falsy');
    }
    else{
        fani.setAttribute('aria-checked', 'true');
        Cfani.classList.remove('q-checkbox__inner--falsy');
        Cfani.classList.add('q-checkbox__inner--truthy');        
    }   
  });


    const otc=document.getElementById('otc');
    otc.addEventListener('click', () => {
    const v = otc.getAttribute('aria-checked');
    const Cotc=document.getElementById('Cotc');
    if( v === 'true'){
        otc.setAttribute('aria-checked', 'false');        
        Cotc.classList.remove('q-checkbox__inner--truthy');
        Cotc.classList.add('q-checkbox__inner--falsy');
    }
    else{
        otc.setAttribute('aria-checked', 'true');
        Cotc.classList.remove('q-checkbox__inner--falsy');
        Cotc.classList.add('q-checkbox__inner--truthy');        
    }   
  });


  // ثبت کالا
  document.getElementById('btnInsideModalKala').addEventListener('click', async () => {
    const inputcodekala= document.getElementById("inputtxtCodeKala");
    if(inputcodekala.value >0)
    {
        const selectdastedaroo = document.getElementById('selectdastedaroo');        
        const selectDruggroup = document.getElementById('selectDruggroup');        
        const selectnoekala = document.getElementById('selectnoekala');        
        const checkboxfani = document.getElementById('fani'); 
        const faniValue = checkboxfani.getAttribute('aria-checked');
        const checkboxotc = document.getElementById('otc'); 
        const otcValue = checkboxotc.getAttribute('aria-checked');

        const infoKala ={
          code : inputcodekala.value,
          faname : fanameTTAC,
          enname : ennameTTAc,
          gencode : gencodeTTAC ,
          price : price.replace(/,/g, ''),
          buy : buy.replace(/,/g, ''),
          irc : ircTTAC,
          dastedaroo : selectdastedaroo.value,
          codegroup : selectDruggroup.value,
          type : selectnoekala.value,
          fani : faniValue === 'true' ? 1 : 0,
          otc : otcValue === 'true' ? 1 :0,
          
        }       
              
        
              //console.log(infoKala);
              try {
                const result = await CreateKala(ConfigConnection,infoKala);
                if (result.success) {
                  // اعمال در مدال اصلی نسخه
                    const codeAria = document.getElementById(`datascodeKalaAria${index}`);
                    const fanameAria = document.getElementById(`datasfanameAria${index}`);
                    const gencodeAria = document.getElementById(`datasgencodeAria${index}`);
                    const priceAria = document.getElementById(`dataspriceAria${index}`);
                    fanameAria.innerText = infoKala.faname;
                    gencodeAria.innerText = infoKala.gencode;
                    priceAria.innerText = ToRial(infoKala.price);
                    codeAria.innerText = infoKala.code;
                    const tr = document.getElementById(`rdf${index}`);
                    tr.style.background = "transparent";
                    backdrop.remove();
                } else {
                  alert("❌ خطا: " + result.message);
                }
              } catch (err) {
                console.error("❌ خطا در ثبت:", err.message);
              }
    }
    else{
      alert("ابتدا مقدار کد کالا را پر کنید.");
    }    
  });

  await infoKala(ConfigConnection);
}



export async function GetSettingKala(ConfigConnection,Hname){    
    const result = await GetSettingCreateKala(ConfigConnection,Hname);
    if(parseInt(result.data.val) === 1)
    {
       const kala= document.getElementById("CodeKala0");
       const inputcodekala= document.getElementById("inputtxtCodeKala");
       const lblDrugCode= document.getElementById("lblDrugCode");              
       if(kala){
                kala.remove();     
       }
       inputcodekala.disabled = true;
       lblDrugCode.hidden=false;   
        const selectElement  = document.getElementById('selectDruggroup');
        selectElement.addEventListener('change', function() {
        const selectedValue = this.value; 
                // 'this' refers to the select element
                //console.log('Selected value:', selectedValue);
                // You can also access the selected text:
                //const selectedText = this.options[this.selectedIndex].text;
                //console.log('Selected text:', selectedText);
                if(selectedValue>0)
                {
                    const code= GetCodeKalaWithCodeGroup(ConfigConnection,selectedValue);
                    code.then((result) => {inputcodekala.value=result.data.code;});
                    
                }
                else{
                    inputcodekala.value="";
                }
        });



    }
    else{
         const lastCodeKala=document.getElementById('lastCodeKala');
            lastCodeKala.addEventListener('click', () => {
            const v = lastCodeKala.getAttribute('aria-checked');
            const ClastCodeKala=document.getElementById('ClastCodeKala');
            if( v === 'true'){
                lastCodeKala.setAttribute('aria-checked', 'false');                
                ClastCodeKala.classList.remove('q-checkbox__inner--truthy');
                ClastCodeKala.classList.add('q-checkbox__inner--falsy');
                const inputcodekala= document.getElementById("inputtxtCodeKala");
                inputcodekala.value="";
                inputcodekala.disabled = false;
            }
            else{

                const inputcodekala= document.getElementById("inputtxtCodeKala");
                lastCodeKala.setAttribute('aria-checked', 'true');
                ClastCodeKala.classList.remove('q-checkbox__inner--falsy');
                ClastCodeKala.classList.add('q-checkbox__inner--truthy');  
                inputcodekala.disabled = true;
                const lastcode = GetLastCodeKala(ConfigConnection);
                lastcode.then((result) => {
                    inputcodekala.value=result.data.code;
                });
                
            }   
        });
        const insCodeKala = document.getElementById(`inputtxtCodeKala`);
        insCodeKala.addEventListener('keypress', function(event) {
            if (!/[0-9]/.test(event.key)) {event.preventDefault();}});


        insCodeKala.addEventListener('input', (event) => {
                        const currentValue = event.target.value;    
                        const lbl = document.getElementById("lblCoderepeat");                    
                        if (parseInt(currentValue)>0) 
                        {
                            
                            const code= CheckCodeKala(ConfigConnection,currentValue);
                            code.then((result) => {
                                if(parseInt(result.data.val) > 0 ){lbl.hidden=false;}
                                else{lbl.hidden=true;}
                                });
                           
                        }
                        else{lbl.hidden=true;}
                    });
    }
}

export async function infoKala(ConfigConnection) {
    const dastedaroo = await getKalaGroup(ConfigConnection,'GetDastedaroo');
    dastedaroo.data.forEach(item=>{
                                                    const selectElement  = document.getElementById('selectdastedaroo');
                                                    const newOption = document.createElement('option');
                                                    newOption.textContent = item.name; // The text displayed to the user
                                                    newOption.value = item.id;
                                                    selectElement.appendChild(newOption);
                                        }); 
    const druggroup = await getKalaGroup(ConfigConnection,'GetDrugGroup');
    druggroup.data.forEach(item=>{
                                                    const selectElement  = document.getElementById('selectDruggroup');
                                                    const newOption = document.createElement('option');
                                                    newOption.textContent = item.name; // The text displayed to the user
                                                    newOption.value = item.id;
                                                    selectElement.appendChild(newOption);
                                        });  
    const noeKala = await getKalaGroup(ConfigConnection,'GetNoeKala');
    noeKala.data.forEach(item=>{
                                                    const selectElement  = document.getElementById('selectnoekala');
                                                    const newOption = document.createElement('option');
                                                    newOption.textContent = item.name; // The text displayed to the user
                                                    newOption.value = item.id;
                                                    selectElement.appendChild(newOption);
                                        }); 
    //const Ldastedaroo = document.getElementById('selectdastedaroo');

}