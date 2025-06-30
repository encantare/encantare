import { NextResponse } from "next/server";

import { supabase } from "@/supabase/connection";


export async function middleware(req) {
  const res = NextResponse.next();
  const access_token = req.cookies.get("access-token").value;
  const refresh_token = req.cookies.get("refresh-token").value;



    if (!access_token || !refresh_token) {
        console.log("Tokens não encontrados, redirecionando para login.");
        return NextResponse.redirect(new URL("/auth", req.url));
    }
    try {
        console.log(access_token);
        const { data, error } = await supabase.auth.getUser(access_token);
        console.log(error);

        // if (error) {
        //     console.error("Erro ao obter usuário:", error);
        //     return NextResponse.redirect(new URL("/auth", req.url));
        // }   

        // if (!data.user) {
        //     console.log("Usuário não encontrado, redirecionando para login.");
        //     return NextResponse.redirect(new URL("/auth", req.url));
        // }

        // console.log("Usuário autenticado:", data.user);

    }

    catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return res;
}


async function isAuthenticated(req) {
    const access_token = req.cookies.get("access-token")?.value;
    const refresh_token = req.cookies.get("refresh-token")?.value;

    if (!access_token || !refresh_token) {
        console.log("Tokens não encontrados.");
        return false;
    }

    try {
        const { data, error } = await supabase.auth.getUser(access_token);
        if (error || !data.user) {
            console.log("Usuário não autenticado.");
            return false;
        }
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        return false;
    }

    return true;
}


export async function get_new_token(req) {
  const refresh_token = req.cookies.get("refresh-token")?.value

  if (!refresh_token) {
    return { error: "No refresh token found", authenticated: false }
  }

  const { data, error } = await supabase.auth.refreshSession({ refresh_token })

  if (error || !data.session) {
    return { error: error?.message || "Failed to refresh session", authenticated: false }
  }

  return {
    authenticated: true,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token, 
    user: data.user
  }
}




