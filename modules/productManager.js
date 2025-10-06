// modules/productManager.js

import { fetchProducts, updateDefaultKala } from './api.js';
import { ToRial } from './utils.js';

const pageSize = 50;


export async function showProductModal(ConfigConnection,searchValue,namereq,strCodesazeman,index,irc){
 const backdrop = document.createElement('div');
    backdrop.id = 'modalBackdropDr';
    backdrop.style = `
      position: fixed; top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.5);
      overflow-y: auto;
      display: flex; justify-content: center; align-items: center; direction: rtl;
      z-index: 9999;`;

    const modal = document.createElement('div');
    modal.id = 'InsertDr';
    modal.style = `
      background: white;
      max-height: 90vh;
      padding: 20px;
      border-radius: 8px;
      top: 10%;
      width: 80vw;
      box-shadow: 0 0 20px rgba(0,0,0,0.3);`;

    const content = document.createElement("div");
    content.style.height = '80vh';
    content.setAttribute=("class","q-drawer-container");

    content.innerHTML = `
      <div style="background:rgb(203, 245, 232)">
        <div class="text-system-primary text-bold text-subtitle1">
          <small>جستجو کالا</small>
          <p style="font-size:1rem">
            <span></span><span>${searchValue} - </span><span>${namereq}</span>
          </p>
        </div>
        <div class="row">
          <div>
          <span style="margin-right:1rem;margin-top:0.5rem;margin-bottom:0.5rem;">جستجو</span>
          </div>
          <div class="col-sm-10">
            <input autocomplete="off" style="margin-right:0.5rem;margin-bottom:0.5rem;width:100%" type="text" name="SName" value="${searchValue}" placeholder="برای جستجو تایپ کنید..." />
          </div>
        </div>
      </div>
      <div style="margin-top:1rem;">
        <div class="q-table__container column no-wrap q-table__card q-table--dense q-pa-xs system-table" style="max-height: 65vh;">
        <div class="q-table__middle q-virtual-scroll q-virtual-scroll--vertical scroll scroll-container">
          <table class="q-table">
            <thead style="text-align: center;">
              <tr style="border:1px solid black">
                <th class="q-td text-center text-center" style="border:1px solid black">موجودی انبار</th>
                <th class="q-td text-center text-center" style="border:1px solid black">موجودی قفسه</th>
                <th class="q-td text-center text-center" style="border:1px solid black">قیمت</th>
                <th class="q-td text-center text-center" style="border:1px solid black">کدژنریک</th>
                <th class="q-td text-center text-center" style="border:1px solid black"><span style="white-space: normal; line-height: 1.4; max-height: 2.8em; overflow: hidden;">نام لاتین</span></th>
                <th class="q-td text-center text-center" style="border:1px solid black"><span style="white-space: normal; line-height: 1.4; max-height: 2.8em; overflow: hidden;">نام فارسی</span></th>
                <th class="q-td text-center text-center" style="border:1px solid black">کد کالا</th>
                <th class="q-td text-center text-center" style="border:1px solid black">انتخاب</th>
              </tr>
            </thead>
            <tbody id="productTableBody">
            </tbody>
          </table>
          </div>
        </div>
  </div>`;

  const closeBtn = document.createElement('button');
  closeBtn.id = 'btnCloseModalDr';
  closeBtn.textContent = 'بستن';
  closeBtn.classList.add('q-btn','q-btn-item','non-selectable','no-outline','q-btn--standard','q-btn--rectangle','bg-system-negative','text-white','q-btn--actionable','q-focusable','q-hoverable','q-btn--dense','custom-round-borders','q-mx-sm','q-pa-xs');
  closeBtn.style = "margin-top: 10px; float: left;";

  modal.appendChild(content);
  modal.appendChild(closeBtn);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

    closeBtn.addEventListener('click', function () {
        backdrop.remove();
    });

    backdrop.addEventListener('click', function (event) {
        if (!modal.contains(event.target)) {
        event.stopPropagation();
        }
       });
 // بارگذاری محصولات صفحه اول

  loadProductList(ConfigConnection,strCodesazeman, 1,searchValue,index,irc);


    let searchTimer;
    document.querySelector('input[name="SName"]').addEventListener("input", function () {
    clearTimeout(searchTimer);
    const searchValue = this.value.trim();

    searchTimer = setTimeout(() => {
        loadProductList(ConfigConnection,strCodesazeman, 1,searchValue,index,irc);
    }, 300); // استفاده از debounce برای کاهش بار روی API
    });

}

/**
 * بارگذاری لیست کالاها با صفحه‌بندی و جستجو
 * @param {string} codesazeman
 * @param {number} page
 * @param {string} searchValue
 * @param {number} indexAria - شماره ردیف در نسخه برای اعمال انتخاب
 */
export async function loadProductList(ConfigConnection,codesazeman, page = 1, searchValue = '', indexAria,irc) {
  const data = await fetchProducts(ConfigConnection,codesazeman, page, pageSize, searchValue === '' ? null : searchValue);
  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = '';
  renderProducts(ConfigConnection,data.data, indexAria,irc);
}

/**
 * ساخت ردیف‌های کالا در جدول مدال
 * @param {Array<Object>} products
 * @param {number} indexAria
 */
function renderProducts(ConfigConnection,products, indexAria,irc) {
  const tbody = document.getElementById('productTableBody');

  products.forEach((p, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `      
      <td class="text-center" style="border:1px solid black" id="trmojodianb${index}">${p.mojodiAnb ?? ''}</td>
      <td class="text-center" style="border:1px solid black" id="trmojodi${index}">${p.mojodi ?? ''}</td>
      <td class="text-center" style="border:1px solid black" id="trprice${index}">${ToRial(p.price || '0')}</td>
      <td class="text-center" style="border:1px solid black" id="trgencode${index}">${p.gencode}</td>
      <td class="text-center" style="border:1px solid black" id="trenname${index}">${p.enname}</td>
      <td class="text-center" style="border:1px solid black" id="trfaname${index}">${p.faname}</td>
      <td class="text-center" style="border:1px solid black" id="trcode${index}">${p.code}</td>
      <td class="text-center" style="border:1px solid black" id="trbtn${index}"><button id="btnselectKala${index}" class="btn btn-sm btn-success">انتخاب</button></td>
      `;

    tbody.appendChild(tr);

    const btn = document.getElementById(`btnselectKala${index}`);
    // btn.textContent = 'انتخاب';
    // btn.classList.add('btn', 'btn-sm', 'btn-success');
    // btn.id = ``;
    // document.getElementById(`trbtn${index}`).appendChild(btn);

    btn.addEventListener('click', () => handleSelectProduct(ConfigConnection,index, indexAria,irc));
  });
}

/**
 * اعمال انتخاب کالا روی ردیف نسخه
 * @param {number} index
 * @param {number} indexAria
 */
async function handleSelectProduct(ConfigConnection,index, indexAria,irc) {
  const code = document.getElementById(`trcode${index}`).innerText.trim();
  const faname = document.getElementById(`trfaname${index}`).innerText.trim();
  const gencode = document.getElementById(`trgencode${index}`).innerText.trim();
  const priceRaw = document.getElementById(`trprice${index}`).innerText.replace(/,/g, '');

  const codeAria = document.getElementById(`datascodeKalaAria${indexAria}`);
  const fanameAria = document.getElementById(`datasfanameAria${indexAria}`);
  const gencodeAria = document.getElementById(`datasgencodeAria${indexAria}`);
  const priceAria = document.getElementById(`dataspriceAria${indexAria}`);
  const priceTTAc = document.getElementById(`inputdataspriceTTAC${indexAria}`);
  const trrdf = document.getElementById(`rdf${indexAria}`);
  const cupdate = document.getElementById(`inputdatascheckUpdatePrice${indexAria}`)
  // اختلاف قیمت
  trrdf.style.background = parseInt(priceTTAc.value.replace(/,/g, '')) > parseInt(priceRaw) ? "rgba(173, 240, 215, .5)" : parseInt(priceTTAc.value.replace(/,/g, '')) < parseInt(priceRaw) ?  "rgba(252, 249, 207, 1)" :'transparent';
  cupdate.checked = parseInt(priceTTAc.value.replace(/,/g, '')) > parseInt(priceRaw) ? true : false;

  await updateDefaultKala(ConfigConnection,code, irc);

  // // ذخیره پیش‌فرض ژنریک
  // if(codeAria.innerText === '0'){
  //   const confirmed = confirm("آیا داروی انتخابی را به عنوان پیش‌فرض ژنریک ذخیره می‌کنید؟");
  //     if (confirmed) {
  //       await updateDefaultKala(ConfigConnection,code, irc);
  //     }
  // }

  // else if (!codeAria.innerText || codeAria.innerText !== code) {
  //   if (gencode === gencodeTamin.innerText) {
  //     const confirmed = confirm("آیا داروی انتخابی را به عنوان پیش‌فرض ژنریک ذخیره می‌کنید؟");
  //     if (confirmed) {
  //       await updateDefaultKala(ConfigConnection,codeAria.innerText, code, gencodeTamin.innerText);
  //     }
  //   }
  // }

  // اعمال در جدول
  fanameAria.innerText = faname;
  gencodeAria.innerText = gencode;
  priceAria.innerText = ToRial(priceRaw);
  codeAria.innerText = code;

  // بستن مدال
  document.getElementById('InsertDr')?.remove();
  document.getElementById('modalBackdropDr')?.remove();
}
