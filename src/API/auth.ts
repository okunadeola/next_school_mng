import axios from "axios";




// export const APINEW = axios.create({ baseURL: `http://107.23.145.186/api/index.php/` });
export const APINEW = axios.create({ baseURL: `http://107.23.145.186/api/` });
APINEW.interceptors.request.use((req) => {
  // Get the token dynamically on each request
//   const token = JSON.parse(window.localStorage.getItem('communeety-auth-session'))
//     ?.state?.userData?.token;

  req.headers['token'] = 'token';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});





export async function loginUserAction(json: any) {
    let data = await loginUser(json)
        .then(async (response) => {
            // showSuccess('successful login')
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            // formatError(error?.response?.data?.message || "Something went wrong");
        });

    return data
}

const loginUser = async (data : any) => {

    const json = {
        "username":data?.email,
        "password":data?.password }
    let resources = await APINEW.post('login/signin', json )
    return resources;
}





