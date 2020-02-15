module.exports = {
    _id: '_id',
    productId: 'product_id',
    name: 'name',
    type: 'type',
    subType: 'subtype',
    price: 'price',
    thumbnail: 'thumbnail',
    canSell: 'can_sell',
    images: {
        path: 'images',
        fn: (propertyValue, source) =>
        {
            return propertyValue;
        }
    },
    groupedProducts: {
        path: 'groupedproducts',
        fn: (propertyValue, source) =>
        {
            if(!isEmptyObject(propertyValue)){
                propertyValue.forEach(e =>{
                    e['productId'] = e['product_id']
                    delete e['product_id']
                })
            }
            else
                return null
            return propertyValue;
        }
    },
    descriptions: {
        path: 'description',
        fn: (propertyValue, source) =>
        {
            if(!isEmptyObject(propertyValue)){
                let object = {
                    'th':propertyValue[0]['TH'],
                    'en':propertyValue[1]['EN']
                }
                return object;
            }
            else{
                let object = {
                    'th':null,
                    'en':null
                }
                return object;
            }
        }
    },
    attributesKv: (iteratee, source, destination) =>
    {
        let attr = iteratee.attributeskv

        if(attr){
            let arrayVimmiProductId = new Array()
            attr.VIMMI_PRODUCT_ID.split(',').forEach(e =>{
                let text = e.replace('\n',"").replace('\t',"")
                text ? arrayVimmiProductId.push(text) : null
            })

            let arrayAllowNtype = new Array()
            attr.ALLOW_NTYPE.split('|').forEach(e =>{
                let text = e.replace('\n',"").replace('\t',"")
                text ? arrayAllowNtype.push(text) : null
            })
            
            let arraySupportPlatform = new Array()
            attr.SUPPORT_PLATFORM.split('|').forEach(e =>{
                let text = e.replace('\n',"").replace('\t',"")
                text ? arraySupportPlatform.push(text) : null
            })

            attr['imageMob'] = attr['imagemob'] || null
            attr['imageStb'] = attr['imagestb'] || null
            attr['productCode3Bo'] = attr['PRODUCT_CODE_3BO'] || null
            attr['productCode3Po'] = attr['PRODUCT_CODE_3PO'] || null
            attr['productCode3Be'] = attr['PRODUCT_CODE_3BE'] || null
            attr['productCode3Pe'] = attr['PRODUCT_CODE_3PE'] || null
            attr['productCodeIpe'] = attr['PRODUCT_CODE_IPE'] || null
            attr['productCode'] = attr['PRODUCT_CODE'] || null
            attr['etkFixName'] = attr['ETK_FIX_NAME'] || null
            attr['accessNumber'] = attr['ACCESS_NUMBER'] || null
            attr['charge'] = attr['CHARGE'] || null
            attr['sellInVAccount'] = attr['SELL_IN_V_ACCOUNT'] || null
            attr['priceIncludeVatBaht'] = attr['PRICE_INCLUDE_VAT_BAHT'] || null
            attr['free'] = attr['FREE'] || null
            attr['packageValidity'] = attr['PACKAGE_VALIDITY_UNIT'] || null
            attr['packageGroup'] = attr['PACKAGE_GROUP'] || null
            attr['linkCancel'] = attr['LINK_CANCEL'] || null
            attr['cancelAccessNumber'] = attr['CANCEL_ACCESS_NUMBER'] || null
            attr['linkRegister'] = attr['LINK_REGISTER'] || null
            attr['packType'] = attr['packtype'] || null
            attr['tier'] = attr['tier'] || null
            attr['commercialName'] = {
                'th':attr['COMMERCIAL_NAME_TH'] || null,
                'en':attr['COMMERCIAL_NAME_EN'] || null
            }
            attr['termAndCondition'] = {
                'th':attr['TERM_AND_CONDITION_TH'] || null,
                'en':attr['TERM_AND_CONDITION_EN'] || null
            }
            attr['allowNtype'] = !isEmptyObject(arrayAllowNtype) ? arrayAllowNtype : null
            attr['supportPlatform'] = !isEmptyObject(arraySupportPlatform) ? arraySupportPlatform : null
            attr['vimmiProductId'] = !isEmptyObject(arrayVimmiProductId) ? arrayVimmiProductId : null
            attr['packages'] = objectPackages(attr)

            delete attr['imagemob']
            delete attr['imagestb']
            delete attr['PRODUCT_CODE_3BO']
            delete attr['PRODUCT_CODE_3PO']
            delete attr['PRODUCT_CODE_3BE']
            delete attr['PRODUCT_CODE_3PE']
            delete attr['PRODUCT_CODE_IPE']
            delete attr['PRODUCT_CODE']
            delete attr['ETK_FIX_NAME']
            delete attr['ACCESS_NUMBER']
            delete attr['ALLOW_NTYPE']
            delete attr['COMMERCIAL_NAME_TH']
            delete attr['COMMERCIAL_NAME_EN']
            delete attr['CHARGE']
            delete attr['SELL_IN_V_ACCOUNT']
            delete attr['PRICE_INCLUDE_VAT_BAHT']
            delete attr['FREE']
            delete attr['SUPPORT_PLATFORM']
            delete attr['PACKAGE_VALIDITY_UNIT']
            delete attr['VIMMI_PRODUCT_ID']
            delete attr['PACKAGE_GROUP']
            delete attr['TERM_AND_CONDITION_EN']
            delete attr['TERM_AND_CONDITION_TH']
            delete attr['LINK_CANCEL']
            delete attr['CANCEL_ACCESS_NUMBER']
            delete attr['LINK_REGISTER']
            delete attr['packtype']
            delete attr['tier']
            delete attr['CUSTOMER_N_3BO']
            delete attr['CUSTOMER_N_3PO']
            delete attr['CUSTOMER_N_3BE']
            delete attr['CUSTOMER_N_3PE']
            delete attr['CUSTOMER_N_IPE']
            delete attr['CUSTOMER_N_NONAIS']
            delete attr['CUSTOMER_N_3CO']
            delete attr['CUSTOMER_N_3HO']
            delete attr['CUSTOMER_N_2CE']
            delete attr['CUSTOMER_N_2CO']
            delete attr['CUSTOMER_N_3CE']
            delete attr['CUSTOMER_N_BCO']
            delete attr['CUSTOMER_N_CBE']
            delete attr['CUSTOMER_N_IHO']
            delete attr['CUSTOMER_N_IPC']
            delete attr['CUSTOMER_N_FBO']
            delete attr['CUSTOMER_N_IPO']
            delete attr['CUSTOMER_N_CPE']
            delete attr['CUSTOMER_N_CPO']
            delete attr['CUSTOMER_N_RPE']
            delete attr['CUSTOMER_N_RPO']
            delete attr['customer_n_non']
        }
        return attr;
    }
};

function objectPackages(object){
    var data = new Array()
    if(convertCustomerN(object,'CUSTOMER_N_3BO','3BO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3BO','3BO'))
    if(convertCustomerN(object,'CUSTOMER_N_3PO','3PO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3PO','3PO'))
    if(convertCustomerN(object,'CUSTOMER_N_3BE','3BE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3BE','3BE'))
    if(convertCustomerN(object,'CUSTOMER_N_3PE','3PE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3PE','3PE'))
    if(convertCustomerN(object,'CUSTOMER_N_IPE','IPE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_IPE','IPE'))
    if(convertCustomerN(object,'CUSTOMER_N_NONAIS','NONAIS') != null) data.push(convertCustomerN(object,'CUSTOMER_N_NONAIS','NONAIS'))
    if(convertCustomerN(object,'CUSTOMER_N_3CO','3CO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3CO','3CO'))
    if(convertCustomerN(object,'CUSTOMER_N_3HO','3HO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3HO','3HO'))
    if(convertCustomerN(object,'CUSTOMER_N_2CE','2CE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_2CE','2CE'))
    if(convertCustomerN(object,'CUSTOMER_N_2CO','2CO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_2CO','2CO'))
    if(convertCustomerN(object,'CUSTOMER_N_3CE','3CE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_3CE','3CE'))
    if(convertCustomerN(object,'CUSTOMER_N_BCO','BCO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_BCO','BCO'))
    if(convertCustomerN(object,'CUSTOMER_N_CBE','CBE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_CBE','CBE'))
    if(convertCustomerN(object,'CUSTOMER_N_IHO','IHO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_IHO','IHO'))
    if(convertCustomerN(object,'CUSTOMER_N_IPC','IPC') != null) data.push(convertCustomerN(object,'CUSTOMER_N_IPC','IPC'))
    if(convertCustomerN(object,'CUSTOMER_N_FBO','FBO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_FBO','FBO'))
    if(convertCustomerN(object,'CUSTOMER_N_IPO','IPO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_IPO','IPO'))
    if(convertCustomerN(object,'CUSTOMER_N_CPE','CPE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_CPE','CPE'))
    if(convertCustomerN(object,'CUSTOMER_N_CPO','CPO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_CPO','CPO'))
    if(convertCustomerN(object,'CUSTOMER_N_RPE','RPE') != null) data.push(convertCustomerN(object,'CUSTOMER_N_RPE','RPE'))
    if(convertCustomerN(object,'CUSTOMER_N_RPO','RPO') != null) data.push(convertCustomerN(object,'CUSTOMER_N_RPO','RPO'))
    if(convertCustomerN(object,'customer_n_non','NON') != null) data.push(convertCustomerN(object,'customer_n_non','NON'))
    return data
}

function convertCustomerN(object,nameProperty,shortName){
    let name , code
    if(object[nameProperty] !== undefined){
        let array = object[nameProperty].split('|')
        if(array.length === 4){
            name = array[1]
            code = array[3]
        }
        else if (array.length === 2){
            let key = array[0].split('_')[1]
            if(key.trim().toLowerCase() == 'name')
                name = array[1]
            else if (key.trim().toLowerCase() == 'code')
                code = array[1]
        }
    }
  
    if(name != undefined || code != undefined){
        return {
            type: shortName || null,
            name: name || null,
            code: code || null
        }
    }
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }