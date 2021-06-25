import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenricateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email,password}:IAuthenricateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect");
    }

    //Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect");
    }

    //Gerar token
    const token = sign({
      email: user.email
    },
    "a4990922343512ba54e4e838bbcd16bf",
    {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;

  }

}

export {AuthenticateUserService}