// content/content.js

import { showMainModal } from '../modules/modalManager.js';
import { CheckConnectionApi } from '../modules/api.js';


// ⚠️ در صورت نیاز، متغیرهای وضعیت کلی افزونه
let isManfi=0;
let id = 0;
let Lname = 0;
let Hname = 0;
let CoName = 0;
let fardnamevalue = 0;
let datefactorvalue = 0;
let inputsabt = 0 ;

// مرحله اولیه بارگذاری
createFloatingButton();


/**
 * ساخت دکمه شناور برای شروع فرآیند افزونه
 */
function createFloatingButton() {
  const button = document.createElement('button');
  button.id = 'floating-button';
  button.textContent = '📤 ارسال اطلاعات به نرم‌افزار آریا';
  Object.assign(button.style, {
    position: 'fixed',
    top: '50px',
    right: '50 px',
    zIndex: '1060',
    backgroundColor: '#4dc473',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  });

console.log("%c  developer by : %cdamavandiarmin@gmail.com  ",'color: red; font-weight: bold; background-color: #f5e8c4','color: green;background-color: #f5e8c4');
 document.body.appendChild(button);

  button.addEventListener('click', async () => {
    button.disabled = true;

    try {
      inputsabt = document.getElementById("q-app");

      if (!inputsabt) {
        alert("❌ فاکتوری مشاهده نمیشود");
        return button.disabled = false;
      }  
        const fardname =   inputsabt.children[0].children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0];
        const datefactor = inputsabt.children[0].children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[0].children[1].children[0].children[0].children[0].children[0];      
        const searchbtn =  inputsabt.children[0].children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[8].children[0].children[0];      
        if( !fardname.value || !datefactor.value)
        {
          alert("⚠️ لطفا ابتدا توزیع کننده و تاریخ را مشخص کنید ⚠️");
          return button.disabled = false;
        }
        else{
          if(searchbtn){
            searchbtn.click();
            fardnamevalue = fardname.value;
            datefactorvalue = datefactor.value;
          }
        }
              
        
      showLoginModal();          
    } catch (err) {
        if(err.message==="Cannot read properties of undefined (reading 'children')"){
           alert("❌ فاکتوری مشاهده نمیشود");
        }
        else{
      console.error("❌ خطا در فرآیند افزونه:", err.message);
      alert("❌ خطا در اجرا. جزئیات در کنسول.");
        }

    } finally {
      button.disabled = false;
    }
  });
}


/**
 * استخراج اطلاعات دارو از جدول
 * @returns {Array<Object>}
 */
function readTableData() {

          const data = [];  
          
          const table = inputsabt.children[0].children[2].children[0].children[0].children[0].children[1].children[0].children[2];

          const rows = table.getElementsByTagName('tr')||[];

          Array.from(rows).forEach( (element ,index) => {
                const cells = element.getElementsByTagName('td');
                if (cells.length >= 12) {
                        const radif = cells[0].children[0];
                        data.push({
                          
                        rdf: radif.innerHTML,
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

function clickNextPage() {
  try{
      const btnNext = inputsabt.children[0].children[2].children[0].children[0].children[1].children[3];
        if (btnNext && !btnNext.disabled) {
          btnNext.click();
          return true;
        }
      return false;
  }
  catch(err)
  {
    if(err.message === "Cannot read properties of undefined (reading 'children')")
    {
      alert("❌ هیج ردیفی برای این اطلاعات وجود ندارد ");
      return false;
    }
    else{
      console.error("❌ خطا در فرآیند خواندن ردیفه:", err.message);
      alert("❌ خطا در اجرا. جزئیات در فاکتور.");
      return false;
    }
  }
  finally {
      const button = document.getElementById('floating-button');
      button.textContent = '📤 ارسال اطلاعات به نرم‌افزار آریا';
      button.style.backgroundColor =  '#4dc473';
      button.style.color =  'white';
      button.disabled = false;
    }

}


function waitForTableUpdate(previousData, callback) {
  const interval = setInterval(() => {
    const newData = readTableData();
    if (JSON.stringify(newData) !== JSON.stringify(previousData)) {
      clearInterval(interval);
      callback(newData);
    }
  }, 3000); // هر ثانیه چک می‌کنه
}


function scrapeAllPages() {
  let allData = [];

  function processPage() {
    const currentData = readTableData();
    allData = allData.concat(currentData);

    if (clickNextPage()) {
      waitForTableUpdate(currentData, () => {
        processPage(); // بازگشتی برای صفحه بعد
      });
    } else {
      const Heder ={
                CoName : CoName,
                id : id,
                Lname : Lname,
                Hname : Hname,
                Server : ConfigConnection.Server,
                DataBase : ConfigConnection.DataBase,
                username : ConfigConnection.username,
                pass : ConfigConnection.pass,
                APIURL : ConfigConnection.API_URL,
                fardname : fardnamevalue ,
                datefactor : datefactorvalue,
                inputsabt : inputsabt,
                radifs : allData,
            }
           if(allData.length>0)
            showMainModal(Heder);
    }
  }

  processPage();
}


let ConfigConnection=[];
let result=[];

export async function showLoginModal(){

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
  modal.id = 'InsertDr';
  modal.style = `
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 30vw;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);`
  ;

  const content = document.createElement('div');
  content.setAttribute('class','system-card col-12 q-pa-sm q-mb-lg');
  content.innerHTML = `

    <div class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable bg-primary text-white" style="background:rgb(212, 206, 205);heitgh:5vh;border-top-left-radius:50px;border-top-right-radius:50px;justify-content: center">
        <h5 class="q-item__label" style="margin:0">ورود به نرم افزار</h5>
    </div>
    <div class="q-expansion-item__container relative-position">
    </form>
    <form>
        <div class="col-12 col-sm-6 col-md-3 q-pa-xs column justify-end">
                <div class="full-width">
                    <label class="text-system-primary text-bold q-pl-sm">نام کاربری</label><br>      
                    <!-- <input type="text" name="uidaria" autocomplete="off" id="uidaria" class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input" value="" placeholder="نام کاربری"/> -->
                    <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input">
                    <div class="q-field__inner relative-position col self-stretch">
                      <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                          <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="uidaria" type="password" style="text-align: right;" value="" placeholder="نام کاربری">
                        </div>
                      </div>
                    </div>
                    </label>
                </div> 
                <div class="col-2">            
                </div>      
        </div>
        <div class="w-100"></div>
        <div class="row">
                <div class="full-width">
                    <label class="text-system-primary text-bold q-pl-sm">رمز عبور</label><br>            
                    <!-- <input type="text" name="pidaria" autocomplete="off" id="pidaria" class="form-control" value="" placeholder="رمز عبور"/> -->
                    <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input">
                    <div class="q-field__inner relative-position col self-stretch">
                      <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                          <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="pidaria" type="password" style="text-align: right;" value="" placeholder="رمز عبور">
                        </div>
                      </div>
                    </div>
                    </label>
                </div> 
                <div class="col-2">            
                </div>      
        </div>
        <div class="w-100"></div>
        <div class="row">
                <div class="full-width">
                    <label class="text-system-primary text-bold q-pl-sm">نام سرور</label><br>            
                    <!-- <input type="text" name="servernamearia"  id="servernamearia" class="form-control" disabled/> -->
                    <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input">
                    <div class="q-field__inner relative-position col self-stretch">
                      <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                          <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="servernamearia" type="text" style="text-align: right;" value="" disabled>
                        </div>
                      </div>
                    </div>
                    </label>
                </div> 
                <div class="col-2">            
                </div>      
        </div>
        <div class="w-100"></div>
        <div class="row">
                <div class="full-width">
                    <label class="text-system-primary text-bold q-pl-sm">پایگاه داده</label><br>            
                    <!-- <input type="text" name="databasenamearia" id="databasenamearia" class="form-control" disabled/> -->
                    <label class="q-field row no-wrap items-start q-field--borderless q-input q-field--dense system-blue-input">
                    <div class="q-field__inner relative-position col self-stretch">
                      <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                          <input class="q-field__native q-placeholder text-left ltr" tabindex="0" id="databasenamearia" type="text" style="text-align: right;" value="" disabled>
                        </div>
                      </div>
                    </div>
                    </label>
                </div> 
                <div class="col-2">            
                </div>      
        </div>
        <div class="w-100"></div><br>
    </form>    
    </div> 
    <div class="card-footer">   
        <div class="row"  style=" position: relative;">
            <div class="col-12 col-sm-6 col-md-3 q-pa-xs column justify-end">
            </div>
            <div class="col-12 col-sm-6 col-md-3 q-pa-xs column justify-end">
            <button class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-system-primary text-white q-btn--actionable q-focusable q-hoverable custom-round-borders" id="btnInsideModalDr" style="height:auto;width:100%;top: 0%;bottom: 0%;margin:0;pading:0;"><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">ورود</span></button>
            </div>
            <div class="col-12 col-sm-6 col-md-3 q-pa-xs column justify-end">
            <button class="q-btn q-btn-item non-selectable no-outline q-btn--outline q-btn--rectangle text-system-primary q-btn--actionable q-focusable q-hoverable custom-round-borders" id="btnCloseModalDr" style="height:auto;width:100%;top: 0%;bottom: 0%;margin:0;pading:0;"><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">خروج</span></button>
            </div>
        </div>        
    </div>   
  </div>  
  
    `
  ;

    const Ft = document.createElement('div');
    Ft.innerHTML=`<div><span style="color:red;">توجه :</span></div><div><span>*** - فقط اطلاعات موجود درصفحه خوانده میشود</span></div><div><span>*** - در صفحه اول فاکتور باشید</span></div><div><span>*** - فاکتورهای چند صفحه ای توسط خود برنامه خوانده میشود،از تغییر صفحه در زمان خواندن اطلاعات خودداری کنید</span></div>`;

  modal.appendChild(content);
  modal.appendChild(Ft);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // بستن مدال
  document.getElementById('btnCloseModalDr').addEventListener('click', () => {
    backdrop.remove();
  });

   document.getElementById('btnInsideModalDr').addEventListener('click',async() => {
    const cls = document.getElementById('btnCloseModalDr');
       const ins = document.getElementById('btnInsideModalDr');
       cls.disabled=true;
       ins.disabled=true;
    if(document.getElementById('uidaria').value === null || !document.getElementById('uidaria').value){
          alert("نام کاربری و رمز خود را وارد کنید");
          cls.disabled=false;
          ins.disabled=false;
    }
        
    else   {
       
      ConfigConnection.username = document.getElementById('uidaria').value;
      ConfigConnection.pass = document.getElementById('pidaria').value;
      ConfigConnection.Server = document.getElementById('servernamearia').value;
      ConfigConnection.DataBase = document.getElementById('databasenamearia').value;
      
       result = await CheckConnectionApi(ConfigConnection);               
        if(result.success){        
            const fbutton = document.getElementById('floating-button');
            fbutton.textContent = `در حال واکشی اطلاعات... لطفا کمی صبر کنید` ;
            fbutton.style.backgroundColor =  '#317338';
            fbutton.style.color =  'yellow';
            fbutton.disabled = true;    
            //console.log(result.data.coName);
            id = result.data.id;
            Lname = result.data.lname;
            Hname = result.data.hname;
            CoName = result.data.coName;
            backdrop.remove();           
            scrapeAllPages();   
            
        }
        else
        {
          alert("⚠️نام کاربری یا رمز ورود اشتباه میباشد⚠️"); 
          cls.disabled=false;
          ins.disabled=false;
        }               
      return result;
    }   
        
  });


  chrome.runtime.sendMessage({ action: 'readConfig' }, (response) => {
    if (response?.config) {
      const config = response.config;
      ConfigConnection = config;
      // حالا می‌تونی هر قسمت از UI رو با مقادیر config پر کنی
      document.getElementById('uidaria').value = config.username || null;
      document.getElementById('pidaria').value = config.pass || null;
      document.getElementById('servernamearia').value = config.Server ;
      document.getElementById('databasenamearia').value = config.DataBase ;
    } else {
      console.error('خطا در دریافت تنظیمات:', response?.error || response);
    }
  });
    
}

