// modules/api.js

/**
 * بررسی صحت اتصالات به سرور
 * 
 * 
 */
export async function CheckConnectionApi(ConfigConnection) {
  try {
    const response = await fetch( `${ConfigConnection.API_URL}api/Pharmcy/GetName`, {
      method: 'GET',
      headers: {
        'X-Db-Server': ConfigConnection.Server ,
        'X-Db-Name': ConfigConnection.DataBase,
        'X-Db-User': ConfigConnection.username,
        'X-Db-Pass': ConfigConnection.pass
      }
    });

    const result = await response.json();

    if (result.success) {
      return await result;
    } else {
      return await result;
      //console.error('⚠️ Server Error:', result.error);
    }

  } catch (err) {
    //console.error('❌ Network or parsing error:', err.message);
    return await new Error('❌ Network or parsing error:', err.message);
    //console.error('❌ Network or parsing error:', err.message);
  }
}

/**
 * دریافت لیست مشتریان
 * @returns {Promise<Object>}
 */
export async function getFardList(ConfigConnection) {
  const response = await fetch(`${ConfigConnection.API_URL}api/Pharmcy/getfard`, {
      method: 'GET',
      headers: {
        'X-Db-Server': ConfigConnection.Server ,
        'X-Db-Name': ConfigConnection.DataBase,
        'X-Db-User': ConfigConnection.username,
        'X-Db-Pass': ConfigConnection.pass
      }
    });
  if (!response.ok) throw new Error("ارتباط با API مشتریان ناموفق بود");
  return await response.json();
}

/**
 * دریافت لیست گروه فاکتور
 * @returns {Promise<Object>}
 */
export async function getFacGroupList(ConfigConnection) {
  const response = await fetch(`${ConfigConnection.API_URL}api/pharmacy/ttacaria/getfacgroups`, {
      method: 'GET',
      headers: {
        'X-Db-Server': ConfigConnection.Server ,
        'X-Db-Name': ConfigConnection.DataBase,
        'X-Db-User': ConfigConnection.username,
        'X-Db-Pass': ConfigConnection.pass
      }
    });
  if (!response.ok) throw new Error("ارتباط با API مشتریان ناموفق بود");
  return await response.json();
}

/**
 * دریافت لیست انبارها
 * @returns {Promise<Object>}
 */
export async function getAnbarList(ConfigConnection) {
  const response = await fetch(`${ConfigConnection.API_URL}api/Pharmacy/ttacaria/GetAnbarList`, {
      method: 'GET',
      headers: {
        'X-Db-Server': ConfigConnection.Server ,
        'X-Db-Name': ConfigConnection.DataBase,
        'X-Db-User': ConfigConnection.username,
        'X-Db-Pass': ConfigConnection.pass
      }
    });
  if (!response.ok) throw new Error("ارتباط با API تخصص‌ها ناموفق بود");
  return await response.json();
}

/**
 * ثبت کالا جدید
 * @param {string} codeDr
 * @param {string} nameDr
 * @param {string} codeTakh
 * @returns {Promise<Object>}
 */
export async function CreateKala(ConfigConnection,infokala) {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/CreateKala`;
  const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Db-Server': ConfigConnection.Server ,
        'X-Db-Name': ConfigConnection.DataBase,
        'X-Db-User': ConfigConnection.username,
        'X-Db-Pass': ConfigConnection.pass,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(infokala)
    });
  if (!response.ok) throw new Error("ثبت کالا در API ناموفق بود");
  return await response.json();
}

/**
 * دریافت اطلاعات کالاها بر اساس ردیف
 * @param {Object} factorData - شامل اطلاعات ردیف‌ها
 * @returns {Promise<Object>}
 */
export async function getKalaInfo(ConfigConnection,factorData) {
  const response = await fetch(`${ConfigConnection.API_URL}api/Pharmacy/ttacaria/SelectKala`, {
    method: "POST",
     headers: {
        'X-Db-Server': ConfigConnection.Server ,
        'X-Db-Name': ConfigConnection.DataBase,
        'X-Db-User': ConfigConnection.username,
        'X-Db-Pass': ConfigConnection.pass,
        "Content-Type": "application/json" 
      },
    body: JSON.stringify(factorData)
  });
  if (!response.ok) throw new Error("دریافت کالاها از API ناموفق بود");
  return await response.json();
}

/**
 * دریافت کالاهای قابل فروش با جستجو و صفحه‌بندی
 * @param {string} codesazeman
 * @param {number} page
 * @param {number} size
 * @param {string} search
 * @returns {Promise<Object>}
 */
export async function fetchProducts(ConfigConnection,codesazeman, page = 1, size = 50, search = '') {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/GetProducts?Codesazeman=${codesazeman}&page=${page}&size=${size}&search=${encodeURIComponent(search)}`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("دریافت محصولات از API ناموفق بود");
  return await response.json();
}

/**
 * ثبت نسخه در نرم‌افزار آریا
 * @param {Object} payload - اطلاعات نسخه و کالاها
 * @returns {Promise<Object>}
 */
export async function InsertIntoFacHeder(ConfigConnection,lstKala) {
  const response = await fetch(`${ConfigConnection.API_URL}api/Pharmacy/TTACAria/InsertIntoFacHeder`, {
    method: "POST",
    headers: { 
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,
          "Content-Type": "application/json" },
    body: JSON.stringify(lstKala)
  });
  //if (!response.ok) throw new Error("ثبت نسخه در API ناموفق بود");
  return await response.json();
}

/**
 * بروزرسانی پیش‌فرض کالا
 * @param {string} Code
 * @param {string} irc
 * * @returns {Promise<Object>}
 */
export async function updateDefaultKala(ConfigConnection, Code, irc) {
  const url = `${ConfigConnection.API_URL}api/pharmacy/ttacaria/UpdateKala?codeKala=${Code}&irc=${irc}`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("ثبت کالای پیش‌فرض ناموفق بود");
  return await response.json();
}


/**
 * تنظیمات تعریف کالا
 * @param {string} Hname
 * @returns {Promise<Object>}
 */
export async function GetSettingCreateKala(ConfigConnection,Hname) {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/GetSettingCreateKala?Hname=${Hname}`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("دریافت تنظیمات تعریف کالا از API ناموفق بود");
  return await response.json();
}


/**
 * چک کد کالا
 * @param {string} Code
 * @returns {Promise<Object>}
 */
export async function CheckCodeKala(ConfigConnection,code) {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/CheckCodeKala?code=${code}`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("دریافت کد کالا از API ناموفق بود");
  return await response.json();
}

/**
 * دریافت اطلاعات کالا
 * @param {string} ActionMethodName
 * @returns {Promise<Object>}
 */
export async function getKalaGroup(ConfigConnection,ActionMethodName) {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/${ActionMethodName}`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("دریافت کد کالا از API ناموفق بود");
  return await response.json();
}

/**
 * دریافت آخرین کد کالا
 * @returns {int}
 */
export async function GetLastCodeKala(ConfigConnection) {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/GetLastCodeKala`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("دریافت کد کالا از API ناموفق بود");
  return await response.json();
}

/**
 * دریافت کد کالا بر اساس گروه
 * @param {string} codeGroup
 * @returns {int}
 */
export async function GetCodeKalaWithCodeGroup(ConfigConnection,codeGroup) {
  const url = `${ConfigConnection.API_URL}api/Pharmcy/GetCodeKalaWithCodeGroup?codegroup=${codeGroup}`;
  const response = await fetch(url, {
          method: 'GET',
          headers: {
          'X-Db-Server': ConfigConnection.Server ,
          'X-Db-Name': ConfigConnection.DataBase,
          'X-Db-User': ConfigConnection.username,
          'X-Db-Pass': ConfigConnection.pass,      
          }
      });
  if (!response.ok) throw new Error("دریافت کد کالا از API ناموفق بود");
  return await response.json();
}
