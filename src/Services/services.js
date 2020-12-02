import * as api from '../Constants/contants';

// user login

export const loginUser = (m, p) => {
	let fetchUrl = api.domainUrl + api.loginUrl;
    
    const username = encodeURIComponent(m);
     const password = encodeURIComponent(p);
    
    const requestBody = `name=${username}&pass=${password}`;

	return fetch(fetchUrl, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
		body:requestBody
    }).then((response)=>response.json());
}


//user Register

export const registerUser = (name,pass,mail,num) => {
	let fetchUrl = api.domainUrl + api.registerUrl;
    
    const username = encodeURIComponent(name);
    const password = encodeURIComponent(pass);
    const email=encodeURIComponent(mail)
    const mobile=encodeURIComponent(num) 
    
    const requestBody = `name=${username}&email=${email}&pass=${password}&mobile=${mobile}`;

    console.log(requestBody)

	return fetch(fetchUrl, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
		body:requestBody
    }).then((response)=>response.json());
}

export const forgetPass=(email)=>{
    let fetchUrl=api.domainUrl+api.forgetpassUrl

    
    let formBody=new FormData()
    formBody.append(api.email,email)
    
   
    return fetch(fetchUrl,{
        method:'POST',
        body:formBody
    }).then((response)=>response.json())
     
    
}


//slider
export const slider=()=>{
    let fetchUrl=api.domainUrl+api.sliderUrl;

    return fetch(fetchUrl,{
        method:'GET',
        
    }).then((response)=>response.json()) 
}


//category 

export const categoryDetails=()=>{
    let fetchUrl=api.domainUrl+api.categoryUrl;
  
    return fetch(fetchUrl,{
        method:'GET',
        
    }).then((response)=>response.json())
}


//product list 

export const productlistDetails=(m)=>{
    let fetchUrl=api.domainUrl+api.productlistUrl;
   

    const cid = encodeURIComponent(m);
    const requestBody = `cid=${cid}`

    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}


export const productDetails=(pid,uid)=>{
    let fetchUrl=api.domainUrl+api.productDetailsUrl;

    const productid = encodeURIComponent(pid);
    const userid = encodeURIComponent(uid);


    const requestBody = `pid=${productid}&uid=${userid}`

   

    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}


export const addtoCart=(id,name,qnt,amt,uid)=>{
    let fetchUrl=api.domainUrl+api.add_to_cartUrl;


    const productid = encodeURIComponent(id);
    const productname = encodeURIComponent(name);
    const pqnt = encodeURIComponent(qnt);
    const pamount = encodeURIComponent(amt);
    const userid = encodeURIComponent(uid);
  
    console.log("service of addtocart",userid)
    const requestBody = `products_id=${productid}&products_name=${productname}&qnt=${pqnt}&amount=${pamount}&uid=${userid}`

   console.log("service of addtocart",requestBody)

    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}



export const viewCart=(uid)=>{
    let fetchUrl=api.domainUrl+api.view_cartUrl

    const userid=encodeURIComponent(uid)

    const requestBody=`uid=${userid}`

    
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}


export const countCart=(uid)=>{
    let fetchUrl=api.domainUrl+api.count_cartUrl

    const userid=encodeURIComponent(uid)

    const requestBody=`uid=${userid}`

    
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}


export const logOut=(uid)=>{
    let fetchUrl=api.domainUrl+api.logout_url

    const userid=encodeURIComponent(uid)

    const requestBody=`uid=${userid}`

    
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}



export const placeOrder=(uid,address)=>{
    let fetchUrl=api.domainUrl+api.place_orderUrl

    const userid=encodeURIComponent(uid)
    const user_Address=encodeURIComponent(address)

    const requestBody=`uid=${userid}&address=${user_Address}`

    
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.text())
    
}

export const addWish=(pid,pname,amt,uid)=>{
    let fetchUrl=api.domainUrl+api.add_wishUrl

    const productid=encodeURIComponent(pid)
    const productname=encodeURIComponent(pname)
    const userid=encodeURIComponent(uid)
    const productamt=encodeURIComponent(amt)

    const requestBody=`products_id=${productid}&products_name=${productname}&amount=${productamt}&uid=${userid}`

  
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
    
}


export const showWishList=(uid)=>{
    let fetchUrl=api.domainUrl+api.whishlistUrl

    const userid=encodeURIComponent(uid)

    const requestBody=`uid=${userid}`

    
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}


export const getGoogleToken=(email,token,uname)=>{
    let fetchUrl=api.domainUrl+api.google_tokeUrl

    const uemail=encodeURIComponent(email)
    const usertoken=encodeURIComponent(token)
    const username=encodeURIComponent(uname)

    const requestBody=`email=${uemail}&token=${usertoken}&name=${username}`

    console.log("registerBody in google",requestBody)
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}

export const productDescription=(pid)=>{
    let fetchUrl=api.domainUrl+api.product_DescriptionUrl

    const productid=encodeURIComponent(pid)

    const requestBody=`pid=${productid}`

    
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}
export const fetchproductType=()=>{
    let fetchUrl=api.domainUrl+api.productTypeUrl
     
    return fetch(fetchUrl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
     
  }).then((response)=>response.json())
}
export const  fetchWeight=()=>{
    let fetchUrl=api.domainUrl+api.weight_list
     
    return fetch(fetchUrl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
       // body:requestBody
        
    }).then((response)=>response.json())
}

export const  fetchpurity=()=>{
    let fetchUrl=api.domainUrl+api.metal_purity
     
    return fetch(fetchUrl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    
        
    }).then((response)=>response.json()).catch((err)=> console.log("____",err))
}

export const fetchmetaltype=()=>{
    let fetchUrl=api.domainUrl+api.metal_type
     
    return fetch(fetchUrl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    
        
    }).then((response)=>response.json())
}
export const fetchdiscount=()=>{
    let fetchUrl=api.domainUrl+api.discount_list
     
    return fetch(fetchUrl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    
        
    }).then((response)=>response.json())
}
export const fetchsizelist=()=>{
    let fetchUrl=api.domainUrl+api.size_list
     
    return fetch(fetchUrl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    
        
    }).then((response)=>response.json())
}


export const fetchFilterData=(categoryid,type,weight,purity,metaltype,discount,size)=>{
    let fetchUrl=api.domainUrl+api.filterUrl

    const cat_id=encodeURIComponent(categoryid)
    const product_type=encodeURIComponent(type)
    const product_weight=encodeURIComponent(weight)
    const product_purity=encodeURIComponent(purity)
    const product_metal=encodeURIComponent(metaltype)
    const product_discount=encodeURIComponent(discount)
    const product_size=encodeURIComponent(size)

    const requestBody=`cid=${cat_id}&type=${product_type}&weight=${product_weight}&metal_purity=${product_purity}&metal_type=${product_metal}&discount=${product_discount}&size=${product_size}`

    console.log("--requestBody",requestBody)
    
    return fetch(fetchUrl,{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:requestBody
        
    }).then((response)=>response.json())
}