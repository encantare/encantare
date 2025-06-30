import { supabase } from "@/supabase/connection";
import setCookie from "@/services/cookie";

export function Login(email, password){
    return new Promise(async (resolve, reject) => {
        try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            reject("Erro: " + error.message);
        } else {
            setCookie("access-token", data.session.access_token);
            setCookie("refresh-token", data.session.refresh_token);
            resolve(data);
        }
        } catch (error) {
        console.error("Erro ao logar:", error);
        reject(error);
        }
    });
}


export async function Logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Erro ao deslogar:", error);
        return false;
    }
    setCookie("access-token", "", -1);
    setCookie("refresh-token", "", -1);
    return true;
}


export async function Register(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                reject("Erro: " + error.message);
            } else {
                setCookie("access-token", data.session.access_token);
                setCookie("refresh-token", data.session.refresh_token);
                resolve(data);
            }
        } catch (error) {
            console.error("Erro ao registrar:", error);
            reject(error);
        }
    });
}

// export async function ResetPassword(email) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { data, error } = await supabase.auth.resetPasswordForEmail(email);
//             if (error) {
//                 reject("Erro: " + error.message);
//             } else {
//                 resolve(data);
//             }
//         } catch (error) {
//             console.error("Erro ao resetar senha:", error);
//             reject(error);
//         }
//     });
// }

// export async function UpdatePassword(newPassword) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { data, error } = await supabase.auth.updateUser({
//                 password: newPassword,
//             });
//             if (error) {
//                 reject("Erro: " + error.message);
//             } else {
//                 resolve(data);
//             }
//         } catch (error) {
//             console.error("Erro ao atualizar senha:", error);
//             reject(error);
//         }
//     });
// }



