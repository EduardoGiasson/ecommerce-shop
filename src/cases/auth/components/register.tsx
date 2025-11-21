import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCities } from "@/cases/cities/hooks/use-city";
import { useStates } from "@/cases/states/hooks/use-state";

import { supabase } from "@/lib/supabase-client";
import type { CustomerDTO } from "@/cases/customers/dtos/customer";
import { useCreateCustomer } from "@/cases/customers/hooks/use-customer";
import { toast } from "react-toastify";

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

    const selectedCity = cities.find((c) => c.id === formData.cityId);
    if (!selectedCity) return toast.error("Selecione uma cidade válida!");

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
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Crie sua conta
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Preencha os dados para continuar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Nome */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Senha */}
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Endereço */}
            <div className="grid gap-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* CEP */}
            <div className="grid gap-2">
              <Label htmlFor="zipcode">CEP</Label>
              <Input
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </div>

            {/* Estado */}
            <div className="grid gap-2">
              <Label htmlFor="stateId">Estado</Label>
              <Select
                value={formData.stateId}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    stateId: value,
                    cityId: "",
                  }))
                }
              >
                <SelectTrigger className="w-full">
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

            {/* Cidade */}
            <div className="grid gap-2">
              <Label htmlFor="cityId">Cidade</Label>
              <Select
                value={formData.cityId}
                onValueChange={handleSelectCity}
                disabled={!formData.stateId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>

                <SelectContent>
                  {filteredCities.length ? (
                    filteredCities.map((city) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {city.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-data" disabled>
                      Nenhuma cidade disponível
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <CardFooter className="flex flex-col gap-3 mt-6">
              <Button
                type="submit"
                disabled={createCustomer.isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {createCustomer.isPending ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <a href="/login" className="text-sm text-primary hover:underline">
                Já possui conta? Faça login
              </a>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
