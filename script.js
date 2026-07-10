import promptSync from "prompt-sync";
import bcrypt from "bcrypt";
import fs from "fs";

const prompt = promptSync();
const BD = "./dados.json";
let carregadno = true



async function CadastroOuLogin() {
  console.log("==============LOGIN===============");
  console.log("Fazer Cadastro: 1");
  console.log("Fazer Login: 2");
  const verificar = prompt("Escolha 1 ou 2: ");

  if (verificar === "1") {
    await criptografar();
  } else if (verificar === "2") {
    await Login();
  } else {
    console.log("Opção invalida");
  }
}
async function criptografar() {
  let email = prompt("Digite seu email: ");
  let senha = prompt("Digite sua senha: ");

  if (!email.includes("@")) {
    console.log("O e-mail precisa conter o @");
    return;
  }

  const conteudo = fs.readFileSync(BD, "utf-8");
  const usuarios = JSON.parse(conteudo);

  let senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    email: email,
    senha: senhaCriptografada,
  };

  usuarios.push(novoUsuario);

  fs.writeFileSync(BD, JSON.stringify(usuarios, null, 2));

  console.log("Salvo com sucesso!");
}
async function Login() {
  let email = prompt("Digite seu email: ");
  let senha = prompt("Digite sua senha: ");

  if (!email.includes("@")) {
    console.log("O e-mail precisa conter o @");
    return;
  }
  const conteudo = fs.readFileSync(BD, "utf-8");
  const usuarios = JSON.parse(conteudo);
  const user = usuarios.find((e) => e.email === email);
  if (!user) {
    console.log("Usuario não Cadastrado.");
    return;
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senha);

  if (senhaCorreta) {
    console.log("Bem-vindo de volta!");
    return;
  } else {
    console.log("Senha incorreta.");
  }
}

CadastroOuLogin()
