import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogoEncantare } from "@/components/ui/logo";
import Head from "next/head";
import { Login } from "@/repositories/auth";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
        const response = await Login(email, password);
        console.log("Login bem-sucedido:", response);
        if (response) {
            router.push("/");
        }
    } catch (error) {
      console.error("Erro ao logar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login – Encantare</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#b4c5d3] to-[#e7ebf0] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-2xl shadow-xl backdrop-blur-md">
            <CardContent className="p-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-10"
              >
                <LogoEncantare size={72} />
              </motion.div>

              <div className="space-y-8">
                <div className="relative">
                  <AtSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#395774]"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="Seu e-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#395774]"
                    size={18}
                  />
                  <Input
                    className="pl-10 pr-10"
                    placeholder="Sua senha"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#395774] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button
                  className="w-full bg-[#395774] hover:bg-[#2e475f] text-white rounded-xl py-2 text-lg font-medium transition-all duration-300"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
