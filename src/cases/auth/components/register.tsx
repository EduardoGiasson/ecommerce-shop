import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import logo from "@/assets/images/logo.png";
import { toast } from "react-toastify";

import { useCities } from "@/cases/cities/hooks/use-city";
import { useStates } from "@/cases/states/hooks/use-state";
import { useCreateCustomer } from "@/cases/customers/hooks/use-customer";
import type { CustomerDTO } from "@/cases/customers/dtos/customer";

import { supabase } from "@/lib/supabase-client";

export default function RegisterPage() {
  const navigate = useNavigate();
  const createCustomer = useCreateCustomer();
  const { data: cities = [] } = useCities();
  const { data: states = [] } = useStates();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    zipcode: "",
    stateId: "",
    cityId: "",
    nivelConta: null as number | null, // 0 consumidor | 1 gestor
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectCity = (value: string) => {
    setFormData((prev) => ({ ...prev, cityId: value }));
  };

  const filteredCities = formData.stateId
    ? cities.filter((c) => c.state.id === formData.stateId)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.nivelConta === null) {
      return toast.error("Selecione Consumidor ou Gestor.");
    }

    const selectedCity = cities.find((c) => c.id === formData.cityId);
    if (!selectedCity) {
      return toast.error("Selecione uma cidade válida.");
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      if (!data.user?.id) throw new Error("Erro ao obter usuário.");

      const cleanZip = formData.zipcode.replace(/\D/g, "").slice(0, 8);

      createCustomer.mutate(
        {
          userId: data.user.id,
          name: formData.name,
          address: formData.address,
          zipcode: cleanZip,
          city: selectedCity,
          nivelConta: formData.nivelConta,
        } as CustomerDTO,
        {
          onSuccess: () => {
            toast.success("Cadastro realizado com sucesso!");
            navigate("/login");
          },
        }
      );
    } catch (err: any) {
      toast.error(err.message || "Erro inesperado!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[1800px] min-h-[900px] bg-[#d9f3f2] rounded-lg p-12 relative">

        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="font-semibold text-gray-700 text-lg">
            ENERGIZA
          </span>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-4xl font-semibold mb-6">
            Crie seu cadastro
          </h1>

          {/* Tipo de conta */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="nivelConta"
                checked={formData.nivelConta === 0}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, nivelConta: 0 }))
                }
                required
              />
              <span className="text-sm">Consumidor</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="nivelConta"
                checked={formData.nivelConta === 1}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, nivelConta: 1 }))
                }
                required
              />
              <span className="text-sm">Gestor</span>
            </label>
          </div>

          <Card className="w-[420px] shadow-md">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div>
                  <Label>Nome Completo</Label>
                  <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Senha</Label>
                  <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Endereço</Label>
                  <Input name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div>
                  <Label>CEP</Label>
                  <Input name="zipcode" value={formData.zipcode} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Estado</Label>
                  <Select
                    value={formData.stateId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, stateId: value, cityId: "" }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name} ({s.acronym})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Cidade</Label>
                  <Select
                    value={formData.cityId}
                    onValueChange={handleSelectCity}
                    disabled={!formData.stateId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCities.map((city) => (
                        <SelectItem key={city.id} value={String(city.id)}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={createCustomer.isPending}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  {createCustomer.isPending ? "Cadastrando..." : "Cadastrar"}
                </Button>

                <a
                  href="/login"
                  className="text-sm text-center text-blue-600 hover:underline"
                >
                  Já possui conta? Faça login
                </a>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
