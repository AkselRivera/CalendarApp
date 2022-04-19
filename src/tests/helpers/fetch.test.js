import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe('Pruebas sobre fetch', () => {
  
let token='';

    test('Pruebas en fetch sin Token', async () => {
        const data={
            "email":"aksel@softtek.com",
            "password":"123456"
        }
        const resp= await fetchSinToken('auth/',data,'POST');
        const body= await resp.json();
        
        expect(resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);
        token= body.token;

    });

    test('Debe funcionar el token', async () => {
    
        localStorage.setItem('token',token);

        const resp= await fetchConToken('events/61f95d2f16eff4be6e4869ba',{},'DELETE');
        const body= await resp.json();


        expect(body.msg).toBe('Información no encontrada');


    });
    



    
});
